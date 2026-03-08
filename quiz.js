/* ── js/quiz.js ── Quiz de leçon + Test de niveau ── */
'use strict';

/* ════════════════════════════════════════════
   QUIZ TAB (fin de leçon)
════════════════════════════════════════════ */
const QuizTab = (() => {

  let questions = [], current = 0, score = 0, answered = false;
  let lessonRef = null, optsRef = null;

  function render(quiz, lesson, opts) {
    lessonRef = lesson; optsRef = opts;
    questions = quiz || [];
    current = 0; score = 0; answered = false;

    const el = document.getElementById('tab-quiz');
    if (!questions.length) {
      el.innerHTML = '<div class="tab-inner"><p style="color:var(--text-dim)">Pas de quiz pour cette leçon.</p></div>';
      return;
    }
    renderQuestion(el);
  }

  function renderQuestion(el) {
    if (!el) el = document.getElementById('tab-quiz');
    answered = false;
    const q = questions[current];
    const pct = Math.round(current / questions.length * 100);

    let html = `<div class="tab-inner">
      <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
      <div class="quiz-question-card">
        <div class="quiz-q-num">Question ${current + 1} / ${questions.length}</div>
        <div class="quiz-q-text">${q.q}</div>
      </div>
      <div class="quiz-options">`;

    const letters = ['A','B','C','D'];
    q.opts.forEach((opt, i) => {
      html += `<button class="quiz-option" data-idx="${i}">
        <span class="opt-letter">${letters[i]}</span>
        <span>${esc(opt)}</span>
      </button>`;
    });

    html += `</div><div id="quiz-exp" style="display:none"></div></div>`;
    el.innerHTML = html;

    el.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.idx), q, el));
    });
  }

  function handleAnswer(chosen, q, el) {
    if (answered) return;
    answered = true;
    const isRight = chosen === q.ans;
    if (isRight) score++;

    el.querySelectorAll('.quiz-option').forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.ans) btn.classList.add('correct');
      else if (i === chosen && !isRight) btn.classList.add('wrong');
      else btn.classList.add('revealed');
      btn.querySelector('.opt-letter').textContent = i === q.ans ? '✓' : (i === chosen && !isRight ? '✗' : btn.querySelector('.opt-letter').textContent);
    });

    // Explanation
    const expEl = el.querySelector('#quiz-exp');
    expEl.className = 'quiz-explanation';
    expEl.innerHTML = (isRight ? '✅ ' : '❌ ') + esc(q.exp || '');
    expEl.style.display = 'block';

    // Next button
    const isLast = current === questions.length - 1;
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn-primary';
    nextBtn.style.marginTop = '12px';
    nextBtn.textContent = isLast ? '📊 Voir les résultats' : 'Question suivante →';
    expEl.after(nextBtn);

    nextBtn.addEventListener('click', () => {
      if (isLast) showResult(el);
      else { current++; renderQuestion(el); }
    });
  }

  function showResult(el) {
    const pct = Math.round(score / questions.length * 100);
    const xpResult = Storage.completeLesson(lessonRef.id, optsRef.moduleId, score);
    HomeScreen.render();

    let emoji, msg;
    if (pct >= 80) { emoji='🏆'; msg='Отлично! Вы превосходно усвоили этот урок. Продолжайте в том же духе!'; }
    else if (pct >= 60) { emoji='⭐'; msg='Хорошо! Ещё немного практики — и вы будете безупречны.'; }
    else { emoji='💪'; msg='Не расстраивайтесь! Повторите урок, и результат улучшится.'; }

    el.innerHTML = `<div class="tab-inner">
      <div class="quiz-result-card">
        <div class="result-emoji">${emoji}</div>
        <div class="result-score">${score}/${questions.length}</div>
        <div class="result-label">${pct}% de réussite</div>
        <div class="result-message">${msg}</div>
        <div class="result-xp">+${xpResult.xp} XP ✨</div>
        <div class="result-actions">
          <button class="btn-primary" id="result-next">Leçon suivante →</button>
          <button class="btn-secondary" id="result-redo">↺ Refaire la leçon</button>
          <button class="btn-secondary" id="result-home">🏠 Accueil</button>
        </div>
      </div>
    </div>`;

    el.querySelector('#result-next').addEventListener('click', () => {
      const prog = Storage.getProgress();
      Router.go('lesson', { moduleId: prog.currentModuleId, lessonId: prog.currentLessonId });
    });
    el.querySelector('#result-redo').addEventListener('click', () => {
      Router.go('lesson', { moduleId: optsRef.moduleId, lessonId: lessonRef.id, redo: true });
    });
    el.querySelector('#result-home').addEventListener('click', () => Router.go('home'));
  }

  function esc(str) {
    return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  return { render };
})();

