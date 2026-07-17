// ── FTP Module — app.js ───────────────────────────────────────────────────────
'use strict';

const ftpDemo = (() => {

  // ── utilidades (via SOC compartido) ──────────────────────────────────────
  const $           = SOC.$;
  const rand        = SOC.rand;

  const t = (es, en) => (typeof i18n !== 'undefined' && i18n.getLang() === 'en') ? en : es;
  const randHex     = SOC.randHex;
  const sleep       = SOC.sleep;
  const createLogger = SOC.createLogger;

  // ── Decode PASV port ────────────────────────────────────────────────────────
  function pasvPort(p1, p2) { return p1 * 256 + p2; }

  // ── Demo 1: Sesión FTP con credenciales en claro ───────────────────────────
  async function runSession() {
    const server = $('ftp-server').value.trim() || 'ftp.empresa.com';
    const user   = $('ftp-user').value.trim()   || 'jperez';
    const pass   = $('ftp-pass').value.trim()   || 'P@ssw0rd123';
    const mode   = $('ftp-mode').value;
    const L = createLogger('ftp-output');
    L.clear();

    await L.log(t('=== SIMULACIÓN DE SESIÓN FTP ===', '=== FTP SESSION SIMULATION ==='), 'header', 0);
    await L.log(t(`Servidor: ${server}:21`, `Server: ${server}:21`), 'info', 100);
    await L.log(t(`Modo de transferencia: ${mode === 'active' ? 'ACTIVE (PORT)' : 'PASSIVE (PASV)'}`, `Transfer mode: ${mode === 'active' ? 'ACTIVE (PORT)' : 'PASSIVE (PASV)'}`), 'info', 100);
    await L.log('', 'info', 50);

    // TCP handshake
    await L.log('[ TCP HANDSHAKE ]', 'header', 200);
    const clientPort = rand(49152, 65535);
    await L.log(t(`Cliente:${clientPort}  →  ${server}:21  [SYN]`, `Client:${clientPort}  →  ${server}:21  [SYN]`), 'send', 300);
    await L.log(t(`${server}:21  →  Cliente:${clientPort}  [SYN-ACK]`, `${server}:21  →  Client:${clientPort}  [SYN-ACK]`), 'recv', 300);
    await L.log(t(`Cliente:${clientPort}  →  ${server}:21  [ACK]`, `Client:${clientPort}  →  ${server}:21  [ACK]`), 'send', 300);
    await L.log(t('Conexión TCP establecida ✓', 'TCP connection established ✓'), 'success', 300);

    // FTP Banner
    await L.log('', 'info', 100);
    await L.log(t('[ CANAL DE CONTROL — TCP/21 — TEXTO CLARO ]', '[ CONTROL CHANNEL — TCP/21 — CLEARTEXT ]'), 'header', 200);
    await L.log(`220 ${server} FTP server (vsftpd 3.0.3) ready.`, 'recv', 500);
    await L.log(t('⚠ Banner revela: vsftpd 3.0.3 — versión visible para cualquier sniffer', '⚠ Banner reveals: vsftpd 3.0.3 — version visible to any sniffer'), 'warn', 300);

    // Authentication — credentials in clear
    await L.log('', 'info', 100);
    await L.log(t('[ AUTENTICACIÓN — CREDENCIALES EN TEXTO CLARO ⚠ ]', '[ AUTHENTICATION — CREDENTIALS IN CLEARTEXT ⚠ ]'), 'header', 200);
    await L.log(`USER ${user}`, 'send', 400);
    await L.log(`331 Please specify the password.`, 'recv', 400);
    await L.log(`PASS ${pass}`, 'send', 400);
    await L.log(t(`⚡ CAPTURA EN RED: "PASS ${pass}" — contraseña completamente visible`, `⚡ NETWORK CAPTURE: "PASS ${pass}" — password fully visible`), 'attack', 200);
    await L.log(`230 Login successful.`, 'recv', 400);
    await L.log(t(`✔ Autenticado como: ${user}`, `✔ Authenticated as: ${user}`), 'success', 200);
    await L.log('', 'info', 100);

    if (mode === 'passive') {
      // PASV mode
      await L.log(t('[ MODO PASIVO (PASV) ]', '[ PASSIVE MODE (PASV) ]'), 'header', 200);
      await L.log('PASV', 'send', 400);
      const p1 = rand(195, 200), p2 = rand(0, 255);
      const dataPort = pasvPort(p1, p2);
      const serverIP = `192,168,1,20`;
      await L.log(`227 Entering Passive Mode (${serverIP},${p1},${p2}).`, 'recv', 400);
      await L.log(t(`  ↳ IP datos: 192.168.1.20  Puerto datos: ${p1}×256+${p2} = ${dataPort}`, `  ↳ Data IP: 192.168.1.20  Data port: ${p1}×256+${p2} = ${dataPort}`), 'code', 200);
      await L.log(t(`Cliente:${clientPort + 1}  →  ${server}:${dataPort}  [SYN]  ← cliente inicia canal datos`, `Client:${clientPort + 1}  →  ${server}:${dataPort}  [SYN]  ← client opens data channel`), 'send', 400);
      await L.log(t(`${server}:${dataPort}  →  Cliente:${clientPort + 1}  [SYN-ACK]`, `${server}:${dataPort}  →  Client:${clientPort + 1}  [SYN-ACK]`), 'recv', 300);
    } else {
      // Active mode
      await L.log(t('[ MODO ACTIVO (PORT) ]', '[ ACTIVE MODE (PORT) ]'), 'header', 200);
      const dp1 = rand(210, 250), dp2 = rand(0, 255);
      const dataPort = pasvPort(dp1, dp2);
      await L.log(`PORT 192,168,1,50,${dp1},${dp2}`, 'send', 400);
      await L.log(t(`  ↳ El servidor conectará a: 192.168.1.50:${dataPort}`, `  ↳ The server will connect to: 192.168.1.50:${dataPort}`), 'code', 200);
      await L.log(`200 PORT command successful.`, 'recv', 400);
      await L.log(t(`${server}:20  →  Cliente:${dataPort}  [SYN]  ← SERVIDOR inicia canal datos`, `${server}:20  →  Client:${dataPort}  [SYN]  ← SERVER opens data channel`), 'recv', 400);
      await L.log(t('⚠ Active mode: el servidor conecta al cliente → puede fallar con NAT/firewall', '⚠ Active mode: the server connects to the client → may fail with NAT/firewall'), 'warn', 300);
    }

    // Commands
    await L.log('', 'info', 100);
    await L.log(t('[ COMANDOS FTP — CANAL DE CONTROL (TEXTO CLARO) ]', '[ FTP COMMANDS — CONTROL CHANNEL (CLEARTEXT) ]'), 'header', 200);
    await L.log('LIST', 'send', 400);
    await L.log('150 Here comes the directory listing.', 'recv', 400);
    const files = ['config.bak', 'db_backup_2024.sql', 'report_q3.xlsx', 'employees.csv', 'deploy.sh'];
    for (const f of files) {
      await L.log(`  -rw-r--r-- 1 ftp ftp  ${rand(10, 9000)}K  Jun 20  ${f}`, 'code', 150);
    }
    await L.log('226 Directory send OK.', 'recv', 300);
    await L.log('RETR config.bak', 'send', 400);
    await L.log('150 Opening BINARY mode data connection.', 'recv', 400);
    await L.log(t('⚡ CONTENIDO DEL ARCHIVO transferido en claro por el canal de datos', '⚡ FILE CONTENT transferred in cleartext over the data channel'), 'attack', 200);
    await L.log('226 Transfer complete.', 'recv', 400);
    await L.log('QUIT', 'send', 400);
    await L.log('221 Goodbye.', 'recv', 400);

    await L.log('', 'info', 100);
    await L.log(t('=== RESUMEN DE EXPOSICIÓN ===', '=== EXPOSURE SUMMARY ==='), 'header', 200);
    await L.log(t(`🔑 Credencial expuesta: ${user} / ${pass}`, `🔑 Exposed credential: ${user} / ${pass}`), 'danger', 200);
    await L.log(t('📡 Todo el tráfico (auth + datos) visible en texto claro', '📡 All traffic (auth + data) visible in cleartext'), 'danger', 200);
    await L.log(t('🕵️ Cualquier host en el mismo segmento puede capturar esta sesión', '🕵️ Any host on the same segment can capture this session'), 'danger', 200);
    await L.log(t(`💡 Solución: migrar a SFTP (TCP/22) o FTPS (TLS sobre FTP)`, `💡 Solution: migrate to SFTP (TCP/22) or FTPS (TLS over FTP)`), 'warn', 200);
  }

  // ── Demo 2: Anonymous FTP ──────────────────────────────────────────────────
  async function runAnon() {
    const target = $('anon-target').value.trim() || '192.168.1.20';
    const perm   = $('anon-perm').value;
    const L = createLogger('anon-output');
    L.clear();

    await L.log(t('=== ACCESO FTP ANÓNIMO ===', '=== ANONYMOUS FTP ACCESS ==='), 'header', 0);
    await L.log(t(`Objetivo: ${target}:21`, `Target: ${target}:21`), 'info', 100);

    if (perm === 'none') {
      await L.log(t('Intentando acceso anónimo...', 'Attempting anonymous access...'), 'info', 400);
      await L.log('USER anonymous', 'send', 400);
      await L.log(`331 Please specify the password.`, 'recv', 400);
      await L.log('PASS attacker@test.com', 'send', 400);
      await L.log('530 Login incorrect.', 'recv', 400);
      await L.log(t(`✔ Servidor configurado correctamente — anonymous FTP deshabilitado`, `✔ Server correctly configured — anonymous FTP disabled`), 'success', 200);
      await L.log('nmap --script ftp-anon → "Anonymous FTP login: Not allowed"', 'code', 200);
      return;
    }

    // TCP + banner
    await L.log('', 'info', 100);
    const clientPort = rand(49152, 65535);
    await L.log(t(`Cliente:${clientPort}  →  ${target}:21  [SYN]`, `Client:${clientPort}  →  ${target}:21  [SYN]`), 'send', 300);
    await L.log(t(`${target}:21  →  Cliente  [SYN-ACK]`, `${target}:21  →  Client  [SYN-ACK]`), 'recv', 300);
    await L.log(`220 ${target} FTP server ready. (vsftpd 3.0.3)`, 'recv', 400);

    // Anonymous auth
    await L.log('', 'info', 100);
    await L.log(t('[ AUTENTICACIÓN ANÓNIMA ]', '[ ANONYMOUS AUTHENTICATION ]'), 'header', 200);
    await L.log('USER anonymous', 'send', 400);
    await L.log('331 Please specify the password.', 'recv', 400);
    await L.log('PASS attacker@test.com', 'send', 400);
    await L.log('230 Login successful.', 'recv', 400);
    await L.log(t('⚡ Acceso concedido sin credenciales reales', '⚡ Access granted without real credentials'), 'attack', 200);

    // Directory listing
    await L.log('', 'info', 100);
    await L.log('LIST', 'send', 400);
    await L.log('150 Here comes the directory listing.', 'recv', 400);
    const publicFiles = ['index.html', 'readme.txt', 'uploads/', 'reports/', 'backup_jan.zip'];
    for (const f of publicFiles) {
      const perms = f.endsWith('/') ? 'drwxr-xr-x' : (perm === 'rw' ? '-rw-rw-rw-' : '-rw-r--r--');
      await L.log(`  ${perms} 1 ftp ftp ${rand(1, 500)}K  ${f}`, 'code', 150);
    }
    await L.log('226 Directory send OK.', 'recv', 300);

    if (perm === 'ro') {
      await L.log('', 'info', 100);
      await L.log(t('[ PERMISOS: SOLO LECTURA ]', '[ PERMISSIONS: READ-ONLY ]'), 'header', 200);
      await L.log('STOR malware.exe', 'send', 400);
      await L.log(t('553 Could not create file. (permiso denegado)', '553 Could not create file. (permission denied)'), 'recv', 400);
      await L.log('RETR backup_jan.zip', 'send', 400);
      await L.log('150 Opening BINARY mode data connection.', 'recv', 400);
      await L.log(t('⚡ Descarga exitosa — información pública expuesta', '⚡ Download successful — public information exposed'), 'attack', 200);
      await L.log('226 Transfer complete.', 'recv', 400);
      await L.log('', 'info', 100);
      await L.log(t('=== RIESGO: SOLO LECTURA ===', '=== RISK: READ-ONLY ==='), 'header', 200);
      await L.log(t('⚠ Riesgo moderado: exposición de información accidental', '⚠ Moderate risk: accidental information exposure'), 'warn', 200);
      await L.log(t('  → Verificar si hay archivos sensibles (backups, configs, datos)', '  → Check for sensitive files (backups, configs, data)'), 'warn', 200);
      await L.log(t('  → Sin escritura: no hay upload de malware ni backdoors', '  → No write access: no malware or backdoor upload'), 'info', 200);
    } else {
      await L.log('', 'info', 100);
      await L.log(t('[ PERMISOS: LECTURA + ESCRITURA ⚠ PELIGROSO ]', '[ PERMISSIONS: READ + WRITE ⚠ DANGEROUS ]'), 'header', 200);
      await L.log('STOR malware.exe', 'send', 400);
      await L.log('150 Ok to send data.', 'recv', 400);
      await L.log(t('⚡ Upload de malware.exe al servidor FTP público', '⚡ Upload of malware.exe to the public FTP server'), 'attack', 200);
      await L.log(t('226 Transfer complete.  ← malware depositado en el servidor', '226 Transfer complete.  ← malware dropped on the server'), 'recv', 400);
      await L.log('STOR backdoor.php', 'send', 400);
      await L.log(t('226 Transfer complete.  ← webshell subida', '226 Transfer complete.  ← webshell uploaded'), 'recv', 400);
      await L.log('', 'info', 100);
      await L.log(t('[ ACCESO VÍA WEBSHELL ]', '[ ACCESS VIA WEBSHELL ]'), 'header', 200);
      await L.log(`curl "http://${target}/pub/backdoor.php?cmd=id"`, 'code', 300);
      await L.log('  → uid=33(www-data) gid=33(www-data) groups=33(www-data)', 'recv', 400);
      await L.log(t('⚡ Ejecución remota de código obtenida vía FTP anónimo con escritura', '⚡ Remote code execution obtained via anonymous FTP with write access'), 'attack', 200);
      await L.log('', 'info', 100);
      await L.log(t('=== RIESGO: CRÍTICO ===', '=== RISK: CRITICAL ==='), 'header', 200);
      await L.log(t('✖ Escritura anónima + directorio web = RCE sin autenticación', '✖ Anonymous write + web directory = RCE without authentication'), 'danger', 200);
      await L.log(t('  → Aislar servidor inmediatamente', '  → Isolate the server immediately'), 'danger', 200);
      await L.log('  → Buscar: find /var/ftp /var/www -name "*.php" -newer /var/www/index.php', 'code', 200);
      await L.log(t('  → Deshabilitar: anon_upload_enable=NO en vsftpd.conf', '  → Disable: anon_upload_enable=NO in vsftpd.conf'), 'danger', 200);
    }
  }

  // ── Demo 3: Brute Force + Banner ────────────────────────────────────────────
  async function runAttack() {
    const target  = $('bf-target').value.trim() || '192.168.1.20';
    const atkType = $('bf-type').value;
    const L = createLogger('bf-output');
    L.clear();

    if (atkType === 'banner') {
      await L.log(t('=== BANNER GRABBING / RECONOCIMIENTO FTP ===', '=== BANNER GRABBING / FTP RECONNAISSANCE ==='), 'header', 0);
      await L.log(t(`Objetivo: ${target}:21`, `Target: ${target}:21`), 'info', 100);
      await L.log('', 'info', 100);
      await L.log(t('Herramienta: nmap -p 21 -sV --script ftp-syst,ftp-anon', 'Tool: nmap -p 21 -sV --script ftp-syst,ftp-anon'), 'code', 200);
      await L.log('', 'info', 100);
      await L.log(`PORT     STATE  SERVICE  VERSION`, 'recv', 400);
      await L.log(`21/tcp   open   ftp      vsftpd 3.0.3`, 'recv', 400);
      await L.log(`| ftp-syst:`, 'recv', 400);
      await L.log(`|   STAT:`, 'recv', 400);
      await L.log(`| FTP server status:`, 'recv', 300);
      await L.log(`|      Connected to ::ffff:${target}`, 'recv', 300);
      await L.log(`|      Logged in as ftp`, 'recv', 300);
      await L.log(`|      TYPE: ASCII`, 'recv', 300);
      await L.log(`|      No session bandwidth limit`, 'recv', 300);
      await L.log(`|      Session timeout in seconds is 300`, 'recv', 300);
      await L.log(`|      Control connection is plain text`, 'recv', 300);
      await L.log(`|      Data connections will be plain text`, 'recv', 300);
      await L.log(`|_End of status`, 'recv', 300);
      await L.log(`| ftp-anon: Anonymous FTP login allowed (LIST)`, 'recv', 400);
      await L.log(`|   -rw-rw-rw- 1 1001 1001  456786 Jun 22 backup.zip`, 'recv', 300);
      await L.log(`|_  drwxr-xr-x 2 1001 1001    4096 Jun 22 uploads`, 'recv', 300);
      await L.log('', 'info', 100);
      await L.log(t('[ INFORMACIÓN OBTENIDA ]', '[ INFORMATION OBTAINED ]'), 'header', 200);
      await L.log(t(`✖ Versión del servidor: vsftpd 3.0.3`, `✖ Server version: vsftpd 3.0.3`), 'danger', 200);
      await L.log(t(`✖ Anonymous FTP habilitado con escritura (rw-rw-rw-)`, `✖ Anonymous FTP enabled with write access (rw-rw-rw-)`), 'danger', 200);
      await L.log(t(`✖ Archivo backup.zip visible y descargable`, `✖ File backup.zip visible and downloadable`), 'danger', 200);
      await L.log(t(`💡 Buscar CVEs: searchsploit vsftpd 3.0.3`, `💡 Search CVEs: searchsploit vsftpd 3.0.3`), 'warn', 200);
      return;
    }

    if (atkType === 'default') {
      await L.log(t('=== PRUEBA DE CREDENCIALES POR DEFECTO ===', '=== DEFAULT CREDENTIALS TEST ==='), 'header', 0);
      await L.log(t(`Objetivo: ${target}:21`, `Target: ${target}:21`), 'info', 100);
      await L.log('', 'info', 100);

      const defaultCreds = [
        ['admin', 'admin'], ['admin', 'password'], ['ftp', 'ftp'],
        ['root', 'root'], ['root', 'toor'], ['test', 'test'],
        ['backup', 'backup'], ['ftpuser', 'ftpuser'], ['admin', ''],
        ['ftpuser', 'ftpuser123'],
      ];

      for (let i = 0; i < defaultCreds.length; i++) {
        const [u, p] = defaultCreds[i];
        const success = i === defaultCreds.length - 1; // last one succeeds
        await L.log(`USER ${u}`, 'send', 200);
        await L.log(t(`PASS ${p || '(vacío)'}`, `PASS ${p || '(empty)'}`), 'send', 200);
        if (success) {
          await L.log('230 Login successful.', 'recv', 400);
          await L.log(t(`⚡ ÉXITO con credenciales por defecto: ${u}/${p}`, `⚡ SUCCESS with default credentials: ${u}/${p}`), 'attack', 200);
          break;
        } else {
          await L.log('530 Login incorrect.', 'recv', 300);
          await L.log(t(`  ✖ ${u}/${p || '(vacío)'} — fallido`, `  ✖ ${u}/${p || '(empty)'} — failed`), 'code', 100);
        }
      }

      await L.log('', 'info', 100);
      await L.log(t('=== RESULTADO ===', '=== RESULT ==='), 'header', 200);
      await L.log(t('✖ Credenciales por defecto aceptadas: ftpuser/ftpuser123', '✖ Default credentials accepted: ftpuser/ftpuser123'), 'danger', 200);
      await L.log(t('⚠ Política de contraseñas inexistente en el servidor FTP', '⚠ No password policy on the FTP server'), 'warn', 200);
      await L.log(t('💡 Implementar: contraseñas únicas, complejas, y sin default creds', '💡 Implement: unique, complex passwords and no default creds'), 'warn', 200);
      return;
    }


    if (atkType === 'bounce') {
      await L.log('=== FTP BOUNCE ATTACK ===', 'header', 0);
      await L.log(t(`Objetivo FTP: ${target}:21`, `FTP target: ${target}:21`), 'info', 100);
      await L.log(t('Técnica: usar el servidor FTP como proxy para escanear terceros', 'Technique: use the FTP server as a proxy to scan third parties'), 'warn', 200);
      await L.log('', 'info', 100);
      await L.log(t('PASO 1 — Conectar al servidor FTP víctima:', 'STEP 1 — Connect to the victim FTP server:'), 'header', 200);
      await L.log(`$ ftp ${target}`, 'code', 200);
      await L.log('220 vsftpd 2.0.8 ready.', 'recv', 300);
      await L.log('USER anonymous', 'send', 200);
      await L.log('PASS anything@email.com', 'send', 200);
      await L.log('230 Login successful.', 'recv', 300);
      await L.log('', 'info', 100);
      await L.log(t('PASO 2 — Usar PORT command para redirigir al host interno:', 'STEP 2 — Use PORT command to redirect to the internal host:'), 'header', 200);
      await L.log(t('PORT 10,0,0,1,0,22   # → apunta a 10.0.0.1:22 (interno)', 'PORT 10,0,0,1,0,22   # → points to 10.0.0.1:22 (internal)'), 'send', 300);
      await L.log('200 PORT command successful.', 'recv', 300);
      await L.log('LIST', 'send', 200);
      await L.log('150 Here comes the directory listing.', 'recv', 300);
      await L.log(t('→ El servidor FTP conectó al host interno 10.0.0.1:22', '→ The FTP server connected to the internal host 10.0.0.1:22'), 'attack', 300);
      await L.log(t('→ Si el puerto está ABIERTO: 226 Transfer complete', '→ If the port is OPEN: 226 Transfer complete'), 'attack', 300);
      await L.log(t('-> Si esta CERRADO: 425 Can\'t build data connection', '-> If it is CLOSED: 425 Can\'t build data connection'), 'code', 300);
      await L.log('', 'info', 100);
      await L.log(t('RESULTADO DEL ESCANEO INTERNO (puertos probados):', 'INTERNAL SCAN RESULT (ports tested):'), 'header', 200);
      const internalPorts = [[22,'SSH','OPEN'],[23,'Telnet','OPEN'],[80,'HTTP','OPEN'],[443,'HTTPS','FILTERED'],[3306,'MySQL','OPEN'],[5432,'PostgreSQL','CLOSED']];
      for (const [p, svc, state] of internalPorts) {
        const cls = state === 'OPEN' ? 'attack' : state === 'FILTERED' ? 'warn' : 'code';
        await L.log(`  10.0.0.1:${p} (${svc}) — ${state}`, cls, 250);
      }
      await L.log('', 'info', 100);
      await L.log('[ IMPACTO ]', 'header', 200);
      await L.log(t('✖ El atacante mapeo la red interna SIN conectarse directamente', '✖ The attacker mapped the internal network WITHOUT connecting directly'), 'danger', 200);
      await L.log(t('✖ El tráfico aparece originado desde el servidor FTP (IP interna)', '✖ The traffic appears to originate from the FTP server (internal IP)'), 'danger', 200);
      await L.log(t('Mitigación: deshabilitar PORT a IPs externas (pasv_enable=YES, port_enable=NO)', 'Mitigation: disable PORT to external IPs (pasv_enable=YES, port_enable=NO)'), 'warn', 300);
      await L.log(t('CVE histórico: RFC 2577 — FTP Security Considerations (1999)', 'Historical: RFC 2577 — FTP Security Considerations (1999)'), 'info', 200);
      return;
    }

    if (atkType === 'sniff') {
      await L.log(t('=== SNIFFING DE CREDENCIALES FTP (texto claro) ===', '=== FTP CREDENTIAL SNIFFING (cleartext) ==='), 'header', 0);
      await L.log(t(`Red objetivo: ${target.split('.').slice(0,3).join('.')}.0/24`, `Target network: ${target.split('.').slice(0,3).join('.')}.0/24`), 'info', 100);
      await L.log(t('Herramienta: Wireshark / tcpdump / Bettercap (ARP poisoning)', 'Tool: Wireshark / tcpdump / Bettercap (ARP poisoning)'), 'warn', 200);
      await L.log('', 'info', 100);
      await L.log(t('PASO 1 — ARP Poisoning para interceptar tráfico:', 'STEP 1 — ARP Poisoning to intercept traffic:'), 'header', 200);
      await L.log('bettercap -eval "net.probe on; arp.spoof on; net.sniff on"', 'code', 300);
      await L.log(t(`[arp.spoof] Victima: ${target} → Gateway: 192.168.1.1`, `[arp.spoof] Victim: ${target} → Gateway: 192.168.1.1`), 'attack', 300);
      await L.log('', 'info', 100);
      await L.log(t('PASO 2 — Captura de sesión FTP en tcpdump:', 'STEP 2 — Capture FTP session with tcpdump:'), 'header', 200);
      await L.log('tcpdump -i eth0 -A port 21', 'code', 300);
      await L.log('', 'info', 100);
      await L.log(t('TRÁFICO FTP CAPTURADO (texto plano):', 'CAPTURED FTP TRAFFIC (plaintext):'), 'header', 300);
      await L.log('220 FTP Server ready (vsftpd 3.0.3)', 'recv', 200);
      await L.log('USER jdoe', 'send', 200);
      await L.log('331 Please specify the password.', 'recv', 200);
      await L.log('PASS Empresa2024!', 'send', 200);  // clearly visible
      await L.log('230 Login successful.', 'recv', 200);
      await L.log('CWD /confidential/HR', 'send', 200);
      await L.log('250 Directory successfully changed.', 'recv', 200);
      await L.log('RETR nominas_2024.xlsx', 'send', 200);
      await L.log('150 Opening BINARY mode (nominas_2024.xlsx)', 'recv', 200);
      await L.log(t('[... 245.7 KB de datos transferidos ...]', '[... 245.7 KB of data transferred ...]'), 'code', 300);
      await L.log('226 Transfer complete.', 'recv', 200);
      await L.log('', 'info', 100);
      await L.log(t('[ CREDENCIALES CAPTURADAS ]', '[ CAPTURED CREDENTIALS ]'), 'header', 200);
      await L.log(t('Usuario  : jdoe', 'User     : jdoe'), 'attack', 200);
      await L.log(t('Password : Empresa2024!  (en texto PLANO)', 'Password : Empresa2024!  (in PLAINTEXT)'), 'attack', 200);
      await L.log(t('Archivo  : /confidential/HR/nominas_2024.xlsx descargado', 'File     : /confidential/HR/nominas_2024.xlsx downloaded'), 'danger', 200);
      await L.log('', 'info', 100);
      await L.log(t('Mitigación: usar FTPS (port 990) o SFTP — NUNCA FTP plano con datos sensibles', 'Mitigation: use FTPS (port 990) or SFTP — NEVER plain FTP with sensitive data'), 'warn', 300);
      await L.log(t('Detección: Zeek ftp.log filtra USER/PASS — alert si datos sensibles en 21/tcp', 'Detection: Zeek ftp.log filters USER/PASS — alert if sensitive data on 21/tcp'), 'info', 200);
      return;
    }

    if (atkType === 'mitm') {
      await L.log('=== FTPS DOWNGRADE / MitM ATTACK ===', 'header', 0);
      await L.log(t('Objetivo: forzar al cliente a usar FTP plano en lugar de FTPS', 'Target: force the client to use plain FTP instead of FTPS'), 'warn', 200);
      await L.log('', 'info', 100);
      await L.log(t('ESCENARIO: Cliente configura FTPS (TLS explícito, AUTH TLS)', 'SCENARIO: Client configures FTPS (explicit TLS, AUTH TLS)'), 'header', 200);
      await L.log('', 'info', 100);
      await L.log(t('PASO 1 — Proxy MitM intercepta la conexión:', 'STEP 1 — MitM proxy intercepts the connection:'), 'header', 200);
      await L.log(t(`Cliente → [MitM Proxy] → Servidor FTP ${target}:21`, `Client → [MitM Proxy] → FTP Server ${target}:21`), 'attack', 300);
      await L.log('', 'info', 100);
      await L.log(t('PASO 2 — Cliente envía AUTH TLS:', 'STEP 2 — Client sends AUTH TLS:'), 'header', 200);
      await L.log('220 FTP Server ready.', 'recv', 200);
      await L.log('AUTH TLS', 'send', 200);
      await L.log(t('MitM intercepta AUTH TLS → responde 500 Unknown command', 'MitM intercepts AUTH TLS → replies 500 Unknown command'), 'attack', 400);
      await L.log(t('(o el servidor está mal configurado: TLS opcional, no requerido)', '(or the server is misconfigured: TLS optional, not required)'), 'warn', 200);
      await L.log('', 'info', 100);
      await L.log(t('PASO 3 — Cliente (mal configurado) acepta el downgrade:', 'STEP 3 — Client (misconfigured) accepts the downgrade:'), 'header', 200);
      await L.log(t('Cliente: TLS falló, intentando sin TLS...', 'Client: TLS failed, trying without TLS...'), 'warn', 300);
      await L.log('USER admin', 'send', 200);
      await L.log('331 Password required.', 'recv', 200);
      await L.log('PASS P@ssw0rd2024', 'send', 200);
      await L.log('230 Login successful.', 'recv', 200);
      await L.log('', 'info', 100);
      await L.log(t('[ MitM captura en texto claro ]', '[ MitM captures in cleartext ]'), 'header', 200);
      await L.log(t('Credencial interceptada: admin / P@ssw0rd2024', 'Intercepted credential: admin / P@ssw0rd2024'), 'attack', 200);
      await L.log('', 'info', 100);
      await L.log(t('VARIANTE — Servidor FTP falso (Evil Twin):', 'VARIANT — Fake FTP server (Evil Twin):'), 'header', 200);
      await L.log(t('Atacante levanta servidor FTP en misma red con mismo hostname', 'Attacker sets up an FTP server on the same network with the same hostname'), 'danger', 300);
      await L.log(t('Clientes se conectan al servidor falso y entregan credenciales', 'Clients connect to the fake server and hand over credentials'), 'danger', 300);
      await L.log('', 'info', 100);
      await L.log(t('Mitigación: require_ssl_reuse=YES en vsftpd, forzar TLS 1.2+', 'Mitigation: require_ssl_reuse=YES in vsftpd, enforce TLS 1.2+'), 'warn', 200);
      await L.log(t('Mitigación: verificar certificado del servidor (certificate pinning)', 'Mitigation: verify the server certificate (certificate pinning)'), 'warn', 200);
      await L.log(t('Mitigación: migrar a SFTP — protocol completamente distinto sobre SSH', 'Mitigation: migrate to SFTP — a completely different protocol over SSH'), 'warn', 200);
      return;
    }

    // Brute force
    await L.log('=== FTP BRUTE FORCE ===', 'header', 0);
    await L.log(t(`Objetivo: ${target}:21`, `Target: ${target}:21`), 'info', 100);
    await L.log(t('Herramienta: hydra -l admin -P rockyou.txt ftp', 'Tool: hydra -l admin -P rockyou.txt ftp'), 'code', 200);
    await L.log('', 'info', 100);
    await L.log('[ ZEEK IOC — ftp.log durante el ataque ]', 'header', 200);
    await L.log(`ts           id.orig_h        user    pass     reply`, 'code', 300);

    const wordlist = ['123456', 'password', 'admin', 'letmein', 'welcome',
      'monkey', 'dragon', 'master', 'qwerty', 'abc123',
      'shadow', 'sunshine', 'princess', 'password1', 'Admin2024!'];

    const successIdx = rand(10, 14);
    const successPass = wordlist[successIdx];
    const srcIP = `192.168.${rand(1,254)}.${rand(2,254)}`;
    const baseTs = new Date();
    let elapsed = 0;   // acumulador: garantiza timestamps monótonos crecientes

    for (let i = 0; i <= successIdx; i++) {
      elapsed += rand(800, 2000);
      const ts = new Date(baseTs.getTime() + elapsed);
      const hh = String(ts.getHours()).padStart(2,'0');
      const mm = String(ts.getMinutes()).padStart(2,'0');
      const ss = String(ts.getSeconds()).padStart(2,'0');
      const timeStr = `${hh}:${mm}:${ss}`;
      const pass = wordlist[i];
      const reply = (i === successIdx) ? '230' : '530';
      const icon  = (i === successIdx) ? '⚡' : '  ';
      await L.log(`${timeStr}  ${srcIP.padEnd(15)}  admin   ${pass.padEnd(12)} ${reply} ${icon}`, 'code', 200);
    }

    await L.log('', 'info', 100);
    await L.log(t('=== RESULTADO FINAL ===', '=== FINAL RESULT ==='), 'header', 200);
    await L.log(t(`⚡ Contraseña encontrada: admin / ${successPass}`, `⚡ Password found: admin / ${successPass}`), 'attack', 200);
    await L.log(t(`📊 Intentos necesarios: ${successIdx + 1}`, `📊 Attempts needed: ${successIdx + 1}`), 'info', 200);
    await L.log(t(`⏱ Sin rate limiting ni bloqueo de cuenta tras múltiples fallos`, `⏱ No rate limiting or account lockout after multiple failures`), 'danger', 200);
    await L.log('', 'info', 100);
    await L.log(t('[ SIGMA ALERT que debería haber generado esto ]', '[ SIGMA ALERT this should have triggered ]'), 'header', 200);
    await L.log(`title: FTP Brute Force Detection`, 'code', 200);
    await L.log(`detection:`, 'code', 100);
    await L.log(`  reply_code: 530`, 'code', 100);
    await L.log(`  condition: count() by id.orig_h > 10 | timeframe 60s`, 'code', 100);
    await L.log(`level: medium`, 'code', 100);
    await L.log(t(`→ Esta regla habría alertado antes del éxito del atacante`, `→ This rule would have alerted before the attacker succeeded`), 'warn', 300);
  }

  // ── reset ──────────────────────────────────────────────────────────────────
  function reset() {
    ['ftp-output', 'anon-output', 'bf-output'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = '<div class="log-line"><span class="log-time">[→]</span><span class="log-info">Esperando simulación FTP...</span></div>';
    });
  }

  return { runSession, runAnon, runAttack, reset };
})();

window.ftpDemo = ftpDemo;
