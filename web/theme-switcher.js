/* ============================================================
   theme-switcher.js — Selector de temas (7 temas CI system)
   Protocolos Red SOC · @xavimape
   ============================================================ */

'use strict';

const themeSwitcher = (function () {

  const STORAGE_KEY = 'protocolos-soc-theme';

  const THEMES = [
    { id: 'vision-ui',        label: '🌑 Vision UI'        },
    { id: 'midnight-aurora',  label: '🌌 Midnight Aurora'  },
    { id: 'cyberpunk-neon',   label: '⚡ Cyberpunk Neon'   },
    { id: 'forest-moss',      label: '🌿 Forest Moss'      },
    { id: 'solarized-sand',   label: '☀️ Solarized Sand'   },
    { id: 'nordic-frost',     label: '❄️ Nordic Frost'     },
    { id: 'monochrome-slate', label: '⬛ Monochrome Slate' },
  ];

  let currentTheme = localStorage.getItem(STORAGE_KEY) || 'vision-ui';

  function getTheme() { return currentTheme; }

  function setTheme(themeId) {
    if (!THEMES.find(t => t.id === themeId)) return;
    currentTheme = themeId;
    document.documentElement.setAttribute('data-theme', themeId);
    try { localStorage.setItem(STORAGE_KEY, themeId); } catch {}
    _syncSelect();
    document.dispatchEvent(new CustomEvent('theme:change', { detail: { theme: themeId } }));
  }

  function _syncSelect() {
    const sel = document.getElementById('theme-select');
    if (sel && sel.value !== currentTheme) sel.value = currentTheme;
  }

  function _buildSelect(sel) {
    sel.innerHTML = '';
    THEMES.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = t.label;
      if (t.id === currentTheme) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener('change', () => setTheme(sel.value));
  }

  function init() {
    // Aplicar tema ANTES de pintar (anti-flash)
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.addEventListener('DOMContentLoaded', () => {
      const sel = document.getElementById('theme-select');
      if (sel) _buildSelect(sel);
    });
  }

  init();

  return { getTheme, setTheme, THEMES };

})();

window.themeSwitcher = themeSwitcher;
