/* ============================================================
   i18n-tls.js — Traducciones EN del modulo TLS
   Protocolos Red SOC · @xavimape
   ============================================================
   Requiere que i18n-core.js este cargado antes (usa i18n.register).
   ============================================================ */

'use strict';

i18n.register({
      'tls.subtitle': "Transport Layer Security · Underlying TCP · Session Layer",
      'tls.demo.waiting': "Waiting for TLS simulation...",
      'tls.demo.handshake.title': "TLS Handshake — Cipher negotiation",
      'tls.demo.handshake.host': "Domain / server:",
      'tls.demo.handshake.version': "TLS version:",
      'tls.demo.handshake.cert': "Certificate type:",
      'tls.demo.handshake.output': "TLS messages",
      'tls.demo.btn.handshake': "▶ Simulate TLS handshake",
      'tls.demo.attack.title': "⚔️ Demo: Attacks against TLS",
      'tls.demo.attack.desc':         { es: 'TLS tiene una larga historia de vulnerabilidades. Muchas dependen de versiones antiguas (SSLv3, TLS 1.0), cipher suites débiles, o errores de implementación como Heartbleed.',
                                      en: 'TLS has a long history of vulnerabilities. Many depend on old versions (SSLv3, TLS 1.0), weak cipher suites, or implementation bugs like Heartbleed.' },
      'tls.demo.attack.panel': "Select attack",
      'tls.demo.attack.type': "Attack:",
      'tls.demo.attack.target': "Target:",
      'tls.demo.attack.output': "Attack analysis",
      'tls.demo.btn.attack': "▶ Simulate attack",
      'tls.demo.ja3.title': "🔍 Demo: JA3 Fingerprinting — Identify TLS clients",
      'tls.demo.ja3.desc':            { es: 'JA3 es una técnica de fingerprinting que identifica el cliente TLS (browser, malware, herramienta) por los valores del ClientHello. Los C2 maliciosos tienen JA3 conocidos — se puede usar para detección sin ver el contenido cifrado.',
                                      en: 'JA3 is a fingerprinting technique that identifies the TLS client (browser, malware, tool) from ClientHello values. Malicious C2s have known JA3 hashes — usable for detection without seeing encrypted content.' },
      'tls.demo.ja3.panel': "Simulate ClientHello",
      'tls.demo.ja3.client': "Client type:",
      'tls.demo.ja3.output': "JA3 fingerprint",
      'tls.demo.btn.ja3': "▶ Generate JA3",
      'tls.s1.title': "What is TLS?",
      'tls.s1.sub': "The security layer protecting HTTPS, SMTP, IMAP and more",
      'tls.s1.p1':            { es: 'TLS (Transport Layer Security) es el protocolo criptográfico que proporciona privacidad e integridad a las comunicaciones en Internet. Es el "S" en HTTPS. Reemplazó a SSL, aunque coloquialmente todavía se dice "SSL".',
                              en: 'TLS (Transport Layer Security) is the cryptographic protocol that provides privacy and integrity for Internet communications. It is the "S" in HTTPS. It replaced SSL, though "SSL" is still colloquially used.' },
      'tls.s1.provides.title': "TLS provides three guarantees:",
      'tls.s1.p_c': "🔒 <strong>Confidentiality</strong> — data is encrypted, no one can read it in transit",
      'tls.s1.p_i': "✅ <strong>Integrity</strong> — any traffic modification is detectable (MAC/AEAD)",
      'tls.s1.p_a':           { es: '🏛️ <strong>Autenticación</strong> — certificados X.509 prueban la identidad del servidor', en: '🏛️ <strong>Authentication</strong> — X.509 certificates prove server identity' },
      'tls.s1.col.v': "Version",
      'tls.s1.col.s': "Status",
      'tls.s1.col.n': "Note",
      'tls.s2.title': "The TLS Handshake (1.2 vs 1.3)",
      'tls.s2.sub': "Version, cipher suite and authentication negotiation",
      'tls.s3.title': "X.509 Certificates and PKI",
      'tls.s3.sub': "The chain of trust behind the green padlock",
      'tls.s4.title': "Attack 1: POODLE — Downgrade to SSLv3",
      'tls.s4.sub': "CVE-2014-3566 — Padding Oracle On Downgraded Legacy Encryption",
      'tls.s4.p1': "POODLE exploits the fact that many servers in 2014 still supported SSLv3 as a fallback. The attacker (MitM) forces a downgrade from TLS to SSLv3, then exploits a CBC padding weakness to decrypt session cookies.",
      'tls.s5.title': "Attack 2: Heartbleed",
      'tls.s5.sub': "CVE-2014-0160 — the bug that read the Internet's memory",
      'tls.s5.p1': "Heartbleed was a catastrophic bug in OpenSSL that allowed any attacker to read up to 64KB of server process memory per request — without authentication and leaving no trace in normal logs.",
      'tls.s6.title': "MitM with fake certificate",
      'tls.s6.sub': "SSL Inspection, corporate MitM and real attacks",
      'tls.s7.title': "JA3 and TLS in SOC telemetry",
      'tls.s7.sub': "Zeek ssl.log + JA3 fingerprinting — detect malware without decrypting traffic",
      'tls.s8.title': "TLS Hardening and best practices",
      'tls.s8.sub': "Minimum secure configuration for TLS servers",
      'tls.s8.h1': "Only TLS 1.2 and 1.3",
      'tls.s8.h2': "Secure cipher suites",
      'tls.s8.h3': "Forward Secrecy",
      'tls.s8.h4': "HSTS",
      'tls.s8.h5': "Certificate renewal",
      'tls.s8.h6': "Certificate Transparency monitoring",
      'tls.s8.h7': "Test with testssl.sh or SSL Labs",
      'tls.ej1.title': "Analyze Zeek ssl.log — what is suspicious?",
      'tls.ej1.q': "Analyze this Zeek ssl.log extract. Identify all suspicious entries and explain why:",
      'tls.ej2.title': "JA3 match — what is running on the network?",
      'tls.ej2.q': "The SIEM alerted on suspicious JA3 hashes. Analyze each one and determine the action:",
      'tls.ej3.title': "Audit TLS configuration of a server",
      'tls.ej3.q': "The company web server got a \"B\" rating on SSL Labs. Analyze the report and prioritize the fixes:",
      'tls.ej4.title': "Can the SOC detect attacks inside TLS?",
      'tls.ej4.q': "A colleague says: \"If traffic is encrypted with TLS we can't detect anything.\" Are they right? Explain what the SOC can and cannot see in TLS traffic.",
      'tls.ej5.title':  { es: 'Escribir regla Sigma — detección TLS sospechoso',            en: 'Write Sigma rule — suspicious TLS detection' },
      'tls.ej5.q':      { es: 'Escribí reglas Sigma para detectar: (1) cipher suites débiles en ssl.log, (2) JA3 de Cobalt Strike, (3) certificados con CA desconocida en dominios internos.',
                        en: 'Write Sigma rules to detect: (1) weak cipher suites in ssl.log, (2) Cobalt Strike JA3, (3) certificates with unknown CA on internal domains.' },
      'tls.challenge.title': { es: 'Incidente #TLS-001: "El firewall dice que el tráfico está cifrado — ¿por qué el SIEM alertó?"',
                             en: 'Incident #TLS-001: "The firewall says traffic is encrypted — why did the SIEM alert?"' },
      'tls.challenge.q':     { es: '¿Qué pasó? ¿Cómo respondés?', en: 'What happened? How do you respond?' },
      'tls.challenge.ctx':   { es: 'El SIEM generó una alerta: "Cobalt Strike JA3 detectado — 10.0.0.88 → 45.33.32.156:443". El analista de red dice que el tráfico va cifrado (TLS 1.2, AES-256) y no puede ver el contenido. El usuario de 10.0.0.88 dice que no hizo nada.',
                             en: 'The SIEM generated an alert: "Cobalt Strike JA3 detected — 10.0.0.88 → 45.33.32.156:443". The network analyst says the traffic is encrypted (TLS 1.2, AES-256) and they cannot see the content. The user of 10.0.0.88 says they did nothing.' },
      'tls.s9.title': "Attack 3: BEAST — CBC Padding Oracle",
      'tls.s9.sub': "CVE-2011-3389 — Browser Exploit Against SSL/TLS",
      'tls.s9.p1': "BEAST exploits the fact that TLS 1.0 uses CBC with a predictable IV (the last ciphertext block). A MitM attacker with injected JavaScript can guess the encrypted content byte by byte — typically a session cookie.",
      'tls.s10.title': "Attack 4: CRIME / BREACH — Compression Oracle",
      'tls.s10.sub': "CVE-2012-4929 / CVE-2013-3587 — Compression as a side channel",
      'tls.s10.p1': "CRIME and BREACH exploit the fact that compression reveals information about content: if the attacker can inject text and observe the compressed size, they can guess secret bytes one at a time.",
      'tls.s11.title': "Attack 5: SWEET32 — Birthday Attack on 3DES",
      'tls.s11.sub': "CVE-2016-2183 — Block collisions in 64-bit ciphers",
      'tls.s11.p1':    { es: 'SWEET32 explota la paradoja del cumpleaños aplicada a cifrados de bloque de 64 bits como 3DES. Con suficiente tráfico bajo la misma clave (~32GB), es estadísticamente probable encontrar dos bloques de ciphertext idénticos.',
                       en: 'SWEET32 exploits the birthday paradox applied to 64-bit block ciphers like 3DES. With enough traffic under the same key (~32GB), finding two identical ciphertext blocks becomes statistically likely.' },
      'tls.s12.title': "Attack 6: SSL Renegotiation Attack",
      'tls.s12.sub': "CVE-2009-3555 — Data injection into existing TLS sessions",
      'tls.s12.p1':    { es: 'TLS permite renegociar los parámetros de una sesión existente. Antes de RFC 5746, no había ningún mecanismo que vinculara criptográficamente la renegociación con la sesión original, permitiendo inyección de datos maliciosos.',
                       en: 'TLS allows renegotiating the parameters of an existing session. Before RFC 5746, there was no mechanism to cryptographically bind the renegotiation to the original session, allowing malicious data injection.' },
    'tls.ver.v2s': "❌ BROKEN",
    'tls.ver.v2n': "Retired 1996 — multiple critical vulnerabilities",
    'tls.ver.v3s': "❌ BROKEN",
    'tls.ver.v3n': "POODLE (2014) — do not use",
    'tls.ver.v10n': "BEAST, CRIME, LUCKY13 — RFC 8996 retires it",
    'tls.ver.v11n': "RFC 8996 — retired along with 1.0",
    'tls.ver.v12s': "⚠ ACCEPTABLE",
    'tls.ver.v12n': "OK with secure cipher suites, no RC4/3DES",
    'tls.ver.v13s': "✅ RECOMMENDED",
    'tls.ver.v13n': "Clean design, mandatory forward secrecy, faster",
    'tls.ch.r1b': "Compromised host with active C2",
    'tls.ch.r1c': "Critical — isolate host, immediate IR",
    'tls.ch.r2b': "Active Metasploit reverse shell",
    'tls.ch.r2c': "Critical — isolate host, immediate IR",
    'tls.ch.r3a': "TLS to an IP with no SNI from a workstation",
    'tls.ch.r3c': "Investigate the process on the host",
    'tls.ch.r4a': "RC4 or 3DES cipher in ssl.log",
    'tls.ch.r4b': "Legacy server or MitM with downgrade",
    'tls.ch.r4c': "Fix the TLS configuration",
    'tls.ch.r5a': "Unknown CA in corporate traffic",
    'tls.ch.r5b': "MitM / fake certificate / interceptor",
    'tls.ch.r5c': "High — check for an authorized MitM proxy",
    'tls.ch.r6a': "Beacon every N seconds ± jitter",
    'tls.ch.r6c': "Correlate JA3, volume, threat intel of the destination",
    'tls.ch.r7a': { es: `orig_bytes >> resp_bytes en TLS largo`, en: `orig_bytes >> resp_bytes in a long TLS session` },
    'tls.ch.r7b': "Encrypted exfiltration",
    'tls.ch.r7c': "Alert, correlate with DLP and file access",
    'tls.ch.r8a': "New cert for *.empresa.com in CT Logs",
    'tls.ch.r8b': "Shadow IT or preparatory phishing",
    'tls.ch.r8c': "Verify with the team, revoke if unauthorized",
    'tls.rec.h4.testssl': "testssl.sh — full TLS audit",
    'tls.rec.h4.ja3': "JA3 with Zeek",
    'tls.workshopend': "End of the workshop ✓",
    'tls.pre0': { es: `
TLS 1.2 — 2 round-trips (4 mensajes):
  Cliente → Servidor: ClientHello
    - Versiones soportadas, cipher suites soportadas
    - Random (32 bytes)
    - Session ID, extensiones (SNI, ALPN...)

  Servidor → Cliente: ServerHello + Certificate + ServerHelloDone
    - Versión y cipher suite elegida
    - Random del servidor
    - Certificado X.509 del servidor

  Cliente → Servidor: ClientKeyExchange + ChangeCipherSpec + Finished
    - Clave pre-master (RSA) o parámetros DH
    - ¡Ahora el canal está cifrado!

  Servidor → Cliente: ChangeCipherSpec + Finished
    - Handshake completo

TLS 1.3 — 1 round-trip (más rápido):
  Cliente → Servidor: ClientHello
    + KeyShare (ya incluye parámetros DH)
    + SupportedVersions, SignatureAlgorithms
    ↳ El cliente "apuesta" por el grupo DH más probable

  Servidor → Cliente: ServerHello + {EncryptedExtensions + Certificate +
                                    CertificateVerify + Finished}
    - Todo lo que sigue ya va cifrado
    - El servidor acepta el KeyShare del cliente o pide otro

  Cliente → Servidor: {Finished}   ← 1 RT completo

VENTAJAS DE TLS 1.3:
  - 0-RTT para conexiones repetidas (con caveats de replay)
  - Forward secrecy OBLIGATORIA (ECDHE siempre)
  - Cipher suites simplificadas (sin exportkeys, sin RC4, sin CBC)
  - El handshake mismo está parcialmente cifrado`, en: `
TLS 1.2 — 2 round-trips (4 messages):
  Client → Server: ClientHello
    - Supported versions, supported cipher suites
    - Random (32 bytes)
    - Session ID, extensions (SNI, ALPN...)

  Server → Client: ServerHello + Certificate + ServerHelloDone
    - Chosen version and cipher suite
    - Server random
    - Server X.509 certificate

  Client → Server: ClientKeyExchange + ChangeCipherSpec + Finished
    - Pre-master key (RSA) or DH parameters
    - Now the channel is encrypted!

  Server → Client: ChangeCipherSpec + Finished
    - Handshake complete

TLS 1.3 — 1 round-trip (faster):
  Client → Server: ClientHello
    + KeyShare (already includes DH parameters)
    + SupportedVersions, SignatureAlgorithms
    ↳ The client "bets" on the most likely DH group

  Server → Client: ServerHello + {EncryptedExtensions + Certificate +
                                    CertificateVerify + Finished}
    - Everything after this is already encrypted
    - The server accepts the client's KeyShare or asks for another

  Client → Server: {Finished}   ← 1 full RT

TLS 1.3 ADVANTAGES:
  - 0-RTT for repeated connections (with replay caveats)
  - MANDATORY forward secrecy (always ECDHE)
  - Simplified cipher suites (no export keys, no RC4, no CBC)
  - The handshake itself is partially encrypted` },
    'tls.pre1': { es: `
CADENA DE CERTIFICADOS:
  Root CA (autoconfiado, preinstalado en OS/browser)
    └─ Intermediate CA (firmado por Root CA)
          └─ Leaf Certificate (firmado por Intermediate)
               www.banco.com — válido, no expirado, para este hostname

CAMPOS IMPORTANTES DE UN CERTIFICADO:
  Subject:          CN=www.banco.com, O=Banco SA, C=AR
  Subject Alt Names: DNS:www.banco.com, DNS:banco.com
  Issuer:           CN=DigiCert TLS RSA SHA256 2020 CA1
  Valid From:       2024-01-01 00:00:00
  Valid To:         2025-01-01 23:59:59
  Public Key:       EC 256 bits (P-256)
  Signature:        sha256WithRSAEncryption
  Serial:           0A:1B:2C:3D...

TIPOS DE CERTIFICADOS:
  DV (Domain Validation) — solo verifica control del dominio
    → La mayoría de HTTPS modernos, incluyendo Let's Encrypt
  OV (Organization Validation) — verifica la organización también
  EV (Extended Validation) — verificación rigurosa, muestra nombre org
    → Banca, gobierno — aunque los browsers ya no lo destacan visualmente

ERRORES DE CERTIFICADO (IOC en SOC):
  NET::ERR_CERT_DATE_INVALID   — certificado expirado
  NET::ERR_CERT_AUTHORITY_INVALID — CA no reconocida (posible MitM / interceptor)
  NET::ERR_CERT_COMMON_NAME_INVALID — hostname no coincide con el cert
  SEC_ERROR_REUSED_ISSUER_AND_SERIAL — certificado revocado`, en: `
CERTIFICATE CHAIN:
  Root CA (self-signed, preinstalled in the OS/browser)
    └─ Intermediate CA (signed by the Root CA)
          └─ Leaf Certificate (signed by the Intermediate)
               www.banco.com — valid, not expired, for this hostname

IMPORTANT CERTIFICATE FIELDS:
  Subject:          CN=www.banco.com, O=Banco SA, C=AR
  Subject Alt Names: DNS:www.banco.com, DNS:banco.com
  Issuer:           CN=DigiCert TLS RSA SHA256 2020 CA1
  Valid From:       2024-01-01 00:00:00
  Valid To:         2025-01-01 23:59:59
  Public Key:       EC 256 bits (P-256)
  Signature:        sha256WithRSAEncryption
  Serial:           0A:1B:2C:3D...

CERTIFICATE TYPES:
  DV (Domain Validation) — only verifies control of the domain
    → Most modern HTTPS, including Let's Encrypt
  OV (Organization Validation) — also verifies the organization
  EV (Extended Validation) — rigorous verification, shows the org name
    → Banking, government — although browsers no longer highlight it visually

CERTIFICATE ERRORS (IOC in SOC):
  NET::ERR_CERT_DATE_INVALID   — expired certificate
  NET::ERR_CERT_AUTHORITY_INVALID — unrecognized CA (possible MitM / interceptor)
  NET::ERR_CERT_COMMON_NAME_INVALID — hostname does not match the cert
  SEC_ERROR_REUSED_ISSUER_AND_SERIAL — revoked certificate` },
    'tls.pre2': { es: `
FLUJO DEL ATAQUE POODLE:

1. DOWNGRADE:
   Atacante (MitM) interfiere el handshake TLS 1.2
   Hace fallar la negociación → cliente y servidor caen a SSLv3
   (muchos clientes tenían "retry con versión inferior" automático)

2. PADDING ORACLE EN CBC:
   SSLv3 usa CBC con padding débil:
   - El padding es predecible y no autenticado
   - El atacante puede modificar bytes del ciphertext
   - Observa si el servidor acepta o rechaza el padding
   - 256 intentos por byte → extrae 1 byte del texto claro
   - Cookie de 16 bytes = ~4000 requests

3. RESULTADO:
   El atacante descifra la cookie de sesión HTTP
   Puede impersonar al usuario sin necesidad de contraseña

MITIGACIÓN:
  → Deshabilitar SSLv3 y TLS 1.0/1.1 en el servidor
  → TLS_FALLBACK_SCSV: nuevo cipher suite que señala al servidor
    que el cliente está en modo fallback → el servidor rechaza el downgrade

ESTADO ACTUAL:
  Todos los browsers modernos deshabilitaron SSLv3 en 2014-2015
  POODLE es histórico pero importante para entender downgrade attacks`, en: `
POODLE ATTACK FLOW:

1. DOWNGRADE:
   Attacker (MitM) interferes with the TLS 1.2 handshake
   Makes the negotiation fail → client and server fall back to SSLv3
   (many clients had automatic "retry with a lower version")

2. PADDING ORACLE IN CBC:
   SSLv3 uses CBC with weak padding:
   - The padding is predictable and unauthenticated
   - The attacker can modify bytes of the ciphertext
   - Observes whether the server accepts or rejects the padding
   - 256 attempts per byte → extracts 1 byte of plaintext
   - 16-byte cookie = ~4000 requests

3. RESULT:
   The attacker decrypts the HTTP session cookie
   Can impersonate the user without needing the password

MITIGATION:
  → Disable SSLv3 and TLS 1.0/1.1 on the server
  → TLS_FALLBACK_SCSV: a new cipher suite that signals to the server
    that the client is in fallback mode → the server rejects the downgrade

CURRENT STATUS:
  All modern browsers disabled SSLv3 in 2014-2015
  POODLE is historical but important for understanding downgrade attacks` },
    'tls.pre3': { es: `
EL BUG:
  TLS tiene una extensión "heartbeat": el cliente envía "PING" con un payload
  y el servidor debe responder con el mismo payload (keep-alive de conexión).

  El cliente especifica la longitud del payload en el mensaje:
  [Heartbeat Request: length=64000, data="A" (1 byte)]

  OpenSSL vulnerable confiaba en la longitud declarada:
  memcpy(respuesta, buffer, 64000)  ← lee 64KB sin verificar!
  → Copia 64KB del heap de OpenSSL en la respuesta

  Eso incluye: claves privadas TLS, contraseñas de usuarios,
               tokens de sesión, datos de otros clientes, etc.

IMPACTO:
  → ~17% de los servidores HTTPS del mundo en 2014
  → Yahoo, Imgur, OKCupid, LastPass, Wikipedia afectados
  → Un atacante podía robar la clave privada del certificado:
    → Podía descifrar TODO el tráfico pasado (si fue capturado)
    → Podía impersonar el servidor ante usuarios

CÓMO DETECTARLO (retrospectivo):
  → Logs de acceso: muchas requests a /heartbeat o requests TLS inusualmente
    grandes desde misma IP
  → IDS/Zeek: reglas para heartbeat con length != data_length

ESTADO:
  Parcheado en OpenSSL 1.0.1g (7 abril 2014)
  Hoy: todos los servidores parcheados
  LECCIÓN: las implementaciones de TLS tienen bugs, no solo el protocolo`, en: `
THE BUG:
  TLS has a "heartbeat" extension: the client sends "PING" with a payload
  and the server must reply with the same payload (connection keep-alive).

  The client specifies the payload length in the message:
  [Heartbeat Request: length=64000, data="A" (1 byte)]

  Vulnerable OpenSSL trusted the declared length:
  memcpy(response, buffer, 64000)  ← reads 64KB without checking!
  → Copies 64KB of the OpenSSL heap into the response

  That includes: TLS private keys, user passwords,
                 session tokens, other clients' data, etc.

IMPACT:
  → ~17% of the world's HTTPS servers in 2014
  → Yahoo, Imgur, OKCupid, LastPass, Wikipedia affected
  → An attacker could steal the certificate's private key:
    → Could decrypt ALL past traffic (if it was captured)
    → Could impersonate the server to users

HOW TO DETECT IT (retrospectively):
  → Access logs: many requests to /heartbeat or unusually large TLS requests
    from the same IP
  → IDS/Zeek: rules for heartbeat with length != data_length

STATUS:
  Patched in OpenSSL 1.0.1g (April 7, 2014)
  Today: all servers patched
  LESSON: TLS implementations have bugs, not just the protocol` },
    'tls.pre4': { es: `
ESCENARIO 1 — PROXY CORPORATIVO (legítimo pero importante conocer):
  Empresa instala root CA propia en todos los dispositivos
  Firewall/proxy intercepta conexiones TLS:
    Cliente → Proxy: TLS con certificado FALSO del proxy
    Proxy → Servidor: TLS real con certificado del servidor
  → La empresa puede ver todo el tráfico HTTPS (SSL inspection)
  → Los usuarios ven el candado verde (confiaron en la CA corporativa)
  → IOC: certificados firmados por "Empresa Corp CA" en lugar de DigiCert/Let's Encrypt

ESCENARIO 2 — MitM MALICIOSO:
  Atacante (WiFi pública, ARP spoofing en LAN):
    → Intercepta conexión HTTPS
    → Presenta certificado falso para el dominio
    → El browser ALERTARÍA: "Certificado no confiable"
    → ¿El usuario hace clic en "Continuar de todas formas"? ← punto de falla
  Si el atacante tiene una CA root instalada en el dispositivo → sin alertas

ESCENARIO 3 — CERTIFICATE TRANSPARENCY ABUSE:
  Let's Encrypt entrega certificados para cualquier dominio sin verificar
  Un atacante puede obtener: cert para "banco-seguro.com" (phishing)
  CT Logs: https://crt.sh permite monitorear nuevos certs para tu dominio
  DETECCIÓN: alert si aparece un cert nuevo para *.empresa.com emitido por CA desconocida

IOC EN SOC:
  Zeek ssl.log: issuer ≠ CA conocida para un dominio conocido
  Browser alert logs: ERR_CERT_AUTHORITY_INVALID para sitios internos
  NetFlow: tráfico HTTPS a IPs no en threat intel (C2 en HTTPS)`, en: `
SCENARIO 1 — CORPORATE PROXY (legitimate but important to know):
  The company installs its own root CA on all devices
  A firewall/proxy intercepts TLS connections:
    Client → Proxy: TLS with the proxy's FAKE certificate
    Proxy → Server: real TLS with the server's certificate
  → The company can see all HTTPS traffic (SSL inspection)
  → Users see the green padlock (they trusted the corporate CA)
  → IOC: certificates signed by "Empresa Corp CA" instead of DigiCert/Let's Encrypt

SCENARIO 2 — MALICIOUS MitM:
  Attacker (public WiFi, ARP spoofing on the LAN):
    → Intercepts the HTTPS connection
    → Presents a fake certificate for the domain
    → The browser WOULD ALERT: "Untrusted certificate"
    → Does the user click "Continue anyway"? ← point of failure
  If the attacker has a root CA installed on the device → no alerts

SCENARIO 3 — CERTIFICATE TRANSPARENCY ABUSE:
  Let's Encrypt issues certificates for any domain without vetting
  An attacker can obtain: a cert for "banco-seguro.com" (phishing)
  CT Logs: https://crt.sh lets you monitor new certs for your domain
  DETECTION: alert if a new cert appears for *.empresa.com issued by an unknown CA

IOC IN SOC:
  Zeek ssl.log: issuer ≠ known CA for a known domain
  Browser alert logs: ERR_CERT_AUTHORITY_INVALID for internal sites
  NetFlow: HTTPS traffic to IPs not in threat intel (C2 over HTTPS)` },
    'tls.pre5': { es: `
# Zeek ssl.log — campos principales
ts     id.orig_h     id.resp_h        version  cipher               cert_chain_fuids  subject               issuer
10:01  10.0.0.50     93.184.216.34    TLSv12   TLS_ECDHE_RSA_AES256 F1abc             example.com           DigiCert Inc
10:02  10.0.0.55     185.220.101.5    TLSv12   TLS_RSA_WITH_RC4_128 F2def  ← ⚠ RC4!  *.vps-host.ru         Unknown CA

JA3 FINGERPRINTING:
  JA3 = MD5 de: TLSVersion,Ciphers,Extensions,EllipticCurves,EllipticCurveFormats
  del ClientHello

  JA3 conocidos:
  7dcce5b76c8b17472d024758970a406b → Chrome normal
  de350869b8c85de67a350c8d186f11e6 → Firefox normal
  6734f37431670b3ab4292b8f60f29984 → Metasploit Meterpreter ← IOC
  72a589da586844d7f0818ce684948eea → Cobalt Strike por defecto ← IOC
  a0e9f5d64349fb13191bc781f81f42e1 → Python requests

  # En Zeek + JA3 script
  zeek-cut ts id.orig_h ja3 ja3s < ssl.log \\
    | grep "72a589da586844d7f0818ce684948eea"
  → Alerta: Cobalt Strike detectado

CIPHER SUITES PELIGROSAS EN ssl.log:
  RC4_*         → roto matemáticamente
  *_DES_*       → DES roto (56 bits)
  *_NULL_*      → sin cifrado (!)
  *_EXPORT_*    → claves débiles para exportación (FREAK)
  *RSA_*        → sin forward secrecy (si el servidor es comprometido, pasado descifrable)

IOC ADICIONALES:
  Certificados con validity > 825 días (Let's Encrypt = 90 días, legítimos ≤ 2 años)
  Certificados con SNI vacío (bots, scanners, algunos C2)
  Muchas conexiones TLS a misma IP con SNI diferente cada vez (C2 domain fronting)`, en: `
# Zeek ssl.log — main fields
ts     id.orig_h     id.resp_h        version  cipher               cert_chain_fuids  subject               issuer
10:01  10.0.0.50     93.184.216.34    TLSv12   TLS_ECDHE_RSA_AES256 F1abc             example.com           DigiCert Inc
10:02  10.0.0.55     185.220.101.5    TLSv12   TLS_RSA_WITH_RC4_128 F2def  ← ⚠ RC4!  *.vps-host.ru         Unknown CA

JA3 FINGERPRINTING:
  JA3 = MD5 of: TLSVersion,Ciphers,Extensions,EllipticCurves,EllipticCurveFormats
  from the ClientHello

  Known JA3s:
  7dcce5b76c8b17472d024758970a406b → normal Chrome
  de350869b8c85de67a350c8d186f11e6 → normal Firefox
  6734f37431670b3ab4292b8f60f29984 → Metasploit Meterpreter ← IOC
  72a589da586844d7f0818ce684948eea → Cobalt Strike default ← IOC
  a0e9f5d64349fb13191bc781f81f42e1 → Python requests

  # In Zeek + JA3 script
  zeek-cut ts id.orig_h ja3 ja3s < ssl.log \\
    | grep "72a589da586844d7f0818ce684948eea"
  → Alert: Cobalt Strike detected

DANGEROUS CIPHER SUITES IN ssl.log:
  RC4_*         → mathematically broken
  *_DES_*       → DES broken (56 bits)
  *_NULL_*      → no encryption (!)
  *_EXPORT_*    → weak export-grade keys (FREAK)
  *RSA_*        → no forward secrecy (if the server is compromised, past traffic is decryptable)

ADDITIONAL IOCs:
  Certificates with validity > 825 days (Let's Encrypt = 90 days, legitimate ≤ 2 years)
  Certificates with an empty SNI (bots, scanners, some C2)
  Many TLS connections to the same IP with a different SNI each time (C2 domain fronting)` },
    'tls.pre6': { es: `
# Nginx — configuración TLS mínima segura
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:
            ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
ssl_prefer_server_ciphers on;
ssl_session_tickets off;

# HSTS
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

# testssl.sh
testssl.sh --fast https://www.empresa.com
→ Muestra: versiones, ciphers, vulnerabilidades (POODLE, BEAST, CRIME, Heartbleed...)
→ Da una nota de A+ a F`, en: `
# Nginx — minimal secure TLS configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:
            ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
ssl_prefer_server_ciphers on;
ssl_session_tickets off;

# HSTS
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";

# testssl.sh
testssl.sh --fast https://www.empresa.com
→ Shows: versions, ciphers, vulnerabilities (POODLE, BEAST, CRIME, Heartbleed...)
→ Gives a grade from A+ to F` },
    'tls.pre7': { es: `
TLS 1.0 CBC — IV predecible:
  Bloque N cifrado = AES(plaintext_N XOR ciphertext_{N-1})
  IV del bloque N+1 = ciphertext_N  ← IV conocido por el atacante!

FLUJO DEL ATAQUE:
  1. Atacante MitM + JavaScript inyectado en la página víctima
  2. JavaScript elige plaintexts conocidos → observa ciphertext resultante
  3. Atacante compara: AES(plaintext_guess XOR IV_conocido) == bloque_objetivo?
  4. Si coincide → byte adivinado correctamente
  5. Repite × 16 bytes de cookie = sesión comprometida

REQUISITOS:
  → TLS 1.0 negociado (servidor + cliente)
  → Atacante MitM activo (WiFi pública, ARP spoofing)
  → JavaScript ejecutándose en el browser de la víctima

MITIGACIÓN:
  → Deshabilitar TLS 1.0 y 1.1 (BEAST imposible sin ellos)
  → TLS 1.3: CBC no existe → inmune por diseño
  → TLS 1.2 con AEAD (GCM): no usa CBC → inmune
  → Nginx: ssl_protocols TLSv1.2 TLSv1.3;`, en: `
TLS 1.0 CBC — predictable IV:
  Block N ciphertext = AES(plaintext_N XOR ciphertext_{N-1})
  IV of block N+1 = ciphertext_N  ← IV known to the attacker!

ATTACK FLOW:
  1. MitM attacker + JavaScript injected into the victim page
  2. JavaScript chooses known plaintexts → observes the resulting ciphertext
  3. Attacker compares: AES(plaintext_guess XOR known_IV) == target_block?
  4. If it matches → byte guessed correctly
  5. Repeats × 16 cookie bytes = session compromised

REQUIREMENTS:
  → TLS 1.0 negotiated (server + client)
  → Active MitM attacker (public WiFi, ARP spoofing)
  → JavaScript running in the victim's browser

MITIGATION:
  → Disable TLS 1.0 and 1.1 (BEAST impossible without them)
  → TLS 1.3: CBC does not exist → immune by design
  → TLS 1.2 with AEAD (GCM): does not use CBC → immune
  → Nginx: ssl_protocols TLSv1.2 TLSv1.3;` },
    'tls.pre8': { es: `
PRINCIPIO COMÚN:
  La compresión reduce el tamaño si hay strings repetidos.
  Si el atacante controla parte del texto Y puede observar el tamaño → oráculo.

CRIME (TLS-level compression — CVE-2012-4929):
  Requiere: TLS con compresión habilitada (DEFLATE en TLS)
  Atacante inyecta: "session=A" en URL → mide tamaño cifrado
  Si "session=A" aparece en la cookie → compresión reduce tamaño → ¡acierto!
  Repite con cada caracter del alfabeto → descifra cookie byte a byte

  MITIGACIÓN: ssl_compression off; (ya deshabilitado en TLS 1.3, configurar en 1.2)

BREACH (HTTP gzip — CVE-2013-3587):
  Mismo principio pero a nivel HTTP (gzip/deflate)
  Afecta a TLS 1.3 también (la vulnerabilidad es HTTP, no TLS)
  Requiere: respuesta HTTP comprimida + secreto reflejado en respuesta

  MITIGACIÓN:
  → No comprimir respuestas que contengan secrets
  → Tokens CSRF con componente aleatorio en cada respuesta
  → Separar secretos del contenido reflejado
  → "Masking" del cuerpo de respuesta (añadir ruido al tamaño)`, en: `
COMMON PRINCIPLE:
  Compression reduces size when there are repeated strings.
  If the attacker controls part of the text AND can observe the size → oracle.

CRIME (TLS-level compression — CVE-2012-4929):
  Requires: TLS with compression enabled (DEFLATE in TLS)
  Attacker injects: "session=A" in the URL → measures the encrypted size
  If "session=A" appears in the cookie → compression shrinks the size → hit!
  Repeats with each character of the alphabet → decrypts the cookie byte by byte

  MITIGATION: ssl_compression off; (already disabled in TLS 1.3, configure in 1.2)

BREACH (HTTP gzip — CVE-2013-3587):
  Same principle but at the HTTP level (gzip/deflate)
  Affects TLS 1.3 too (the vulnerability is HTTP, not TLS)
  Requires: compressed HTTP response + a secret reflected in the response

  MITIGATION:
  → Do not compress responses containing secrets
  → CSRF tokens with a random component in each response
  → Separate secrets from reflected content
  → "Masking" the response body (add noise to the size)` },
    'tls.pre9': { es: `
LA PARADOJA DEL CUMPLEAÑOS APLICADA A TLS:
  3DES: bloque = 64 bits → espacio de 2^64 bloques posibles
  Birthday bound: colisión probable a 2^(64/2) = 2^32 bloques ≈ 32 GB

  Si dos bloques cifrados son iguales:
    C_i = C_j → P_i XOR IV_i = P_j XOR IV_j
  Si el atacante conoce un plaintext → puede derivar el otro

CASO PRÁCTICO:
  Sesión HTTPS larga (video, WebSocket, keepalive HTTP/1.1)
  Cookie de sesión se repite en cada request → plaintext conocido
  Atacante MitM captura tráfico → espera colisión → extrae cookie

  32 GB parece mucho, pero:
  → Video HD streaming: 32 GB en ~30 minutos
  → Script automatizado puede forzar requests a alta velocidad

VERIFICAR:
  testssl.sh --sweet32 https://servidor.com
  nmap --script ssl-enum-ciphers -p 443 servidor.com  ← buscar 3DES

MITIGACIÓN:
  → Eliminar 3DES de ssl_ciphers (ningún server moderno lo necesita)
  → TLS 1.3: 3DES no existe → inmune por diseño
  → Usar AES-128-GCM o AES-256-GCM (bloque 128 bits, birthday bound ≫ 32 GB)`, en: `
THE BIRTHDAY PARADOX APPLIED TO TLS:
  3DES: block = 64 bits → space of 2^64 possible blocks
  Birthday bound: collision likely at 2^(64/2) = 2^32 blocks ≈ 32 GB

  If two encrypted blocks are equal:
    C_i = C_j → P_i XOR IV_i = P_j XOR IV_j
  If the attacker knows one plaintext → can derive the other

PRACTICAL CASE:
  Long HTTPS session (video, WebSocket, HTTP/1.1 keepalive)
  Session cookie repeats in every request → known plaintext
  MitM attacker captures traffic → waits for a collision → extracts the cookie

  32 GB seems like a lot, but:
  → HD video streaming: 32 GB in ~30 minutes
  → An automated script can force requests at high speed

CHECK:
  testssl.sh --sweet32 https://server.com
  nmap --script ssl-enum-ciphers -p 443 server.com  ← look for 3DES

MITIGATION:
  → Remove 3DES from ssl_ciphers (no modern server needs it)
  → TLS 1.3: 3DES does not exist → immune by design
  → Use AES-128-GCM or AES-256-GCM (128-bit block, birthday bound ≫ 32 GB)` },
    'tls.pre10': { es: `
FLUJO DEL ATAQUE:
                                              Servidor
  Atacante: abre conexión TLS al servidor        │
  Atacante → Servidor: "GET /admin
X-Inj: "  │ ← datos inyectados
                                                 │
  Atacante: dispara renegociación TLS            │
  [Cliente real se une a la sesión renegociada]  │
  Cliente → Servidor: GET /real Cookie: abc123   │
                                                 │
  Servidor concatena y procesa:                  │
  "GET /admin
X-Inj: GET /real Cookie: abc123" ← inyección exitosa!

IMPACTO:
  → Atacante puede hacer requests HTTP arbitrarios autenticados por el cliente
  → Si el cliente tiene sesión autenticada → atacante hereda sus privilegios
  → Acceso a endpoints protegidos sin credenciales directas

REQUISITO: servidor TLS vulnerable sin RFC 5746

SOLUCIÓN — RFC 5746 (Renegotiation Indication Extension):
  Cada renegociación incluye un "renegotiation_info" con un hash de la
  sesión anterior. El servidor verifica que coincida antes de aceptar.
  → Sin el token → renegotiación rechazada → ataque imposible

VERIFICAR:
  openssl s_client -connect servidor:443 -legacy_renegotiation
  testssl.sh --reneg https://servidor.com

ESTADO ACTUAL: todos los servidores modernos incluyen RFC 5746 (2010+)`, en: `
ATTACK FLOW:
                                              Server
  Attacker: opens a TLS connection to the server │
  Attacker → Server: "GET /admin
X-Inj: "  │ ← injected data
                                                 │
  Attacker: triggers TLS renegotiation           │
  [Real client joins the renegotiated session]   │
  Client → Server: GET /real Cookie: abc123      │
                                                 │
  Server concatenates and processes:             │
  "GET /admin
X-Inj: GET /real Cookie: abc123" ← successful injection!

IMPACT:
  → The attacker can make arbitrary HTTP requests authenticated by the client
  → If the client has an authenticated session → the attacker inherits its privileges
  → Access to protected endpoints without direct credentials

REQUIREMENT: TLS server vulnerable without RFC 5746

SOLUTION — RFC 5746 (Renegotiation Indication Extension):
  Each renegotiation includes a "renegotiation_info" with a hash of the
  previous session. The server verifies that it matches before accepting.
  → Without the token → renegotiation rejected → attack impossible

CHECK:
  openssl s_client -connect server:443 -legacy_renegotiation
  testssl.sh --reneg https://server.com

CURRENT STATUS: all modern servers include RFC 5746 (2010+)` },
    'tls.pre12': { es: `
JA3 detectados en las últimas 24h:
  Host: 10.0.0.77  JA3: 72a589da586844d7f0818ce684948eea  →  destino: 45.33.32.156:443
  Host: 10.0.0.50  JA3: 7dcce5b76c8b17472d024758970a406b  →  destino: google.com:443
  Host: 10.0.0.33  JA3: 6734f37431670b3ab4292b8f60f29984  →  destino: 1.2.3.4:443
  Host: 10.0.0.22  JA3: a0e9f5d64349fb13191bc781f81f42e1  →  destino: api.empresa.com:443

Referencias JA3 conocidos:
  72a589da586844d7f0818ce684948eea → Cobalt Strike default beacon
  7dcce5b76c8b17472d024758970a406b → Chrome 110+ (Linux/Windows)
  6734f37431670b3ab4292b8f60f29984 → Metasploit Meterpreter
  a0e9f5d64349fb13191bc781f81f42e1 → Python requests library`, en: `
JA3s detected in the last 24h:
  Host: 10.0.0.77  JA3: 72a589da586844d7f0818ce684948eea  →  destination: 45.33.32.156:443
  Host: 10.0.0.50  JA3: 7dcce5b76c8b17472d024758970a406b  →  destination: google.com:443
  Host: 10.0.0.33  JA3: 6734f37431670b3ab4292b8f60f29984  →  destination: 1.2.3.4:443
  Host: 10.0.0.22  JA3: a0e9f5d64349fb13191bc781f81f42e1  →  destination: api.empresa.com:443

Known JA3 references:
  72a589da586844d7f0818ce684948eea → Cobalt Strike default beacon
  7dcce5b76c8b17472d024758970a406b → Chrome 110+ (Linux/Windows)
  6734f37431670b3ab4292b8f60f29984 → Metasploit Meterpreter
  a0e9f5d64349fb13191bc781f81f42e1 → Python requests library` },
    'tls.pre14': { es: `
Zeek ssl.log (muestra de 72 entradas similares):
  ts              id.orig_h   id.resp_h        version  cipher                       subject  issuer   duration  orig_bytes  resp_bytes
  [día1] 09:02    10.0.0.88   185.199.108.5    TLSv12   TLS_RSA_WITH_AES_256_CBC_SHA -        -        2s        1.2KB       840B
  [día1] 10:01    10.0.0.88   185.199.108.5    TLSv12   TLS_RSA_WITH_AES_256_CBC_SHA -        -        2s        1.1KB       822B
  ...
  [día3] 17:05    10.0.0.88   185.199.108.5    TLSv12   TLS_RSA_WITH_AES_256_CBC_SHA -        -        2s        45MB        2.1KB  ← !!!

JA3: b386946a5a44d1ddcc843bc75336dfce (no en bases conocidas)
185.199.108.5 → GitHub Pages CDN (IP legítima de GitHub Pages)`, en: `
Zeek ssl.log (sample of 72 similar entries):
  ts              id.orig_h   id.resp_h        version  cipher                       subject  issuer   duration  orig_bytes  resp_bytes
  [day1] 09:02    10.0.0.88   185.199.108.5    TLSv12   TLS_RSA_WITH_AES_256_CBC_SHA -        -        2s        1.2KB       840B
  [day1] 10:01    10.0.0.88   185.199.108.5    TLSv12   TLS_RSA_WITH_AES_256_CBC_SHA -        -        2s        1.1KB       822B
  ...
  [day3] 17:05    10.0.0.88   185.199.108.5    TLSv12   TLS_RSA_WITH_AES_256_CBC_SHA -        -        2s        45MB        2.1KB  ← !!!

JA3: b386946a5a44d1ddcc843bc75336dfce (not in known databases)
185.199.108.5 → GitHub Pages CDN (legitimate GitHub Pages IP)` },
    'tls.pre15': "# Full audit\ntestssl.sh https://www.empresa.com\n\n# Vulnerabilities only\ntestssl.sh --vulnerable https://www.empresa.com\n\n# Cipher suites\ntestssl.sh --cipher-per-proto https://www.empresa.com",
    'tls.pre17': "# Search certs for a domain\nhttps://crt.sh/?q=%.empresa.com\n\n# Real-time monitor (Python)\npip install certstream\ncertstream --full | grep empresa.com\n\n# SSL Labs (online test)\nhttps://www.ssllabs.com/ssltest/",
    'tls.opt1': "TLS 1.3 (recommended)",
    'tls.opt2': "TLS 1.2 (acceptable)",
    'tls.opt3': "TLS 1.0 (BROKEN ✖)",
    'tls.opt4': "SSLv3 (BROKEN — POODLE ✖)",
    'tls.opt5': "Valid (recognized CA, not expired)",
    'tls.opt6': "Expired",
    'tls.opt7': "Self-signed",
    'tls.opt8': "Hostname mismatch",
    'tls.opt9': "POODLE — Downgrade to SSLv3 (CVE-2014-3566)",
    'tls.opt10': "Heartbleed — Memory read (CVE-2014-0160)",
    'tls.opt11': "CRIME / BREACH — compression + oracle",
    'tls.opt12': "SWEET32 — birthday attack on 3DES",
    'tls.opt13': "Chrome / Firefox (legitimate)",
    'tls.opt14': "curl / requests (tool)",
    'tls.opt15': "Generic malware (minimal cipher)",
});
