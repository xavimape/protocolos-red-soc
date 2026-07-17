// ── TLS Module — app.js ────────────────────────────────────────────────────
'use strict';

const tlsDemo = (() => {

  // ── utilidades (via SOC compartido) ──────────────────────────────────────
  const $           = SOC.$;
  const rand        = SOC.rand;
  const randHex     = SOC.randHex;

  const t = (es, en) => (typeof i18n !== 'undefined' && i18n.getLang() === 'en') ? en : es;
  const sleep       = SOC.sleep;
  const createLogger = SOC.createLogger;

  // ── Demo 1: TLS Handshake ──────────────────────────────────────────────────
  async function runHandshake() {
    const host    = $('tls-host').value.trim() || 'www.banco.com';
    const version = $('tls-version').value;
    const certT   = $('tls-cert').value;
    const L = createLogger('tls-output');
    L.clear();

    const isLegacy = ['1.1','1.0','ssl3'].includes(version);
    const verLabel = { '1.3':'TLS 1.3','1.2':'TLS 1.2','1.1':'TLS 1.1 (DEPRECATED)','1.0':'TLS 1.0 (ROTO)','ssl3':'SSLv3 (ROTO — POODLE)' }[version];

    await L.log(t('=== SIMULACIÓN TLS HANDSHAKE ===', '=== TLS HANDSHAKE SIMULATION ==='), 'header', 0);
    await L.log(t(`Host: ${host}:443  Versión: ${verLabel}`, `Host: ${host}:443  Version: ${verLabel}`), 'info', 100);
    await L.log('', 'info', 50);

    if (version === 'ssl3') {
      await L.log(t('⚡ SSLv3 ESTÁ DESHABILITADO en todos los browsers modernos', '⚡ SSLv3 IS DISABLED in all modern browsers'), 'attack', 200);
      await L.log(t('  → CVE-2014-3566 (POODLE): permite descifrar cookies de sesión', '  → CVE-2014-3566 (POODLE): allows decrypting session cookies'), 'danger', 200);
      await L.log(t('  → RFC 7568: SSLv3 retirado en 2015', '  → RFC 7568: SSLv3 retired in 2015'), 'danger', 200);
      await L.log('', 'info', 100);
      await L.log(t('Si este servidor aún acepta SSLv3 (muy raro hoy):', 'If this server still accepts SSLv3 (very rare today):'), 'warn', 300);
      await L.log('  testssl.sh: POODLE (SSLv3): VULNERABLE', 'warn', 200);
      await L.log(t('  Mitigación: ssl_protocols TLSv1.2 TLSv1.3; (deshabilitar SSLv3)', '  Mitigation: ssl_protocols TLSv1.2 TLSv1.3; (disable SSLv3)'), 'code', 200);
      return;
    }

    // TCP
    await L.log('[ TCP HANDSHAKE ]', 'header', 200);
    await L.log(t(`Cliente  →  ${host}:443  [SYN]`, `Client  →  ${host}:443  [SYN]`), 'send', 300);
    await L.log(t(`${host}:443  →  Cliente  [SYN-ACK]`, `${host}:443  →  Client  [SYN-ACK]`), 'recv', 300);

    if (isLegacy) {
      await L.log(t(`⚠ ${verLabel} — DEPRECATED/ROTO. No debería negociarse con servidores modernos`, `⚠ ${verLabel} — DEPRECATED/BROKEN. Should not be negotiated with modern servers`), 'warn', 200);
    }

    if (version === '1.3') {
      // TLS 1.3 — 1 RTT
      await L.log('', 'info', 100);
      await L.log('[ TLS 1.3 — ClientHello (incluye KeyShare) ]', 'header', 200);
      const sessionId = randHex(32);
      const random    = randHex(32);
      await L.log(t(`Cliente  →  ${host}  [ClientHello]`, `Client  →  ${host}  [ClientHello]`), 'send', 400);
      await L.log(`  Version: TLS 1.3  Random: ${random}`, 'code', 200);
      await L.log(`  Cipher Suites: TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256`, 'code', 200);
      await L.log(`  Extensions:`, 'code', 200);
      await L.log(`    supported_versions: [TLS 1.3, TLS 1.2]`, 'code', 150);
      await L.log(`    server_name: ${host}  (SNI)`, 'code', 150);
      await L.log(t(`    key_share: (clave pública efímera x25519)  ← TLS 1.3: ya en el hello`, `    key_share: (ephemeral public key x25519)  ← TLS 1.3: already in the hello`), 'code', 150);

      await L.log('', 'info', 100);
      await L.log('[ TLS 1.3 — ServerHello + Encrypted response ]', 'header', 200);
      await L.log(t(`${host}  →  Cliente  [ServerHello]`, `${host}  →  Client  [ServerHello]`), 'recv', 400);
      await L.log(`  Version: TLS 1.3  Cipher: TLS_AES_256_GCM_SHA384`, 'code', 200);
      await L.log(t(`  key_share: (clave pública efímera del servidor x25519)`, `  key_share: (server ephemeral public key x25519)`), 'code', 200);
      await L.log(t(`  ✔ Session key derivada por ambos lados (ECDH)  →  canal cifrado AHORA`, `  ✔ Session key derived by both sides (ECDH)  →  channel encrypted NOW`), 'success', 300);
      await L.log(t(`${host}  →  Cliente  {EncryptedExtensions + Certificate + CertificateVerify + Finished}`, `${host}  →  Client  {EncryptedExtensions + Certificate + CertificateVerify + Finished}`), 'recv', 400);
      await L.log(t(`  Todo este bloque va CIFRADO — incluyendo el certificado`, `  This whole block is ENCRYPTED — including the certificate`), 'code', 200);

    } else {
      // TLS 1.2 — 2 RTT
      await L.log('', 'info', 100);
      await L.log('[ TLS 1.2 — ClientHello ]', 'header', 200);
      const random = randHex(32);
      await L.log(t(`Cliente  →  ${host}  [ClientHello]`, `Client  →  ${host}  [ClientHello]`), 'send', 400);
      await L.log(`  Version: TLS 1.2  Random: ${random}`, 'code', 200);
      await L.log(`  Cipher Suites: ECDHE-RSA-AES256-GCM-SHA384, ECDHE-RSA-CHACHA20-POLY1305...`, 'code', 200);
      await L.log(`  Extensions: server_name=${host}  (SNI)`, 'code', 200);

      await L.log('', 'info', 100);
      await L.log('[ TLS 1.2 — ServerHello + Certificate ]', 'header', 200);
      await L.log(t(`${host}  →  Cliente  [ServerHello]`, `${host}  →  Client  [ServerHello]`), 'recv', 400);
      await L.log(t(`  Cipher elegido: ECDHE-RSA-AES256-GCM-SHA384`, `  Chosen cipher: ECDHE-RSA-AES256-GCM-SHA384`), 'code', 200);
      await L.log(t(`${host}  →  Cliente  [Certificate]  ← certificado en CLARO hasta aquí`, `${host}  →  Client  [Certificate]  ← certificate in CLEARTEXT up to here`), 'recv', 400);
      await L.log(t(`${host}  →  Cliente  [ServerKeyExchange + ServerHelloDone]`, `${host}  →  Client  [ServerKeyExchange + ServerHelloDone]`), 'recv', 400);

      await L.log('', 'info', 100);
      await L.log('[ TLS 1.2 — ClientKeyExchange ]', 'header', 200);
      await L.log(t(`Cliente  →  ${host}  [ClientKeyExchange + ChangeCipherSpec + Finished]`, `Client  →  ${host}  [ClientKeyExchange + ChangeCipherSpec + Finished]`), 'send', 400);
      await L.log(t(`${host}  →  Cliente  [ChangeCipherSpec + Finished]  ← cifrado AHORA`, `${host}  →  Client  [ChangeCipherSpec + Finished]  ← encrypted NOW`), 'recv', 400);
      await L.log(t(`  ✔ Handshake completo — canal cifrado`, `  ✔ Handshake complete — encrypted channel`), 'success', 300);
    }

    // Certificate validation
    await L.log('', 'info', 100);
    await L.log(t('[ VALIDACIÓN DEL CERTIFICADO ]', '[ CERTIFICATE VALIDATION ]'), 'header', 200);

    const serial = `${randHex(2)}:${randHex(2)}:${randHex(2)}:${randHex(2)}`.toUpperCase();
    const now  = new Date();

    if (certT === 'valid') {
      const exp  = new Date(now); exp.setFullYear(exp.getFullYear() + 1);
      await L.log(`Subject:  CN=${host}, O=Empresa SA, C=AR`, 'code', 200);
      await L.log(`SANs:     DNS:${host}, DNS:${host.replace('www.','')}`, 'code', 200);
      await L.log(`Issuer:   DigiCert TLS RSA SHA256 2020 CA1`, 'code', 200);
      await L.log(`Valid:    ${now.toISOString().split('T')[0]} → ${exp.toISOString().split('T')[0]}`, 'code', 200);
      await L.log(`Serial:   ${serial}`, 'code', 200);
      await L.log(`Key:      ECDSA 256 bits`, 'code', 200);
      await L.log(t(`✔ Certificado válido — cadena de confianza correcta`, `✔ Valid certificate — correct chain of trust`), 'success', 300);
      await L.log(t(`✔ Hostname ${host} coincide con el certificado`, `✔ Hostname ${host} matches the certificate`), 'success', 200);

    } else if (certT === 'expired') {
      const exp  = new Date(now); exp.setMonth(exp.getMonth() - 3);
      await L.log(`Subject:  CN=${host}`, 'code', 200);
      await L.log(t(`Valid To: ${exp.toISOString().split('T')[0]}  ← EXPIRADO hace 3 meses`, `Valid To: ${exp.toISOString().split('T')[0]}  ← EXPIRED 3 months ago`), 'danger', 200);
      await L.log(`✖ NET::ERR_CERT_DATE_INVALID`, 'danger', 300);
      await L.log(t(`⚠ Browser muestra alerta de certificado expirado`, `⚠ Browser shows an expired certificate alert`), 'warn', 200);
      await L.log(t(`IOC SOC: certificados expirados pueden indicar abandono del servidor`, `IOC SOC: expired certificates can indicate server abandonment`), 'warn', 200);
      await L.log(t(`         o equipo que no renovó (Let's Encrypt = 90 días)`, `         or a device that did not renew (Let's Encrypt = 90 days)`), 'warn', 200);

    } else if (certT === 'selfsigned') {
      await L.log(`Subject:  CN=${host}`, 'code', 200);
      await L.log(t(`Issuer:   CN=${host}  ← ¡mismo que subject! AUTOFIRMADO`, `Issuer:   CN=${host}  ← same as subject! SELF-SIGNED`), 'danger', 200);
      await L.log(`✖ NET::ERR_CERT_AUTHORITY_INVALID`, 'danger', 300);
      await L.log(t(`⚠ CA no reconocida — el browser no puede verificar la identidad`, `⚠ Unrecognized CA — the browser cannot verify the identity`), 'warn', 200);
      await L.log(t(`IOC SOC: certs autofirmados en servicios producción → revisar`, `IOC SOC: self-signed certs on production services → review`), 'warn', 200);
      await L.log(t(`         Malware/C2 frecuentemente usa certs autofirmados`, `         Malware/C2 frequently use self-signed certs`), 'warn', 200);
      await L.log(t(`Uso legítimo: servicios internos de desarrollo/staging (no producción)`, `Legitimate use: internal dev/staging services (not production)`), 'code', 200);

    } else {
      await L.log(t(`Subject:  CN=otro-dominio.com  ← NO coincide con ${host}`, `Subject:  CN=other-domain.com  ← does NOT match ${host}`), 'danger', 200);
      await L.log(t(`SANs:     DNS:otro-dominio.com`, `SANs:     DNS:other-domain.com`), 'danger', 200);
      await L.log(`✖ NET::ERR_CERT_COMMON_NAME_INVALID`, 'danger', 300);
      await L.log(t(`⚠ Posibles causas: CDN mal configurado, MitM, IP compartida`, `⚠ Possible causes: misconfigured CDN, MitM, shared IP`), 'warn', 200);
      await L.log(t(`IOC SOC: si un dominio interno sirve cert de otro host → investigar`, `IOC SOC: if an internal domain serves another host cert → investigate`), 'warn', 200);
    }
  }

  // ── Demo 2: TLS Attacks ────────────────────────────────────────────────────
  async function runAttack() {
    const atkType = $('tls-attack').value;
    const target  = $('tls-atk-target').value.trim() || 'vulnerable-server.empresa.com';
    const L = createLogger('tls-atk-output');
    L.clear();

    if (atkType === 'poodle') {
      await L.log('=== POODLE ATTACK — CVE-2014-3566 ===', 'header', 0);
      await L.log(t(`Objetivo: ${target}  (verifica si acepta SSLv3)`, `Target: ${target}  (checks whether it accepts SSLv3)`), 'info', 100);
      await L.log('', 'info', 100);
      await L.log(t('[ FASE 1: DETECCIÓN ]', '[ PHASE 1: DETECTION ]'), 'header', 200);
      await L.log(`openssl s_client -ssl3 -connect ${target}:443`, 'code', 300);
      await sleep(600);
      await L.log(`CONNECTED(00000005)`, 'recv', 400);
      await L.log(`SSL-Session:`, 'recv', 300);
      await L.log(`    Protocol  : SSLv3`, 'recv', 300);
      await L.log(`    Cipher    : AES256-SHA`, 'recv', 300);
      await L.log(t(`⚡ VULNERABLE: el servidor acepta SSLv3`, `⚡ VULNERABLE: the server accepts SSLv3`), 'attack', 200);
      await L.log('', 'info', 100);
      await L.log(t('[ FASE 2: DOWNGRADE + POODLE ]', '[ PHASE 2: DOWNGRADE + POODLE ]'), 'header', 200);
      await L.log(t('Atacante (MitM): interfiere el handshake TLS 1.2', 'Attacker (MitM): interferes with the TLS 1.2 handshake'), 'attack', 300);
      await L.log(t('  Cliente intenta TLS 1.2  → atacante hace fallar el handshake', '  Client tries TLS 1.2  → attacker makes the handshake fail'), 'attack', 300);
      await L.log(t('  Cliente retry con TLS 1.1 → atacante hace fallar de nuevo', '  Client retries with TLS 1.1 → attacker makes it fail again'), 'attack', 300);
      await L.log(t('  Cliente retry con SSLv3   → atacante permite → POODLE activo', '  Client retries with SSLv3   → attacker allows → POODLE active'), 'attack', 300);
      await L.log('', 'info', 100);
      await L.log(t('Ahora el atacante explota el CBC padding de SSLv3:', 'Now the attacker exploits SSLv3 CBC padding:'), 'header', 200);
      await L.log(t('  256 requests por byte de la cookie de sesión', '  256 requests per byte of the session cookie'), 'code', 200);
      await L.log(t('  Cookie de 16 bytes → ~4096 requests para descifrarla', '  16-byte cookie → ~4096 requests to decrypt it'), 'code', 200);
      await L.log(t('  Tiempo: ~5 minutos con script automatizado', '  Time: ~5 minutes with an automated script'), 'code', 200);
      await L.log(t('⚡ Resultado: session cookie descifrada → impersonación del usuario', '⚡ Result: session cookie decrypted → user impersonation'), 'attack', 200);
      await L.log('', 'info', 100);
      await L.log(t('MITIGACIÓN:', 'MITIGATION:'), 'header', 200);
      await L.log(t('  ssl_protocols TLSv1.2 TLSv1.3;  ← deshabilita SSLv3, TLS 1.0, 1.1', '  ssl_protocols TLSv1.2 TLSv1.3;  ← disables SSLv3, TLS 1.0, 1.1'), 'code', 200);
      await L.log(t('  TLS_FALLBACK_SCSV: señaliza que el cliente está en fallback', '  TLS_FALLBACK_SCSV: signals that the client is in fallback'), 'code', 200);

    } else if (atkType === 'heartbleed') {
      await L.log('=== HEARTBLEED — CVE-2014-0160 ===', 'header', 0);
      await L.log(t(`Objetivo: ${target}`, `Target: ${target}`), 'info', 100);
      await L.log(t('Afecta: OpenSSL 1.0.1 hasta 1.0.1f', 'Affects: OpenSSL 1.0.1 through 1.0.1f'), 'warn', 200);
      await L.log('', 'info', 100);
      await L.log(t('[ VERIFICAR VULNERABILIDAD ]', '[ CHECK VULNERABILITY ]'), 'header', 200);
      await L.log(`nmap -p 443 --script ssl-heartbleed ${target}`, 'code', 300);
      await sleep(600);
      await L.log(`| ssl-heartbleed:`, 'recv', 400);
      await L.log(`|   VULNERABLE:`, 'recv', 300);
      await L.log(`|   The Heartbleed Bug is a serious vulnerability in the popular`, 'recv', 300);
      await L.log(`|   OpenSSL cryptographic software library.`, 'recv', 300);
      await L.log(`|_  Risk factor: High  CVSSv2: 5.0`, 'recv', 300);
      await L.log('', 'info', 100);
      await L.log(t('[ EXPLOTACIÓN ]', '[ EXPLOITATION ]'), 'header', 200);
      await L.log(t('Enviando Heartbeat malicioso:', 'Sending malicious Heartbeat:'), 'attack', 300);
      await L.log(`  [Heartbeat Request: length=64000, data="${randHex(2)}"]`, 'send', 300);
      await L.log(t(`  → El servidor responde con 64KB de su heap`, `  → The server responds with 64KB of its heap`), 'attack', 200);
      await L.log('', 'info', 100);
      await L.log(t('Contenido posible de la memoria del servidor:', 'Possible server memory content:'), 'header', 200);
      const leakedData = [
        t(`admin:${randHex(16)}  ← contraseña en memoria`, `admin:${randHex(16)}  ← password in memory`),
        t(`session_token=eyJhbGc...${randHex(24)}  ← token de sesión`, `session_token=eyJhbGc...${randHex(24)}  ← session token`),
        t(`-----BEGIN RSA PRIVATE KEY-----  ← clave privada TLS!`, `-----BEGIN RSA PRIVATE KEY-----  ← TLS private key!`),
        t(`GET / HTTP/1.1\r\nCookie: sessionid=${randHex(20)}  ← request de otro usuario`, `GET / HTTP/1.1\r\nCookie: sessionid=${randHex(20)}  ← another user's request`),
      ];
      for (const d of leakedData) {
        await L.log(`  ${d}`, 'danger', 300);
      }
      await L.log('', 'info', 100);
      await L.log(t('IMPACTO SI TIENE LA CLAVE PRIVADA:', 'IMPACT IF IT HAS THE PRIVATE KEY:'), 'header', 200);
      await L.log(t('  → Puede descifrar TODO el tráfico TLS capturado previamente', '  → Can decrypt ALL previously captured TLS traffic'), 'danger', 200);
      await L.log(t('  → Puede impersonar el servidor (MitM sin alerta)', '  → Can impersonate the server (MitM without alert)'), 'danger', 200);
      await L.log(t('ESTADO HOY: OpenSSH parcheado en 2014, casi ningún server vulnerable', 'STATUS TODAY: OpenSSL patched in 2014, almost no vulnerable server'), 'success', 300);

    } else if (atkType === 'downgrade') {
      await L.log('=== DOWNGRADE ATTACK (DROWN/FREAK) ===', 'header', 0);
      await L.log(t(`Objetivo: ${target}`, `Target: ${target}`), 'info', 100);
      await L.log('', 'info', 100);
      await L.log(t('DROWN (CVE-2016-0800) — SSLv2 comparte clave con TLS:', 'DROWN (CVE-2016-0800) — SSLv2 shares a key with TLS:'), 'header', 200);
      await L.log(`openssl s_client -ssl2 -connect ${target}:443`, 'code', 300);
      await sleep(400);
      await L.log(t('Comprobación: ¿el servidor tiene mismo cert en puerto que acepta SSLv2?', 'Check: does the server have the same cert on a port that accepts SSLv2?'), 'warn', 300);
      await L.log(t('  Si sí: DROWN permite descifrar sesiones TLS usando SSLv2 como oráculo', '  If yes: DROWN allows decrypting TLS sessions using SSLv2 as an oracle'), 'danger', 200);
      await L.log('', 'info', 100);
      await L.log('FREAK (CVE-2015-0204) — Export-grade cipher suites:', 'header', 200);
      await L.log(t('  Cliente negocia cipher EXPORT (clave 512 bits = débil)', '  Client negotiates EXPORT cipher (512-bit key = weak)'), 'attack', 300);
      await L.log(t('  Atacante MitM: fuerza export ciphers en el handshake', '  MitM attacker: forces export ciphers in the handshake'), 'attack', 300);
      await L.log(t('  Factoriza la clave de 512 bits en pocas horas', '  Factors the 512-bit key in a few hours'), 'attack', 300);
      await L.log(t('  Resultado: descifra el tráfico de la sesión', '  Result: decrypts the session traffic'), 'attack', 300);
      await L.log('', 'info', 100);
      await L.log(t('MITIGACIÓN:', 'MITIGATION:'), 'header', 200);
      await L.log(t('  Eliminar TODOS los export cipher suites:', '  Remove ALL export cipher suites:'), 'code', 200);
      await L.log('  ssl_ciphers: no incluir nada con "EXPORT", "NULL", "anon", "RC4"', 'code', 200);
      await L.log(t('  Deshabilitar SSLv2 completamente (ya está en todos los servidores modernos)', '  Disable SSLv2 completely (already the case on all modern servers)'), 'code', 200);

    } else if (atkType === 'beast') {
      await L.log('=== BEAST — Browser Exploit Against SSL/TLS ===', 'header', 0);
      await L.log(t(`Objetivo: ${target}   Requiere: TLS 1.0 + CBC cipher`, `Target: ${target}   Requires: TLS 1.0 + CBC cipher`), 'info', 100);
      await L.log('CVE-2011-3389  MITRE T1573 — Encrypted Channel', 'muted', 100);
      await L.log('', 'info', 200);
      await L.log(t('[ CONDICIÓN PREVIA ]', '[ PRECONDITION ]'), 'header', 0);
      await L.log(t(`  Servidor ofrece TLS 1.0: `, `  Server offers TLS 1.0: `), 'info', 200);
      await L.log(t(`  testssl.sh → TLS 1.0: offered  ← VULNERABLE A BEAST`, `  testssl.sh → TLS 1.0: offered  ← VULNERABLE TO BEAST`), 'danger', 200);
      await L.log('', 'info', 200);
      await L.log(t('[ MECANISMO ]', '[ MECHANISM ]'), 'header', 0);
      await L.log(t('  TLS 1.0 usa CBC con IV predecible (IV = último bloque cifrado)', '  TLS 1.0 uses CBC with a predictable IV (IV = last encrypted block)'), 'danger', 200);
      await L.log(t('  Atacante MitM observa el tráfico cifrado + controla JS en el browser', '  MitM attacker observes the encrypted traffic + controls JS in the browser'), 'attack', 200);
      await L.log(t('  JS inyectado elige plaintexts para adivinar byte a byte la cookie de sesión', '  Injected JS chooses plaintexts to guess the session cookie byte by byte'), 'attack', 300);
      await L.log(t('  → 256 intentos por byte  ×  16 bytes de cookie  = ~4096 requests', '  → 256 attempts per byte  ×  16 cookie bytes  = ~4096 requests'), 'danger', 200);
      await L.log('', 'info', 200);
      await L.log(t('[ FLUJO DEL ATAQUE ]', '[ ATTACK FLOW ]'), 'header', 0);
      await L.log(t(`  Cliente → ${target}: ClientHello (TLS 1.0)`, `  Client → ${target}: ClientHello (TLS 1.0)`), 'send', 300);
      await L.log(t(`  ${target} → Cliente: ServerHello TLS 1.0, AES-128-CBC  ← IV predecible!`, `  ${target} → Client: ServerHello TLS 1.0, AES-128-CBC  ← predictable IV!`), 'recv', 300);
      await L.log(t('  Atacante: JavaScript inyectado → envía requests con plaintexts conocidos', '  Attacker: injected JavaScript → sends requests with known plaintexts'), 'attack', 300);
      await L.log(t('  Atacante: observa ciphertext → compara bloques CBC → adivina 1 byte', '  Attacker: observes ciphertext → compares CBC blocks → guesses 1 byte'), 'attack', 300);
      await L.log(t('  Atacante: repite ×16 → cookie completa extraída', '  Attacker: repeats ×16 → full cookie extracted'), 'danger', 300);
      await L.log('', 'info', 200);
      await L.log(t('[ MITIGACIÓN ]', '[ MITIGATION ]'), 'header', 0);
      await L.log(t('  ✅ Deshabilitar TLS 1.0 y 1.1 (hace BEAST imposible)', '  ✅ Disable TLS 1.0 and 1.1 (makes BEAST impossible)'), 'success', 200);
      await L.log(t('  ✅ En TLS 1.2: preferir AEAD ciphers (GCM, POLY1305) sobre CBC', '  ✅ In TLS 1.2: prefer AEAD ciphers (GCM, POLY1305) over CBC'), 'success', 200);
      await L.log(t('  ✅ TLS 1.3 no usa CBC → inmune por diseño', '  ✅ TLS 1.3 does not use CBC → immune by design'), 'success', 200);
      await L.log(t('  Nginx: ssl_protocols TLSv1.2 TLSv1.3;  ← elimina TLS 1.0', '  Nginx: ssl_protocols TLSv1.2 TLSv1.3;  ← removes TLS 1.0'), 'code', 200);
      await L.log(t('  Estado actual: BEAST fue parcheado en browsers 2012 (1/n splitting)', '  Current status: BEAST was patched in browsers in 2012 (1/n splitting)'), 'muted', 200);

    } else if (atkType === 'crime') {
      await L.log('=== CRIME / BREACH — Compression Oracle ===', 'header', 0);
      await L.log(t(`Objetivo: ${target}`, `Target: ${target}`), 'info', 100);
      await L.log('CRIME: CVE-2012-4929 (TLS compression)  |  BREACH: CVE-2013-3587 (HTTP compression)', 'muted', 100);
      await L.log('', 'info', 200);
      await L.log('[ CRIME — TLS-level compression ]', 'header', 0);
      await L.log(t('  PROBLEMA: TLS permitía comprimir el payload antes de cifrarlo', '  PROBLEM: TLS allowed compressing the payload before encrypting it'), 'danger', 200);
      await L.log(t('  La compresión reduce el tamaño si hay strings repetidos en el plaintext', '  Compression reduces size when there are repeated strings in the plaintext'), 'info', 200);
      await L.log(t('  Atacante puede inyectar requests → observar tamaño comprimido → oráculo!', '  Attacker can inject requests → observe compressed size → oracle!'), 'attack', 300);
      await L.log('', 'info', 200);
      await L.log(t('  Cliente → Servidor: GET /page  Cookie: session=XXXX (comprimido+cifrado)', '  Client → Server: GET /page  Cookie: session=XXXX (compressed+encrypted)'), 'send', 300);
      await L.log(t('  Atacante: inyecta "session=A" en URL → mide tamaño → si es más chico: acierto!', '  Attacker: injects "session=A" in the URL → measures size → if smaller: hit!'), 'attack', 300);
      await L.log(t('  Atacante: adivina cookie char por char  → sesión robada', '  Attacker: guesses cookie char by char  → session stolen'), 'danger', 300);
      await L.log('', 'info', 200);
      await L.log('[ BREACH — HTTP gzip compression ]', 'header', 0);
      await L.log(t('  BREACH reutiliza el mismo principio pero a nivel HTTP (gzip/deflate)', '  BREACH reuses the same principle but at the HTTP level (gzip/deflate)'), 'danger', 200);
      await L.log(t('  Requiere: respuesta HTTP comprimida + contenido de request reflejado en respuesta', '  Requires: compressed HTTP response + request content reflected in the response'), 'danger', 200);
      await L.log(t('  Afecta a TLS 1.3 también (la compresión es HTTP, no TLS)', '  Affects TLS 1.3 too (the compression is HTTP, not TLS)'), 'danger', 300);
      await L.log('', 'info', 200);
      await L.log(t('[ MITIGACIÓN ]', '[ MITIGATION ]'), 'header', 0);
      await L.log(t('  CRIME: ✅ deshabilitar TLS compression (ya está off en TLS 1.3, en 1.2 configurar)', '  CRIME: ✅ disable TLS compression (already off in TLS 1.3, configure in 1.2)'), 'success', 200);
      await L.log(t('  Nginx: ssl_compression off;  ← previene CRIME', '  Nginx: ssl_compression off;  ← prevents CRIME'), 'code', 200);
      await L.log(t('  BREACH: separar secrets de contenido reflejado | tokens anti-CSRF rotatorios', '  BREACH: separate secrets from reflected content | rotating anti-CSRF tokens'), 'success', 200);
      await L.log(t('  BREACH: deshabilitar gzip en respuestas que contengan secrets', '  BREACH: disable gzip on responses containing secrets'), 'success', 200);

    } else if (atkType === 'sweet32') {
      await L.log(t('=== SWEET32 — Birthday Attack en 3DES ===', '=== SWEET32 — Birthday Attack on 3DES ==='), 'header', 0);
      await L.log(t(`Objetivo: ${target}`, `Target: ${target}`), 'info', 100);
      await L.log(t('CVE-2016-2183  Investigadores: Bhargavan & Leurent (INRIA 2016)', 'CVE-2016-2183  Researchers: Bhargavan & Leurent (INRIA 2016)'), 'muted', 100);
      await L.log('', 'info', 200);
      await L.log(t('[ EL PROBLEMA CON 3DES ]', '[ THE PROBLEM WITH 3DES ]'), 'header', 0);
      await L.log(t('  3DES usa bloques de 64 bits (8 bytes)', '  3DES uses 64-bit blocks (8 bytes)'), 'danger', 200);
      await L.log(t('  Birthday paradox: con 2^(n/2) bloques → colisión probable', '  Birthday paradox: with 2^(n/2) blocks → collision likely'), 'danger', 200);
      await L.log(t('  Para n=64: 2^32 bloques = ~32GB de tráfico = colisión esperada', '  For n=64: 2^32 blocks = ~32GB of traffic = expected collision'), 'danger', 200);
      await L.log('', 'info', 200);
      await L.log(t('[ MECANISMO DEL ATAQUE ]', '[ ATTACK MECHANISM ]'), 'header', 0);
      await L.log(t('  Atacante MitM captura tráfico TLS cifrado con 3DES-CBC', '  MitM attacker captures TLS traffic encrypted with 3DES-CBC'), 'attack', 200);
      await L.log(t('  Genera tráfico masivo (mantiene sesión HTTP/1.1 con keepalive)', '  Generates massive traffic (keeps an HTTP/1.1 session with keepalive)'), 'attack', 200);
      await L.log(t('  A los ~32GB dos bloques de ciphertext son iguales → misma clave XOR plaintext', '  At ~32GB two ciphertext blocks are equal → same key XOR plaintext'), 'danger', 300);
      await L.log(t('  Si el atacante controla uno de los plaintexts → puede adivinar el otro', '  If the attacker controls one of the plaintexts → can guess the other'), 'danger', 300);
      await L.log(t('  Target típico: cookie de sesión (fijo, se repite en cada request)', '  Typical target: session cookie (fixed, repeated in every request)'), 'danger', 200);
      await L.log('', 'info', 200);
      await L.log(t('[ CONTEXTO PRÁCTICO ]', '[ PRACTICAL CONTEXT ]'), 'header', 0);
      await L.log(t('  32GB parece mucho, pero en HTTPS moderno con pipelining:', '  32GB seems like a lot, but in modern HTTPS with pipelining:'), 'muted', 200);
      await L.log(t('  → Una sesión de 30 min con video streaming puede generar 32GB', '  → A 30-min session with video streaming can generate 32GB'), 'warning', 200);
      await L.log(t('  → Script automatizado puede forzarlo en menos tiempo', '  → An automated script can force it in less time'), 'warning', 200);
      await L.log('', 'info', 200);
      await L.log(t('[ VERIFICAR SI ES VULNERABLE ]', '[ CHECK IF VULNERABLE ]'), 'header', 0);
      await L.log(`  nmap --script ssl-enum-ciphers -p 443 ${target}`, 'code', 300);
      await L.log(`  testssl.sh --sweet32 ${target}`, 'code', 200);
      await L.log('', 'info', 200);
      await L.log(t('[ MITIGACIÓN ]', '[ MITIGATION ]'), 'header', 0);
      await L.log(t('  OK Eliminar 3DES de las cipher suites del servidor', '  OK Remove 3DES from the server cipher suites'), 'success', 200);
      await L.log(t('  Nginx: ssl_ciphers NO incluir "3DES" ni "DES"', '  Nginx: ssl_ciphers do NOT include "3DES" or "DES"'), 'code', 200);
      await L.log(t('  OK TLS 1.3 no incluye 3DES -- actualizar a TLS 1.3', '  OK TLS 1.3 does not include 3DES -- upgrade to TLS 1.3'), 'success', 200);
      await L.log(t('  OK Limitar tamano de sesion TLS o forzar renegociacion periodica', '  OK Limit TLS session size or force periodic renegotiation'), 'success', 200);

    } else if (atkType === 'reneg') {
      await L.log('=== SSL RENEGOTIATION ATTACK -- CVE-2009-3555 ===', 'header', 0);
      await L.log(t('Objetivo: ' + target, 'Target: ' + target), 'info', 100);
      await L.log(t('Descubierto por Marsh Ray & Steve Dispensa (2009)', 'Discovered by Marsh Ray & Steve Dispensa (2009)'), 'muted', 100);
      await L.log('', 'info', 200);
      await L.log(t('[ QUE ES LA RENEGOCIACION TLS ]', '[ WHAT IS TLS RENEGOTIATION ]'), 'header', 0);
      await L.log(t('  TLS permite renegociar los parametros de una sesion existente', '  TLS allows renegotiating the parameters of an existing session'), 'info', 200);
      await L.log(t('  Casos legitimos: cambiar cipher suite, agregar auth de cliente', '  Legitimate cases: change cipher suite, add client auth'), 'muted', 200);
      await L.log('', 'info', 200);
      await L.log(t('[ EL ATAQUE ]', '[ THE ATTACK ]'), 'header', 0);
      await L.log(t('  Atacante abre conexion TLS al servidor', '  Attacker opens a TLS connection to the server'), 'attack', 200);
      await L.log(t('  Atacante inyecta datos HTTP maliciosos antes del handshake del cliente', '  Attacker injects malicious HTTP data before the client handshake'), 'attack', 300);
      await L.log(t('  Atacante dispara renegociacion TLS -- el cliente real se une', '  Attacker triggers TLS renegotiation -- the real client joins'), 'attack', 300);
      await L.log(t('  Servidor concatena los datos del atacante + los del cliente', '  Server concatenates the attacker data + the client data'), 'danger', 300);
      await L.log(t('  Resultado: servidor procesa request con datos inyectados autenticados por cliente', '  Result: server processes the request with injected data authenticated by the client'), 'danger', 300);
      await L.log('', 'info', 200);
      await L.log(t('[ MITIGACION -- RFC 5746 ]', '[ MITIGATION -- RFC 5746 ]'), 'header', 0);
      await L.log('  OK TLS Renegotiation Indication Extension (RFC 5746)', 'success', 200);
      await L.log(t('  El servidor solo acepta renegociacion con token criptografico correcto', '  The server only accepts renegotiation with the correct cryptographic token'), 'success', 200);
      await L.log(t('  OK Deshabilitar renegociacion iniciada por cliente', '  OK Disable client-initiated renegotiation'), 'success', 200);
      await L.log(t('  Estado: parcheado en OpenSSL 0.9.8m+ y todos los servidores modernos', '  Status: patched in OpenSSL 0.9.8m+ and all modern servers'), 'muted', 200);

    } else {
      // weak cipher detection
      await L.log('=== WEAK CIPHER SUITE DETECTION ===', 'header', 0);
      await L.log(t('Objetivo: ' + target, 'Target: ' + target), 'info', 100);
      await L.log(t('Herramienta: testssl.sh --cipher-per-proto', 'Tool: testssl.sh --cipher-per-proto'), 'code', 200);
      await L.log('', 'info', 100);
      await L.log(t('[ TLS 1.2 CIPHER SUITES OFRECIDAS ]', '[ TLS 1.2 CIPHER SUITES OFFERED ]'), 'header', 200);

      const ciphers = [
        { name: 'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384', status: 'OK', note: 'OK -- forward secrecy + AEAD' },
        { name: 'TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305',  status: 'OK', note: 'OK -- excelente cipher moderno' },
        { name: 'TLS_RSA_WITH_AES_256_CBC_SHA256',       status: 'WN', note: 'Sin forward secrecy (RSA key exchange)' },
        { name: 'TLS_RSA_WITH_3DES_EDE_CBC_SHA',         status: 'ER', note: 'SWEET32 vulnerable -- deshabilitar' },
        { name: 'TLS_RSA_WITH_RC4_128_SHA',              status: 'ER', note: 'RC4 ROTO -- deshabilitar urgente' },
        { name: 'TLS_RSA_WITH_NULL_SHA',                 status: 'ER', note: 'NULL cipher = SIN CIFRADO' },
      ];

      for (const c of ciphers) {
        const lt = c.status === 'OK' ? 'success' : c.status === 'WN' ? 'warning' : 'danger';
        await L.log('  [' + c.status + '] ' + c.name.padEnd(48) + ' ' + c.note, lt, 200);
      }

      await L.log('', 'info', 100);
      await L.log(t('CALIFICACION: D (por RC4 + NULL cipher ofrecidos)', 'RATING: D (due to RC4 + NULL ciphers offered)'), 'danger', 300);
      await L.log('', 'info', 100);
      await L.log(t('ACCION: configurar ssl_ciphers en Nginx/Apache:', 'ACTION: configure ssl_ciphers in Nginx/Apache:'), 'header', 200);
      await L.log("  ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:", 'code', 200);
      await L.log("              ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305';", 'code', 200);
      await L.log(t('  -> Elimina todos los ciphers debiles, solo forward secrecy', '  -> Removes all weak ciphers, forward secrecy only'), 'success', 200);
    }
  }

  // -- Demo 3: JA3 Fingerprinting -------------------------------------------
  async function runJA3() {
    const client = document.getElementById('ja3-client').value;
    const out    = document.getElementById('ja3-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const JA3_DATA = {
      chrome: {
        label: { es: 'Chrome / Firefox', en: 'Chrome / Firefox' },
        version: '771',
        ciphers: '4866,4867,4865,49195,49199,52393,52392,49196,49200,49162,49161,49171,49172,51,57,47,53',
        extensions: '0,23,65281,10,11,35,16,5,13,18,51,45,43,27,17513',
        curves: '29,23,24',
        ja3: '7dcce5b76c8b17472d024758970a406b',
        verdict: { es: 'LEGITIMO', en: 'LEGITIMATE' },
        type: 'success',
        detail: { es: 'Patron de browser moderno -- legitimo en redes corporativas', en: 'Modern browser pattern -- legitimate on corporate networks' },
      },
      curl: {
        label: { es: 'curl / Python requests', en: 'curl / Python requests' },
        version: '771',
        ciphers: '49200,49196,49192,49188,49172,49162,159,107,57,52393,52392,52394,65413',
        extensions: '0,11,10,13,16',
        curves: '29,23,24,25',
        ja3: 'a0e9f5d64349fb13191bc781f81f42e1',
        verdict: { es: 'HERRAMIENTA', en: 'TOOL' },
        type: 'warning',
        detail: { es: 'Herramienta CLI/script -- puede ser automatizacion legitima o recon', en: 'CLI/script tool -- could be legitimate automation or recon' },
      },
      cobalt: {
        label: { es: 'Cobalt Strike beacon', en: 'Cobalt Strike beacon' },
        version: '769',
        ciphers: '49162,49161,49171,49172,53,47,5,10',
        extensions: '0,65281',
        curves: '23,24,25',
        ja3: '72a589da586844d7f0818ce684948eea',
        verdict: { es: 'COBALT STRIKE C2', en: 'COBALT STRIKE C2' },
        type: 'danger',
        detail: { es: 'Framework de ataque comercial/pirata. Usar como C2 por APTs y ransomware groups', en: 'Commercial/pirated attack framework. Used as C2 by APTs and ransomware groups' },
      },
      malware: {
        label: { es: 'Malware generico (cipher minimo)', en: 'Generic malware (minimal cipher)' },
        version: '769',
        ciphers: '47,53',
        extensions: '',
        curves: '',
        ja3: 'de9f2c7fd25e1b3afad3e85a0bd17d9b',
        verdict: { es: 'MALWARE (cipher minimo)', en: 'MALWARE (minimal cipher)' },
        type: 'danger',
        detail: { es: 'Implementacion TLS minima -- tipico en malware que solo necesita cifrar C2', en: 'Minimal TLS implementation -- typical of malware that only needs to encrypt C2' },
      },
    };

    const d = JA3_DATA[client];
    await L.log('=== JA3 FINGERPRINTING ===', 'header', 0);
    await L.log(t('Cliente simulado: ' + d.label.es, 'Simulated client: ' + d.label.en), 'info', 200);
    await L.log('', 'info', 200);
    await L.log(t('[ ClientHello campos ]', '[ ClientHello fields ]'), 'header', 0);
    await L.log('  TLSVersion:     ' + d.version + ' (decimal)', 'muted', 200);
    await L.log('  Ciphers:        ' + d.ciphers, 'muted', 200);
    await L.log('  Extensions:     ' + (d.extensions || t('(ninguna)','(none)')), 'muted', 200);
    await L.log('  EllipticCurves: ' + (d.curves || t('(ninguna)','(none)')), 'muted', 200);
    await L.log('', 'info', 200);
    await L.log(t('[ Calculo JA3 ]', '[ JA3 Computation ]'), 'header', 0);
    await L.log('  JA3_string = "' + d.version + ',' + d.ciphers + ',' + d.extensions + ',' + d.curves + ',"', 'code', 300);
    await L.log('  JA3 = MD5(JA3_string)', 'code', 200);
    await L.log('  JA3 hash: ' + d.ja3, 'code', 300);
    await L.log('', 'info', 200);
    await L.log(t('[ Veredicto ]', '[ Verdict ]'), 'header', 0);
    await L.log(t('  ' + d.verdict.es + ' -- ' + d.detail.es, '  ' + d.verdict.en + ' -- ' + d.detail.en), d.type, 300);

    if (d.type === 'danger') {
      await L.log('', 'info', 200);
      await L.log(t('  ACCION RECOMENDADA:', '  RECOMMENDED ACTION:'), 'header', 0);
      await L.log(t('  1. Identificar host de origen', '  1. Identify the source host'), 'danger', 200);
      await L.log(t('  2. Aislar si se confirma C2/malware', '  2. Isolate if C2/malware is confirmed'), 'danger', 200);
      await L.log(t('  3. Hacer threat intel del IP destino', '  3. Run threat intel on the destination IP'), 'danger', 200);
      await L.log(t('  4. Buscar mismo JA3 en otros hosts de la red', '  4. Search for the same JA3 on other hosts in the network'), 'danger', 200);
    }
  }

  // -- Reset -----------------------------------------------------------------
  function reset() {
    const ids = ['tls-output', 'tls-atk-output', 'ja3-output'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = '<div class="log-line"><span class="log-time">[->]</span><span class="log-info">' + t('Esperando simulacion TLS...','Waiting for TLS simulation...') + '</span></div>';
    });
    document.getElementById('tls-host').value     = 'www.banco.com';
    document.getElementById('tls-version').value  = '1.3';
    document.getElementById('tls-cert').value     = 'valid';
    document.getElementById('tls-attack').value   = 'poodle';
    document.getElementById('tls-atk-target').value = 'vulnerable-server.empresa.com';
  }

  return { runHandshake, runAttack, runJA3, reset };

})();

window.tlsDemo = tlsDemo;
