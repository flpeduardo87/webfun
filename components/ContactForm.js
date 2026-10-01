'use client';

import { ArrowLeft, ArrowRight, Check, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { site } from '../lib/data';
import { trackEvent } from './Analytics';

const types=['Site institucional','Loja virtual','Sistema sob medida','Landing page','Automação / IA','Quero entender primeiro'];
const moments=['Preciso começar do zero','Quero redesenhar algo existente','Tenho uma operação para organizar','Tenho uma ideia e quero validar'];

export default function ContactForm(){
 const [step,setStep]=useState(1);
 const [sent,setSent]=useState(false);
 const [sending,setSending]=useState(false);
 const [error,setError]=useState('');
 const [lastUrl,setLastUrl]=useState(site.whatsapp);
 const [data,setData]=useState({type:'',moment:'',description:'',name:'',company:'',email:'',phone:''});
 const set=(k,v)=>setData(p=>({...p,[k]:v}));
 const submit=async(e)=>{
   e.preventDefault();
   if(sending) return;
   const form=e.currentTarget;
   const website=String(new FormData(form).get('website')||'');
   const payload={...data,website,page:window.location.pathname};
   const message=`Olá, Webfun! Quero conversar sobre um projeto.\n\n*Tipo:* ${data.type}\n*Momento:* ${data.moment}\n*Contexto:* ${data.description}\n\n*Nome:* ${data.name}\n*Empresa:* ${data.company || '—'}\n*E-mail:* ${data.email}\n*WhatsApp:* ${data.phone || '—'}`;
   const url=`${site.whatsapp}?text=${encodeURIComponent(message)}`;
   setLastUrl(url);
   setSending(true);
   setError('');
   window.open(url,'_blank','noopener,noreferrer');
   // O handoff para o WhatsApp é o canal principal — a tela de sucesso não
   // depende da API. O POST abaixo é registro best-effort (webhook/arquivo, se
   // configurados) e nunca bloqueia nem mostra erro ao visitante.
   trackEvent('contact_submit',{project_type:data.type,project_moment:data.moment});
   setSent(true);
   fetch('/api/contact',{
     method:'POST',
     headers:{'content-type':'application/json'},
     body:JSON.stringify(payload),
     keepalive:true,
   }).catch(()=>{});
 };
 if(sent)return <div className="v4-form-success"><i><Check size={20}/></i><h3>Conversa preparada.</h3><p>Abrimos o WhatsApp com o contexto preenchido. Se a janela não abriu, use o botão abaixo.</p><a className="v4-form-whatsapp" href={lastUrl} target="_blank" rel="noreferrer">Abrir WhatsApp <MessageCircle size={17}/></a><button onClick={()=>{setSent(false);setSending(false);setStep(1)}}>Enviar outro contexto</button></div>;
 return <form className="v4-contact-form" onSubmit={submit} noValidate={false}><div className="v4-form-progress"><span>0{step}</span><div><i style={{width:`${step/3*100}%`}}/></div><small>03</small></div>
 {step===1&&<div className="v4-form-step"><span className="v4-tag">01 · Contexto</span><h3>O que você quer construir?</h3><p>Escolha a opção mais próxima. Não precisa chegar com o escopo pronto.</p><div className="v4-choice-grid">{types.map(x=><button type="button" className={data.type===x?'is-selected':''} onClick={()=>set('type',x)} key={x}>{x}<span>{data.type===x?<Check size={14}/>:<ArrowRight size={14}/>}</span></button>)}</div><button className="v4-form-next" type="button" disabled={!data.type} onClick={()=>{trackEvent('contact_form_step',{step:2});setStep(2)}}>Continuar <ArrowRight size={17}/></button></div>}
 {step===2&&<div className="v4-form-step"><span className="v4-tag">02 · Cenário</span><h3>Em que momento o projeto está?</h3><p>Isso ajuda a entender de onde a conversa precisa partir.</p><div className="v4-choice-grid">{moments.map(x=><button type="button" className={data.moment===x?'is-selected':''} onClick={()=>set('moment',x)} key={x}>{x}<span>{data.moment===x?<Check size={14}/>:<ArrowRight size={14}/>}</span></button>)}</div><label className="v4-field"><span>Conte um pouco mais</span><textarea required value={data.description} onChange={e=>set('description',e.target.value)} placeholder="Objetivo, problema, referência, prazo ou qualquer contexto útil."/></label><div className="v4-form-nav"><button type="button" onClick={()=>setStep(1)}><ArrowLeft size={16}/> Voltar</button><button type="button" disabled={!data.moment||!data.description.trim()} onClick={()=>{trackEvent('contact_form_step',{step:3});setStep(3)}}>Continuar <ArrowRight size={17}/></button></div></div>}
 {step===3&&<div className="v4-form-step"><span className="v4-tag">03 · Contato</span><h3>Como falamos com você?</h3><p>Preencha seus dados e a conversa já começa com contexto.</p><div className="v4-field-grid"><label className="v4-field"><span>Nome *</span><input required autoComplete="name" value={data.name} onChange={e=>set('name',e.target.value)} placeholder="Seu nome"/></label><label className="v4-field"><span>Empresa</span><input autoComplete="organization" value={data.company} onChange={e=>set('company',e.target.value)} placeholder="Nome da empresa"/></label><label className="v4-field"><span>E-mail *</span><input required autoComplete="email" type="email" value={data.email} onChange={e=>set('email',e.target.value)} placeholder="voce@empresa.com.br"/></label><label className="v4-field"><span>WhatsApp</span><input autoComplete="tel" inputMode="tel" value={data.phone} onChange={e=>set('phone',e.target.value)} placeholder="(47) 99999-9999"/></label></div><label className="v7-honeypot" aria-hidden="true">Não preencher<input name="website" tabIndex="-1" autoComplete="off"/></label><p className="v7-form-privacy">Ao enviar, seus dados serão usados apenas para responder ao seu contato, conforme nossa <a href="/politica-de-privacidade">Política de Privacidade</a>.</p>{error&&<p className="v7-form-error" role="alert">{error}</p>}<div className="v4-form-nav"><button type="button" onClick={()=>setStep(2)}><ArrowLeft size={16}/> Voltar</button><button type="submit" disabled={sending}>{sending?'Registrando...':'Conversar no WhatsApp'} {!sending&&<MessageCircle size={17}/>}</button></div></div>}
 </form>;
}
