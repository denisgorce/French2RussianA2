/* ── js/home.js ── Écran d'accueil + liste des leçons ── */
'use strict';

const HomeScreen = (() => {

  const MODULES_META = [
    { id:1, fr:'Les Fondamentaux',        ru:'Основы французского',    lessons:10 },
    { id:2, fr:'La Vie Quotidienne',       ru:'Повседневная жизнь',      lessons:10 },
    { id:3, fr:'Sorties & Restaurants',    ru:'Прогулки и рестораны',    lessons:10 },
    { id:4, fr:'Voyages & Transports',     ru:'Путешествия и транспорт', lessons:10 },
    { id:5, fr:'Travail & École',          ru:'Работа и учёба',          lessons:10 },
    { id:6, fr:'Santé & Corps',            ru:'Здоровье и тело',         lessons:10 },
    { id:7, fr:'Nature & Environnement',   ru:'Природа и среда',         lessons:10 },
    { id:8, fr:'Culture & Médias',         ru:'Культура и медиа',        lessons:10 },
    { id:9, fr:'Vers le niveau A2',        ru:'К уровню A2',             lessons:10 },
  ];

  function render() {
    const prog = Storage.getProgress();
    const stats = Storage.getStats();

    // Progress card
    document.getElementById('home-progress-pct').textContent = prog.pct + '%';
    document.getElementById('home-progress-bar').style.width = prog.pct + '%';
    document.getElementById('home-done-count').textContent = prog.done;
    document.getElementById('home-module-cur').textContent  = prog.currentModuleId;

    // Streak & XP
    document.getElementById('home-streak').textContent = stats.streak;
    document.getElementById('home-xp').textContent     = stats.totalXP.toLocaleString();

    // Level badge
    if (prog.estimatedLevel) {
      document.getElementById('home-level-badge').textContent = prog.estimatedLevel;
      document.getElementById('home-level-badge').style.display = 'inline-flex';
    }

    // Modules list
    renderModules();
  }

  function renderModules() {
    const prog = Storage.getProgress();
    const list = document.getElementById('modules-list');
    list.innerHTML = '';

    MODULES_META.forEach(m => {
      const mp = Storage.getModuleProgress(m.id);
      const isCurrent = m.id === prog.currentModuleId;
      const isLocked  = m.id > prog.currentModuleId;
      const isDone    = mp.done >= 10;

      const card = document.createElement('div');
      card.className = 'module-card ' + (isLocked ? 'locked' : '') + (isCurrent ? ' current' : '') + (isDone ? ' completed' : '');

      let statusIcon = isLocked ? '🔒' : (isDone ? '✅' : (isCurrent ? '📖' : '🔓'));

      card.innerHTML = `
        <div class="module-num">${m.id}</div>
        <div class="module-info">
          <div class="module-title-fr">${m.fr}</div>
          <div class="module-title-ru">${m.ru}</div>
          <div class="module-meta">
            <div class="module-progress-mini">
              <div class="module-progress-mini-fill" style="width:${mp.pct}%"></div>
            </div>
            <span class="module-progress-text">${mp.done}/10</span>
          </div>
        </div>
        <div class="module-status">${statusIcon}</div>`;

      if (!isLocked) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => Router.go('lessons', { moduleId: m.id, meta: m }));
      }
      list.appendChild(card);
    });
  }

  function init() {
    document.getElementById('btn-continue').addEventListener('click', () => {
      const prog = Storage.getProgress();
      Router.go('lesson', { moduleId: prog.currentModuleId, lessonId: prog.currentLessonId });
    });
    document.getElementById('btn-test-niveau').addEventListener('click', () => Router.go('leveltest'));
    document.getElementById('btn-dict-home').addEventListener('click', () => Router.go('dict'));
  }

  return { render, init };
})();

/* ══════════════════════════════════════════════════════════
   LESSONS LIST SCREEN
══════════════════════════════════════════════════════════ */
const LessonsScreen = (() => {

  let currentMeta = null;

  function render(opts) {
    currentMeta = opts.meta;
    const moduleId = opts.moduleId;
    const prog = Storage.getProgress();

    document.getElementById('lessons-screen-title').textContent = opts.meta.fr;

    // Load module data
    loadModuleData(moduleId, data => {
      const list = document.getElementById('lessons-list');
      list.innerHTML = '';

      data.lessons.forEach(lesson => {
        const s = Storage.getLessonStatus(lesson.id, moduleId);
        const isLocked  = s.status === 'locked';
        const isDone    = s.status === 'completed';
        const isCurrent = s.status === 'current';

        const item = document.createElement('div');
        item.className = `lesson-item ${isLocked ? 'locked' : ''} ${isDone ? 'completed' : ''} ${isCurrent ? 'current' : ''}`;

        const scoreChip = s.score != null
          ? `<span class="chip chip-gold">⭐ ${s.score}/5</span>` : '';
        const levelChip = `<span class="chip chip-blue">${lesson.level}</span>`;
        const doneChip  = isDone ? `<span class="chip chip-green">✓</span>` : '';
        const redoBtn   = isDone ? `<button class="lesson-redo-btn">↺ Refaire</button>` : '';

        item.innerHTML = `
          <div class="lesson-num-badge">${isDone ? '✓' : lesson.id}</div>
          <div class="lesson-info">
            <div class="lesson-title-fr">${lesson.titleFr}</div>
            <div class="lesson-title-ru">${lesson.titleRu}</div>
            <div class="lesson-chips">${levelChip}${scoreChip}${doneChip}</div>
          </div>
          <div class="lesson-right">
            ${redoBtn}
            ${!isLocked ? '<span class="lesson-arrow">›</span>' : '🔒'}
          </div>`;

        if (!isLocked) {
          item.style.cursor = 'pointer';
          item.addEventListener('click', (e) => {
            if (e.target.classList.contains('lesson-redo-btn')) return;
            Router.go('lesson', { moduleId, lessonId: lesson.id, meta: opts.meta });
          });
          const redoBtnEl = item.querySelector('.lesson-redo-btn');
          if (redoBtnEl) {
            redoBtnEl.addEventListener('click', () => {
              Router.go('lesson', { moduleId, lessonId: lesson.id, meta: opts.meta, redo: true });
            });
          }
        }
        list.appendChild(item);
      });
    });
  }

  function loadModuleData(moduleId, cb) {
    const list = document.getElementById('lessons-list');
    list.innerHTML = '<div class="loading-center"><div class="spinner"></div><span>Chargement…</span></div>';
    fetch(`data/module${moduleId}.json`)
      .then(r => r.json())
      .then(cb)
      .catch(() => {
        list.innerHTML = `<div class="empty-state">
          <div class="empty-icon">🚧</div>
          <h3>Module en préparation</h3>
          <p>Ce module sera disponible prochainement.</p>
        </div>`;
      });
  }

  return { render };
})();
