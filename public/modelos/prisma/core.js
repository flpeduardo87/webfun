(function (global) {
  'use strict';

  function roundMoney(value) { return Math.round((Number(value) + Number.EPSILON) * 100) / 100; }
  function formatBRL(value) { return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL',minimumFractionDigits:2,maximumFractionDigits:2}).format(roundMoney(value)).replace(/\u00a0/g,' '); }
  function unitPrice(entry, products) { const item=products.find(i=>i.id===entry.id);if(!item)return 0;if(Number.isFinite(Number(entry.unitPrice)))return roundMoney(entry.unitPrice);return roundMoney(item.price); }
  function calculateSubtotal(items, products) { return roundMoney(items.reduce((sum,entry)=>sum+unitPrice(entry,products)*Number(entry.qty||0),0)); }
  function calculateOrder(items,products,fulfillment={}){
    const subtotal=calculateSubtotal(items,products);const baseDeliveryFee=fulfillment.type==='delivery'?roundMoney(fulfillment.deliveryFee||0):0;const threshold=Number(fulfillment.freeDeliveryThreshold||0);const freeDelivery=fulfillment.type==='delivery'&&threshold>0&&subtotal>=threshold;const deliveryFee=freeDelivery?0:baseDeliveryFee;return{subtotal,baseDeliveryFee,deliveryFee,freeDelivery,total:roundMoney(subtotal+deliveryFee)};
  }
  function entryDescription(entry,products){
    const item=products.find(i=>i.id===entry.id);if(!item)return'';const parts=[item.name];if(entry.variantLabel)parts.push(`(${entry.variantLabel})`);if(entry.addons?.length)parts.push(`+ ${entry.addons.map(a=>a.name).join(', ')}`);return parts.join(' ');
  }
  function attributesText(item){return (item?.attributes||[]).filter(a=>a?.label&&a?.value).map(a=>`${a.label}: ${a.value}`).join(' • ');}
  function buildOrderMessage(cart,products,notes='',fulfillment={}){
    const lines=cart.map(entry=>`${Number(entry.qty||0)}x ${entryDescription(entry,products)} — ${formatBRL(unitPrice(entry,products)*Number(entry.qty||0))}`);const totals=calculateOrder(cart,products,fulfillment);const customer=String(fulfillment.customerName||'').trim();const typeLabel=fulfillment.type==='delivery'?'Entrega':'Retirada no balcão';
    let msg=`Olá! Quero fazer um pedido${customer?` em nome de ${customer}`:''}.\n\n`;msg+=`*Pedido*\n${lines.map(line=>`• ${line}`).join('\n')}`;msg+=`\n\n*Forma de recebimento:* ${typeLabel}`;
    if(fulfillment.type==='delivery'){const address=[fulfillment.street,fulfillment.number,fulfillment.complement,fulfillment.neighborhood].map(v=>String(v||'').trim()).filter(Boolean).join(', ');if(address)msg+=`\n*Endereço:* ${address}`;}
    const cleanNotes=String(notes||'').trim();if(cleanNotes)msg+=`\n*Observações:* ${cleanNotes}`;msg+=`\n\nSubtotal: ${formatBRL(totals.subtotal)}`;if(fulfillment.type==='delivery')msg+=totals.freeDelivery?`\nTaxa de entrega: GRÁTIS`:`\nTaxa de entrega: ${formatBRL(totals.deliveryFee)}`;msg+=`\n*Total: ${formatBRL(totals.total)}*`;return msg;
  }
  function buildCartMessage(cart,products,notes='',options={}){
    const lines=cart.map(entry=>`${Number(entry.qty||0)}x ${entryDescription(entry,products)} — ${formatBRL(unitPrice(entry,products)*Number(entry.qty||0))}`);const subtotal=calculateSubtotal(cart,products);const customer=String(options.customerName||'').trim();let msg=`Olá! Gostaria de consultar estes produtos${customer?` em nome de ${customer}`:''}:\n\n`;msg+=lines.map(line=>`• ${line}`).join('\n');const cleanNotes=String(notes||'').trim();if(cleanNotes)msg+=`\n\n*Observações:* ${cleanNotes}`;msg+=`\n\n*Total dos itens: ${formatBRL(subtotal)}*`;msg+='\nPodem me confirmar disponibilidade e condições?';return msg;
  }
  function buildLeadMessage(item,options={}){
    const business=String(options.businessName||'').trim();let msg=`Olá! Tenho interesse em *${item.name}*${business?` da ${business}`:''}.`;if(Number(item.price)>0)msg+=`\nValor anunciado: *${formatBRL(item.price)}*`;const attrs=attributesText(item);if(attrs)msg+=`\n${attrs}`;msg+='\n\nGostaria de mais informações e condições.';return msg;
  }

  function buildServiceMessage(item,options={}){
    const business=String(options.businessName||'').trim();
    const action=String(options.leadAction||item?.metadata?.leadMode||'quote')==='schedule'?'agendar uma avaliação':'solicitar um orçamento';
    let msg=`Olá! Gostaria de ${action} para *${item.name}*${business?` na ${business}`:''}.`;
    const mode=item.priceMode||((Number(item.price)||0)>0?'fixed':'quote');
    if(mode==='from'&&Number(item.price)>0)msg+=`\nValor informado: *a partir de ${formatBRL(item.price)}*`;
    else if(mode==='fixed'&&Number(item.price)>0)msg+=`\nValor informado: *${formatBRL(item.price)}*`;
    else msg+='\nValor: *sob avaliação*';
    const attrs=attributesText(item);if(attrs)msg+=`\n${attrs}`;
    const customer=String(options.customerName||'').trim();if(customer)msg+=`\n\n*Nome:* ${customer}`;
    const context=String(options.customerContext||'').trim();if(context)msg+=`\n*Preferência:* ${context}`;
    const date=String(options.preferredDate||'').trim(),period=String(options.preferredPeriod||'').trim();
    if(date||period)msg+=`\n*Data/horário:* ${[date,period].filter(Boolean).join(' • ')}`;
    const note=String(options.serviceNote||'').trim();if(note)msg+=`\n*Observações:* ${note}`;
    msg+='\n\nPodem me orientar sobre disponibilidade e próximos passos?';
    return msg;
  }

  function buildConversionMessage(entries,products,notes='',options={}){
    const mode=options.conversionMode||'order_whatsapp';
    if(mode==='lead_whatsapp'){const entry=entries?.[0];const item=entry&&products.find(p=>p.id===entry.id);return item?buildLeadMessage(item,options):'Olá! Gostaria de mais informações.';}
    if(mode==='service_quote'){const entry=entries?.[0];const item=entry&&products.find(p=>p.id===entry.id);return item?buildServiceMessage(item,options):'Olá! Gostaria de informações sobre um serviço.';}
    if(mode==='cart_whatsapp')return buildCartMessage(entries||[],products,notes,options);
    return buildOrderMessage(entries||[],products,notes,options);
  }
  function buildWhatsAppUrl(phone,message){const cleanPhone=String(phone||'').replace(/\D/g,'');return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;}
  function isOpenNow(openingHours={},timeZone='America/Sao_Paulo',date){
    const now=date||new Date();const parts=new Intl.DateTimeFormat('en-US',{timeZone,weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(now);const get=type=>parts.find(p=>p.type===type)?.value;const dayMap={Sun:'sun',Mon:'mon',Tue:'tue',Wed:'wed',Thu:'thu',Fri:'fri',Sat:'sat'};const schedule=openingHours?.[dayMap[get('weekday')]];if(!schedule||schedule.closed)return false;const mins=Number(get('hour'))*60+Number(get('minute'));const toMins=hhmm=>{const[h,m]=String(hhmm||'00:00').split(':').map(Number);return h*60+m};const start=toMins(schedule.open),end=toMins(schedule.close);return end>start?mins>=start&&mins<end:mins>=start||mins<end;
  }

  const api={roundMoney,formatBRL,unitPrice,calculateSubtotal,calculateOrder,entryDescription,attributesText,buildOrderMessage,buildCartMessage,buildLeadMessage,buildServiceMessage,buildConversionMessage,buildWhatsAppUrl,isOpenNow};if(typeof module!=='undefined'&&module.exports)module.exports=api;global.MenuCore=api;
})(typeof window!=='undefined'?window:globalThis);
