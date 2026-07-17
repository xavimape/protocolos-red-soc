/* ============================================================
   i18n-core.js — Motor de traducción ES / EN + claves globales
   Protocolos Red SOC · @xavimape
   ============================================================
   Carga este archivo primero, y despues el i18n-<modulo>.js del
   modulo correspondiente (agrega sus claves via i18n.register()).
   Uso en HTML:
     <span data-i18n="hub.title"></span>
     <button data-i18n="nav.github"></button>
   En JS:
     i18n.t('hub.title')          → string traducido
     i18n.setLang('en')           → cambia idioma
     i18n.getLang()               → 'es' | 'en'
     i18n.register({...})         → agrega claves de un modulo
   ============================================================ */

'use strict';

const i18n = (function () {

  const STORAGE_KEY = 'protocolos-soc-lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'es';

  // ── Traducciones ─────────────────────────────────────────────
  const T = {
        'nav.hub': "← Hub",
        'nav.github': "GitHub",
        'nav.lang': "ES",
        'nav.theme': "Theme",
        'nav.back':        { es: 'Inicio',  en: 'Inicio' },
        'hub.title': "9 <span class=\"highlight\">Protocols</span> and the Attacks<br>every SOC Analyst must know",
        'hub.tagline': "🔍 Know the protocol · ⚡ Understand the risk · 🎯 Detect the attack",
        'hub.search':      { es: 'Buscar protocolo o ataque... (ej: DNS tunneling, SYN flood)',
                         en: 'Search protocol or attack... (e.g., DNS tunneling, SYN flood)' },
        'hub.filter.all': "All",
        'hub.filter.transport': "Transport Layer",
        'hub.filter.app': "Application Layer",
        'card.attacks': "attacks",
        'card.arrow': "→",
        'card.dns.fullname': "Domain Name System",
        'card.dns.desc':      { es: 'Demos: Cache Poisoning · DNS Tunneling · DGA Detection. Base de toda comunicación en Internet.',
                           en: 'Demos: Cache Poisoning · DNS Tunneling · DGA Detection. Foundation of all Internet communication.' },
        'card.http.fullname': "HyperText Transfer Protocol",
        'card.http.desc':     { es: 'Demos: XSS · SQLi · CSRF · Session Hijacking. Protocolo base del tráfico web.',
                             en: 'Demos: XSS · SQLi · CSRF · Session Hijacking. Core protocol for web traffic.' },
        'card.tcp.fullname': "Transmission Control Protocol",
        'card.tcp.desc':      { es: 'Demos: SYN Flood · Port Scan · RST Injection · Session Hijacking.',
                             en: 'Reliable connection-oriented communication. 3-way handshake.' },
        'card.udp.fullname': "User Datagram Protocol",
        'card.udp.desc':      { es: 'Comunicación rápida y sin conexión. Sin garantía de entrega.',
                             en: 'Fast, connectionless communication. No delivery guarantee.' },
        'card.dhcp.fullname': "Dynamic Host Configuration Protocol",
        'card.dhcp.desc':     { es: 'Asigna automáticamente configuración IP a dispositivos en la red.',
                             en: 'Automatically assigns IP configuration to devices on the network.' },
        'card.smb.fullname': "Server Message Block",
        'card.smb.desc': "File sharing and communication in Windows networks.",
        'card.ftp.fullname': "File Transfer Protocol",
        'card.ftp.desc': "Transfers files between hosts. Insecure by default (plaintext).",
        'card.ssh.fullname': "Secure Shell",
        'card.ssh.desc': "Secure remote access and command execution. Encrypted by default.",
        'card.tls.fullname':  { es: 'Seguridad de la Capa de Transporte',              en: 'Transport Layer Security' },
        'card.tls.desc':      { es: 'Cifra datos para comunicación segura. Base de HTTPS, SMTPS, FTPS.',
                             en: 'Encrypts data for secure communication. Foundation of HTTPS, SMTPS, FTPS.' },
        'hub.footer.license': "@xavimape · Educational and defensive use · MIT License",
        'tab.demo': "🧪 Demo Lab",
        'tab.teoria': "📖 Theory",
        'tab.ejercicios': "✏️ Exercises",
        'tab.recursos': "📚 Resources",
        'btn.run': "▶ Run",
        'btn.reset': "↺ Reset",
        'btn.next':        { es: 'Siguiente →',        en: 'Next →' },
        'btn.prev': "← Previous",
        'btn.done':        { es: '✓ Completado',       en: '✓ Completed' },
        'btn.showAnswer':  { es: '🔍 Ver respuesta',   en: '🔍 Show answer' },
        'btn.hideAnswer':  { es: '🔒 Ocultar respuesta', en: '🔒 Hide answer' },
        'ej.easy': "Easy",
        'ej.medium': "Medium",
        'ej.hard': "Hard",
        'ej.challenge': "🚨 Mini-Challenge · Resolve the incident",
        'ej.waiting': "Waiting...",
        'rec.official': "📄 Official Documentation",
        'rec.tools': "🛠️ SOC Tools",
        'rec.cves':        { es: '⚡ CVEs y Vulnerabilidades Relevantes', en: '⚡ Relevant CVEs & Vulnerabilities' },
        'rec.cheatsheet':  { es: '📋 Cheatsheet para SOC', en: '📋 SOC Cheatsheet' },
        'rec.labs':        { es: '🎯 Labs Externos Recomendados', en: '🎯 Recommended External Labs' },
        'footer.license': "@xavimape · Educational and defensive use · MIT License",
        'rec.type.tool.cli': "Tool · CLI",
        'rec.type.tool.pcap': "Tool · PCAP",
        'rec.type.tool.nsm': "Tool · NSM",
      'rec.type.tool.attack': "Tool · Attack",
      'rec.type.tool.analysis': "Tool · Analysis",
      'rec.type.defense': "Defense",
      'rec.type.reference': "Reference",
        'rec.type.tool.online': "Tool · Online",
        'rec.type.cve.crit': "CVE · Critical",
        'rec.h.wireshark': "Wireshark — DNS filters",
        'rec.h.zeek': "Zeek — dns.log",
        'rec.type.tool.proxy': "Tool · Proxy",
        'rec.type.tool.testing': { es: 'Herramienta · Testing', en: 'Tool · Testing' },
        'rec.type.cve.high': "CVE · High",
        'card.udp.desc':      { es: 'Demos: UDP Flood · Amplificación NTP/DNS/Memcached · Port Scan · DHCP Starvation. Protocolo sin conexión.',
                            en: 'Demos: UDP Flood · NTP/DNS/Memcached Amplification · Port Scan · DHCP Starvation. Connectionless protocol.' },
        'card.dhcp.desc':  { es: 'Demos: DORA handshake · DHCP Starvation · Rogue DHCP (MitM). Protocolo de asignación dinámica de IP.',
                         en: 'Demos: DORA handshake · DHCP Starvation · Rogue DHCP (MitM). Dynamic IP assignment protocol.' },
        'card.tls.fullname': { es: 'Transport Layer Security', en: 'Transport Layer Security' },
        'card.tls.desc':     { es: 'Demos: TLS Handshake · Ataques POODLE/Heartbleed/Downgrade · JA3 Fingerprinting. Cifrado en tránsito.',
                           en: 'Demos: TLS Handshake · POODLE/Heartbleed/Downgrade attacks · JA3 Fingerprinting. Encryption in transit.' },
      'rec.type.offensive.lab': "Offensive · Lab",
      'rec.type.defense.lab': "Defense · Lab",
      'rec.type.defense.ids': "Defense · IDS",
      'rec.type.detection.zeek': "Detection · Zeek",
      'rec.type.audit.testssl': "Audit · testssl",
      'rec.type.detection.ja3': "Detection · JA3",
      'rec.type.tool.scan': "Tool · Scan",
      'rec.type.tool.sysctl': "Tool · Sysctl",
      'rec.type.tool.capture': "Tool · Capture",
      'rec.type.tool.test': "Tool · Test",
      'rec.type.realcase': "Real Case",
      'rec.type.standard': "Standard",
      'rec.type.research': "Research",
  }; // end T

  // ─── Funciones del motor i18n ─────────────────────────────────

  function t(key) {
    const entry = T[key];
    if (entry === undefined) return '';
    if (typeof entry === 'string') {
      return currentLang === 'en' ? entry : '';
    }
    return entry[currentLang] || entry['es'] || '';
  }

  function applyLang() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      // Los <input>/<textarea> con placeholder traducen el atributo placeholder,
      // no el innerHTML (no tienen contenido renderizado que reemplazar).
      const usesPlaceholder = (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') && el.hasAttribute('placeholder');
      const getCurrent = () => usesPlaceholder ? el.placeholder : el.innerHTML;
      const setValue = (v) => { if (usesPlaceholder) el.placeholder = v; else el.innerHTML = v; };
      // Cachear el original en español la primera vez que se ve el elemento.
      // Las claves guardadas como string (solo inglés) confían en este cache para
      // volver a español; las claves guardadas como objeto {es,en} (HTML vacío o
      // desincronizado del diccionario) usan siempre el valor del diccionario.
      if (el.dataset.i18nEs === undefined) el.dataset.i18nEs = getCurrent();
      const key = el.getAttribute('data-i18n');
      const entry = T[key];
      if (currentLang === 'es') {
        setValue((entry && typeof entry === 'object') ? entry.es : el.dataset.i18nEs);
      } else {
        const val = t(key);
        if (val) setValue(val);
      }
    });
    // Actualizar botón de idioma
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = currentLang === 'es' ? 'EN' : 'ES';
    // Persistir
    localStorage.setItem(STORAGE_KEY, currentLang);
  }

  function setLang(lang) {
    if (lang === 'es' || lang === 'en') {
      currentLang = lang;
      applyLang();
    }
  }

  function getLang() {
    return currentLang;
  }

  function toggleLang() {
    setLang(currentLang === 'es' ? 'en' : 'es');
  }

  function register(dict) {
    Object.assign(T, dict);
  }

  // Inicializar traducciones al cargar el DOM
  document.addEventListener('DOMContentLoaded', applyLang);

  // API pública
  return { t, setLang, getLang, toggleLang, register };

})();
