/* ── js/app.js ── Point d'entrée : router, installation PWA, init ── */
'use strict';

/* ════════════════════════════════════════════
   ROUTER
════════════════════════════════════════════ */
const Router = (() => {

  const screens = {
    home:       document.getElementById('screen-home'),
    lessons:    document.getElementById('screen-lessons'),
    lesson:     document.getElementById('screen-lesson'),
    quiz:       null, // embedded in lesson
    leveltest:  document.getElementById('screen-leveltest'),
    dict:       document.getElementById('screen-dict'),
    dashboard:  document.getElementById('screen-dashboard'),
  };

  const navBtns = document.querySelectorAll('.nav-btn');
  let currentScreen = 'home';

  function go(name, opts = {}) {
    // Hide all
    Object.values(screens).forEach(s => s && s.classList.remove('active'));

    // Show target
    const el = screens[name];
    if (el) el.classList.add('active');

    // Update nav
    navBtns.forEach(b => b.classList.toggle('active', b.dataset.screen === name));

    // Render
    currentScreen = name;
    switch(name) {
      case 'home':       HomeScreen.render(); break;
      case 'lessons':    LessonsScreen.render(opts); break;
      case 'lesson':     renderLessonScreen(opts); break;
      case 'leveltest':  LevelTest.init(); break;
      case 'dict':       DictScreen.render(); break;
      case 'dashboard':  DashboardScreen.render(); break;
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }

  function renderLessonScreen(opts) {
    LessonScreen.render(opts);
  }

  // Nav buttons
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => go(btn.dataset.screen));
  });

  // Back buttons
  document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.back || 'home';
      go(target);
    });
  });

  return { go, current: () => currentScreen };
})();

/* ════════════════════════════════════════════
   APP GLOBAL HELPERS
════════════════════════════════════════════ */
const App = (() => {

  let toastTimer = null;

  function toast(msg, type = '') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    if (toastTimer) clearTimeout(toastTimer);

    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.textContent = msg;
    document.body.appendChild(el);
    toastTimer = setTimeout(() => el.remove(), 2800);
  }

  return { toast };
})();

/* ════════════════════════════════════════════
   INSTALL BANNER (PWA)
════════════════════════════════════════════ */
const InstallPWA = (() => {
  let deferredPrompt = null;
  const banner = document.getElementById('install-banner');
  const btnInstall = document.getElementById('btn-install');
  const btnDismiss = document.getElementById('btn-dismiss-install');

  function init() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      // Show after 3s if not already installed
      const dismissed = sessionStorage.getItem('installDismissed');
      if (!dismissed) {
        setTimeout(() => banner.classList.remove('hidden'), 3000);
      }
    });

    btnInstall.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        App.toast('🎉 Application installée avec succès !', 'success');
      }
      deferredPrompt = null;
      banner.classList.add('hidden');
    });

    btnDismiss.addEventListener('click', () => {
      banner.classList.add('hidden');
      sessionStorage.setItem('installDismissed', '1');
    });

    // Already installed?
    if (window.matchMedia('(display-mode: standalone)').matches) {
      banner.classList.add('hidden');
    }
  }

  return { init };
})();

/* ════════════════════════════════════════════
   SERVICE WORKER
════════════════════════════════════════════ */
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        console.log('[PWA] Service Worker enregistré:', reg.scope);
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              App.toast('🔄 Mise à jour disponible — Rechargez la page', 'gold');
            }
          });
        });
      })
      .catch(err => console.warn('[PWA] SW non enregistré:', err));
  }
}

/* ════════════════════════════════════════════
   INIT
════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // Init TTS
  const settings = Storage.getSettings();
  TTS.init({
    lang: settings.ttsLang || 'fr-FR',
    rate: settings.ttsRate || 0.85,
    pitch: settings.ttsPitch || 1,
    volume: settings.ttsVolume || 1,
  });

  // Init screens
  HomeScreen.init();
  DictScreen.init();
  InstallPWA.init();
  registerSW();

  // Start on home
  Router.go('home');

  // Level test back
  document.getElementById('leveltest-back')?.addEventListener('click', () => Router.go('home'));

  // Prevent context menu on long press (mobile)
  document.addEventListener('contextmenu', e => e.preventDefault());

  console.log('🇫🇷 FrançaisRU — Application initialisée');
});
