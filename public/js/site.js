
const WA='https://wa.me/5519974052115';const brl=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const km=n=>n.toLocaleString('pt-BR')+' km';const $=id=>document.getElementById(id);
const go=t=>window.open(WA+'?text='+encodeURIComponent(t),'_blank','noopener');
const cn=document.getElementById('cookie-notice');
if(cn){try{if(localStorage.getItem('fm-aviso-v1')==='ok')cn.hidden=true}catch(e){}
document.getElementById('cookie-close').onclick=()=>{cn.hidden=true;try{localStorage.setItem('fm-aviso-v1','ok')}catch(e){}};
document.querySelectorAll('[data-cookie-open]').forEach(b=>b.onclick=()=>{cn.hidden=false;document.getElementById('cookie-close').focus()})}
document.querySelectorAll('.mapa').forEach(m=>{const b=m.querySelector('button');if(b)b.onclick=()=>{const f=document.createElement('iframe');f.src=m.dataset.src;f.title='Mapa da Fernando Multimarcas';f.referrerPolicy='no-referrer-when-downgrade';m.replaceChildren(f)}});
document.querySelectorAll('.timeline-event').forEach((e,i)=>{e.style.gridColumn=(i+1)});
const dl=document.createElement('dialog');dl.innerHTML='<img alt=""><p></p>';document.body.append(dl);dl.onclick=()=>dl.close();
document.querySelectorAll('[data-photo]').forEach(a=>a.onclick=e=>{e.preventDefault();dl.querySelector('img').src=a.href;dl.querySelector('p').textContent=a.dataset.caption||'';dl.showModal()});
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button').forEach(x=>x.setAttribute('aria-selected',x===b));document.querySelectorAll('.panel [data-p]').forEach(p=>p.hidden=p.dataset.p!==b.dataset.t)});
const bf=$('busca');if(bf)bf.onsubmit=e=>{e.preventDefault();const p=new URLSearchParams();[['q','hq'],['tipo','ht'],['max','hm'],['ano','ha']].forEach(([k,i])=>{if($(i).value)p.set(k,$(i).value)});location.href='/estoque'+(p.toString()?'?'+p:'')};
let sv=[];try{sv=JSON.parse(localStorage.getItem('fm-buscas')||'[]')}catch(e){}
const rs=()=>{const s=$('salvas');if(s)s.innerHTML=sv.map(t=>'<span>'+t.replace(/</g,'&lt;')+'</span>').join('')};rs();
const al=$('alerta');if(al)al.onsubmit=e=>{e.preventDefault();const v=$('aq').value.trim();if(!v)return;sv=[v,...sv.filter(x=>x!==v)].slice(0,5);try{localStorage.setItem('fm-buscas',JSON.stringify(sv))}catch(e){}rs();go('Olá! Quero ser avisado quando chegar este carro: '+v)};
const vl=$('valor');if(vl)vl.onsubmit=e=>{e.preventDefault();go('Olá! Quero avaliar meu carro para consignação. Modelo: '+$('vm').value+'. Ano: '+$('va').value+'. Km: '+$('vk').value+'.')};
const card=c=>`<a class="card" href="/carro?id=${c.id}"><div class="ph">${c.foto?`<img src="${c.foto}" alt="${c.nome}" loading="lazy">`:'Foto em breve'}</div><div class="i">${c.exemplo?'<span class="tag">Exemplo</span><br>':''}<h3>${c.nome}</h3><div class="f">${c.ano} · ${km(c.km)} · ${c.tipo}</div><div class="p">${brl(c.preco)}</div></div></a>`;
fetch('/estoque.json').then(r=>r.json()).then(all=>{
 const demo=location.search.includes('demo=1');const ativos=all.filter(c=>c.status!=='vendido'&&(!c.exemplo||demo));
 const d=$('destaque');if(d){d.innerHTML=ativos.slice(0,3).map(card).join('');if(!ativos.length)d.closest('section').hidden=true}
 const l=$('lista');
 if(l){const U=new URLSearchParams(location.search),q=$('q'),t=$('et'),m=$('em'),a=$('ea'),v=$('vazio');
  q.value=U.get('q')||'';t.value=U.get('tipo')||'';m.value=U.get('max')||'';a.value=U.get('ano')||'';
  const draw=()=>{const w=q.value.toLowerCase().split(/\s+/).filter(Boolean);const r=ativos.filter(c=>{const h=(c.nome+' '+c.tipo+' '+c.ano+' '+(c.descricao||'')).toLowerCase();return w.every(x=>h.includes(x))&&(!t.value||c.tipo===t.value)&&(!m.value||c.preco<=+m.value)&&(!a.value||c.ano>=+a.value)});l.innerHTML=r.map(card).join('');v.hidden=r.length>0};
  q.oninput=t.onchange=m.onchange=a.onchange=draw;draw()}
 const o=$('carro');
 if(o){const c=all.find(x=>x.id===new URLSearchParams(location.search).get('id'));
  if(!c){o.innerHTML='<h1>Carro não encontrado</h1><p><a class="link" href="/estoque">Ver o estoque</a></p>';return}
  document.title=c.nome+' · Fernando Multimarcas';
  const msg=encodeURIComponent('Olá! Tenho interesse no '+c.nome+' '+c.ano+' que vi no site.');
  o.innerHTML=`<div class="det"><div class="ph">${c.foto?`<img src="${c.foto}" alt="${c.nome}">`:'Fotos em breve'}</div><div>${c.status==='vendido'?'<span class="tag">Vendido</span>':''}<h1>${c.nome}</h1><p class="lead">${brl(c.preco)}</p><div class="ficha"><div><small>Ano</small><b>${c.ano}</b></div><div><small>Km</small><b>${km(c.km)}</b></div><div><small>Tipo</small><b>${c.tipo}</b></div></div><p>${c.descricao||''}</p>${c.status==='vendido'?'<a class="btn" href="/estoque">Ver carros parecidos</a>':`<a class="btn" href="${WA}?text=${msg}" target="_blank" rel="noopener">Tenho interesse</a>`}<p class="mut">Venda somente presencial.</p></div></div>`}
}).catch(()=>{});
