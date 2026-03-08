/* ── js/tts.js ── Synthèse vocale (Web Speech API) ── */
'use strict';

const TTS = (() => {
  let available = false;
  let voices = [];
  let frVoice = null;
  let currentUtterance = null;
  let settings = { lang: 'fr-FR', pitch: 1, rate: 0.85, volume: 1 };

  function init(opts = {}) {
    if (!('speechSynthesis' in window)) return;
    settings = { ...settings, ...opts };
    available = true;

    function loadVoices() {
      voices = speechSynthesis.getVoices();
      // Priorité : voix française native
      frVoice = voices.find(v => v.lang === 'fr-FR' && !v.name.includes('Google'))
             || voices.find(v => v.lang === 'fr-FR')
             || voices.find(v => v.lang.startsWith('fr'))
             || null;
    }
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }

  function speak(text, onStart, onEnd) {
    if (!available) return;
    stop();
    const u = new SpeechSynthesisUtterance(text);
    u.lang   = settings.lang;
    u.pitch  = settings.pitch;
    u.rate   = settings.rate;
    u.volume = settings.volume;
    if (frVoice) u.voice = frVoice;
    if (onStart) u.onstart = onStart;
    if (onEnd)   { u.onend = onEnd; u.onerror = onEnd; }
    currentUtterance = u;
    speechSynthesis.speak(u);
  }

  function stop() {
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    currentUtterance = null;
  }

  function isAvailable()    { return available; }
  function isSpeaking()     { return speechSynthesis.speaking; }
  function updateSettings(s){ settings = { ...settings, ...s }; }

  return { init, speak, stop, isAvailable, isSpeaking, updateSettings };
})();