/* ════════════════════════════════════════════
   TEST DE NIVEAU (50 questions, 20 aléatoires)
════════════════════════════════════════════ */
const LevelTest = (() => {

  const CATS = ['Грамматика','Vocabulaire','Culture','Géographie','Histoire'];
  let pool = [], selected = [], current = 0, scores = {}, answered = false;

  function init() {
    fetch('data/level-test.json')
      .then(r => r.json())
      .then(data => { pool = data.questions; renderIntro(); })
      .catch(() => renderIntro());
  }

  function renderIntro() {
    const el = document.getElementById('leveltest-content');
    const last = Storage.getLastLevelTest();

    let lastHtml = '';
    if (last) {
      lastHtml = `<div style="background:var(--surface);border-radius:var(--radius-sm);padding:12px 14px;margin-top:12px;font-size:.83rem;color:var(--text-dim)">
        Dernier test : <strong style="color:var(--gold)">${last.pct}%</strong> · ${last.level} · ${new Date(last.date).toLocaleDateString('fr-FR')}
      </div>`;
    }

    el.innerHTML = `
      <div class="test-intro-card">
        <div class="test-intro-icon">🎯</div>
        <div class="test-intro-title">Test de Niveau</div>
        <div class="test-intro-desc">20 вопросов из 5 категорий — Каждый раз новые вопросы — Оцените свой уровень от A1 до A2</div>
        <div class="test-categories">
          ${CATS.map(c => `<span class="chip test-cat-chip cat-${c}">${c}</span>`).join('')}
        </div>
        ${lastHtml}
      </div>
      <button class="btn-primary" id="start-test">▶ Commencer le test</button>`;

    el.querySelector('#start-test').addEventListener('click', startTest);
  }

  function startTest() {
    // 4 questions par catégorie = 20 total
    selected = [];
    scores = Object.fromEntries(CATS.map(c => [c, { right:0, total:0 }]));
    CATS.forEach(cat => {
      const catQ = pool.filter(q => q.cat === cat);
      const shuffled = [...catQ].sort(() => Math.random() - .5);
      selected.push(...shuffled.slice(0, 4));
    });
    selected.sort(() => Math.random() - .5);
    current = 0; answered = false;
    renderQuestion();
  }

  function renderQuestion() {
    const el = document.getElementById('leveltest-content');
    answered = false;
    const q = selected[current];
    const pct = Math.round(current / selected.length * 100);

    el.innerHTML = `
      <div class="test-header-meta">
        <span class="test-cat-chip cat-${q.cat}">${q.cat}</span>
        <span style="font-size:.78rem;color:var(--text-dim)">${current+1} / ${selected.length}</span>
      </div>
      <div style="height:5px;background:var(--surface2);margin:0 16px 16px;border-radius:3px;overflow:hidden">
        <div style="height:100%;width:${pct}%;background:var(--gold);border-radius:3px;transition:width .4s"></div>
      </div>
      <div class="quiz-question-card" style="margin:0 16px 14px">
        <div class="quiz-q-text">${esc(q.q)}</div>
        ${q.qru ? `<div style="font-size:.78rem;color:var(--text-dim);margin-top:6px;font-style:italic">${esc(q.qru)}</div>` : ''}
      </div>
      <div class="quiz-options" style="padding:0 16px">
        ${q.opts.map((o,i) => `<button class="quiz-option" data-idx="${i}">
          <span class="opt-letter">${'ABCD'[i]}</span>
          <span>${esc(o)}</span>
        </button>`).join('')}
      </div>
      <div id="test-exp" style="display:none;margin:12px 16px"></div>`;

    el.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.idx), q, el));
    });
  }

  function handleAnswer(chosen, q, el) {
    if (answered) return;
    answered = true;
    const isRight = chosen === q.ans;
    scores[q.cat].total++;
    if (isRight) scores[q.cat].right++;

    el.querySelectorAll('.quiz-option').forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.ans) btn.classList.add('correct');
      else if (i === chosen && !isRight) btn.classList.add('wrong');
      else btn.classList.add('revealed');
    });

    const expEl = el.querySelector('#test-exp');
    expEl.className = 'quiz-explanation';
    expEl.innerHTML = (isRight ? '✅ ' : '❌ ') + esc(q.exp || '');
    expEl.style.display = 'block';

    const isLast = current === selected.length - 1;
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn-primary';
    nextBtn.style.cssText = 'margin:10px 16px;width:calc(100% - 32px)';
    nextBtn.textContent = isLast ? '📊 Voir mes résultats' : 'Question suivante →';
    expEl.after(nextBtn);

    nextBtn.addEventListener('click', () => {
      if (isLast) showResult(el);
      else { current++; renderQuestion(); }
    });
  }

  function showResult(el) {
    const totalRight = CATS.reduce((a, c) => a + scores[c].right, 0);
    const pct = Math.round(totalRight / selected.length * 100);

    let level;
    if (pct < 30) level = 'Débutant absolu';
    else if (pct < 50) level = 'A1 débutant';
    else if (pct < 65) level = 'A1+';
    else if (pct < 80) level = 'A1/A2';
    else level = 'A2 — Excellent !';

    Storage.saveLevelTest({ pct, level, scores });
    HomeScreen.render();

    let breakdownHtml = CATS.map(cat => {
      const s = scores[cat];
      const p = s.total ? Math.round(s.right/s.total*100) : 0;
      return `<div class="breakdown-row">
        <span class="breakdown-cat">${cat}</span>
        <div class="breakdown-bar"><div class="breakdown-fill" style="width:${p}%"></div></div>
        <span class="breakdown-pct">${p}%</span>
      </div>`;
    }).join('');

    el.innerHTML = `
      <div class="tab-inner">
        <div class="quiz-result-card">
          <div class="result-emoji">${pct>=80?'🏆':pct>=60?'⭐':'💪'}</div>
          <div class="result-score">${totalRight}/${selected.length}</div>
          <div class="level-badge">🎓 ${level}</div>
          <div class="result-label">${pct}% de réussite</div>
          <div class="test-result-breakdown">${breakdownHtml}</div>
          <div class="result-xp" style="margin-top:16px">+50 XP ✨</div>
          <div class="result-actions" style="margin-top:16px">
            <button class="btn-primary" id="test-again">🔄 Recommencer le test</button>
            <button class="btn-secondary" id="test-home">🏠 Accueil</button>
          </div>
        </div>
      </div>`;

    el.querySelector('#test-again').addEventListener('click', startTest);
    el.querySelector('#test-home').addEventListener('click', () => Router.go('home'));
  }

  function esc(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  return { init };
})();
