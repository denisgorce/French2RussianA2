/* ── js/lesson.js ── Rendu de la leçon (5 onglets) ── */
'use strict';

const LessonScreen = (() => {

  let currentLesson  = null;
  let currentModuleId = null;
  let addedWords = new Set();

  /* ── Entry point ── */
  function render(opts) {
    currentModuleId = opts.moduleId;
    addedWords.clear();

    // Load module JSON
    document.getElementById('lesson-loading').style.display = 'flex';
    document.getElementById('lesson-tabs-container').style.display = 'none';

    fetch(`data/module${opts.moduleId}.json`)
      .then(r => r.json())
      .then(data => {
        const lesson = data.lessons.find(l => l.id === opts.lessonId);
        if (!lesson) throw new Error('Leçon introuvable');
        currentLesson = lesson;
        renderLesson(lesson, opts);
      })
      .catch(err => {
        document.getElementById('lesson-loading').innerHTML =
          `<div class="empty-state"><div class="empty-icon">❌</div><h3>Erreur de chargement</h3><p>${err.message}</p></div>`;
      });
  }

  function renderLesson(lesson, opts) {
    document.getElementById('lesson-loading').style.display = 'none';
    document.getElementById('lesson-tabs-container').style.display = 'block';

    // Header
    document.getElementById('lesson-module-badge').textContent = `Module ${opts.moduleId}`;
    document.getElementById('lesson-title').textContent = lesson.titleFr;

    // Activate first tab
    switchTab('grammar');

    // Render each tab
    renderGrammar(lesson.grammar);
    renderPronunciation(lesson.pronunciation);
    renderVocabulary(lesson.vocabulary, lesson.cognates, opts.moduleId, lesson.id);
    renderCulture(lesson.cultural);
    QuizTab.render(lesson.quiz, lesson, opts);

    // Tab click handlers
    document.querySelectorAll('.tab').forEach(btn => {
      btn.onclick = () => switchTab(btn.dataset.tab);
    });
  }

  function switchTab(name) {
    document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.toggle('active', c.id === `tab-${name}`));
  }

  /* ── Grammar ── */
  function renderGrammar(g) {
    const el = document.getElementById('tab-grammar');
    if (!g) { el.innerHTML = '<div class="tab-inner"><p style="color:var(--text-dim)">Pas de contenu grammatical.</p></div>'; return; }

    let html = `<div class="tab-inner">
      <div class="grammar-intro"><strong style="color:var(--text)">${g.title}</strong><br><span style="font-size:.72rem;color:var(--gold);margin-bottom:6px;display:block">${g.titleRu}</span>${e(g.intro)}</div>`;

    (g.sections || []).forEach(s => {
      html += `<div class="grammar-section"><h3>${e(s.title)}</h3><pre>${e(s.content)}</pre></div>`;
    });

    if (g.rule) html += `<div class="grammar-rule">${e(g.rule)}</div>`;
    html += '</div>';
    el.innerHTML = html;
  }

  /* ── Pronunciation ── */
  function renderPronunciation(p) {
    const el = document.getElementById('tab-pronunciation');
    if (!p) { el.innerHTML = '<div class="tab-inner"><p style="color:var(--text-dim)">Pas de contenu.</p></div>'; return; }

    const ttsOk = TTS.isAvailable();
    let html = `<div class="tab-inner">
      <p class="pron-intro">${e(p.intro)}</p>
      ${p.note ? `<div class="pron-note">⚠️ ${e(p.note)}</div>` : ''}
      <div class="pron-grid">`;

    (p.words || []).forEach((w, i) => {
      html += `<div class="pron-card">
        <div class="pron-fr">${e(w.fr)}</div>
        <div class="pron-middle">
          <div class="pron-ru">${e(w.ru_pron)}</div>
          <div class="pron-meaning">${e(w.meaning)}</div>
        </div>
        ${ttsOk ? `<button class="speak-btn" data-word="${enc(w.fr)}" data-idx="${i}">🔊</button>` : ''}
      </div>`;
    });

    html += '</div>';
    if (!ttsOk) html += '<p class="tts-unavailable">🔇 Synthèse vocale non disponible sur ce navigateur.</p>';
    html += '</div>';
    el.innerHTML = html;

    // TTS handlers
    el.querySelectorAll('.speak-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const word = btn.dataset.word;
        if (btn.classList.contains('speaking')) { TTS.stop(); btn.classList.remove('speaking'); return; }
        el.querySelectorAll('.speak-btn').forEach(b => b.classList.remove('speaking'));
        btn.classList.add('speaking');
        TTS.speak(word,
          () => btn.classList.add('speaking'),
          () => btn.classList.remove('speaking')
        );
      });
    });
  }

  /* ── Vocabulary ── */
  function renderVocabulary(vocab, cognates, moduleId, lessonId) {
    const el = document.getElementById('tab-vocabulary');
    const dict = Storage.getDictionary();
    const existing = new Set(dict.map(d => d.fr));

    let html = `<div class="tab-inner">
      <p class="vocab-subtitle">Нажмите на слово, чтобы увидеть пример. Нажмите <strong style="color:var(--gold)">+</strong>, чтобы добавить в словарь.</p>
      <div class="vocab-grid">`;

    (vocab || []).forEach(w => {
      const inDict = existing.has(w.fr) || addedWords.has(w.fr);
      html += `<div class="vocab-card" data-fr="${enc(w.fr)}">
        <div class="vocab-fr-wrap">
          <div class="vocab-fr">${e(w.fr)}</div>
          <div class="vocab-pron">${e(w.ru_pron)}</div>
          ${w.gender ? `<div class="vocab-gender">(${e(w.gender)})</div>` : ''}
        </div>
        <div class="vocab-main">
          <div class="vocab-ru">${e(w.ru)}</div>
          <div class="vocab-example-fr" style="display:none">${e(w.example_fr || '')}</div>
          <div class="vocab-example-ru" style="display:none">${e(w.example_ru || '')}</div>
          ${w.meaning_double ? `<div class="vocab-double" style="display:none">${e(w.meaning_double)}</div>` : ''}
        </div>
        <button class="vocab-add-btn ${inDict ? 'added' : ''}" data-word='${JSON.stringify({fr:w.fr,ru:w.ru,pron:w.ru_pron,exFr:w.example_fr,exRu:w.example_ru,double:w.meaning_double,moduleId,lessonId})}'>
          ${inDict ? '✓' : '+'}
        </button>
      </div>`;
    });

    html += '</div>';

    // Cognates section
    if (cognates && cognates.length) {
      html += `<div class="cognates-section">
        <div class="cognates-title">🤝 Слова-братья (Mots cousins)</div>`;
      cognates.forEach(c => {
        html += `<div class="cognate-card">
          <div class="cognate-pair">
            <div>
              <div class="cognate-fr">${e(c.fr)}</div>
              <div class="cognate-pron">${e(c.fr_pron)}</div>
            </div>
            <span class="cognate-arrow">↔</span>
            <div>
              <div class="cognate-ru-word">${e(c.ru)}</div>
              <div class="cognate-pron">${e(c.ru_pron)}</div>
            </div>
          </div>
          <div class="cognate-note">${e(c.note)}</div>
        </div>`;
      });
      html += '</div>';
    }

    html += '</div>';
    el.innerHTML = html;

    // Toggle example
    el.querySelectorAll('.vocab-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('vocab-add-btn')) return;
        const exFr = card.querySelector('.vocab-example-fr');
        const exRu = card.querySelector('.vocab-example-ru');
        const dbl  = card.querySelector('.vocab-double');
        const show = exFr && exFr.style.display === 'none';
        if (exFr) exFr.style.display = show ? 'block' : 'none';
        if (exRu) exRu.style.display = show ? 'block' : 'none';
        if (dbl)  dbl.style.display  = show ? 'block' : 'none';
        card.classList.toggle('expanded', show);
      });
    });

    // Add to dictionary
    el.querySelectorAll('.vocab-add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('added')) return;
        const word = JSON.parse(btn.dataset.word);
        const added = Storage.addToDictionary(word);
        if (added) {
          btn.textContent = '✓';
          btn.classList.add('added');
          addedWords.add(word.fr);
          App.toast(`📚 «${word.fr}» ajouté au dictionnaire`, 'gold');
        }
      });
    });
  }

  /* ── Culture ── */
  function renderCulture(cultural) {
    const el = document.getElementById('tab-culture');
    if (!cultural) { el.innerHTML = '<div class="tab-inner"><p style="color:var(--text-dim)">Pas de contenu.</p></div>'; return; }

    let html = '<div class="tab-inner"><div class="culture-sections">';

    // Bio
    if (cultural.bio) {
      html += makeCultureCard('bio', cultural.bio.icon, cultural.bio.label, cultural.bio.name,
        `<p><strong style="color:var(--text)">${e(cultural.bio.name)}</strong><br>
         <em style="color:var(--gold);font-size:.82rem">${e(cultural.bio.subtitle)}</em></p>
         <p style="margin-top:10px">${e(cultural.bio.content)}</p>`);
    }
    // History
    if (cultural.history) {
      html += makeCultureCard('history', cultural.history.icon, cultural.history.label, cultural.history.title,
        `<p><strong style="color:var(--text)">${e(cultural.history.title)}</strong></p>
         <p style="margin-top:8px">${e(cultural.history.content)}</p>`);
    }
    // Anecdote
    if (cultural.anecdote) {
      html += makeCultureCard('anecdote', cultural.anecdote.icon, cultural.anecdote.label, cultural.anecdote.title,
        `<p><strong style="color:var(--text)">${e(cultural.anecdote.title)}</strong></p>
         <p style="margin-top:8px">${e(cultural.anecdote.content)}</p>`);
    }
    // Expression
    if (cultural.expression) {
      const ex = cultural.expression;
      html += makeCultureCard('expression', ex.icon, ex.label, ex.phrase,
        `<div class="expression-phrase">${e(ex.phrase)}</div>
         <div class="expression-pron">[ ${e(ex.pronunciation)} ]</div>
         <div class="expression-trans">${e(ex.translation)}</div>
         <div class="expression-use">${e(ex.usage)}</div>
         <div class="expression-example">${e(ex.example)}</div>`);
    }
    // Destination
    if (cultural.destination) {
      const d = cultural.destination;
      html += makeCultureCard('destination', d.icon, d.label, d.place,
        `<div class="destination-place">${e(d.place)}</div>
         <div class="destination-subtitle">${e(d.subtitle)}</div>
         <p>${e(d.content)}</p>`);
    }

    html += '</div></div>';
    el.innerHTML = html;

    // Accordion
    el.querySelectorAll('.culture-card-header').forEach(hdr => {
      hdr.addEventListener('click', () => {
        const card = hdr.closest('.culture-card');
        card.classList.toggle('expanded');
      });
    });
  }

  function makeCultureCard(id, icon, label, title, bodyHtml) {
    return `<div class="culture-card" id="culture-${id}">
      <div class="culture-card-header">
        <span class="culture-icon">${icon}</span>
        <div class="culture-meta">
          <div class="culture-label">${e(label)}</div>
          <div class="culture-card-title">${e(title)}</div>
        </div>
        <span class="culture-chevron">▾</span>
      </div>
      <div class="culture-body">${bodyHtml}</div>
    </div>`;
  }

  /* ── Helpers ── */
  function e(str) { // HTML-escape
    if (!str) return '';
    return String(str)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;').replace(/\n/g,'<br>');
  }
  function enc(str) { return String(str || '').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

  function getCurrentLesson()  { return currentLesson; }
  function getCurrentModuleId(){ return currentModuleId; }

  return { render, switchTab, getCurrentLesson, getCurrentModuleId };
})();
