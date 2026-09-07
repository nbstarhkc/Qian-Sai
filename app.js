(() => {
  'use strict';
  const {vendors,topics}=window.CONTEST;
  const tags=['视觉','AI','控制','处理器','EDA','音频','通信','开放'];
  const $=s=>document.querySelector(s);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const vendor=id=>vendors.find(v=>v.id===id), topic=id=>topics.find(t=>t.id===id);
  const list=a=>`<ul>${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
  const pdf=t=>`sources/${t.vendor}.pdf#page=${t.page}`;
  let comparison=[];
  try{comparison=JSON.parse(localStorage.getItem('fpga2026-compare')||'[]').filter(id=>topic(id)).slice(0,3)}catch{}
  let current=topics[0].id,selectedVendor='all',toastTimer;
  function notify(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2700)}
  function saveCompare(){try{localStorage.setItem('fpga2026-compare',JSON.stringify(comparison))}catch{}$('#compare-count').textContent=comparison.length}
  function filtered(){const q=$('#search').value.trim().toLocaleLowerCase();return topics.filter(t=>(selectedVendor==='all'||selectedVendor===t.vendor)&&($('#category').value==='all'||t.tags.includes($('#category').value))&&($('#topic-type').value==='all'||t.type===$('#topic-type').value)&&(!q||JSON.stringify(t).toLocaleLowerCase().includes(q)||vendor(t.vendor).name.toLocaleLowerCase().includes(q)))}
  function renderVendors(){
    $('#vendor-filters').innerHTML=`<button class="vendor-button ${selectedVendor==='all'?'active':''}" data-vendor="all" aria-pressed="${selectedVendor==='all'}">全部企业 <span class="count">24</span></button>`+vendors.map(v=>`<button class="vendor-button ${selectedVendor===v.id?'active':''}" data-vendor="${v.id}" style="--vendor:${v.color}" aria-pressed="${selectedVendor===v.id}"><span class="vendor-dot"></span>${v.name}<span class="count">${topics.filter(t=>t.vendor===v.id).length}</span></button>`).join('');
  }
  function renderList(){
    const rows=filtered();$('#results-count').textContent=`${rows.length} / 24 项`;
    if(!rows.some(t=>t.id===current))current=rows[0]?.id||null;
    $('#topic-list').innerHTML=rows.length?rows.map(t=>{const v=vendor(t.vendor);return `<div class="topic-row ${current===t.id?'active':''}" style="--vendor:${v.color}"><button class="topic-open" data-topic="${t.id}" ${current===t.id?'aria-current="true"':''}><span class="row-meta"><span class="vendor-dot"></span>${v.name}<span>· ${t.number}</span></span><span class="row-title">${esc(t.name)}</span></button><div class="row-bottom"><span class="row-tags">${t.tags.map(x=>`<span>${x}</span>`).join('')}</span><label class="compare-check"><input type="checkbox" data-compare="${t.id}" ${comparison.includes(t.id)?'checked':''} aria-label="对比：${esc(t.name)}">对比</label></div></div>`}).join(''):'<div class="empty">没有匹配的赛题</div>';
    renderDetail();
  }
  function renderScores(t){return t.scores?`<div class="score-chart" aria-label="官方评分权重">${t.scores.map(([name,value])=>`<div class="score-row"><span>${name}</span><div class="score-track"><div class="score-fill" style="--value:${value}%"></div></div><span class="score-value">${value}%</span></div>`).join('')}</div>`:''}
  function renderDetail(){
    const t=topic(current);
    if(!t){$('#topic-detail').innerHTML='<div class="empty"><h3>未找到匹配选题</h3><p>当前企业、技术方向或关键词没有对应结果。</p><button class="secondary" data-reset>重置筛选</button></div>';return}
    const v=vendor(t.vendor);
    $('#topic-detail').innerHTML=`
      <div class="detail-top"><div class="detail-title"><p class="detail-eyebrow"><span class="vendor-dot" style="--vendor:${v.color}"></span>${v.name}<span>${t.number}</span><span>${t.type}</span></p><h2>${esc(t.name)}</h2>${t.nameNote?`<p class="name-note">${esc(t.nameNote)}</p>`:''}</div><a class="cover-link" href="${pdf(t)}" target="_blank" rel="noopener" title="${v.name}官方指南"><img src="assets/${v.id}-cover.webp" alt="${v.name} 2026 官方选题指南封面" width="67" height="95"></a></div>
      <p class="summary">${esc(t.summary)}</p>
      <div class="detail-tools"><button class="primary ${comparison.includes(t.id)?'selected':''}" data-toggle-compare="${t.id}">${comparison.includes(t.id)?'已加入对比':'加入对比'}</button><button class="secondary" data-print>打印此题</button><a class="secondary" href="fulltext.html#${t.vendor}-${t.page}">逐页全文</a><a class="source-ref" href="${pdf(t)}" target="_blank" rel="noopener">官方 PDF · 第 ${t.page}${t.end!==t.page?'–'+t.end:''} 页 ↗</a></div>
      <div class="hardware"><span>平台 / 工具</span><p>${esc(t.hardware)}</p></div>
      <section class="flow-section"><div class="section-kicker">任务链路 · 归纳</div><ol class="flow">${t.flow.map((s,i)=>`<li><span class="step">0${i+1}</span>${esc(s)}</li>`).join('')}</ol></section>
      <aside class="caution"><h3>关键限制与易混淆点</h3>${list(t.cautions)}</aside>
      <section class="content-section"><h3><span class="section-index">01</span>基础任务与明确要求</h3><ol>${t.required.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></section>
      <div class="split-sections"><section class="content-section"><h3><span class="section-index">02</span>进阶、扩展与方向</h3>${list(t.advanced)}</section><section class="content-section"><h3><span class="section-index">03</span>交付与现场演示</h3>${list(t.submission)}</section></div>
      <section class="content-section"><h3><span class="section-index">04</span>评测指标${t.scores?'与官方权重':''}</h3>${renderScores(t)}${list(t.metrics)}</section>
      <aside class="advice"><h3>备赛建议 · 非官方要求</h3><p>${esc(t.advice)}</p></aside>
      <div class="bottom-source"><span>依据 ${v.name} 2026 指南 · 文件版本 ${v.date}</span><a href="${pdf(t)}" target="_blank" rel="noopener">核对原文 ↗</a></div>`;
  }
  function reset(){selectedVendor='all';$('#search').value='';$('#category').value='all';$('#topic-type').value='all';renderVendors();renderList()}
  function toggleCompare(id){
    if(comparison.includes(id))comparison=comparison.filter(x=>x!==id);else if(comparison.length>=3){notify('最多同时对比 3 项，请先移除一项。');renderList();return}else comparison.push(id);
    saveCompare();renderList();renderComparison();
  }
  function setView(name,updateHash=true){
    if(!['topics','matrix','compare','sources'].includes(name))name='topics';
    document.querySelectorAll('.view').forEach(el=>el.classList.toggle('active',el.id==='view-'+name));document.querySelectorAll('.tab').forEach(el=>{el.classList.toggle('active',el.dataset.view===name);if(el.dataset.view===name)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current')});
    if(name==='compare')renderComparison();
    if(updateHash)history.replaceState(null,'','#'+(name==='topics'&&current?current:name));
  }
  function openTopic(id,scroll=true){reset();current=id;renderList();setView('topics');if(scroll)$('#topic-detail').scrollIntoView({block:'start',behavior:'instant'})}
  function renderMatrix(){
    $('#distribution').innerHTML=vendors.map(v=>{const count=topics.filter(t=>t.vendor===v.id).length;return `<button data-distribution="${v.id}" style="--vendor:${v.color};--width:${count/5*100}%" title="查看${v.name}选题"><span class="distribution-label"><span>${v.name}</span><strong>${count} 项</strong></span><span class="bar"><i></i></span></button>`}).join('');
    $('#matrix-head').innerHTML=`<tr><th>企业</th><th>赛题 / 开放方向</th>${tags.map(tag=>`<th>${tag}</th>`).join('')}</tr>`;
    $('#matrix-body').innerHTML=topics.map(t=>{const v=vendor(t.vendor);return `<tr style="--vendor:${v.color}"><td>${v.name}</td><td><button data-jump="${t.id}">${esc(t.name)}</button></td>${tags.map(tag=>`<td>${t.tags.includes(tag)?`<span class="matrix-mark" aria-label="包含${tag}"></span>`:'<span aria-hidden="true" style="color:#c9d0d0">·</span>'}</td>`).join('')}</tr>`}).join('');
  }
  function renderComparison(){
    $('#compare-selectors').innerHTML=[0,1,2].map(i=>`<label><span>选题 ${i+1}</span><select data-compare-slot="${i}" aria-label="对比选题 ${i+1}"><option value="">未选择</option>${vendors.map(v=>`<optgroup label="${v.name}">${topics.filter(t=>t.vendor===v.id).map(t=>`<option value="${t.id}" ${comparison[i]===t.id?'selected':''} ${comparison.includes(t.id)&&comparison[i]!==t.id?'disabled':''}>${esc(t.name)}</option>`).join('')}</optgroup>`).join('')}</select></label>`).join('');
    $('#clear-compare').disabled=!comparison.length;
    if(!comparison.length){$('#comparison').innerHTML='<div class="compare-empty"><h3>尚未选定对比项</h3><p>选题 1 / 2 / 3：待定</p></div>';return}
    const entries=comparison.map(topic);
    const rows=[['核心目标',t=>esc(t.summary)],['平台 / 工具',t=>esc(t.hardware)],['基础要求',t=>list(t.required)],['关键限制',t=>list(t.cautions)],['评测指标',t=>list(t.metrics)+(t.scores?`<p>${t.scores.map(([x,n])=>x+' '+n+'%').join('；')}</p>`:'')],['交付物',t=>list(t.submission)],['工程建议',t=>esc(t.advice)],['官方依据',t=>`<a href="${pdf(t)}" target="_blank" rel="noopener">PDF 第 ${t.page}–${t.end} 页 ↗</a>`]];
    $('#comparison').innerHTML=`<div class="table-scroll"><table class="compare-table"><thead><tr><th>对比维度</th>${entries.map(t=>`<th><span>${vendor(t.vendor).name} · ${t.number}</span>${esc(t.name)}</th>`).join('')}</tr></thead><tbody>${rows.map(([name,render])=>`<tr><td>${name}</td>${entries.map(t=>`<td>${render(t)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function renderSources(){
    $('#source-grid').innerHTML=vendors.map(v=>`<article class="source-card"><img src="assets/${v.id}-cover.webp" alt="${v.name}官方指南封面" width="70" height="99" loading="lazy"><div><h3><span class="vendor-dot" style="--vendor:${v.color}"></span> ${v.name}</h3><p class="meta">${v.pages} 页 · ${topics.filter(t=>t.vendor===v.id).length} 项 · 文件版本 ${v.date}</p><p>${esc(v.boards)}</p><p class="support">技术交流：${esc(v.support)}</p><div class="source-actions"><a class="secondary" href="sources/${v.id}.pdf" target="_blank" rel="noopener">完整 PDF ↗</a><a class="secondary" href="fulltext.html#${v.id}-1">逐页全文</a><a class="secondary" href="fulltext/${v.id}.txt" download>全文 TXT</a></div></div></article>`).join('');
  }
  $('#category').insertAdjacentHTML('beforeend',tags.map(x=>`<option>${x}</option>`).join(''));
  $('#search').addEventListener('input',renderList);$('#category').addEventListener('change',renderList);$('#topic-type').addEventListener('change',renderList);$('#reset').addEventListener('click',reset);
  document.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.view){setView(b.dataset.view);window.scrollTo({top:0,behavior:'instant'})}
    if(b.dataset.vendor){selectedVendor=b.dataset.vendor;renderVendors();renderList()}
    if(b.dataset.topic){current=b.dataset.topic;renderList();history.replaceState(null,'','#'+current);if(window.innerWidth<=760)$('#topic-detail').scrollIntoView({block:'start',behavior:'instant'})}
    if(b.dataset.toggleCompare)toggleCompare(b.dataset.toggleCompare);
    if(b.hasAttribute('data-print'))window.print();
    if(b.hasAttribute('data-reset'))reset();
    if(b.dataset.jump)openTopic(b.dataset.jump);
    if(b.dataset.distribution){reset();selectedVendor=b.dataset.distribution;renderVendors();renderList();setView('topics');$('.filters').scrollIntoView({block:'start',behavior:'instant'})}
  });
  document.addEventListener('change',e=>{
    if(e.target.dataset.compare)toggleCompare(e.target.dataset.compare);
    if(e.target.dataset.compareSlot!==undefined){const i=Number(e.target.dataset.compareSlot),value=e.target.value;if(value&&comparison.includes(value)&&comparison[i]!==value){renderComparison();return}const next=[...comparison];next[i]=value;comparison=next.filter(Boolean);saveCompare();renderList();renderComparison()}
  });
  $('#clear-compare').addEventListener('click',()=>{comparison=[];saveCompare();renderList();renderComparison()});
  function readHash(){const value=decodeURIComponent(location.hash.slice(1));if(topic(value)){reset();current=value;renderList();setView('topics',false)}else setView(value||'topics',false)}
  window.addEventListener('hashchange',readHash);
  saveCompare();renderVendors();renderList();renderMatrix();renderSources();renderComparison();readHash();
})();
