const MATCH={
  keys:{members:'match_members_v3',bookings:'match_bookings_v3',courts:'match_courts_v3',events:'match_events_v3',leads:'match_leads_v3',invoices:'match_invoices_v3'},
  get(k,fb=[]){try{return JSON.parse(localStorage.getItem(k))||fb}catch(e){return fb}},
  set(k,v){localStorage.setItem(k,JSON.stringify(v))},
  toast(m){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)},
  id(p='MT'){return p+'-'+Math.random().toString(36).slice(2,7).toUpperCase()},
  dateISO(d=new Date()){return d.toISOString().slice(0,10)},
  money(v){return new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(v)||0)}
};
function seed(){
 if(!localStorage.getItem(MATCH.keys.members)) MATCH.set(MATCH.keys.members,[
  {id:'MBR-2048',name:'Marina Costa',email:'marina@example.com',phone:'(11) 99999-3040',plan:'MATCH Full',status:'active',since:'2024-03-12'},
  {id:'MBR-1981',name:'Rafael Moura',email:'rafael@example.com',phone:'(11) 98888-1010',plan:'Racquet',status:'active',since:'2024-01-20'},
  {id:'MBR-2190',name:'Luiza Campos',email:'luiza@example.com',phone:'(11) 97777-9001',plan:'Family',status:'active',since:'2025-08-04'}]);
 if(!localStorage.getItem(MATCH.keys.courts)) MATCH.set(MATCH.keys.courts,[
  {id:'C1',name:'Central Court',sport:'Tênis',surface:'Saibro',status:'active'},
  {id:'C2',name:'Court 02',sport:'Tênis',surface:'Saibro',status:'active'},
  {id:'C3',name:'Court 03',sport:'Tênis',surface:'Hard',status:'active'},
  {id:'C4',name:'Arena 01',sport:'Beach Tennis',surface:'Areia',status:'active'},
  {id:'C5',name:'Arena 02',sport:'Beach Tennis',surface:'Areia',status:'active'},
  {id:'C6',name:'Padel One',sport:'Padel',surface:'Sintético',status:'maintenance'}]);
 let today=new Date(), tomorrow=new Date(today);tomorrow.setDate(today.getDate()+1);let day2=new Date(today);day2.setDate(today.getDate()+2);
 if(!localStorage.getItem(MATCH.keys.bookings)) MATCH.set(MATCH.keys.bookings,[
  {id:'RSV-DEMO1',memberId:'MBR-2048',member:'Marina Costa',email:'marina@example.com',courtId:'C1',court:'Central Court',sport:'Tênis',date:MATCH.dateISO(tomorrow),time:'19:00',status:'confirmed',createdAt:new Date().toISOString()},
  {id:'RSV-DEMO2',memberId:'MBR-1981',member:'Rafael Moura',email:'rafael@example.com',courtId:'C4',court:'Arena 01',sport:'Beach Tennis',date:MATCH.dateISO(day2),time:'18:00',status:'confirmed',createdAt:new Date().toISOString()}]);
 if(!localStorage.getItem(MATCH.keys.events)) MATCH.set(MATCH.keys.events,[
  {id:'EV1',title:'Sunset Doubles',type:'Torneio social',date:'2026-09-05',time:'16:00',image:'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=84',status:'published',description:'Duplas, música e confraternização no fim da tarde.'},
  {id:'EV2',title:'Clinic com convidados',type:'Clínica técnica',date:'2026-09-12',time:'09:00',image:'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=84',status:'published',description:'Manhã de técnica, drills e leitura de jogo.'},
  {id:'EV3',title:'Recovery Saturday',type:'Wellness',date:'2026-09-19',time:'08:30',image:'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=84',status:'published',description:'Mobilidade, recovery e café da manhã no jardim.'}]);
 if(!localStorage.getItem(MATCH.keys.leads)) MATCH.set(MATCH.keys.leads,[]);
 if(!localStorage.getItem(MATCH.keys.invoices)) MATCH.set(MATCH.keys.invoices,[{id:'INV-2048-09',memberId:'MBR-2048',label:'Mensalidade Setembro',amount:690,due:'2026-09-10',status:'pending'}]);
}
seed();

document.querySelectorAll('.menu-toggle').forEach(b=>b.addEventListener('click',()=>{document.querySelector('.nav-links')?.classList.toggle('open')}));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

document.querySelectorAll('[data-quick-book]').forEach(b=>b.addEventListener('click',()=>{let sport=document.querySelector('#quickSport')?.value||'Tênis',date=document.querySelector('#quickDate')?.value||'';location.href='agenda.html?sport='+encodeURIComponent(sport)+'&date='+encodeURIComponent(date)}));
let qd=document.querySelector('#quickDate');if(qd){let d=new Date();d.setDate(d.getDate()+1);qd.min=MATCH.dateISO();qd.value=MATCH.dateISO(d)}

document.querySelectorAll('.lead-form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();let data=Object.fromEntries(new FormData(f));let leads=MATCH.get(MATCH.keys.leads);leads.unshift({id:MATCH.id('LED'),...data,status:'new',createdAt:new Date().toISOString()});MATCH.set(MATCH.keys.leads,leads);MATCH.toast('Recebemos seus dados. Nossa equipe entrará em contato.');f.reset()}));

function renderEvents(){let el=document.querySelector('#eventGrid');if(!el)return;let ev=MATCH.get(MATCH.keys.events).filter(x=>x.status==='published');el.innerHTML=ev.map(x=>`<article class="event-card reveal visible"><img src="${x.image}" alt="${x.title}" loading="lazy"><div class="content-pad"><span class="event-date">${new Date(x.date+'T12:00:00').toLocaleDateString('pt-BR')} · ${x.time}</span><h3>${x.title}</h3><p>${x.description}</p><div class="content-meta"><span class="badge">${x.type}</span></div><button class="btn btn-outline btn-sm" data-event-interest="${x.id}">Tenho interesse</button></div></article>`).join('');el.querySelectorAll('[data-event-interest]').forEach(b=>b.addEventListener('click',()=>{let x=ev.find(a=>a.id===b.dataset.eventInterest);let leads=MATCH.get(MATCH.keys.leads);leads.unshift({id:MATCH.id('LED'),name:'Interesse em evento',email:'',phone:'',interest:x.title,status:'new',createdAt:new Date().toISOString()});MATCH.set(MATCH.keys.leads,leads);MATCH.toast('Interesse registrado para demonstração.')}))}
renderEvents();
