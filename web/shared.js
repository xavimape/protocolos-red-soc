/* ============================================================
   shared.js — Utilidades compartidas entre módulos
   Protocolos Red SOC · @xavimape
   ============================================================ */

'use strict';

// ── Google Analytics (carga directa, sin aviso de cookies) ────
function loadAnalytics() {
  if (window._gaLoaded) return;
  window._gaLoaded = true;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-ESGBTFHKTK';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-ESGBTFHKTK', { anonymize_ip: true });
}
loadAnalytics();

// ── Configuracion de protocolos ──────────────────────────────
const PROTOCOLS = {
  dns:  { name: 'DNS',        color: '#00ff88', layer: 'Aplicacion', num: 1 },
  http: { name: 'HTTP/HTTPS', color: '#00d4ff', layer: 'Aplicacion', num: 2 },
  tcp:  { name: 'TCP',        color: '#4488ff', layer: 'Transporte', num: 3 },
  udp:  { name: 'UDP',        color: '#aa44ff', layer: 'Transporte', num: 4 },
  dhcp: { name: 'DHCP',       color: '#ff8800', layer: 'Aplicacion', num: 5 },
  smb:  { name: 'SMB',        color: '#ff4444', layer: 'Aplicacion', num: 6 },
  ftp:  { name: 'FTP',        color: '#ffcc00', layer: 'Aplicacion', num: 7 },
  ssh:  { name: 'SSH',        color: '#00ffcc', layer: 'Aplicacion', num: 8 },
  tls:  { name: 'TLS/SSL',    color: '#ff44aa', layer: 'Transporte', num: 9 },
};

// ── Progreso del usuario (localStorage) ──────────────────────
const STORAGE_KEY = 'protocolos-soc-progress';

function getProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function saveProgress(moduleId, tab) {
  const progress = getProgress();
  if (!progress[moduleId]) progress[moduleId] = { visited: true, tabs: [] };
  if (tab && !progress[moduleId].tabs.includes(tab)) {
    progress[moduleId].tabs.push(tab);
  }
  progress[moduleId].visited = true;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch {}
  updateProgressDots(moduleId);
}

function isVisited(moduleId) {
  const p = getProgress();
  return !!(p[moduleId] && p[moduleId].visited);
}

function getVisitedTabs(moduleId) {
  const p = getProgress();
  return (p[moduleId] && p[moduleId].tabs) || [];
}

function updateProgressDots(moduleId) {
  const dots = document.querySelectorAll('.proto-card[data-module="' + moduleId + '"] .progress-dot');
  const tabs = getVisitedTabs(moduleId);
  dots.forEach(function(dot, i) { if (i < tabs.length) dot.classList.add('visited'); });
}

function initProgressDots() {
  document.querySelectorAll('.proto-card[data-module]').forEach(function(card) {
    const id = card.dataset.module;
    if (isVisited(id)) updateProgressDots(id);
  });
}

// ── Motor de Tabs ─────────────────────────────────────────────
const TABS = ['demo', 'teoria', 'ejercicios', 'recursos'];
const TAB_LABELS = {
  demo:       { icon: 'Demo Lab' },
  teoria:     { icon: 'Teoria' },
  ejercicios: { icon: 'Ejercicios' },
  recursos:   { icon: 'Recursos' },
};

function initTabs(moduleId) {
  const proto = PROTOCOLS[moduleId];
  if (!proto) return;
  document.documentElement.style.setProperty('--proto-color', proto.color);
  const nav = document.querySelector('.tabs-nav');
  if (!nav) return;
  const params = new URLSearchParams(window.location.search);
  const initialTab = params.get('tab') || 'demo';
  if (!nav.children.length) {
    TABS.forEach(function(tabId) {
      const btn = document.createElement('button');
      btn.className = 'tab-btn' + (tabId === initialTab ? ' active' : '');
      btn.dataset.tab = tabId;
      btn.textContent = TAB_LABELS[tabId].icon;
      btn.addEventListener('click', function() { switchTab(moduleId, tabId); });
      nav.appendChild(btn);
    });
  }
  switchTab(moduleId, initialTab, false);
}

function switchTab(moduleId, tabId, updateUrl) {
  if (updateUrl === undefined) updateUrl = true;
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    var on = btn.dataset.tab === tabId;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-selected', on ? 'true' : 'false');
    btn.setAttribute('tabindex', on ? '0' : '-1');
  });
  document.querySelectorAll('.tab-content').forEach(function(panel) {
    panel.classList.toggle('active', panel.dataset.tab === tabId);
  });
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tabId);
    history.replaceState(null, '', url.toString());
  }
  saveProgress(moduleId, tabId);
}

