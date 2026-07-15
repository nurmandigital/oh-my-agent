const state = { items: [], category: 'All', query: '', current: null, opener: null };
const $ = (selector) => document.querySelector(selector);
const categories = $('#categories');
const grid = $('#grid');
const empty = $('#empty');
const results = $('#results');
const workflowGuide = $('#workflow-guide');
const workflowPath = $('#workflow-path');

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

function workflowOrder(item) {
  const order = Number(item.metadata?.order);
  return Number.isFinite(order) ? order : 999;
}

function filteredItems() {
  const query = state.query.toLowerCase().trim();
  return state.items.filter((item) => {
    const categoryMatch = state.category === 'All' || item.kind === state.category;
    const queryMatch = !query || `${item.title} ${item.kind} ${item.path} ${item.description} ${item.metadata?.phase || ''}`.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  }).sort((a, b) => {
    if (a.kind === 'Workflows' && b.kind === 'Workflows') return workflowOrder(a) - workflowOrder(b);
    return a.title.localeCompare(b.title);
  });
}

function workflowDetails(item) {
  if (item.kind !== 'Workflows') return '';
  const metadata = item.metadata || {};
  const order = String(workflowOrder(item)).padStart(2, '0');
  return `<div class="workflow-meta"><span class="workflow-step">${order} · ${escapeHtml(metadata.phase || 'Workflow')}</span><span class="workflow-condition">${escapeHtml(metadata.condition || 'Use as needed')}</span></div><dl class="workflow-handoff"><div><dt>When</dt><dd>${escapeHtml(metadata.usage || 'Use as needed')}</dd></div><div><dt>Output</dt><dd>${escapeHtml(metadata.output || 'Project artifact')}</dd></div></dl>`;
}

function renderWorkflowGuide() {
  const visible = state.category === 'Workflows' && !state.query.trim();
  workflowGuide.hidden = !visible;
  if (!visible) return;
  const workflows = state.items.filter((item) => item.kind === 'Workflows').sort((a, b) => workflowOrder(a) - workflowOrder(b));
  workflowPath.innerHTML = workflows.map((item) => `<li><button type="button" data-guide-open="${escapeHtml(item.path)}"><b>${String(workflowOrder(item)).padStart(2, '0')}</b><span>${escapeHtml(item.metadata?.phase || item.title)}</span></button></li>`).join('');
  workflowPath.querySelectorAll('[data-guide-open]').forEach((button) => button.addEventListener('click', () => openViewer(button.dataset.guideOpen, button)));
}

function render() {
  const items = filteredItems();
  renderWorkflowGuide();
  results.textContent = `${items.length} / ${state.items.length} files`;
  empty.hidden = items.length > 0;
  grid.innerHTML = items.map((item, index) => `<article class="item${item.kind === 'Workflows' ? ' item-workflow' : ''}"><div class="item-top"><span class="item-kind">${escapeHtml(item.kind)}</span><span class="count">${item.kind === 'Workflows' ? String(workflowOrder(item)).padStart(2, '0') : String(index + 1).padStart(2, '0')}</span></div>${workflowDetails(item)}<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p><div class="item-actions"><button class="read-link" type="button" data-open="${escapeHtml(item.path)}">Read file →</button><button class="copy-button" type="button" data-copy="${escapeHtml(item.path)}">Copy</button></div></article>`).join('');
  grid.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => openViewer(button.dataset.open, button)));
  grid.querySelectorAll('[data-copy]').forEach((button) => button.addEventListener('click', () => copyItem(button.dataset.copy, button)));
}

function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char])); }
function findItem(path) { return state.items.find((item) => item.path === path); }
async function writeClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  if (!document.execCommand('copy')) throw new Error('Clipboard unavailable');
  textarea.remove();
}

async function copyItem(path, button) {
  const item = findItem(path);
  if (!item) return;
  const label = button.textContent;
  try {
    await writeClipboard(item.rawContent ?? item.content);
    button.textContent = 'Copied';
    button.dataset.status = 'success';
  } catch (error) {
    button.textContent = 'Copy failed';
    button.dataset.status = 'error';
    console.error(error);
  }
  setTimeout(() => {
    button.textContent = label;
    delete button.dataset.status;
  }, 1200);
}

function markdownForViewer(item) {
  const metadata = item.metadata || {};
  const name = metadata.name ? `<div class="file-meta-name">${escapeHtml(metadata.name)}</div>` : '';
  const description = metadata.description ? `<p class="file-meta-description">${escapeHtml(metadata.description)}</p>` : '';
  const meta = name || description ? `<section class="file-meta"><span class="file-meta-label">File metadata</span>${name}${description}</section>` : '';
  return `${meta}${DOMPurify.sanitize(marked.parse(item.content))}`;
}

function openViewer(path, opener) { const item = findItem(path); if (!item) return; state.current = item; state.opener = opener ?? document.activeElement; $('#viewer-title').textContent = item.title; $('#viewer-content').innerHTML = markdownForViewer(item); $('#viewer').classList.add('open'); $('#close-viewer').focus(); }
function closeViewer() { $('#viewer').classList.remove('open'); state.current = null; const opener = state.opener; state.opener = null; if (opener?.isConnected) opener.focus({ preventScroll: true }); }

$('#search').addEventListener('input', (event) => { state.query = event.target.value; render(); });
$('#close-viewer').addEventListener('click', closeViewer);
$('#copy-viewer').addEventListener('click', async (event) => {
  const button = event.currentTarget;
  if (!state.current) return;
  try {
    await writeClipboard(state.current.rawContent ?? state.current.content);
    button.textContent = 'Copied';
    button.dataset.status = 'success';
  } catch (error) {
    button.textContent = 'Copy failed';
    button.dataset.status = 'error';
    console.error(error);
  }
  setTimeout(() => {
    button.textContent = 'Copy markdown';
    delete button.dataset.status;
  }, 1200);
});
$('#viewer').addEventListener('click', (event) => { if (event.target.id === 'viewer') closeViewer(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeViewer(); });
init();
