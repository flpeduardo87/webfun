const $=(q,s=document)=>s.querySelector(q), $$=(q,s=document)=>[...s.querySelectorAll(q)], D=window.ATRIO_DATA;
function toast(m){const t=$('.toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2000)}
$$('.side-nav button[data-view]').forEach(b=>b.onclick=()=>{$$('.side-nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');$$('.app-section').forEach(s=>s.classList.remove('active'));$('#'+b.dataset.view).classList.add('active');$('.topbar h2').textContent=b.textContent.trim()});
function pill(s){return s.includes('Prazo')?'status-amber':s.includes('Audiência')?'status-blue':s.includes('Aguardando')?'status-gray':'status-green'}
function renderTable(list=D.processos){const body=$('#processTable');if(!body)return;body.innerHTML=list.map(p=>`<tr><td><b>${p.id}</b></td><td>${p.cliente}</td><td>${p.area}</td><td>${p.responsavel}</td><td><span class="status-pill ${pill(p.status)}">${p.status}</span></td><td>${p.proxima}</td></tr>`).join('')}
renderTable();
function filter(){const q=($('#searchProcess')?.value||'').toLowerCase(),st=$('#statusFilter')?.value||'';renderTable(D.processos.filter(p=>(!q||Object.values(p).join(' ').toLowerCase().includes(q))&&(!st||p.status===st)))}
$('#searchProcess')?.addEventListener('input',filter);$('#statusFilter')?.addEventListener('change',filter);
$$('[data-admin-action]').forEach(b=>b.onclick=()=>toast(b.dataset.adminAction));
