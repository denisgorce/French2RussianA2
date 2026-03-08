/* ── js/storage.js ── Couche de persistance localStorage ── */
'use strict';

const DB_KEY = 'francaisru_v1';

const Storage = (() => {

  function load() {
    try {
      const raw = localStorage.getItem(DB_KEY);
      if (!raw) return defaultState();
      return Object.assign(defaultState(), JSON.parse(raw));
    } catch(e) { return defaultState(); }
  }

  function save(state) {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(state));
    } catch(e) { console.warn('Storage save failed:', e); }
  }

  function defaultState() {
    return {
      // Progression générale
      currentModuleId: 1,
      currentLessonId: 1,
      lessonsCompleted: [],    // [{lessonId, moduleId, score, date}]
      modulesCompleted: [],    // [{moduleId, avgScore, date}]

      // Statistiques
      totalXP: 0,
      streak: 0,
      lastStudyDate: null,
      totalTimeMin: 0,

      // Test de niveau
      levelTestHistory: [],    // [{date, score, pct, breakdown}]
      estimatedLevel: null,    // 'débutant'|'A1'|'A1+'|'A2'

      // Dictionnaire personnel
      dictionary: [],          // [{fr,ru,pron,exFr,exRu,double,defRu,lessonId,addedAt}]

      // Activité récente
      recentActivity: [],      // max 20 items [{type,text,date}]

      // Paramètres
      settings: {
        ttsLang: 'fr-FR',
        ttsPitch: 1,
        ttsRate: 0.85,
        ttsVolume: 1,
        showPronunciation: true,
        darkMode: true,
      },
    };
  }

  /* ── API publique ── */

  function getLessonStatus(lessonId, moduleId) {
    const s = load();
    const done = s.lessonsCompleted.find(l => l.lessonId === lessonId && l.moduleId === moduleId);
    if (done) return { status: 'completed', score: done.score };
    if (lessonId === s.currentLessonId && moduleId === s.currentModuleId) return { status: 'current', score: null };
    if (lessonId < s.currentLessonId || moduleId < s.currentModuleId) return { status: 'completed', score: null };
    return { status: 'locked', score: null };
  }

  function completeLesson(lessonId, moduleId, score) {
    const s = load();
    const already = s.lessonsCompleted.findIndex(l => l.lessonId === lessonId && l.moduleId === moduleId);
    const record = { lessonId, moduleId, score, date: new Date().toISOString() };

    if (already >= 0) {
      s.lessonsCompleted[already] = record; // redo
    } else {
      s.lessonsCompleted.push(record);
      // Avancer dans le cours
      const maxLesson = 10;
      const maxModule = 9;
      if (lessonId < maxLesson) {
        s.currentLessonId = Math.max(s.currentLessonId, lessonId + 1);
        s.currentModuleId = moduleId;
      } else if (moduleId < maxModule) {
        s.currentModuleId = Math.max(s.currentModuleId, moduleId + 1);
        s.currentLessonId = 1;
      }
    }

    // XP
    const xp = Math.round(score * 10);
    s.totalXP += xp;

    // Streak
    const today = new Date().toDateString();
    const lastDate = s.lastStudyDate ? new Date(s.lastStudyDate).toDateString() : null;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastDate !== today) {
      if (lastDate === yesterday) s.streak++;
      else if (lastDate !== today) s.streak = 1;
    }
    s.lastStudyDate = new Date().toISOString();

    // Activité
    pushActivity(s, '📖', `Leçon ${lessonId} terminée · ${score}/5`, record.date);
    save(s);
    return { xp, streak: s.streak };
  }

  function getProgress() {
    const s = load();
    const total = 90;
    const done = s.lessonsCompleted.length;
    return {
      done, total,
      pct: Math.round(done / total * 100),
      currentModuleId: s.currentModuleId,
      currentLessonId: s.currentLessonId,
      totalXP: s.totalXP,
      streak: s.streak,
      estimatedLevel: s.estimatedLevel,
    };
  }

  function getModuleProgress(moduleId) {
    const s = load();
    const done = s.lessonsCompleted.filter(l => l.moduleId === moduleId).length;
    const scores = s.lessonsCompleted.filter(l => l.moduleId === moduleId).map(l => l.score);
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 20) : 0;
    return { done, total: 10, pct: done * 10, avgScore: avg };
  }

  function addToDictionary(word) {
    const s = load();
    const exists = s.dictionary.findIndex(d => d.fr === word.fr);
    if (exists >= 0) return false; // already there
    s.dictionary.push({ ...word, addedAt: new Date().toISOString() });
    pushActivity(s, '📚', `Mot ajouté : ${word.fr}`, new Date().toISOString());
    save(s);
    return true;
  }

  function getDictionary(filter) {
    const s = load();
    let dict = [...s.dictionary].sort((a, b) => a.fr.localeCompare(b.fr));
    if (filter && filter !== 'all') {
      dict = dict.filter(d => d.moduleId === parseInt(filter));
    }
    return dict;
  }

  function saveLevelTest(result) {
    const s = load();
    s.levelTestHistory.push({ ...result, date: new Date().toISOString() });
    s.estimatedLevel = result.level;
    s.totalXP += 50;
    pushActivity(s, '🎯', `Test de niveau : ${result.pct}% · ${result.level}`, new Date().toISOString());
    save(s);
  }

  function getLastLevelTest() {
    const s = load();
    return s.levelTestHistory.length ? s.levelTestHistory[s.levelTestHistory.length - 1] : null;
  }

  function getSettings() { return load().settings; }

  function saveSettings(partial) {
    const s = load();
    s.settings = { ...s.settings, ...partial };
    save(s);
  }

  function getRecentActivity(limit = 12) {
    const s = load();
    return [...s.recentActivity].reverse().slice(0, limit);
  }

  function getStats() {
    const s = load();
    const allScores = s.lessonsCompleted.map(l => l.score).filter(Boolean);
    const avgScore = allScores.length ? Math.round(allScores.reduce((a,b)=>a+b,0)/allScores.length*20) : 0;
    return {
      totalXP: s.totalXP,
      streak: s.streak,
      lessonsCount: s.lessonsCompleted.length,
      dictCount: s.dictionary.length,
      avgScore,
      modulesCompleted: s.lessonsCompleted.filter(l => l.lessonId === 10).length,
      testCount: s.levelTestHistory.length,
      lastLevel: s.estimatedLevel,
    };
  }

  function pushActivity(state, icon, text, date) {
    state.recentActivity.push({ icon, text, date });
    if (state.recentActivity.length > 20) state.recentActivity.shift();
  }

  function resetAll() {
    localStorage.removeItem(DB_KEY);
  }

  return {
    load, save, getLessonStatus, completeLesson,
    getProgress, getModuleProgress,
    addToDictionary, getDictionary,
    saveLevelTest, getLastLevelTest,
    getSettings, saveSettings,
    getRecentActivity, getStats, resetAll,
  };
})();
