/* ── js/dict.js ── Dictionnaire + Tableau de bord ── */
'use strict';

/* ════════════════════════════════════════════
   DICTIONNAIRE
════════════════════════════════════════════ */
const DictScreen = (() => {

  let allWords = [];
  let filterModule = 'all';
  let searchQuery = '';

  function render() {
    allWords = Storage.getDictionary();
    renderFilters();
    renderList();
  }

  function renderFilters() {
    const bar = document.getElementById('dict-filter-row');
    const modules = [...new Set(allWords.map(w => w.moduleId).filter(Boolean))].sort((a,b) => a-b);
    bar.innerHTML = `<button class="dict-filter-btn active" data-filter="all">Tout (${allWords.length})</button>` +
      modules.map(m => {
        const count = allWords.filter(w => w.moduleId === m).length;
        return `<button class="dict-filter-btn" data-filter="${m}">Module ${m} (${count})</button>`;
      }).join('');

    bar.querySelectorAll('.dict-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        bar.querySelectorAll('.dict-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterModule = btn.dataset.filter;
        renderList();
      });
    });
  }

  function renderList() {
    const el = document.getElementById('dict-list');
    const countEl = document.getElementById('dict-count');

    let words = filterModule === 'all' ? allWords : allWords.filter(w => String(w.moduleId) === String(filterModule));
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      words = words.filter(w =>
        w.fr.toLowerCase().includes(q) ||
        w.ru.toLowerCase().includes(q) ||
        (w.pron || '').toLowerCase().includes(q)
      );
    }

    countEl.textContent = `${words.length} mot${words.length !== 1 ? 's' : ''}`;

    if (!words.length) {
      el.innerHTML = `<div class="empty-state">
        <div class="empty-icon">${allWords.length ? '🔍' : '📚'}</div>
        <h3>${allWords.length ? 'Aucun résultat' : 'Dictionnaire vide'}</h3>
        <p>${allWords.length ? 'Essayez un autre terme.' : 'Ajoutez des mots depuis les leçons avec le bouton <strong>+</strong>.'}</p>
      </div>`;
      return;
    }

    el.innerHTML = words.map(w => `
      <div class="dict-entry" data-fr="${enc(w.fr)}">
        <div class="dict-entry-header">
          <div>
            <div class="dict-fr">${esc(w.fr)}</div>
            <div class="dict-pron">${esc(w.pron || '')}</div>
          </div>
          <div class="dict-ru">${esc(w.ru)}</div>
          ${w.lessonId ? `<span class="dict-lesson-chip">L${w.lessonId}</span>` : ''}
          <span class="dict-chevron">▾</span>
        </div>
        <div class="dict-entry-body">
          ${w.exFr ? `<div class="dict-example-fr">🇫🇷 ${esc(w.exFr)}</div>` : ''}
          ${w.exRu ? `<div class="dict-example-ru">🇷🇺 ${esc(w.exRu)}</div>` : ''}
          ${w.double ? `<div class="dict-double">⚠️ ${esc(w.double)}</div>` : ''}
          ${w.defRu ? `<div class="dict-def-ru">📖 ${esc(w.defRu)}</div>` : ''}
          <div class="dict-speak-row">
            <button class="speak-btn" data-word="${enc(w.fr)}" title="Écouter">🔊</button>
          </div>
        </div>
      </div>`
    ).join('');

    // Accordion
    el.querySelectorAll('.dict-entry').forEach(entry => {
      entry.querySelector('.dict-entry-header').addEventListener('click', () => {
        entry.classList.toggle('expanded');
      });
    });

    // TTS
    el.querySelectorAll('.speak-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const word = btn.dataset.word;
        if (btn.classList.contains('speaking')) { TTS.stop(); btn.classList.remove('speaking'); return; }
        document.querySelectorAll('.speak-btn.speaking').forEach(b => b.classList.remove('speaking'));
        btn.classList.add('speaking');
        TTS.speak(word, null, () => btn.classList.remove('speaking'));
      });
    });
  }

  function init() {
    const searchInput = document.getElementById('dict-search-input');
    const clearBtn    = document.getElementById('dict-search-clear');

    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim();
      clearBtn.style.display = searchQuery ? 'block' : 'none';
      renderList();
    });
    clearBtn.addEventListener('click', () => {
      searchInput.value = ''; searchQuery = '';
      clearBtn.style.display = 'none';
      renderList();
    });
  }

  function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function enc(s) { return String(s||'').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

  return { render, init };
})();

