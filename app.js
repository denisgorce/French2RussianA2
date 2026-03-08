// ================================================================
// РУССКИЙ — App v2 : TTS + Progress + Modern UI
// ================================================================

const App = (() => {

  // ── State ──────────────────────────────────────────────────────
  let currentLessonKey  = null;
  let completedLessons  = new Set();
  let activityLog       = {};   // { 'YYYY-MM-DD': count }
  let timerInterval     = null;
  let timerSeconds      = 15 * 60;
  let currentTab        = 'home';
  let ttsToastTimer     = null;
  let ttsVoice          = null;
  let searchQuery       = '';

  // ── TTS Setup ─────────────────────────────────────────────────
  function initTTS() {
    if (!window.speechSynthesis) return;
    const load = () => {
      const voices = speechSynthesis.getVoices();
      // Try to find a Russian voice
      ttsVoice = voices.find(v => v.lang.startsWith('ru')) || null;
    };
    load();
    speechSynthesis.onvoiceschanged = load;
  }

  function speak(text, displayText) {
    if (!window.speechSynthesis) {
      showTTSToast(displayText || text, false);
      return;
    }
    speechSynthesis.cancel();

    const utt = new SpeechSynthesisUtterance(text);
    utt.lang  = 'ru-RU';
    utt.rate  = 0.82;
    utt.pitch = 1.0;
    if (ttsVoice) utt.voice = ttsVoice;

    utt.onstart = () => showTTSToast(displayText || text, true);
    utt.onend   = () => hideTTSToast();
    utt.onerror = () => hideTTSToast();

    speechSynthesis.speak(utt);

    // Highlight the button
    document.querySelectorAll('.tts-btn').forEach(b => b.classList.remove('speaking'));
    const activeBtn = document.querySelector(`[data-tts="${CSS.escape(text)}"]`);
    if (activeBtn) activeBtn.classList.add('speaking');
  }

  function showTTSToast(word, animated) {
    const toast = document.getElementById('tts-toast');
    document.getElementById('tts-word').textContent = word;
    toast.classList.toggle('hidden', false);
    const wave = toast.querySelector('.tts-wave');
    wave.style.display = animated ? 'flex' : 'none';

    clearTimeout(ttsToastTimer);
    if (!animated) {
      ttsToastTimer = setTimeout(hideTTSToast, 2000);
    }
  }

  function hideTTSToast() {
    document.getElementById('tts-toast').classList.add('hidden');
    document.querySelectorAll('.tts-btn').forEach(b => b.classList.remove('speaking'));
    clearTimeout(ttsToastTimer);
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    loadProgress();
    initTTS();
    setGreeting();
    showTab('home', true);
    buildLessonsList();
    updateHomeUI();
    updateProgressUI();
    buildHeatmap();
    buildAchievements();
  }

  // ── Greeting ──────────────────────────────────────────────────
  function setGreeting() {
    const h = new Date().getHours();
    const greet = h < 12 ? 'Bonjour !' : h < 18 ? 'Bonne après-midi !' : 'Bonne soirée !';
    const el = document.getElementById('greeting-text');
    if (el) el.textContent = greet;
  }

  // ── Storage ──────────────────────────────────────────────────
  function loadProgress() {
    try {
      const p = localStorage.getItem('russe_v2_progress');
      if (p) completedLessons = new Set(JSON.parse(p));
      const a = localStorage.getItem('russe_v2_activity');
      if (a) activityLog = JSON.parse(a);
    } catch(e) {}
  }

  function saveProgress() {
    try {
      localStorage.setItem('russe_v2_progress', JSON.stringify([...completedLessons]));
      localStorage.setItem('russe_v2_activity', JSON.stringify(activityLog));
    } catch(e) {}
  }

  function logActivity() {
    const today = new Date().toISOString().slice(0,10);
    activityLog[today] = (activityLog[today] || 0) + 1;
    saveProgress();
  }

  function getStreak() {
    let streak = 0;
    const d = new Date();
    for (let i = 0; i < 365; i++) {
      const key = new Date(d - i * 86400000).toISOString().slice(0,10);
      if (activityLog[key]) streak++;
      else if (i > 0) break;
    }
    return streak;
  }

  // ── Tab Navigation ────────────────────────────────────────────
  function showTab(tab, initial = false) {
    currentTab = tab;

    // Hide lesson screen tabs from bottom nav
    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tab);
    });

    document.querySelectorAll('.tab-screen').forEach(s => {
      s.classList.remove('active');
    });

    const target = document.getElementById(`tab-${tab}`) || document.getElementById(`${tab}-screen`);
    if (target) target.classList.add('active');
  }

  // ── Home UI ───────────────────────────────────────────────────
  function updateHomeUI() {
    const total = ALL_LESSONS_KEYS.length;
    const done  = completedLessons.size;
    const pct   = total > 0 ? Math.round(done / total * 100) : 0;
    const streak = getStreak();

    // Stats
    setEl('stat-done',   done);
    setEl('stat-streak', streak);
    setEl('stat-pct',    pct + '%');

    // Global progress
    setEl('global-prog-label', `${done} / ${total} leçons`);
    setStyle('global-prog-fill', 'width', pct + '%');

    // Next lesson
    const nextKey = ALL_LESSONS_KEYS.find(k => !completedLessons.has(k));
    if (nextKey) {
      const l = LESSONS_DATA[nextKey];
      setEl('nlc-title', l.title);
    } else {
      setEl('nlc-title', 'Cours terminé ! 🎉');
    }
  }

  // ── Lessons List ──────────────────────────────────────────────
  function buildLessonsList() {
    const container = document.getElementById('lessons-list');
    container.innerHTML = '';

    const weeks = groupByWeek();
    const nextKey = ALL_LESSONS_KEYS.find(k => !completedLessons.has(k));

    Object.keys(weeks).sort((a,b) => +a - +b).forEach(w => {
      const wNum = +w;
      const monthNum = wNum <= 4 ? 1 : wNum <= 9 ? 2 : 3;
      const weekInMonth = wNum <= 4 ? wNum : wNum <= 9 ? wNum - 4 : wNum - 9;
      const keys = weeks[w];
      const doneCnt = keys.filter(k => completedLessons.has(k)).length;
      const pct = Math.round(doneCnt / keys.length * 100);
      const isCurrent = nextKey && LESSONS_DATA[nextKey]?.week === wNum;

      const sec = document.createElement('div');
      sec.className = 'week-section';

      sec.innerHTML = `
        <div class="week-section-header">
          <div class="week-badge ${isCurrent ? 'current' : ''}">M${monthNum}·S${weekInMonth}</div>
          <div class="week-progress-mini">
            <div class="week-progress-mini-fill" style="width:${pct}%"></div>
          </div>
          <span style="font-family:var(--font-mono);font-size:0.6rem;color:var(--text3);flex-shrink:0">${doneCnt}/${keys.length}</span>
        </div>
        <div class="week-days-list" id="wdl-${w}"></div>
      `;

      container.appendChild(sec);
      const list = sec.querySelector(`#wdl-${w}`);

      keys.forEach(key => {
        const lesson = LESSONS_DATA[key];
        const isDone    = completedLessons.has(key);
        const isCurrent = key === nextKey;
        const isVisible = searchQuery === '' ||
          lesson.title.toLowerCase().includes(searchQuery) ||
          lesson.subtitle.toLowerCase().includes(searchQuery);

        if (!isVisible) return;

        const item = document.createElement('button');
        item.className = 'lesson-item' +
          (isDone ? ' done' : '') +
          (isCurrent ? ' current-lesson' : '');
        item.onclick = () => openLesson(key);

        item.innerHTML = `
          <div class="li-num">J${lesson.day}</div>
          <div class="li-text">
            <div class="li-title">${lesson.title}</div>
            <div class="li-sub">${lesson.subtitle}</div>
          </div>
          <div class="li-status">
            ${isDone
              ? `<svg viewBox="0 0 24 24" class="" style="color:var(--teal)"><polyline points="20 6 9 17 4 12"/></svg>`
              : isCurrent
                ? `<svg viewBox="0 0 24 24" class="play-icon"><polygon points="5 3 19 12 5 21 5 3"/></svg>`
                : `<svg viewBox="0 0 24 24" class="arrow-icon"><polyline points="9 18 15 12 9 6"/></svg>`
            }
          </div>
        `;

        list.appendChild(item);
      });
    });
  }

  function filterLessons(query) {
    searchQuery = query.toLowerCase().trim();
    buildLessonsList();
  }

  function groupByWeek() {
    const weeks = {};
    ALL_LESSONS_KEYS.forEach(key => {
      const w = LESSONS_DATA[key].week;
      if (!weeks[w]) weeks[w] = [];
      weeks[w].push(key);
    });
    return weeks;
  }

  // ── Progress UI ───────────────────────────────────────────────
  function updateProgressUI() {
    const total = ALL_LESSONS_KEYS.length;
    const done  = completedLessons.size;
    const pct   = total > 0 ? done / total : 0;

    // Donut
    const circumference = 2 * Math.PI * 80; // r=80
    const offset = circumference * (1 - pct);
    const donut = document.getElementById('donut-fill');
    if (donut) {
      donut.style.strokeDasharray  = circumference;
      donut.style.strokeDashoffset = offset;
    }
    setEl('donut-pct', Math.round(pct * 100) + '%');

    // Month breakdown
    // M1: weeks 1-4 = 24 lessons, M2: weeks 5-9 = 30, M3: weeks 10-13 = 24
    const m1Keys = ALL_LESSONS_KEYS.filter(k => LESSONS_DATA[k].week <= 4);
    const m2Keys = ALL_LESSONS_KEYS.filter(k => LESSONS_DATA[k].week >= 5 && LESSONS_DATA[k].week <= 9);
    const m3Keys = ALL_LESSONS_KEYS.filter(k => LESSONS_DATA[k].week >= 10);

    const m1Done = m1Keys.filter(k => completedLessons.has(k)).length;
    const m2Done = m2Keys.filter(k => completedLessons.has(k)).length;
    const m3Done = m3Keys.filter(k => completedLessons.has(k)).length;

    setMonthBar(1, m1Done, m1Keys.length);
    setMonthBar(2, m2Done, m2Keys.length);
    setMonthBar(3, m3Done, m3Keys.length);
  }

  function setMonthBar(n, done, total) {
    const fill = document.getElementById(`mb-fill-${n}`);
    const count = document.getElementById(`mb-count-${n}`);
    if (fill)  fill.style.width = total > 0 ? Math.round(done/total*100) + '%' : '0%';
    if (count) count.textContent = `${done} / ${total}`;
  }

  // ── Heatmap ───────────────────────────────────────────────────
  function buildHeatmap() {
    const grid = document.getElementById('heatmap-grid');
    if (!grid) return;
    grid.innerHTML = '';

    // Group lessons by week number
    const weeks = groupByWeek();
    const maxWeek = 13;

    for (let w = 1; w <= maxWeek; w++) {
      const keys  = weeks[w] || [];
      const total = keys.length;
      const done  = keys.filter(k => completedLessons.has(k)).length;

      const cell = document.createElement('div');
      cell.className = 'hm-cell';
      if (done > 0 && done < total) cell.classList.add('hm-partial');
      if (done === total && total > 0) cell.classList.add('hm-full');
      cell.title = `Semaine ${w}: ${done}/${total} leçons`;

      grid.appendChild(cell);
    }
  }

  // ── Achievements ──────────────────────────────────────────────
  const ACHIEVEMENTS = [
    { id: 'first',   emoji: '🎯', name: 'Premier pas',   cond: () => completedLessons.size >= 1 },
    { id: 'alpha',   emoji: '🔤', name: 'Alphabet',      cond: () => ['S1J1','S1J2','S1J3','S1J4','S1J5','S1J6'].every(k => completedLessons.has(k)) },
    { id: 'week1',   emoji: '⭐', name: 'Semaine 1',     cond: () => ALL_LESSONS_KEYS.filter(k => LESSONS_DATA[k].week === 1).every(k => completedLessons.has(k)) },
    { id: 'month1',  emoji: '🏅', name: 'Mois 1 — A1',  cond: () => ALL_LESSONS_KEYS.filter(k => LESSONS_DATA[k].week <= 4).every(k => completedLessons.has(k)) },
    { id: 'month2',  emoji: '🥈', name: 'Mois 2',       cond: () => ALL_LESSONS_KEYS.filter(k => LESSONS_DATA[k].week <= 9).every(k => completedLessons.has(k)) },
    { id: 'finish',  emoji: '🏆', name: 'Niveau A2 !',  cond: () => completedLessons.size >= ALL_LESSONS_KEYS.length },
    { id: 'streak3', emoji: '🔥', name: '3 jours suite', cond: () => getStreak() >= 3 },
    { id: 'streak7', emoji: '💎', name: '7 jours suite', cond: () => getStreak() >= 7 },
    { id: 'half',    emoji: '🌗', name: 'Mi-parcours',   cond: () => completedLessons.size >= Math.floor(ALL_LESSONS_KEYS.length / 2) },
  ];

  function buildAchievements() {
    const grid = document.getElementById('ach-grid');
    if (!grid) return;
    grid.innerHTML = '';

    ACHIEVEMENTS.forEach(ach => {
      const earned = ach.cond();
      const card = document.createElement('div');
      card.className = 'ach-card' + (earned ? ' earned' : '');
      card.innerHTML = `
        <span class="ach-emoji">${ach.emoji}</span>
        <div class="ach-name">${ach.name}</div>
      `;
      grid.appendChild(card);
    });
  }

  // ── Course Navigation ─────────────────────────────────────────
  function startCourse() {
    const nextKey = ALL_LESSONS_KEYS.find(k => !completedLessons.has(k)) || ALL_LESSONS_KEYS[0];
    openLesson(nextKey);
  }

  function openLesson(key) {
    if (!LESSONS_DATA[key]) return;
    currentLessonKey = key;
    renderLesson();
    // Show lesson screen
    document.querySelectorAll('.tab-screen').forEach(s => s.classList.remove('active'));
    document.getElementById('lesson-screen').classList.add('active');
    startTimer();
    logActivity();
    window.scrollTo(0,0);
  }

  function closeLesson() {
    stopTimer();
    speechSynthesis && speechSynthesis.cancel();
    hideTTSToast();
    currentLessonKey = null;
    showTab(currentTab || 'home');
    updateHomeUI();
    updateProgressUI();
    buildHeatmap();
    buildAchievements();
    buildLessonsList();
  }

  function nextLesson() {
    const idx = ALL_LESSONS_KEYS.indexOf(currentLessonKey);
    if (idx < ALL_LESSONS_KEYS.length - 1) openLesson(ALL_LESSONS_KEYS[idx + 1]);
  }

  function prevLesson() {
    const idx = ALL_LESSONS_KEYS.indexOf(currentLessonKey);
    if (idx > 0) openLesson(ALL_LESSONS_KEYS[idx - 1]);
  }

  function completeLesson() {
    if (!currentLessonKey) return;
    completedLessons.add(currentLessonKey);
    saveProgress();
    closeLesson();
  }

  // ── Render Lesson ─────────────────────────────────────────────
  function renderLesson() {
    const lesson = LESSONS_DATA[currentLessonKey];
    if (!lesson) return;

    const idx   = ALL_LESSONS_KEYS.indexOf(currentLessonKey);
    const total = ALL_LESSONS_KEYS.length;
    const pct   = Math.round((idx / total) * 100);

    // Header
    setEl('ls-week-tag',  `Semaine ${lesson.week} · Jour ${lesson.day}`);
    setEl('ls-title',     lesson.title);
    setStyle('lesson-prog-fill', 'width', pct + '%');
    setEl('foot-position', `${idx + 1} / ${total}`);

    // Nav
    document.getElementById('btn-prev').disabled = idx === 0;
    document.getElementById('btn-next').disabled = idx === total - 1;

    // Content
    const container = document.getElementById('lesson-content');
    container.innerHTML = '';

    lesson.sections.forEach((sec, i) => {
      const el = renderSection(sec, i, lesson);
      if (el) container.appendChild(el);
    });

    // Completion card
    const comp = document.createElement('div');
    comp.className = 'ls-section';
    comp.innerHTML = `
      <div class="completion-card">
        <div class="completion-emoji">🎉</div>
        <div class="completion-title">Leçon terminée !</div>
        <div class="completion-desc">Bravo ! Revenez demain pour la leçon suivante.<br>La régularité est la clé du succès.</div>
        <button class="btn-complete" onclick="App.completeLesson()">
          Valider et continuer ✓
        </button>
      </div>
    `;
    container.appendChild(comp);

    // Reset scroll
    container.scrollTo && container.scrollTo(0, 0);
    container.parentElement && (container.parentElement.scrollTop = 0);
  }

  function renderSection(section, i, lesson) {
    const wrap = document.createElement('div');
    wrap.className = 'ls-section';

    switch (section.type) {

      case 'intro':
        wrap.innerHTML = `
          <div class="intro-card">
            <div class="s-tag">${section.tag}</div>
            <div class="intro-title">${section.title}</div>
            <div class="intro-text">${section.text}</div>
          </div>
        `;
        break;

      case 'alphabet':
        wrap.innerHTML = `
          <div class="alphabet-wrap">
            <div class="s-tag">${section.tag}</div>
            <div class="section-subtitle">${section.title}</div>
            <div class="alpha-grid">
              ${section.letters.map(l => `
                <div class="alpha-card ${l.similar ? 'similar' : ''}" onclick="App.speak('${esc(l.example)}', '${esc(l.cyr)}')">
                  ${l.similar ? '<div class="alpha-sim-badge">≈</div>' : ''}
                  <span class="alpha-cyr">${l.cyr}</span>
                  <span class="alpha-lat">[${l.latin}] ${l.sound}</span>
                  <span class="alpha-ex">${l.example} = ${l.ex_fr}</span>
                  <span class="alpha-tts">🔊 Écouter</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        break;

      case 'vocab':
        wrap.innerHTML = `
          <div class="vocab-wrap">
            <div class="s-tag">${section.tag}</div>
            <div class="section-subtitle">${section.title}</div>
            <div class="vocab-list">
              ${section.words.map(w => `
                <div class="vocab-card ${w.cognat ? 'cognat' : ''}">
                  <div class="vocab-card-top">
                    <div class="vocab-ru-wrap">
                      <span class="vocab-ru">${w.ru}</span>
                      ${w.phonetic ? `<span class="vocab-phonetic">${w.phonetic}</span>` : ''}
                    </div>
                    <button class="tts-btn"
                      data-tts="${esc(w.ru)}"
                      onclick="App.speak('${esc(w.ru)}', '${esc(w.ru)}')"
                      title="Écouter la prononciation">
                      <svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/></svg>
                    </button>
                  </div>
                  <div class="vocab-fr">${w.fr}</div>
                  ${w.cognat ? '<div class="vocab-badges"><span class="badge-cognat">🔗 Cognat</span></div>' : ''}
                  ${w.note ? `<div class="vocab-note">💡 ${w.note}</div>` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        `;
        break;

      case 'pronunciation':
        wrap.innerHTML = `
          <div class="pronunc-card">
            <div class="pronunc-header">
              <div class="pronunc-icon">
                <svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
              </div>
              <div class="pronunc-heading">${section.tag} — ${section.title}</div>
            </div>
            <div class="pronunc-rules">
              ${section.rules.map(r => `
                <div class="pronunc-rule">
                  <div class="pronunc-sym">${r.symbol}</div>
                  <div class="pronunc-desc">${r.desc}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        break;

      case 'grammar':
        wrap.innerHTML = `
          <div class="grammar-card">
            <div class="s-tag">${section.tag}</div>
            <div class="grammar-heading">${section.title}</div>
            <div class="grammar-pattern">${section.pattern}</div>
            <div class="grammar-examples">
              ${section.examples.map(e => `
                <div class="grammar-ex">
                  <div class="ge-ru">
                    <span class="ge-ru-text">${e.ru}</span>
                    <button class="tts-btn" data-tts="${esc(e.ru)}"
                      onclick="App.speak('${esc(e.ru)}', '${esc(e.ru)}')"
                      title="Écouter">
                      <svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>
                    </button>
                  </div>
                  <div class="ge-fr">${e.fr}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        break;

      case 'tip':
        wrap.innerHTML = `
          <div class="tip-card">
            <div class="tip-icon">💡</div>
            <div class="tip-content">
              <div class="tip-label">${section.tag}</div>
              <div class="tip-text">${section.text}</div>
            </div>
          </div>
        `;
        break;

      case 'exercise': {
        const exId = `ex-${lesson.week}-${lesson.day}-${i}`;
        wrap.innerHTML = `
          <div class="exercise-card">
            <div class="s-tag">✏️ ${section.tag}</div>
            <div class="exercise-q">${section.question}</div>
            <div class="exercise-opts" id="${exId}-opts">
              ${section.options.map((opt, oi) => `
                <button class="opt-btn"
                  onclick="App.checkAnswer('${exId}', ${oi}, ${section.correct}, '${esc(section.feedback)}')">
                  ${opt}
                </button>
              `).join('')}
            </div>
            <div class="exercise-feedback" id="${exId}-fb"></div>
          </div>
        `;
        break;
      }

      default:
        return null;
    }

    return wrap;
  }

  // ── Exercise ──────────────────────────────────────────────────
  function checkAnswer(exId, chosen, correct, feedback) {
    const opts = document.getElementById(`${exId}-opts`);
    const fb   = document.getElementById(`${exId}-fb`);
    if (!opts || opts.dataset.answered) return;
    opts.dataset.answered = '1';

    opts.querySelectorAll('.opt-btn').forEach((btn, i) => {
      btn.disabled = true;
      if (i === correct)                        btn.classList.add('correct');
      if (i === chosen && chosen !== correct)   btn.classList.add('wrong');
    });

    fb.textContent = feedback;
    fb.style.color = chosen === correct ? 'var(--teal)' : 'var(--red2)';
  }

  // ── Timer ─────────────────────────────────────────────────────
  function startTimer() {
    stopTimer();
    timerSeconds = 15 * 60;
    renderTimer();
    timerInterval = setInterval(() => {
      timerSeconds--;
      renderTimer();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function renderTimer() {
    const el = document.getElementById('timer-display');
    if (!el) return;
    const abs = Math.abs(timerSeconds);
    const m   = String(Math.floor(abs / 60)).padStart(2, '0');
    const s   = String(abs % 60).padStart(2, '0');
    el.textContent = `${timerSeconds < 0 ? '+' : ''}${m}:${s}`;
    const timer = document.getElementById('lesson-timer');
    if (timer) timer.classList.toggle('urgent', timerSeconds <= 60 && timerSeconds >= 0);
  }

  // ── Utilities ─────────────────────────────────────────────────
  function setEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function setStyle(id, prop, val) {
    const el = document.getElementById(id);
    if (el) el.style[prop] = val;
  }

  function esc(str) {
    return (str || '')
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '&quot;');
  }

  // ── Public API ────────────────────────────────────────────────
  return {
    init,
    showTab,
    startCourse,
    openLesson,
    closeLesson,
    nextLesson,
    prevLesson,
    completeLesson,
    checkAnswer,
    filterLessons,
    speak: (text, display) => speak(text, display),
  };

})();

document.addEventListener('DOMContentLoaded', App.init);
