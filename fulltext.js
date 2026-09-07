(() => {
  'use strict';
  const pages = [...document.querySelectorAll('.pdf-page')];
  const select = document.getElementById('document-select');
  const search = document.getElementById('fulltext-search');
  const number = document.getElementById('page-number');
  const count = document.getElementById('page-count');
  const sourceNodes = [...document.querySelectorAll('.source-text,.verified-text')];
  const original = new Map(sourceNodes.map(node => [node, node.textContent]));
  const searchable = new Map(pages.map(page => [page, [...page.querySelectorAll('.source-text,.verified-text')].map(node => node.textContent.toLocaleLowerCase()).join('\n')]));
  let lastQuery = '';

  function highlight(query) {
    if (query === lastQuery) return;
    for (const node of sourceNodes) {
      const text = original.get(node);
      node.textContent = '';
      if (!query) { node.textContent = text; continue; }
      const lower = text.toLocaleLowerCase();
      let start = 0, position;
      while ((position = lower.indexOf(query, start)) !== -1) {
        node.append(document.createTextNode(text.slice(start, position)));
        const mark = document.createElement('mark');
        mark.textContent = text.slice(position, position + query.length);
        node.append(mark);
        start = position + query.length;
      }
      node.append(document.createTextNode(text.slice(start)));
    }
    lastQuery = query;
  }

  function filter() {
    const query = search.value.trim().toLocaleLowerCase();
    highlight(query);
    let visible = 0, total = 0;
    for (const page of pages) {
      const matchesVendor = select.value === 'all' || page.dataset.vendor === select.value;
      if (matchesVendor) total++;
      page.hidden = !matchesVendor || !searchable.get(page).includes(query);
      if (!page.hidden) {
        visible++;
        if (query && page.querySelector('.verified-text mark')) page.querySelector('.page-images').open = true;
      }
    }
    number.max = total;
    number.disabled = select.value === 'all';
    document.querySelector('#reader-tools button').disabled = select.value === 'all';
    count.textContent = `${visible} / ${total} 页`;
    document.getElementById('no-results').hidden = visible !== 0;
  }

  function openPage(page) {
    if (!page) return;
    select.value = page.dataset.vendor;
    search.value = '';
    number.value = page.dataset.page;
    filter();
    page.scrollIntoView({block: 'start'});
  }

  select.addEventListener('change', () => { number.value = 1; filter(); });
  search.addEventListener('input', filter);
  document.getElementById('reader-tools').addEventListener('submit', event => {
    event.preventDefault();
    const selected = select.value;
    const index = Number(number.value);
    const page = pages.find(item => item.dataset.vendor === selected && Number(item.dataset.page) === index);
    if (page) {
      history.replaceState(null, '', '#' + page.id);
      openPage(page);
    }
  });
  function readHash() {
    const id = location.hash.slice(1);
    openPage(pages.find(page => page.id === id));
  }
  window.addEventListener('hashchange', readHash);
  filter();
  readHash();
})();
