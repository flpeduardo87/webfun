const $=(q,s=document)=>s.querySelector(q);const $$=(q,s=document)=>[...s.querySelectorAll(q)];
const toast=(m)=>{let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)};
$('.menu-btn')?.addEventListener('click',()=>$('.nav-links')?.classList.toggle('open'));
$$('form[data-demo-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();toast('Mensagem recebida. Demonstração WebFun.');f.reset()}));
$$('[data-demo-action]').forEach(b=>b.addEventListener('click',()=>toast(b.dataset.demoAction||'Ação registrada na demonstração.')));
