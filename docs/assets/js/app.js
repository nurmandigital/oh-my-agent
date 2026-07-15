const state = { items: [], category: 'All', query: '', current: null };
const $ = (selector) => document.querySelector(selector);
const categories = $('#categories');
const grid = $('#grid');
const empty = $('#empty');
const results = $('#results');

async function init() {
  try {
    const response = await fetch('data/catalog.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.items = await response.json();
    $('#total-count').textContent = state.items.length;
    renderCategories();
    render();
  } catch (error) {
    results.textContent = 'Catalog unavailable';
    empty.hidden = false;
    empty.textContent = 'Catalog belum tersedia. Jalankan scripts/build-catalog.ps1 terlebih dahulu.';
    console.error(error);
  }
}

function renderCategories() {
  const counts = state.items.reduce((all, item) => ({ ...all, [item.kind]: (all[item.kind] || 0) + 1 }), {});
  const names = ['All', ...Object.keys(counts).sort()];
  categories.innerHTML = names.map((name) => `<button class="category-button${name === state.category ? ' active' : ''}" type="button" data-category="${name}"><span>${name}</span><span class="count">${name === 'All' ? state.items.length : counts[name]}</span></button>`).join('');
  categories.querySelectorAll('[data-category]').forEach((button) => button.addEventListener('click', () => {
    state.category = button.dataset.category;
    renderCategories();
    render();
  }));
}

function filteredItems() {
  const query = state.query.toLowerCase().trim();
  return state.items.filter((item) => {
    const categoryMatch = state.category === 'All' || item.kind === state.category;
    const queryMatch = !query || `${item.title} ${item.kind} ${item.path} ${item.description}`.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });
}

function render() {
  const items = filteredItems();
  results.textContent = `${items.length} / ${state.items.length} files`;
  empty.hidden = items.length > 0;
  grid.innerHTML = items.map((item, index) => `<article class="item"><div class="item-top"><span class="item-kind">${escapeHtml(item.kind)}</span><span class="count">${String(index + 1).padStart(2, '0')}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p><div class="item-actions"><button class="read-link" type="button" data-open="${escapeHtml(item.path)}">Read file →</button><button class="copy-button" type="button" data-copy="${escapeHtml(item.path)}">Copy</button></div></article>`).join('');
  grid.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => openViewer(button.dataset.open)));
  grid.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', () => copyItem(button.dataset.copy, button)));
}

function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char])); }
function findItem(path) { return state.items.find((item) => item.path === path); }
async function copyItem(path, button) { const item = findItem(path); if (!item) return; await navigator.clipboard.writeText(item.content); const label = button.textContent; button.textContent = 'Copied'; setTimeout(() => { button.textContent = label; }, 1200); }
function openViewer(path) { const item = findItem(path); if (!item) return; state.current = item; $('#viewer-title').textContent = item.title; $('#viewer-content').textContent = item.content; $('#viewer').classList.add('open'); $('#close-viewer').focus(); document.body.style.overflow = 'hidden'; }
function closeViewer() { $('#viewer').classList.remove('open'); document.body.style.overflow = ''; state.current = null; }

$('#search').addEventListener('input', (event) => { state.query = event.target.value; render(); });
$('#close-viewer').addEventListener('click', closeViewer);
$('#copy-viewer').addEventListener('click', async (event) => { if (!state.current) return; await navigator.clipboard.writeText(state.current.content); event.currentTarget.textContent = 'Copied'; setTimeout(() => { event.currentTarget.textContent = 'Copy markdown'; }, 1200); });
$('#viewer').addEventListener('click', (event) => { if (event.target.id === 'viewer') closeViewer(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeViewer(); });
init();