// ── Accesibilidad de tabs (ARIA tablist + teclado) ───────────
// Los tabs son HTML estático con onclick=SOC.switchTab(...). Esta función
// aplica el patrón ARIA "tablist" sobre el HTML existente (sin tocar los
// 9 index.html) y convierte las zonas de log en live regions para lectores
// de pantalla. Se auto-ejecuta en DOMContentLoaded; no hace nada en páginas
// sin .tabs-nav (ej. el hub).
function initTabsA11y() {
  var nav = document.querySelector('.tabs-nav');
  if (nav) {
    nav.setAttribute('role', 'tablist');
    var btns = Array.prototype.slice.call(nav.querySelectorAll('.tab-btn'));
    btns.forEach(function(btn) {
      var tabId = btn.dataset.tab;
      var panel = document.querySelector('.tab-content[data-tab="' + tabId + '"]');
      var btnId = 'soc-tab-' + tabId;
      var panelId = 'soc-panel-' + tabId;
      var on = btn.classList.contains('active');
      btn.setAttribute('role', 'tab');
      btn.id = btnId;
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
      btn.setAttribute('tabindex', on ? '0' : '-1');
      if (panel) {
        btn.setAttribute('aria-controls', panelId);
        panel.id = panelId;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', btnId);
        panel.setAttribute('tabindex', '0');
      }
    });
    // Navegación por teclado: flechas / Home / End (activación automática)
    nav.addEventListener('keydown', function(e) {
      if (['ArrowLeft','ArrowRight','Home','End'].indexOf(e.key) === -1) return;
      e.preventDefault();
      var i = btns.indexOf(document.activeElement);
      if (i === -1) i = 0;
      var next = i;
      if (e.key === 'ArrowRight') next = (i + 1) % btns.length;
      else if (e.key === 'ArrowLeft') next = (i - 1 + btns.length) % btns.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = btns.length - 1;
      var target = btns[next];
      if (target) { target.click(); target.focus(); }
    });
  }
  // Zonas de log como live regions (se anuncian los renglones nuevos)
  document.querySelectorAll('.demo-output').forEach(function(el) {
    if (!el.hasAttribute('role')) el.setAttribute('role', 'log');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'false');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTabsA11y);
} else {
  initTabsA11y();
}

// ── Motor de Slides ───────────────────────────────────────────
function initSlides(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const slides = container.querySelectorAll('.slide');
  const navContainer = container.nextElementSibling;
  if (!slides.length) return;
  let current = 0;

  function goTo(idx) {
    slides[current].classList.remove('active');
    navContainer.querySelectorAll('.prog-dot')[current].classList.remove('active');
    navContainer.querySelectorAll('.prog-dot')[current].classList.add('done');
    current = Math.max(0, Math.min(idx, slides.length - 1));
    slides[current].classList.add('active');
    navContainer.querySelectorAll('.prog-dot')[current].classList.add('active');
    navContainer.querySelectorAll('.prog-dot')[current].classList.remove('done');
    updateNavBtns();
  }

  function updateNavBtns() {
    const prev = navContainer.querySelector('.btn-prev');
    const next = navContainer.querySelector('.btn-next');
    if (prev) prev.disabled = current === 0;
    if (next) next.textContent = current === slides.length - 1
      ? i18n.t('btn.done')
      : i18n.t('btn.next');
  }

  if (navContainer && navContainer.classList.contains('slides-nav')) {
    const prevBtn = navContainer.querySelector('.btn-prev');
    const nextBtn = navContainer.querySelector('.btn-next');
    const dotsContainer = navContainer.querySelector('.slides-progress');
    if (dotsContainer && !dotsContainer.children.length) {
      slides.forEach(function(_, i) {
        const dot = document.createElement('span');
        dot.className = 'prog-dot' + (i === 0 ? ' active' : '');
        dot.title = 'Slide ' + (i + 1);
        dot.addEventListener('click', function() { goTo(i); });
        dotsContainer.appendChild(dot);
      });
    }
    if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function() {
      if (current < slides.length - 1) goTo(current + 1);
    });
  }

  slides[0].classList.add('active');
  updateNavBtns();
  document.addEventListener('i18n:change', updateNavBtns);
}

// ── Ejercicios acordeon ───────────────────────────────────────
function initEjercicios() {
  document.querySelectorAll('.ejercicio-header').forEach(function(header) {
    header.addEventListener('click', function() {
      const body = header.nextElementSibling;
      const isOpen = body.classList.contains('open');
      document.querySelectorAll('.ejercicio-body').forEach(function(b) { b.classList.remove('open'); });
      if (!isOpen) body.classList.add('open');
    });
  });
  document.querySelectorAll('.respuesta-toggle').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const box = btn.nextElementSibling;
      const isOpen = box.classList.contains('open');
      box.classList.toggle('open', !isOpen);
      btn.textContent = isOpen ? i18n.t('btn.showAnswer') : i18n.t('btn.hideAnswer');
    });
  });
  document.addEventListener('i18n:change', function() {
    document.querySelectorAll('.respuesta-toggle').forEach(function(btn) {
      const box = btn.nextElementSibling;
      const isOpen = box && box.classList.contains('open');
      btn.textContent = isOpen ? i18n.t('btn.hideAnswer') : i18n.t('btn.showAnswer');
    });
  });
}

