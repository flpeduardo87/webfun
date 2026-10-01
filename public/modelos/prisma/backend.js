(function (global) {
  'use strict';

  const cfg=global.SUPABASE_CONFIG||{};
  let syncTimer=null,syncChain=Promise.resolve(),pendingSnapshot=null,pendingBusinessId=null,pendingWaiters=[];
  const clone=value=>JSON.parse(JSON.stringify(value));

  function slugify(value){return String(value||'negocio').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||`negocio-${Date.now()}`;}
  function resolveSlug(){
    const url=new URL(global.location.href);const querySlug=url.searchParams.get('b')||url.searchParams.get('r')||url.searchParams.get('negocio')||url.searchParams.get('restaurante');if(querySlug)return slugify(querySlug);
    const pathMatch=url.pathname.match(/\/(?:b|r)\/([a-z0-9-]+)/i);if(pathMatch)return slugify(pathMatch[1]);
    const host=url.hostname;if(host&&host!=='localhost'&&!/^\d+\.\d+\.\d+\.\d+$/.test(host)){const parts=host.split('.');if(parts.length>=3&&!['www','app','catalogo','cardapio'].includes(parts[0]))return slugify(parts[0]);}
    return slugify(cfg.defaultBusinessSlug||cfg.defaultRestaurantSlug||'forno-alto');
  }
  function resolveTemplate(){const url=new URL(global.location.href);const value=(url.searchParams.get('template')||url.searchParams.get('segmento')||'').toLowerCase();return (global.MenuData?.BUSINESS_PROFILES?.[value]||global.MenuData?.TEMPLATES?.[value])?value:'';}
  function isCloud(){return !!global.SupabaseApp?.isConfigured?.();}
  function client(){return global.SupabaseApp?.getClient?.()||null;}
  function dispatchSync(status,detail={}){const payload={detail:{status,...detail}};global.dispatchEvent(new CustomEvent('catalog:sync',payload));global.dispatchEvent(new CustomEvent('menu:sync',payload));}

  function mapProduct(row){return{_dbId:row.id,id:row.product_key,section:row.section,name:row.name,description:row.description||'',price:Number(row.price)||0,priceMode:row.metadata?.priceMode||((Number(row.price)||0)>0?'fixed':'quote'),metadata:row.metadata&&typeof row.metadata==='object'?row.metadata:{},image:row.image_url||'',media:Array.isArray(row.media)?row.media:[],attributes:Array.isArray(row.attributes)?row.attributes:[],highlight:!!row.highlight,available:row.available!==false,badges:Array.isArray(row.badges)?row.badges:[],variants:Array.isArray(row.variants)&&row.variants.length?row.variants:undefined,addons:Array.isArray(row.addons)&&row.addons.length?row.addons:undefined,sortOrder:Number(row.sort_order)||0};}
  function rowFromProduct(product,businessId,index=0){return{business_id:businessId,product_key:String(product.id),section:String(product.section||'outros'),name:String(product.name||'Produto'),description:String(product.description||''),price:Number(product.price)||0,image_url:String(product.image||product.media?.[0]||''),media:Array.isArray(product.media)?product.media:[],attributes:Array.isArray(product.attributes)?product.attributes:[],metadata:{...(product.metadata&&typeof product.metadata==='object'?product.metadata:{}),priceMode:['fixed','from','quote'].includes(product.priceMode)?product.priceMode:((Number(product.price)||0)>0?'fixed':'quote')},highlight:!!product.highlight,available:product.available!==false,badges:Array.isArray(product.badges)?product.badges:[],variants:Array.isArray(product.variants)?product.variants:[],addons:Array.isArray(product.addons)?product.addons:[],sort_order:Number.isFinite(Number(product.sortOrder))?Number(product.sortOrder):index};}
  function mergeBusiness(row,products){
    const config=clone(row.config||{});config.businessName=row.name||config.businessName||'Meu negócio';config.businessType=row.business_type||config.businessType||'food';config.businessSubtype=row.business_subtype||config.businessSubtype||global.MenuData.getBusinessProfile(config.businessType).label.toUpperCase();config.conversionMode=config.conversionMode||global.MenuData.getBusinessProfile(config.businessType).conversionMode;
    return global.MenuData.normalizeSnapshot({version:10,config,menu:(products||[]).map(mapProduct),meta:{businessId:row.id,slug:row.slug,published:row.is_published!==false,source:'supabase'}});
  }

  async function loadPublicCatalog(slug=resolveSlug()){
    const template=resolveTemplate();
    // Preview explícito sempre vence Supabase/localStorage. Isso torna ?template=... determinístico.
    if(template){
      const local=global.MenuData.getTemplate(template);
      local.meta={...(local.meta||{}),slug,source:'local-template',template,preview:true};
      return local;
    }
    if(!isCloud()){
      const local=global.MenuData.getData();local.meta={...(local.meta||{}),slug,source:'local-demo'};return local;
    }
    try{
      const sb=client();const {data:rows,error}=await sb.from('businesses').select('id,slug,name,business_type,business_subtype,config,is_published').eq('slug',slug).eq('is_published',true).limit(1);if(error)throw error;const business=rows?.[0];if(!business)throw new Error(`Negócio “${slug}” não encontrado ou não publicado.`);
      const {data:products,error:productsError}=await sb.from('products').select('id,product_key,section,name,description,price,image_url,media,attributes,metadata,highlight,available,badges,variants,addons,sort_order').eq('business_id',business.id).order('sort_order',{ascending:true});if(productsError)throw productsError;return mergeBusiness(business,products||[]);
    }catch(error){if(cfg.fallbackToLocalDemo!==false){const local=global.MenuData.getData();local.meta={...(local.meta||{}),slug,source:'local-fallback',cloudError:error.message};return local;}throw error;}
  }

  async function getSession(){if(!isCloud())return null;const {data,error}=await client().auth.getSession();if(error)throw error;return data.session||null;}
  async function signIn(email,password){if(!isCloud())throw new Error('Configure o Supabase antes de usar o login em nuvem.');const {data,error}=await client().auth.signInWithPassword({email,password});if(error)throw error;return data;}
  async function signUp(email,password,fullName=''){if(!isCloud())throw new Error('Configure o Supabase antes de criar uma conta.');const {data,error}=await client().auth.signUp({email,password,options:{data:{full_name:String(fullName||'').trim()}}});if(error)throw error;return data;}
  async function signOut(){if(!isCloud())return;const {error}=await client().auth.signOut();if(error)throw error;}

  async function listBusinesses(){
    if(!isCloud())return[];const sb=client();const {data:sessionData}=await sb.auth.getSession();const userId=sessionData.session?.user?.id;if(!userId)return[];
    const {data:memberships,error}=await sb.from('business_members').select('business_id,role').eq('user_id',userId);if(error)throw error;const ids=[...new Set((memberships||[]).map(m=>m.business_id))];if(!ids.length)return[];
    const {data:businesses,error:businessError}=await sb.from('businesses').select('id,slug,name,business_type,business_subtype,is_published').in('id',ids).order('name');if(businessError)throw businessError;
    return (businesses||[]).map(b=>({...b,role:memberships.find(m=>m.business_id===b.id)?.role||'viewer'}));
  }
  async function loadAdminData(businessId){
    if(!isCloud())return global.MenuData.getData();const sb=client();const {data:rows,error}=await sb.from('businesses').select('id,slug,name,business_type,business_subtype,config,is_published').eq('id',businessId).limit(1);if(error)throw error;const business=rows?.[0];if(!business)throw new Error('Negócio não encontrado ou sem permissão.');
    const {data:products,error:productsError}=await sb.from('products').select('id,product_key,section,name,description,price,image_url,media,attributes,metadata,highlight,available,badges,variants,addons,sort_order').eq('business_id',business.id).order('sort_order',{ascending:true});if(productsError)throw productsError;return mergeBusiness(business,products||[]);
  }
  async function createBusiness({name,slug,businessType='food',businessSubtype='',seedDemo=true}){
    if(!isCloud())throw new Error('Configure o Supabase para criar negócios na nuvem.');const cleanSlug=slugify(slug||name);const defaultData=global.MenuData.getTemplate(businessType);defaultData.config.businessName=String(name||'Meu negócio').trim();defaultData.config.businessSubtype=String(businessSubtype||defaultData.config.businessSubtype).trim();
    const {data,error}=await client().rpc('create_business_for_current_user',{p_name:defaultData.config.businessName,p_slug:cleanSlug,p_business_type:businessType,p_business_subtype:defaultData.config.businessSubtype,p_config:defaultData.config});if(error)throw error;const created=Array.isArray(data)?data[0]:data;if(!created?.id)throw new Error('O negócio foi criado, mas o identificador não foi retornado.');if(seedDemo)await syncSnapshot(defaultData,created.id);return{...created,slug:cleanSlug};
  }

  async function syncSnapshot(snapshot,businessId){
    if(!isCloud()||!businessId)return snapshot;const sb=client();const data=global.MenuData.normalizeSnapshot(snapshot);const config=data.config||{};dispatchSync('syncing');
    const {error:businessError}=await sb.from('businesses').update({name:String(config.businessName||'Meu negócio'),business_type:String(config.businessType||'food'),business_subtype:String(config.businessSubtype||''),config,updated_at:new Date().toISOString()}).eq('id',businessId);if(businessError)throw businessError;
    const payload=(data.menu||[]).map((product,index)=>rowFromProduct(product,businessId,index));if(payload.length){const {error:upsertError}=await sb.from('products').upsert(payload,{onConflict:'business_id,product_key'});if(upsertError)throw upsertError;}
    const {data:existing,error:existingError}=await sb.from('products').select('id,product_key').eq('business_id',businessId);if(existingError)throw existingError;const wanted=new Set(payload.map(p=>p.product_key));const staleIds=(existing||[]).filter(row=>!wanted.has(row.product_key)).map(row=>row.id);if(staleIds.length){const {error:deleteError}=await sb.from('products').delete().in('id',staleIds);if(deleteError)throw deleteError;}
    dispatchSync('synced',{at:new Date().toISOString()});return data;
  }
  function queueSnapshotSync(snapshot,businessId){
    if(!isCloud()||!businessId)return Promise.resolve(snapshot);pendingSnapshot=clone(snapshot);pendingBusinessId=businessId;dispatchSync('pending');clearTimeout(syncTimer);const promise=new Promise((resolve,reject)=>pendingWaiters.push({resolve,reject}));syncTimer=setTimeout(()=>{const runSnapshot=pendingSnapshot,runBusinessId=pendingBusinessId,waiters=pendingWaiters.splice(0);pendingSnapshot=null;pendingBusinessId=null;syncChain=syncChain.catch(()=>undefined).then(()=>syncSnapshot(runSnapshot,runBusinessId)).then(result=>{waiters.forEach(w=>w.resolve(result));return result;}).catch(error=>{dispatchSync('error',{message:error.message});waiters.forEach(w=>w.reject(error));return undefined;});},350);return promise;
  }
  async function replaceBusinessData(snapshot,businessId){return syncSnapshot(snapshot,businessId);}
  async function uploadImage(file,businessId,kind='products'){
    if(!isCloud())throw new Error('O upload de arquivos exige o Supabase configurado.');if(!businessId)throw new Error('Selecione um negócio antes de enviar imagens.');if(!file)throw new Error('Selecione uma imagem.');const allowed=['image/jpeg','image/png','image/webp'];if(!allowed.includes(file.type))throw new Error('Use JPG, PNG ou WebP.');if(file.size>8*1024*1024)throw new Error('A imagem deve ter no máximo 8 MB.');const ext=({'image/jpeg':'jpg','image/png':'png','image/webp':'webp'})[file.type]||'jpg';const id=global.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`;const path=`${businessId}/${slugify(kind)}/${id}.${ext}`;const bucket=cfg.storageBucket||'catalog-images';const sb=client();const {error}=await sb.storage.from(bucket).upload(path,file,{cacheControl:'3600',upsert:false,contentType:file.type});if(error)throw error;const {data}=sb.storage.from(bucket).getPublicUrl(path);if(!data?.publicUrl)throw new Error('Não foi possível obter a URL pública da imagem.');return data.publicUrl;
  }


  const INTERACTION_STORAGE_KEY='catalog_core_v2_interactions';
  function interactionBusinessKey(payload={}){return String(payload.businessKey||payload.businessId||payload.businessType||resolveTemplate()||'food');}
  function readLocalInteractions(){try{const raw=JSON.parse(localStorage.getItem(INTERACTION_STORAGE_KEY)||'[]');return Array.isArray(raw)?raw:[]}catch{return[]}}
  function writeLocalInteractions(rows){localStorage.setItem(INTERACTION_STORAGE_KEY,JSON.stringify(rows));return rows;}
  function nowMinus(minutes){return new Date(Date.now()-minutes*60000).toISOString();}
  function demoInteractions(type='food'){
    const common={business_key:type,business_type:type,source:'whatsapp'};
    const sets={
      food:[
        {id:'demo-food-1',record_type:'order',conversion_mode:'order_whatsapp',status:'new',customer_name:'Mariana',amount:126,items:[{name:'Pizza Margherita',qty:1},{name:'Pizza Pepperoni',qty:1}],metadata:{fulfillment:'Entrega',neighborhood:'Centro'},created_at:nowMinus(12)},
        {id:'demo-food-2',record_type:'order',conversion_mode:'order_whatsapp',status:'in_progress',customer_name:'Rafael',amount:74.5,items:[{name:'Pizza Trufada',qty:1}],metadata:{fulfillment:'Retirada'},created_at:nowMinus(48)},
        {id:'demo-food-3',record_type:'order',conversion_mode:'order_whatsapp',status:'done',customer_name:'Camila',amount:98,items:[{name:'Pizza Pepperoni',qty:1},{name:'Tiramisù',qty:1}],metadata:{fulfillment:'Entrega'},created_at:nowMinus(190)}
      ],
      retail:[
        {id:'demo-retail-1',record_type:'order',conversion_mode:'cart_whatsapp',status:'new',customer_name:'Ana',amount:329.8,items:[{name:'Vestido Midi Serena',qty:1},{name:'Blusa Linho Essencial',qty:1}],metadata:{intent:'Consulta de disponibilidade'},created_at:nowMinus(18)},
        {id:'demo-retail-2',record_type:'order',conversion_mode:'cart_whatsapp',status:'in_progress',customer_name:'Juliana',amount:189.9,items:[{name:'Vestido Midi Serena',qty:1}],metadata:{intent:'Confirmando tamanho M'},created_at:nowMinus(76)},
        {id:'demo-retail-3',record_type:'order',conversion_mode:'cart_whatsapp',status:'done',customer_name:'Bianca',amount:259.9,items:[{name:'Conjunto Alfaiataria',qty:1}],metadata:{intent:'Venda concluída'},created_at:nowMinus(310)}
      ],
      automotive:[
        {id:'demo-automotive-1',record_type:'lead',conversion_mode:'lead_whatsapp',status:'new',customer_name:'Contato via WhatsApp',amount:139900,items:[{name:'Toyota Corolla XEi 2.0',qty:1}],metadata:{intent:'Interesse no veículo'},created_at:nowMinus(9)},
        {id:'demo-automotive-2',record_type:'lead',conversion_mode:'lead_whatsapp',status:'in_progress',customer_name:'Contato via WhatsApp',amount:158900,items:[{name:'Jeep Compass Limited',qty:1}],metadata:{intent:'Condições e avaliação de troca'},created_at:nowMinus(64)},
        {id:'demo-automotive-3',record_type:'lead',conversion_mode:'lead_whatsapp',status:'done',customer_name:'Contato convertido',amount:129900,items:[{name:'Volkswagen Nivus Highline',qty:1}],metadata:{intent:'Negociação concluída'},created_at:nowMinus(1440)}
      ],
      services:[
        {id:'demo-services-1',record_type:'lead',conversion_mode:'service_quote',status:'new',customer_name:'Lucas',amount:790,items:[{name:'Vitrificação Cerâmica',qty:1}],metadata:{action:'Orçamento',context:'Civic preto 2021'},created_at:nowMinus(14)},
        {id:'demo-services-2',record_type:'lead',conversion_mode:'service_quote',status:'in_progress',customer_name:'Fernanda',amount:320,items:[{name:'Higienização Interna Premium',qty:1}],metadata:{action:'Agendar avaliação',preferred:'Amanhã • Tarde'},created_at:nowMinus(95)},
        {id:'demo-services-3',record_type:'lead',conversion_mode:'service_quote',status:'done',customer_name:'André',amount:180,items:[{name:'Lavagem Técnica Detalhada',qty:1}],metadata:{action:'Atendimento concluído'},created_at:nowMinus(510)}
      ]
    };
    return (sets[type]||sets.food).map(x=>({...common,...x,updated_at:x.created_at}));
  }
  function ensureLocalDemoInteractions(type='food'){
    const rows=readLocalInteractions(),existing=new Set(rows.map(r=>r.id)),seeds=demoInteractions(type).filter(r=>!existing.has(r.id));
    if(seeds.length)writeLocalInteractions([...seeds,...rows]);
    return [...seeds,...rows];
  }
  function normalizeInteraction(payload={}){
    const recordType=payload.recordType==='lead'?'lead':'order';
    const id=String(payload.id||global.crypto?.randomUUID?.()||`local-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    return {id,business_id:payload.businessId||null,business_key:interactionBusinessKey(payload),business_type:String(payload.businessType||'food'),record_type:recordType,conversion_mode:String(payload.conversionMode||''),status:['new','in_progress','done','cancelled'].includes(payload.status)?payload.status:'new',customer_name:String(payload.customerName||'').trim()||(recordType==='lead'?'Contato via WhatsApp':'Cliente'),amount:Number(payload.amount)||0,items:Array.isArray(payload.items)?payload.items:[],metadata:payload.metadata&&typeof payload.metadata==='object'?payload.metadata:{},source:String(payload.source||'whatsapp'),created_at:payload.createdAt||new Date().toISOString(),updated_at:new Date().toISOString()};
  }
  async function captureInteraction(payload={}){
    const row=normalizeInteraction(payload);
    if(isCloud()&&payload.businessSlug&&!payload.preview){
      try{
        const {data,error}=await client().rpc('create_public_interaction',{p_business_slug:String(payload.businessSlug),p_record_type:row.record_type,p_conversion_mode:row.conversion_mode,p_customer_name:row.customer_name,p_amount:row.amount,p_items:row.items,p_metadata:row.metadata});
        if(error)throw error;return Array.isArray(data)?data[0]:data;
      }catch(error){console.warn('Não foi possível registrar a interação na nuvem:',error.message);return null;}
    }
    const rows=readLocalInteractions();writeLocalInteractions([row,...rows.filter(x=>x.id!==row.id)]);global.dispatchEvent(new CustomEvent('catalog:interaction',{detail:row}));return row;
  }
  async function listInteractions({businessId=null,businessKey='',businessType='food'}={}){
    if(isCloud()&&businessId){const {data,error}=await client().from('interactions').select('id,business_id,record_type,conversion_mode,status,customer_name,amount,items,metadata,source,created_at,updated_at').eq('business_id',businessId).order('created_at',{ascending:false}).limit(250);if(error)throw error;return data||[];}
    const key=String(businessKey||businessType||'food');const rows=ensureLocalDemoInteractions(String(businessType||'food'));return rows.filter(r=>String(r.business_key||'')===key||(!businessKey&&r.business_type===businessType)).sort((a,b)=>new Date(b.created_at)-new Date(a.created_at));
  }
  async function updateInteractionStatus(id,status,{businessId=null,businessKey=''}={}){
    if(!['new','in_progress','done','cancelled'].includes(status))throw new Error('Status inválido.');
    if(isCloud()&&businessId){const {data,error}=await client().from('interactions').update({status,updated_at:new Date().toISOString()}).eq('business_id',businessId).eq('id',id).select().limit(1);if(error)throw error;return data?.[0]||null;}
    const rows=readLocalInteractions(),index=rows.findIndex(r=>r.id===id&&(businessKey?String(r.business_key)===String(businessKey):true));if(index<0)throw new Error('Registro não encontrado.');rows[index]={...rows[index],status,updated_at:new Date().toISOString()};writeLocalInteractions(rows);return rows[index];
  }

  global.MenuBackend={isCloud,resolveSlug,resolveTemplate,loadPublicCatalog,getSession,signIn,signUp,signOut,listBusinesses,loadAdminData,createBusiness,syncSnapshot,queueSnapshotSync,replaceBusinessData,uploadImage,captureInteraction,listInteractions,updateInteractionStatus,slugify,
    loadPublicMenu:loadPublicCatalog,listRestaurants:listBusinesses,createRestaurant:createBusiness,replaceRestaurantData:replaceBusinessData};
})(window);