/* ════════════════════════════════════════════
   TABLEAU DE BORD
════════════════════════════════════════════ */
const DashboardScreen = (() => {

  function render() {
    const stats = Storage.getStats();
    const prog  = Storage.getProgress();
    const activity = Storage.getRecentActivity();

    // Stats grid
    document.getElementById('dash-xp').textContent      = stats.totalXP.toLocaleString();
    document.getElementById('dash-lessons').textContent  = stats.lessonsCount;
    document.getElementById('dash-streak').textContent   = stats.streak;
    document.getElementById('dash-dict').textContent     = stats.dictCount;
    document.getElementById('dash-modules').textContent  = stats.modulesCompleted;
    document.getElementById('dash-avg').textContent      = stats.avgScore + '%';
    document.getElementById('dash-tests').textContent    = stats.testCount;
    document.getElementById('dash-level').textContent    = stats.lastLevel || '–';

    // Progress circle
    const p = prog.pct;
    document.getElementById('dash-global-pct').textContent = p + '%';
    document.getElementById('dash-global-bar').style.width = p + '%';

    // Skills breakdown (estimation)
    const skills = estimateSkills(stats, prog);
    Object.entries(skills).forEach(([k, v]) => {
      const bar = document.getElementById(`skill-${k}`);
      const pct = document.getElementById(`skill-${k}-pct`);
      if (bar) bar.style.width = v + '%';
      if (pct) pct.textContent = v + '%';
    });

    // Module progress cards
    renderModuleCards();

    // Activity
    renderActivity(activity);

    // Reset button
    document.getElementById('btn-reset')?.addEventListener('click', () => {
      if (confirm('⚠️ Remettre à zéro toute votre progression ? Cette action est irréversible.')) {
        Storage.resetAll();
        location.reload();
      }
    });
  }

  function estimateSkills(stats, prog) {
    const base = Math.min(prog.done * 2, 100);
    return {
      vocab: Math.min(Math.round(base * 0.9 + stats.dictCount * 0.5), 100),
      grammar: Math.min(Math.round(base * 0.7), 100),
      pronunciation: Math.min(Math.round(base * 0.6), 100),
      culture: Math.min(Math.round(base * 0.8 + stats.testCount * 2), 100),
    };
  }

  function renderModuleCards() {
    const el = document.getElementById('dash-modules-detail');
    if (!el) return;
    el.innerHTML = '';
    for (let m = 1; m <= 9; m++) {
      const mp = Storage.getModuleProgress(m);
      if (mp.done === 0 && m > Storage.getProgress().currentModuleId) continue;
      const card = document.createElement('div');
      card.className = 'module-eval-card';
      card.innerHTML = `
        <div class="module-eval-header">
          <span class="module-eval-title">Module ${m}</span>
          <span class="module-eval-score">${mp.done}/10</span>
        </div>
        <div class="module-progress-mini">
          <div class="module-progress-mini-fill" style="width:${mp.pct}%"></div>
        </div>
        ${mp.done === 10 ? `<div style="margin-top:8px;font-size:.78rem;color:var(--success)">✅ Complété · Score moyen : ${mp.avgScore}%</div>` : ''}`;
      el.appendChild(card);
    }
  }

  function renderActivity(activity) {
    const el = document.getElementById('dash-activity');
    if (!el) return;
    if (!activity.length) {
      el.innerHTML = '<p style="color:var(--text-dim);font-size:.85rem;padding:10px 0">Aucune activité récente.</p>';
      return;
    }
    el.innerHTML = activity.map(a => `
      <div class="activity-row">
        <span class="activity-icon">${a.icon}</span>
        <div class="activity-text"><strong>${esc(a.text.split('·')[0])}</strong>
          ${a.text.includes('·') ? `<span>· ${esc(a.text.split('·')[1])}</span>` : ''}
        </div>
        <span class="activity-time">${timeAgo(a.date)}</span>
      </div>`
    ).join('');
  }

  function timeAgo(dateStr) {
    if (!dateStr) return '';
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 60) return 'maintenant';
    if (diff < 3600) return Math.floor(diff/60) + ' min';
    if (diff < 86400) return Math.floor(diff/3600) + 'h';
    return Math.floor(diff/86400) + 'j';
  }

  function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  return { render };
})();
