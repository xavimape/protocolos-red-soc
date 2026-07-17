/* ============================================================
   i18n-ftp.js — Traducciones EN del modulo FTP
   Protocolos Red SOC · @xavimape
   ============================================================
   Requiere que i18n-core.js este cargado antes (usa i18n.register).
   ============================================================ */

'use strict';

i18n.register({
    'ftp.subtitle': { es: 'File Transfer Protocol · TCP/20-21 · Capa de Aplicación', en: 'File Transfer Protocol · TCP/20-21 · Application Layer' },
    'ftp.demo.waiting': "Waiting for FTP simulation...",
    'ftp.demo.btn.session':       { es: '▶ Sesión FTP', en: '▶ FTP Session' },
    'ftp.demo.btn.anon':          { es: '▶ FTP Anónimo', en: '▶ Anonymous FTP' },
    'ftp.demo.btn.attack': "▶ Execute",
    'ftp.demo.session.title':     { es: '📡 Demo: Sesión FTP (texto claro)', en: '📡 Demo: FTP Session (cleartext)' },
    'ftp.demo.session.server': "FTP Server:",
    'ftp.demo.session.user': "Username:",
    'ftp.demo.session.pass': "Password:",
    'ftp.demo.session.mode':      { es: 'Modo de conexión:', en: 'Connection mode:' },
    'ftp.demo.session.output':    { es: 'Sesión FTP:', en: 'FTP Session:' },
    'ftp.demo.anon.title':        { es: '🔓 Demo: FTP Anónimo', en: '🔓 Demo: Anonymous FTP' },
    'ftp.demo.anon.target':       { es: 'Servidor objetivo:', en: 'Target server:' },
    'ftp.demo.anon.perm': "Anonymous permissions:",
    'ftp.demo.anon.panel':        { es: 'Exploración anónima:', en: 'Anonymous exploration:' },
    'ftp.demo.anon.result':       { es: 'Resultado:', en: 'Result:' },
    'ftp.demo.anon.desc':         { es: 'FTP anónimo permite acceso sin credenciales. Mal configurado, puede exponer datos sensibles.', en: 'Anonymous FTP allows access without credentials. Misconfigured, it can expose sensitive data.' },
    'ftp.demo.attack.title':      { es: '💥 Demo: Ataques FTP', en: '💥 Demo: FTP Attacks' },
    'ftp.demo.attack.target': "Target:",
    'ftp.demo.attack.type': "Attack type:",
    'ftp.demo.attack.panel': "Configure attack",
    'ftp.demo.attack.result': "Result",
    'ftp.demo.attack.desc':       { es: 'FTP es un objetivo habitual: credenciales en claro + servidores con contraseñas débiles o por defecto. El reconocimiento del banner revela versión y OS del servidor.', en: 'FTP is a common target: cleartext credentials + servers with weak or default passwords. Banner grabbing reveals server version and OS.' },
    'ftp.s1.title':      { es: '¿Qué es FTP y por qué es peligroso?', en: 'What is FTP and why is it dangerous?' },
    'ftp.s1.sub':        { es: 'El protocolo de transferencia de archivos más antiguo y menos seguro', en: 'The oldest and least secure file transfer protocol' },
    'ftp.s1.p1':         { es: 'FTP (File Transfer Protocol, RFC 959, 1985) transfiere usuario, contraseña y datos en texto completamente claro. Cualquier nodo en el camino puede capturar las credenciales.', en: 'FTP (File Transfer Protocol, RFC 959, 1985) transfers username, password, and data in complete cleartext. Any node in the path can capture credentials.' },
    'ftp.s1.risk.title': { es: 'Riesgos principales:', en: 'Main risks:' },
    'ftp.s1.r1':         { es: '🔓 Credenciales en texto claro (USER/PASS visibles en la red)', en: '🔓 Cleartext credentials (USER/PASS visible on the network)' },
    'ftp.s1.r2':         { es: '📁 Sin cifrado de datos en tránsito', en: '📁 No data encryption in transit' },
    'ftp.s1.r3':         { es: '🔄 FTP Bounce: usar el servidor como proxy para escanear redes', en: '🔄 FTP Bounce: using the server as a proxy to scan networks' },
    'ftp.s1.r4':         { es: '🌐 Acceso anónimo por defecto en muchos servidores legados', en: '🌐 Anonymous access enabled by default on many legacy servers' },
    'ftp.s1.alt':        { es: 'Alternativas seguras: SFTP (sobre SSH), FTPS (FTP+TLS), SCP, HTTPS', en: 'Secure alternatives: SFTP (over SSH), FTPS (FTP+TLS), SCP, HTTPS' },
    'ftp.s2.title': { es: 'Modos de conexión: Active vs Passive', en: 'Connection Modes: Active vs Passive' },
    'ftp.s2.sub':   { es: 'Los dos canales TCP que usa FTP y su impacto en firewalls', en: 'The two TCP channels FTP uses and their impact on firewalls' },
    'ftp.s3.title':   { es: 'Comandos FTP esenciales', en: 'Essential FTP Commands' },
    'ftp.s3.sub':     { es: 'Los comandos del protocolo que todo analista SOC debe conocer', en: 'Protocol commands every SOC analyst should know' },
    'ftp.s3.p1':      { es: 'Los comandos FTP viajan en texto claro por el canal de control (TCP/21). Conocerlos permite interpretar capturas de Wireshark y logs de Zeek.', en: 'FTP commands travel in cleartext over the control channel (TCP/21). Knowing them helps interpret Wireshark captures and Zeek logs.' },
    'ftp.s3.callout': { es: 'En Zeek ftp.log: los campos "command" y "reply_code" registran cada interacción. Un 530 = login fallido, 230 = login exitoso, 226 = transferencia completa.', en: 'In Zeek ftp.log: the "command" and "reply_code" fields record each interaction. 530 = failed login, 230 = successful login, 226 = transfer complete.' },
    'ftp.s4.title': { es: 'Ataque 1: Credenciales en Texto Claro', en: 'Attack 1: Cleartext Credentials' },
    'ftp.s4.sub':   { es: 'Sniffing de USER y PASS visibles en la red', en: 'Sniffing USER and PASS visible on the network' },
    'ftp.s4.p1':    { es: 'A diferencia de SSH que cifra la autenticación, FTP envía USER y PASS como texto plano. Con acceso a la red (ARP poisoning, rogue switch, tap) el atacante captura credenciales trivialmente.', en: 'Unlike SSH which encrypts authentication, FTP sends USER and PASS as plaintext. With network access (ARP poisoning, rogue switch, tap) the attacker trivially captures credentials.' },
    'ftp.s5.title': { es: 'Ataque 2: Brute Force y Credenciales por Defecto', en: 'Attack 2: Brute Force and Default Credentials' },
    'ftp.s5.sub':   { es: 'Hydra, Medusa y listas de passwords filtradas', en: 'Hydra, Medusa and leaked password lists' },
    'ftp.s5.p1':    { es: 'FTP raramente implementa bloqueo de cuenta tras intentos fallidos. Un atacante puede probar miles de combinaciones sin consecuencias, especialmente contra servidores legados en producción.', en: 'FTP rarely implements account lockout after failed attempts. An attacker can try thousands of combinations without consequences, especially against legacy production servers.' },
    'ftp.s6.title': { es: 'Ataque 3: FTP Bounce Attack', en: 'Attack 3: FTP Bounce Attack' },
    'ftp.s6.sub':   { es: 'Usar el servidor FTP como proxy para escanear redes internas', en: 'Using the FTP server as a proxy to scan internal networks' },
    'ftp.s6.p1':    { es: 'El comando PORT de FTP permite especificar cualquier IP:puerto destino para el canal de datos. Un atacante puede instruir al servidor FTP a conectarse a hosts internos, actuando como proxy para port scanning.', en: 'The FTP PORT command allows specifying any destination IP:port for the data channel. An attacker can instruct the FTP server to connect to internal hosts, acting as a proxy for port scanning.' },
    'ftp.s7.title': "FTP in SOC Telemetry",
    'ftp.s7.sub':   { es: 'Zeek ftp.log — el log principal para análisis FTP', en: 'Zeek ftp.log — the main log for FTP analysis' },
    'ftp.s8.title':   { es: 'Resumen: FTP vs FTPS vs SFTP', en: 'Summary: FTP vs FTPS vs SFTP' },
    'ftp.s8.sub':     { es: 'Cuándo recomendar cada protocolo y por qué FTP es legado peligroso', en: 'When to recommend each protocol and why FTP is dangerous legacy' },
    'ftp.s8.compare': { es: 'Comparativa de protocolos de transferencia de archivos:', en: 'File transfer protocol comparison:' },
    'ftp.s8.port': "Port",
    'ftp.s8.cred': "Credentials",
    'ftp.s8.data': "Data",
    'ftp.s8.m1':      { es: 'Texto claro', en: 'Cleartext' },
    'ftp.s8.m2':      { es: 'TLS (opcional)', en: 'TLS (optional)' },
    'ftp.s8.m3':      { es: 'TLS (requerido)', en: 'TLS (required)' },
    'ftp.s8.m4':      { es: 'SSH cifrado', en: 'SSH encrypted' },
    'ftp.s8.m5':      { es: 'Uso recomendado', en: 'Recommended use' },
    'ftp.s8.m6':      { es: 'Solo redes internas aisladas (legado)', en: 'Internal isolated networks only (legacy)' },
    'ftp.ej1.title': { es: 'Ejercicio 1: Identificar Sniffing FTP', en: 'Exercise 1: Identify FTP Sniffing' },
    'ftp.ej1.q':     { es: 'Tienes una captura de Wireshark con tráfico TCP/21. Identifica las credenciales y determina qué archivos fueron descargados.', en: 'You have a Wireshark capture with TCP/21 traffic. Identify the credentials and determine which files were downloaded.' },
    'ftp.ej2.title': { es: 'Ejercicio 2: Detectar Brute Force FTP', en: 'Exercise 2: Detect FTP Brute Force' },
    'ftp.ej2.q':     { es: 'Analiza el siguiente fragmento de Zeek ftp.log. ¿Es un brute force? ¿Fue exitoso? ¿Qué regla SIEM escribirías para detectarlo?', en: 'Analyze the following Zeek ftp.log excerpt. Is it a brute force? Was it successful? What SIEM rule would you write to detect it?' },
    'ftp.ej3.title': { es: 'Ejercicio 3: Análisis de FTP Bounce', en: 'Exercise 3: FTP Bounce Analysis' },
    'ftp.ej3.q':     { es: 'Explica paso a paso cómo un atacante usaría un servidor FTP para escanear una red DMZ interna. ¿Qué comandos FTP usaría?', en: 'Explain step by step how an attacker would use an FTP server to scan an internal DMZ network. What FTP commands would they use?' },
    'ftp.ej3.s1':    { es: 'Conectarse al servidor FTP con acceso anónimo o credenciales robadas', en: 'Connect to the FTP server with anonymous access or stolen credentials' },
    'ftp.ej3.s2':    { es: 'Usar el comando PORT para apuntar a hosts internos', en: 'Use the PORT command to point to internal hosts' },
    'ftp.ej3.s3':    { es: 'Ejecutar LIST para que el servidor intente conectarse al objetivo', en: 'Execute LIST so the server attempts to connect to the target' },
    'ftp.ej3.s4':    { es: 'Inferir estado del puerto según la respuesta del servidor FTP', en: 'Infer port state from the FTP server response' },
    'ftp.ej4.title': { es: 'Ejercicio 4: Hardening FTP/FTPS', en: 'Exercise 4: FTP/FTPS Hardening' },
    'ftp.ej4.q':     { es: 'El equipo de infraestructura necesita mantener FTP por compatibilidad. Define la configuración mínima segura de vsftpd para mitigar los riesgos principales.', en: 'The infrastructure team needs to keep FTP for compatibility. Define the minimum secure vsftpd configuration to mitigate the main risks.' },
    'ftp.ej5.title': { es: 'Ejercicio 5: Migración a SFTP', en: 'Exercise 5: Migration to SFTP' },
    'ftp.ej5.q':     { es: 'Diseña el plan de migración de un servidor FTP legado a SFTP (OpenSSH). ¿Qué cambios de firewall, autenticación y monitoreo son necesarios?', en: 'Design the migration plan from a legacy FTP server to SFTP (OpenSSH). What firewall, authentication, and monitoring changes are needed?' },
    'ftp.challenge.title': { es: 'Desafío Final: Investigación de Incidente FTP', en: 'Final Challenge: FTP Incident Investigation' },
    'ftp.challenge.ctx':   { es: 'Zeek alerta: 1.200 intentos de login FTP fallidos en 2 minutos desde 91.108.x.x, seguido de acceso exitoso. Cinco minutos después, 4.2 GB transferidos desde el directorio /backups/database/ a la misma IP. El servidor FTP estaba en producción con datos de clientes.', en: 'Zeek alerts: 1,200 failed FTP login attempts in 2 minutes from 91.108.x.x, followed by successful access. Five minutes later, 4.2 GB transferred from the /backups/database/ directory to the same IP. The FTP server was in production with customer data.' },
    'ftp.challenge.q':     { es: '¿Qué TTPs de MITRE ATT&CK aplican? ¿Qué evidencia forense recolectarías? ¿Cómo determinas si hubo exfiltración de datos de clientes? ¿Qué controles fallaron?', en: 'What MITRE ATT&CK TTPs apply? What forensic evidence would you collect? How do you determine if customer data was exfiltrated? What controls failed?' },
    'ftp.empresa.com': "company.com",
    'ftp.s9.title': "Attack 5: FTPS Downgrade / MitM",
    'ftp.s9.sub': "Forcing an FTPS client to connect without TLS",
    'ftp.s9.p1':    { es: 'FTPS explícito (AUTH TLS) es opcional por diseño. Un atacante MitM puede interceptar el handshake y hacer que un cliente mal configurado reconecte en texto claro.', en: 'Explicit FTPS (AUTH TLS) is optional by design. A MitM attacker can intercept the handshake and cause a misconfigured client to reconnect in cleartext.' },
    'ftp.ch.r1a': "user=anonymous in ftp.log",
    'ftp.ch.r1b': "Anonymous access (always an IOC on internal networks)",
    'ftp.ch.r1c': "Alert, check anonymous permissions",
    'ftp.ch.r2a': "command=STOR from an anonymous user",
    'ftp.ch.r2b': "Anonymous upload — possible backdoor/malware",
    'ftp.ch.r2c': "Critical — isolate the server, find the file",
    'ftp.ch.r3a': "reply_code=530 × N from the same IP in a short time",
    'ftp.ch.r3c': "Block IP, check whether it succeeded (reply=230)",
    'ftp.ch.r4a': "FTP from an external IP (not RFC1918)",
    'ftp.ch.r4b': "Access from the Internet — credentials in cleartext in transit",
    'ftp.ch.r4c': "Critical — block, migrate to SFTP",
    'ftp.ch.r5a': "RETR of sensitive files (*.sql, *salary*, *contract*)",
    'ftp.ch.r5b': "Data exfiltration",
    'ftp.ch.r5c': "Check whether it is legitimate use, alert if external",
    'ftp.ch.r6a': "Unusual/high nighttime outbound FTP traffic",
    'ftp.ch.r6b': "Automated exfiltration",
    'ftp.ch.r6c': "Trigger IR, review the full ftp.log",
    'ftp.ch.r7a': "FTP banner with the server version in cleartext",
    'ftp.ch.r7b': "Information disclosure — the version may have CVEs",
    'ftp.ch.r7c': "Suppress the banner, update the FTP software",
    'ftp.rec.badge.zeek': "Analysis · Zeek",
    'ftp.rec.badge.nmap': "Detection · nmap",
    'ftp.rec.badge.sftp': "Migration · SFTP",
    'ftp.rec.h4.zeek': "Zeek ftp.log — useful queries",
    'ftp.rec.h4.nmap': "nmap — FTP auditing",
    'ftp.s.cvehist': "Historical CVE: old implementations of wu-ftpd, ProFTPD",
    'ftp.rec.rfc': "Original FTP specification. Useful for understanding the commands and response codes.",
    'ftp.rec.guide': "FTP security guide: bounce attacks, anonymous access, recommended protections.",
    'ftp.pre0': { es: `
ACTIVE MODE (PORT):
  Cliente (random port) ──── TCP/21 ────► Servidor  ← canal de control
  Cliente (random port) ◄─── TCP/20 ──── Servidor  ← datos (servidor conecta)
  ⚠ El servidor inicia la conexión de datos → firewalls bloquean esto

PASSIVE MODE (PASV):
  Cliente (random port) ──── TCP/21 ────► Servidor  ← control
  Cliente → "PASV"
  Servidor → "227 Entering Passive Mode (192,168,1,20,195,213)"
             Puerto datos = 195×256 + 213 = 50133
  Cliente (random port) ──── TCP/50133 ─► Servidor  ← datos (cliente conecta)
  ✓ Más compatible con firewalls (cliente siempre inicia)

COMANDOS FTP (todos en texto claro por TCP/21):
  USER jperez         → envía usuario
  PASS P@ssw0rd123    → envía contraseña EN CLARO ⚠
  LIST                → listar directorio
  RETR archivo.txt    → descargar archivo
  STOR payload.exe    → subir archivo
  PORT h1,h2,h3,h4,p1,p2  → active mode
  PASV                → passive mode
  QUIT                → cerrar sesión`, en: `
ACTIVE MODE (PORT):
  Client (random port) ──── TCP/21 ────► Server  ← control channel
  Client (random port) ◄─── TCP/20 ──── Server  ← data (server connects)
  ⚠ The server initiates the data connection → firewalls block this

PASSIVE MODE (PASV):
  Client (random port) ──── TCP/21 ────► Server  ← control
  Client → "PASV"
  Server → "227 Entering Passive Mode (192,168,1,20,195,213)"
             Data port = 195×256 + 213 = 50133
  Client (random port) ──── TCP/50133 ─► Server  ← data (client connects)
  ✓ More firewall-friendly (client always initiates)

FTP COMMANDS (all in cleartext over TCP/21):
  USER jperez         → sends the username
  PASS P@ssw0rd123    → sends the password IN CLEARTEXT ⚠
  LIST                → list directory
  RETR file.txt       → download a file
  STOR payload.exe    → upload a file
  PORT h1,h2,h3,h4,p1,p2  → active mode
  PASV                → passive mode
  QUIT                → close session` },
    'ftp.pre1': { es: `
# Wireshark — filtro para FTP
ftp                         → todo el tráfico FTP
ftp.request.command == "USER"   → solo usernames
ftp.request.command == "PASS"   → solo contraseñas (en claro!)

# tcpdump — capturar credenciales
tcpdump -i eth0 -A 'tcp port 21' | grep -E "USER|PASS"

# Zeek ftp.log — automático
ts=10:05:01  user=jperez  password=P@ssw0rd123  command=USER/PASS
             ↑ Zeek registra credenciales FTP automáticamente

CAPTURA DE DATOS:
  tcpdump -i eth0 -A 'tcp port 20 or tcp port 50000:60000'
  → Captura el contenido de los archivos transferidos

PELIGRO: si jperez usa la misma contraseña en otros sistemas
  → Un sniff de FTP → comprometido en AD, email, VPN...`, en: `
# Wireshark — FTP filter
ftp                         → all FTP traffic
ftp.request.command == "USER"   → usernames only
ftp.request.command == "PASS"   → passwords only (cleartext!)

# tcpdump — capture credentials
tcpdump -i eth0 -A 'tcp port 21' | grep -E "USER|PASS"

# Zeek ftp.log — automatic
ts=10:05:01  user=jperez  password=P@ssw0rd123  command=USER/PASS
             ↑ Zeek logs FTP credentials automatically

DATA CAPTURE:
  tcpdump -i eth0 -A 'tcp port 20 or tcp port 50000:60000'
  → Captures the content of transferred files

DANGER: if jperez reuses the same password on other systems
  → One FTP sniff → compromised in AD, email, VPN...` },
    'ftp.pre2': { es: `
ACCESO ANÓNIMO SOLO LECTURA — riesgo moderado:
  ftp 192.168.1.20
  Name: anonymous
  Password: hacker@example.com
  230 Login successful
  ftp> ls
  → Puede listar y descargar archivos públicos
  → RIESGO: exposición accidental de información sensible
    (backups, configs, datos de clientes)

ACCESO ANÓNIMO LECTURA/ESCRITURA — riesgo crítico:
  ftp> put malware.exe /incoming/malware.exe   ← sube payload
  ftp> put backdoor.php /pub/backdoor.php      ← webshell si hay web
  → FTP Bounce: usar el server como relay para scan/ataque a otros hosts
  → Depósito de contenido ilegal (CP, malware para hospedar)

DETECCIÓN:
  Zeek ftp.log: user="anonymous"  → siempre alertar en redes internas
  Si hay uploads anónimos → crítico inmediato`, en: `
ANONYMOUS READ-ONLY ACCESS — moderate risk:
  ftp 192.168.1.20
  Name: anonymous
  Password: hacker@example.com
  230 Login successful
  ftp> ls
  → Can list and download public files
  → RISK: accidental exposure of sensitive information
    (backups, configs, customer data)

ANONYMOUS READ/WRITE ACCESS — critical risk:
  ftp> put malware.exe /incoming/malware.exe   ← uploads payload
  ftp> put backdoor.php /pub/backdoor.php      ← webshell if a website exists
  → FTP Bounce: use the server as a relay to scan/attack other hosts
  → Hosting illegal content (CSAM, malware to host)

DETECTION:
  Zeek ftp.log: user="anonymous"  → always alert on internal networks
  If there are anonymous uploads → immediate critical` },
    'ftp.pre3': { es: `
# Hydra — brute force FTP
hydra -l admin -P /usr/share/wordlists/rockyou.txt \\
      192.168.1.20 ftp -t 4

# Medusa
medusa -h 192.168.1.20 -u ftpuser -P passwords.txt -M ftp

CREDENCIALES POR DEFECTO COMUNES:
  admin:admin      anonymous:         ftp:ftp
  root:toor        test:test          user:password
  admin:password   ftpuser:ftpuser    backup:backup

DETECCIÓN en Zeek ftp.log:
  Muchos intentos de login fallidos desde misma IP:
  ts=10:10:01  src=192.168.1.99  user=admin  reply_code=530 ×50
  ts=10:10:15  src=192.168.1.99  user=admin  reply_code=230 ← éxito!

CÓDIGOS DE RESPUESTA FTP CLAVE:
  220 — Banner del servidor (¡revela versión!)
  230 — Login exitoso
  530 — Login incorrecto
  550 — Acción no permitida
  425 — No se puede abrir conexión de datos (active mode bloqueado)`, en: `
# Hydra — FTP brute force
hydra -l admin -P /usr/share/wordlists/rockyou.txt \\
      192.168.1.20 ftp -t 4

# Medusa
medusa -h 192.168.1.20 -u ftpuser -P passwords.txt -M ftp

COMMON DEFAULT CREDENTIALS:
  admin:admin      anonymous:         ftp:ftp
  root:toor        test:test          user:password
  admin:password   ftpuser:ftpuser    backup:backup

DETECTION in Zeek ftp.log:
  Many failed login attempts from the same IP:
  ts=10:10:01  src=192.168.1.99  user=admin  reply_code=530 ×50
  ts=10:10:15  src=192.168.1.99  user=admin  reply_code=230 ← success!

KEY FTP RESPONSE CODES:
  220 — Server banner (reveals the version!)
  230 — Login successful
  530 — Login incorrect
  550 — Action not allowed
  425 — Cannot open data connection (active mode blocked)` },
    'ftp.pre4': { es: `
FLUJO DEL ATAQUE:
  Atacante (1.2.3.4)                FTP Server (ftp.empresa.com)
       │                                    │
       │── PORT 10,0,0,5,0,22 ────────────►│  "Conectate a 10.0.0.5:22"
       │── RETR archivo.txt ───────────────►│
       │                                    │── TCP connect → 10.0.0.5:22
       │                                    │   El servidor FTP escanea/ataca
       │                                    │   un host interno en nombre del atacante

USOS MALICIOSOS:
  1. Port scan interno: enviar PORT con cada puerto del target
     → El servidor FTP sondea hosts que el atacante no puede alcanzar directamente
  2. Bypass de firewall: el FTP server puede llegar a 10.0.0.0/8 (interno)
     pero el atacante no puede desde Internet
  3. Anonimización: el ataque parece venir del servidor FTP, no del atacante

MITIGACIÓN: la mayoría de servidores FTP modernos bloquean
PORT commands que apuntan a IPs distintas del cliente (RFC 2577)`, en: `
ATTACK FLOW:
  Attacker (1.2.3.4)                FTP Server (ftp.empresa.com)
       │                                    │
       │── PORT 10,0,0,5,0,22 ────────────►│  "Connect to 10.0.0.5:22"
       │── RETR file.txt ──────────────────►│
       │                                    │── TCP connect → 10.0.0.5:22
       │                                    │   The FTP server scans/attacks
       │                                    │   an internal host on behalf of the attacker

MALICIOUS USES:
  1. Internal port scan: send PORT with each port of the target
     → The FTP server probes hosts the attacker cannot reach directly
  2. Firewall bypass: the FTP server can reach 10.0.0.0/8 (internal)
     but the attacker cannot from the Internet
  3. Anonymization: the attack appears to come from the FTP server, not the attacker

MITIGATION: most modern FTP servers block
PORT commands pointing to IPs other than the client (RFC 2577)` },
    'ftp.pre5': { es: `
# Zeek ftp.log — campos principales
ts        uid  id.orig_h       id.resp_h    user       password         command  reply_code
10:05:01  X1   192.168.1.50    192.168.1.20  jperez     P@ssw0rd123      PASS     230
10:05:02  X1   192.168.1.50    192.168.1.20  -          -                LIST     226
10:05:05  X1   192.168.1.50    192.168.1.20  -          -                RETR     226  config.bak

# ⚠ Zeek captura CONTRASEÑAS FTP EN CLARO — tratarlo como datos sensibles

# IOC 1: Brute force — muchos 530 desde misma IP
ts=10:10:XX  src=192.168.1.99  user=admin  reply_code=530 × 200 en 60s
ts=10:12:00  src=192.168.1.99  user=admin  reply_code=230 ← compromiso

# IOC 2: Anonymous FTP con escritura
ts=10:15:00  user=anonymous  command=STOR  arg=malware.exe  reply_code=226

# IOC 3: Descarga de archivos sensibles
ts=10:20:00  user=ftpbackup  command=RETR  arg=db_backup_2024.sql
→ ¿Es normal que ftpbackup descargue backups a las 10pm desde IP externa?

# Sigma — FTP Brute Force
title: FTP Brute Force Detection
detection:
  selection:
    proto: ftp
    reply_code: 530
  condition: selection | count() by id.orig_h > 20
  timeframe: 60s
level: medium`, en: `
# Zeek ftp.log — main fields
ts        uid  id.orig_h       id.resp_h    user       password         command  reply_code
10:05:01  X1   192.168.1.50    192.168.1.20  jperez     P@ssw0rd123      PASS     230
10:05:02  X1   192.168.1.50    192.168.1.20  -          -                LIST     226
10:05:05  X1   192.168.1.50    192.168.1.20  -          -                RETR     226  config.bak

# ⚠ Zeek captures FTP PASSWORDS IN CLEARTEXT — treat this as sensitive data

# IOC 1: Brute force — many 530 from the same IP
ts=10:10:XX  src=192.168.1.99  user=admin  reply_code=530 × 200 in 60s
ts=10:12:00  src=192.168.1.99  user=admin  reply_code=230 ← compromise

# IOC 2: Anonymous FTP with write
ts=10:15:00  user=anonymous  command=STOR  arg=malware.exe  reply_code=226

# IOC 3: Download of sensitive files
ts=10:20:00  user=ftpbackup  command=RETR  arg=db_backup_2024.sql
→ Is it normal for ftpbackup to download backups at 10pm from an external IP?

# Sigma — FTP Brute Force
title: FTP Brute Force Detection
detection:
  selection:
    proto: ftp
    reply_code: 530
  condition: selection | count() by id.orig_h > 20
  timeframe: 60s
level: medium` },
    'ftp.pre6': { es: `
FTPS EXPLÍCITO (AUTH TLS) vs IMPLÍCITO (FTPS en puerto 990):

Modo EXPLÍCITO (puerto 21 — el más común, el vulnerable):
  Cliente → "AUTH TLS"
  Si MitM bloquea/modifica → "500 Unknown command"
  Cliente mal configurado → retrocede a FTP plano
  → Credenciales capturadas en texto claro

Modo IMPLÍCITO (puerto 990 — más seguro):
  TLS se negocia ANTES de cualquier comando FTP
  Sin TLS: el servidor cierra la conexión
  → No hay posibilidad de downgrade

ESCENARIO DE ATAQUE MitM:
  1. ARP poisoning: cliente FTP → [atacante] → servidor FTP
  2. Atacante intercepta "AUTH TLS"
  3. Responde "500 Unknown command"
  4. Cliente (FileZilla, WinSCP mal conf.) reintenta sin TLS
  5. USER jdoe / PASS P@ssw0rd → visibles al atacante

HERRAMIENTAS:
  ettercap, bettercap, mitmproxy (con plugin FTP)

DETECCIÓN:
  Zeek: conexiones FTP a servidores que normalmente usan FTPS
  SIEM: alerta si "AUTH TLS" NO aparece en sesión FTP a host conocido FTPS

MITIGACIÓN:
  1. Usar FTPS implícito (puerto 990) — no permite downgrade
  2. Configurar cliente: "Require TLS" sin fallback a FTP plano
  3. Mejor: migrar a SFTP (SSH) — protocolo distinto, sin riesgo de downgrade
  4. MFA + certificate pinning en clientes FTP corporativos`, en: `
EXPLICIT FTPS (AUTH TLS) vs IMPLICIT (FTPS on port 990):

EXPLICIT mode (port 21 — the most common, the vulnerable one):
  Client → "AUTH TLS"
  If a MitM blocks/modifies it → "500 Unknown command"
  Misconfigured client → falls back to plain FTP
  → Credentials captured in cleartext

IMPLICIT mode (port 990 — more secure):
  TLS is negotiated BEFORE any FTP command
  Without TLS: the server closes the connection
  → No downgrade possible

MitM ATTACK SCENARIO:
  1. ARP poisoning: FTP client → [attacker] → FTP server
  2. Attacker intercepts "AUTH TLS"
  3. Replies "500 Unknown command"
  4. Client (FileZilla, misconfigured WinSCP) retries without TLS
  5. USER jdoe / PASS P@ssw0rd → visible to the attacker

TOOLS:
  ettercap, bettercap, mitmproxy (with FTP plugin)

DETECTION:
  Zeek: FTP connections to servers that normally use FTPS
  SIEM: alert if "AUTH TLS" does NOT appear in an FTP session to a known FTPS host

MITIGATION:
  1. Use implicit FTPS (port 990) — no downgrade allowed
  2. Configure client: "Require TLS" with no fallback to plain FTP
  3. Better: migrate to SFTP (SSH) — a different protocol, no downgrade risk
  4. MFA + certificate pinning on corporate FTP clients` },
    'ftp.pre7': { es: `
Extracto A:
  192.168.1.50:54321 → 192.168.1.20:21  [PSH] "PORT 192,168,1,50,212,34"
  192.168.1.20:20    → 192.168.1.50:54370  [SYN]  ← nueva conexión TCP

Extracto B:
  192.168.1.50:54321 → 192.168.1.20:21  [PSH] "PASV"
  192.168.1.20:21    → 192.168.1.50:54321 [PSH] "227 Entering Passive Mode (192,168,1,20,196,145)"
  192.168.1.50:54322 → 192.168.1.20:50321 [SYN]  ← nueva conexión TCP`, en: `
Excerpt A:
  192.168.1.50:54321 → 192.168.1.20:21  [PSH] "PORT 192,168,1,50,212,34"
  192.168.1.20:20    → 192.168.1.50:54370  [SYN]  ← new TCP connection

Excerpt B:
  192.168.1.50:54321 → 192.168.1.20:21  [PSH] "PASV"
  192.168.1.20:21    → 192.168.1.50:54321 [PSH] "227 Entering Passive Mode (192,168,1,20,196,145)"
  192.168.1.50:54322 → 192.168.1.20:50321 [SYN]  ← new TCP connection` },
    'ftp.pre9': { es: `
Zeek ftp.log (02:00 - 03:45):
  02:00:11  185.220.101.5  → 10.0.0.20  user=ftpuser  pass=ftpuser123  reply=230
  02:00:15  185.220.101.5  → 10.0.0.20  RETR  Q1_financials_2024.xlsx    (2.1MB)
  02:00:18  185.220.101.5  → 10.0.0.20  RETR  contracts_signed_2024.zip  (45MB)
  02:00:55  185.220.101.5  → 10.0.0.20  RETR  employees_salaries.xlsx    (890KB)
  [... 847 archivos RETR en 105 minutos ...]
  03:44:50  185.220.101.5  → 10.0.0.20  QUIT

Zeek conn.log previo (01:50 - 02:00):
  185.220.101.5 → 10.0.0.20:21  [SYN→SYN-ACK→ACK] — múltiples intentos 530
  Intentos login fallidos: 45 antes de 230 exitoso`, en: `
Zeek ftp.log (02:00 - 03:45):
  02:00:11  185.220.101.5  → 10.0.0.20  user=ftpuser  pass=ftpuser123  reply=230
  02:00:15  185.220.101.5  → 10.0.0.20  RETR  Q1_financials_2024.xlsx    (2.1MB)
  02:00:18  185.220.101.5  → 10.0.0.20  RETR  contracts_signed_2024.zip  (45MB)
  02:00:55  185.220.101.5  → 10.0.0.20  RETR  employees_salaries.xlsx    (890KB)
  [... 847 RETR files in 105 minutes ...]
  03:44:50  185.220.101.5  → 10.0.0.20  QUIT

Prior Zeek conn.log (01:50 - 02:00):
  185.220.101.5 → 10.0.0.20:21  [SYN→SYN-ACK→ACK] — multiple 530 attempts
  Failed login attempts: 45 before a successful 230` },
    'ftp.pre10': { es: `# Extraer todas las credenciales capturadas
zeek-cut ts id.orig_h user password < ftp.log | grep -v "^-"

# Logins anónimos
zeek-cut ts id.orig_h user < ftp.log | awk '$3=="anonymous"'

# Archivos descargados
zeek-cut id.orig_h command arg < ftp.log | awk '$2=="RETR"'

# Archivos subidos (posibles backdoors)
zeek-cut id.orig_h command arg < ftp.log | awk '$2=="STOR"'`, en: `# Extract all captured credentials
zeek-cut ts id.orig_h user password < ftp.log | grep -v "^-"

# Anonymous logins
zeek-cut ts id.orig_h user < ftp.log | awk '$3=="anonymous"'

# Downloaded files
zeek-cut id.orig_h command arg < ftp.log | awk '$2=="RETR"'

# Uploaded files (possible backdoors)
zeek-cut id.orig_h command arg < ftp.log | awk '$2=="STOR"'` },
    'ftp.pre11': "# Detect anonymous FTP\nnmap -p 21 --script ftp-anon 192.168.1.0/24\n\n# Banner grabbing (server version)\nnmap -p 21 --script ftp-syst 192.168.1.20\n\n# Brute force (authorized pentest only)\nnmap -p 21 --script ftp-brute 192.168.1.20",
    'ftp.pre12': "# In /etc/ssh/sshd_config:\nSubsystem sftp /usr/lib/openssh/sftp-server\n\n# SFTP-only group (no shell):\nMatch Group sftponly\n  ChrootDirectory /data/sftp/%u\n  ForceCommand internal-sftp\n  AllowTcpForwarding no\n\n# Add user to the group:\nusermod -aG sftponly ftpuser",
    'ftp.opt1': "Read-only",
    'ftp.opt2': "Read and write (rw) — dangerous",
    'ftp.opt3': "No anonymous access",
    'ftp.opt4': "Banner grabbing — version recon",
    'ftp.opt5': "Default credentials",
    'ftp.opt6': "Cleartext credential sniffing",
});
