(function() {
  'use strict';

  var agentsData = [
    { name: 'Code Reviewer', desc: 'Review kualitas kode, correctness, maintainability, dan design patterns. Gunakan saat PR atau sebelum merge.', tag: 'Code Quality', file: 'code-reviewer.md' },
    { name: 'Security Auditor', desc: 'Audit keamanan: secrets, dependencies, input validation, dan threat modeling. Gunakan pre-release atau untuk area berisiko.', tag: 'Security', file: 'security-auditor.md' },
    { name: 'Test Engineer', desc: 'Strategi testing, coverage gap analysis, dan risk-based test planning. Gunakan sebelum implementasi atau pre-release.', tag: 'Testing', file: 'test-engineer.md' },
    { name: 'Architect', desc: 'Evaluasi arsitektur, trade-off matrix, ADR, dan evolution roadmap. Gunakan saat desain sistem baru atau redesign.', tag: 'Architecture', file: 'architect.md' },
    { name: 'Performance Auditor', desc: 'Identifikasi bottleneck, analisis latency, dan rekomendasi optimasi. Gunakan pre-release atau saat ada isu performa.', tag: 'Performance', file: 'performance-auditor.md' }
  ];

  var phases = [
    { id: 'prd-generation', node: 'prd-generation' },
    { id: 'architecture-generation', node: 'architecture-generation' },
    { id: 'design-generation', node: 'design-generation' },
    { id: 'security-planning', node: 'security-planning' },
    { id: 'testing-planning', node: 'testing-planning' },
    { id: 'task-list-generation', node: 'task-list-generation' },
    { id: 'task-instruction', node: 'task-instruction' },
    { id: 'code-review-workflow', node: 'code-review-workflow' },
    { id: 'deployment-workflow', node: 'deployment-workflow' }
  ];

  function loadStats() {
    var statsCache = sessionStorage.getItem('dashboard-stats');
    if (statsCache) {
      renderStats(JSON.parse(statsCache));
      renderAgents();
      return;
    }

    fetch('data/catalog.json')
      .then(function(r) { if (!r.ok) throw new Error('Failed to load catalog'); return r.json(); })
      .then(function(data) {
        var workflows = data.filter(function(e) { return e.type === 'workflow' || e.kind === 'workflow'; });
        var templates = data.filter(function(e) { return e.type === 'template' || e.kind === 'template'; });
        var agents = data.filter(function(e) { return e.type === 'agent' || e.kind === 'agent'; });
        var total = data.length;

        var stats = {
          total: total,
          workflows: workflows.length || '—',
          templates: templates.length || '—',
          agents: agents.length || '—'
        };

        sessionStorage.setItem('dashboard-stats', JSON.stringify(stats));
        renderStats(stats);
        renderAgents();
      })
      .catch(function() {
        // Fallback if catalog.json fails
        document.getElementById('stat-files').textContent = '41+';
        document.getElementById('stat-workflows').textContent = '11';
        document.getElementById('stat-templates').textContent = '8';
        document.getElementById('stat-agents').textContent = '5';
        renderAgents();
      });
  }

  function renderStats(stats) {
    document.getElementById('stat-files').textContent = stats.total || '41+';
    document.getElementById('stat-workflows').textContent = stats.workflows || '11';
    document.getElementById('stat-templates').textContent = stats.templates || '8';
    document.getElementById('stat-agents').textContent = stats.agents || '5';
  }

  function renderAgents() {
    var container = document.getElementById('agent-list');
    if (!container) return;
    container.innerHTML = agentsData.map(function(a) {
      return '<div class="d-agent">' +
        '<span class="d-agent-tag">' + esc(a.tag) + '</span>' +
        '<h3>' + esc(a.name) + '</h3>' +
        '<p>' + esc(a.desc) + '</p>' +
        '<a class="d-agent-link" href="https://github.com/nurmandigital/oh-my-agent/tree/develop/agents/' + esc(a.file) + '" target="_blank" rel="noopener noreferrer">View persona →</a>' +
        '</div>';
    }).join('');
  }

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function initLifecycle() {
    var nodes = document.querySelectorAll('.d-flow-node');
    nodes.forEach(function(node) {
      node.addEventListener('click', function() {
        var ref = this.getAttribute('data-ref');
        if (ref) {
          window.location.href = 'catalog.html?search=' + encodeURIComponent(ref);
        }
      });
    });
  }

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadStats();
      initLifecycle();
    });
  } else {
    loadStats();
    initLifecycle();
  }

})();
