
const WA='https://wa.me/5519974052115';const brl=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const km=n=>n.toLocaleString('pt-BR')+' km';
const card=c=>`<a class="card" href="/carro?id=${c.id}"><div class="ph">${c.foto?`<img src="${c.foto}" alt="${c.nome}" loading="lazy">`:'Foto em breve'}</div><div class="i">${c.exemplo?'<span class="tag">Exemplo</span><br>':''}<h3>${c.nome}</h3><div class="f">${c.ano} · ${km(c.km)} · ${c.tipo}</div><div class="p">${brl(c.preco)}</div></div></a>`;
fetch('/estoque.json').then(r=>r.json()).then(all=>{
 const ativos=all.filter(c=>c.status!=='vendido');
 const d=document.getElementById('destaque');if(d)d.innerHTML=ativos.slice(0,3).map(card).join('');
 const l=document.getElementById('lista');
 if(l){const q=document.getElementById('q'),t=document.getElementById('tipo'),v=document.getElementById('vazio');
  const draw=()=>{const s=q.value.toLowerCase(),r=ativos.filter(c=>c.nome.toLowerCase().includes(s)&&(!t.value||c.tipo===t.value));l.innerHTML=r.map(card).join('');v.hidden=r.length>0};
  q.oninput=t.onchange=draw;draw()}
 const o=document.getElementById('carro');
 if(o){const c=all.find(x=>x.id===new URLSearchParams(location.search).get('id'));
  if(!c){o.innerHTML='<h1>Carro não encontrado</h1><p><a class="link" href="/estoque">Ver o estoque</a></p>';return}
  document.title=c.nome+' · Fernando Multimarcas';
  const msg=encodeURIComponent('Olá! Tenho interesse no '+c.nome+' '+c.ano+' que vi no site.');
  o.innerHTML=`<div class="det"><div class="ph">${c.foto?`<img src="${c.foto}" alt="${c.nome}">`:'Fotos em breve'}</div><div>${c.status==='vendido'?'<span class="tag">Vendido</span>':''}<h1>${c.nome}</h1><p class="lead">${brl(c.preco)}</p><div class="ficha"><div><small>Ano</small><b>${c.ano}</b></div><div><small>Km</small><b>${km(c.km)}</b></div><div><small>Tipo</small><b>${c.tipo}</b></div></div><p>${c.descricao||''}</p>${c.status==='vendido'?'<a class="btn" href="/estoque">Ver carros parecidos</a>':`<a class="btn" href="${WA}?text=${msg}" target="_blank" rel="noopener">Tenho interesse</a>`}<p class="mut">Venda somente presencial.</p></div></div>`}
}).catch(()=>{});