// ── Demo output (log animado) ────────────────────────────────
// Acepta un elemento DOM o un string ID.
// Tipos estándar (con timestamp): info, data, muted, warn/warning, danger/error, success/ok
// Tipos extendidos (con ícono prefix): send →, recv ←, code, attack ⚡, header ─
var LOG_TYPE_MAP = {
  info:    { prefix: null,   cls: 'log-info'    },
  data:    { prefix: null,   cls: 'log-data'    },
  muted:   { prefix: null,   cls: 'log-muted'   },
  warn:    { prefix: null,   cls: 'log-warn'    },
  warning: { prefix: null,   cls: 'log-warning' },
  danger:  { prefix: null,   cls: 'log-danger'  },
  error:   { prefix: null,   cls: 'log-error'   },
  success: { prefix: null,   cls: 'log-success' },
  ok:      { prefix: null,   cls: 'log-ok'      },
  send:    { prefix: '  →',  cls: 'log-send'    },
  recv:    { prefix: '  ←',  cls: 'log-recv'    },
  code:    { prefix: '   ',  cls: 'log-code'    },
  attack:  { prefix: '  ⚡', cls: 'log-attack'  },
  header:  { prefix: '  ─',  cls: 'log-header'  },
};

function createLogger(outputEl) {
  if (typeof outputEl === 'string') {
    outputEl = document.getElementById(outputEl) || outputEl;
  }
  return {
    clear: function() { outputEl.innerHTML = ''; },
    log: function(msg, type, delay) {
      if (!type) type = 'info';
      if (delay === undefined) delay = 0;
      return new Promise(function(resolve) {
        setTimeout(function() {
          var line = document.createElement('div');
          line.className = 'log-line';
          var now = new Date();
          var ts = String(now.getHours()).padStart(2,'0') + ':'
            + String(now.getMinutes()).padStart(2,'0') + ':'
            + String(now.getSeconds()).padStart(2,'0');
          var t = LOG_TYPE_MAP[type] || LOG_TYPE_MAP.info;
          var prefixHtml = t.prefix !== null
            ? '<span class="' + t.cls + '">' + t.prefix + '</span>'
            : '<span class="log-time">[' + ts + ']</span>';
          line.innerHTML = prefixHtml + '<span class="' + t.cls + '">' + msg + '</span>';
          outputEl.appendChild(line);
          outputEl.scrollTop = outputEl.scrollHeight;
          resolve();
        }, delay);
      });
    }
  };
}

async function runSteps(steps, logger, delayMs) {
  if (!delayMs) delayMs = 600;
  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    const d = (s.delay !== undefined) ? s.delay : (i === 0 ? 0 : delayMs);
    await logger.log(s.msg, s.type || 'info', d);
  }
}

// ── Back-to-top button ───────────────────────────────────────
function initBackToTop() {
  if (document.getElementById('back-to-top')) return;
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.title = 'Volver arriba';
  btn.innerHTML = '↑';
  document.body.appendChild(btn);
  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Hub busqueda y filtros ────────────────────────────────────
function initHub() {
  const search = document.getElementById('proto-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.proto-card');
  if (!search && !filterBtns.length) return;

  function filterCards() {
    const q = search ? search.value.toLowerCase() : '';
    const active = document.querySelector('.filter-btn.active');
    const cat = active ? active.dataset.filter : 'all';
    cards.forEach(function(card) {
      const text = card.textContent.toLowerCase();
      const cardCat = card.dataset.layer || '';
      const matchQ = !q || text.includes(q);
      const matchCat = cat === 'all' || cardCat === cat;
      card.style.display = matchQ && matchCat ? '' : 'none';
    });
  }

  if (search) search.addEventListener('input', filterCards);
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      filterCards();
    });
  });
}

// ── Utilidades compartidas (evitar duplicación en módulos) ───
function socRand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function socRandHex(len) { return Array.from({length: len}, function() { return socRand(0,15).toString(16); }).join(''); }
function socSleep(ms) { return new Promise(function(r) { setTimeout(r, ms); }); }
function socGetEl(id) { return document.getElementById(id); }

// ── Namespace SOC ─────────────────────────────────────────────
const SOC = {
  initTabs:       initTabs,
  switchTab:      switchTab,
  initTabsA11y:   initTabsA11y,
  initSlides:     initSlides,
  initEjercicios: initEjercicios,
  initBackToTop:  initBackToTop,
  createLogger:   createLogger,
  runSteps:       runSteps,
  saveProgress:   saveProgress,
  isVisited:      isVisited,
  getVisitedTabs: getVisitedTabs,
  // Utilidades compartidas entre módulos
  rand:    socRand,
  randHex: socRandHex,
  sleep:   socSleep,
  $:       socGetEl,
};
window.SOC = SOC;

// ── Auto-init ─────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initHub();
    initProgressDots();
    initBackToTop();
  });
} else {
  initHub();
  initProgressDots();
  initBackToTop();
}
