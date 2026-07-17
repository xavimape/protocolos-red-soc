/* ============================================================
   dhcp/app.js — Demo Lab: DHCP
   Protocolos Red SOC · @xavimape
   Demos: 1) DHCP DORA handshake
          2) DHCP Starvation visualizer
          3) Rogue DHCP Server (MitM)
   ============================================================ */

'use strict';

const dhcpDemo = (function () {
  const rand    = SOC.rand;

  const t = (es, en) => (typeof i18n !== 'undefined' && i18n.getLang() === 'en') ? en : es;


  // Genera una MAC aleatoria con prefijo dado
  function randMac(prefix = '') {
    const hex = () => rand(0, 255).toString(16).padStart(2, '0');
    if (prefix) return `${prefix}:${hex()}:${hex()}:${hex()}`;
    return `${hex()}:${hex()}:${hex()}:${hex()}:${hex()}:${hex()}`;
  }

  // Extrae base del pool DHCP
  function parsePool(poolStr) {
    const match = poolStr.match(/(\d+\.\d+\.\d+\.)(\d+)-(\d+)/);
    if (match) return { base: match[1], start: parseInt(match[2]), end: parseInt(match[3]) };
    return { base: '192.168.1.', start: 100, end: 200 };
  }

  // ─── Demo 1: DHCP DORA ────────────────────────────────────────

  async function runDORA() {
    const mac    = document.getElementById('dhcp-mac').value.trim()    || 'aa:bb:cc:dd:ee:ff';
    const server = document.getElementById('dhcp-server').value.trim() || '192.168.1.1';
    const pool   = parsePool(document.getElementById('dhcp-pool').value);
    const out    = document.getElementById('dhcp-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const xid        = rand(0x10000000, 0xffffffff).toString(16).toUpperCase();
    const assignedIP = `${pool.base}${rand(pool.start, pool.end)}`;
    const subnet     = '255.255.255.0';
    const lease      = 86400;
    const dns        = '8.8.8.8';

    await L.log(t(`── DHCP DORA — Asignación de IP ─────────────────────`, `── DHCP DORA — IP assignment ────────────────────────`), 'info', 0);
    await L.log(t(`   Cliente MAC: ${mac}  XID=0x${xid}`, `   Client MAC: ${mac}  XID=0x${xid}`), 'muted', 100);
    await L.log(t(`   Servidor DHCP: ${server}`, `   DHCP server: ${server}`), 'muted', 100);
    await L.log('', 'muted', 200);

    // D — DISCOVER
    await L.log(`[D] DISCOVER ─────────────────────────────────────────`, 'info', 0);
    await L.log(`   src=0.0.0.0:68  dst=255.255.255.255:67  (broadcast)`, 'muted', 100);
    await L.log(`   chaddr=${mac}  XID=0x${xid}`, 'muted', 100);
    await L.log(`   msg_type=1 (DHCPDISCOVER)`, 'muted', 100);
    await L.log(t(`   "¿Hay algún servidor DHCP en la red?"`, `   "Is there any DHCP server on the network?"`), 'info', 100);
    await L.log(t(`   → Sin IP aún: el cliente no puede hacer unicast`, `   → No IP yet: the client cannot do unicast`), 'warning', 100);
    await L.log('', 'muted', 400);

    // O — OFFER
    await L.log(`[O] OFFER ────────────────────────────────────────────`, 'success', 0);
    await L.log(`   src=${server}:67  dst=255.255.255.255:68  (broadcast)`, 'muted', 100);
    await L.log(`   XID=0x${xid}  yiaddr=${assignedIP}`, 'muted', 100);
    await L.log(`   msg_type=2 (DHCPOFFER)`, 'muted', 100);
    await L.log(t(`   Opciones ofrecidas:`, `   Offered options:`), 'muted', 100);
    await L.log(`     Opt 1  (Subnet Mask):     ${subnet}`, 'success', 80);
    await L.log(`     Opt 3  (Default Gateway): ${server}`, 'success', 80);
    await L.log(`     Opt 6  (DNS Servers):     ${dns}`, 'success', 80);
    await L.log(`     Opt 51 (Lease Time):      ${lease}s (${lease/3600}h)`, 'success', 80);
    await L.log(`     Opt 54 (Server ID):       ${server}`, 'success', 80);
    await L.log('', 'muted', 400);

    // R — REQUEST
    await L.log(`[R] REQUEST ──────────────────────────────────────────`, 'info', 0);
    await L.log(`   src=0.0.0.0:68  dst=255.255.255.255:67  (broadcast)`, 'muted', 100);
    await L.log(`   chaddr=${mac}  XID=0x${xid}`, 'muted', 100);
    await L.log(`   msg_type=3 (DHCPREQUEST)`, 'muted', 100);
    await L.log(`   Opt 50 (Requested IP): ${assignedIP}`, 'muted', 100);
    await L.log(t(`   Opt 54 (Server ID):    ${server}  ← acepto ESTA oferta`, `   Opt 54 (Server ID):    ${server}  ← I accept THIS offer`), 'info', 100);
    await L.log(t(`   → Broadcast informa a otros DHCP que su oferta fue rechazada`, `   → Broadcast informs other DHCP servers their offer was rejected`), 'warning', 100);
    await L.log('', 'muted', 400);

    // A — ACK
    await L.log(`[A] ACK ──────────────────────────────────────────────`, 'success', 0);
    await L.log(`   src=${server}:67  dst=${assignedIP}:68`, 'muted', 100);
    await L.log(`   XID=0x${xid}  yiaddr=${assignedIP}`, 'muted', 100);
    await L.log(`   msg_type=5 (DHCPACK)`, 'muted', 100);
    await L.log(t(`   Confirma: IP=${assignedIP}  Lease=${lease}s  GW=${server}  DNS=${dns}`, `   Confirms: IP=${assignedIP}  Lease=${lease}s  GW=${server}  DNS=${dns}`), 'success', 100);
    await L.log('', 'muted', 300);

    await L.log(t(`✓ CONFIGURACIÓN APLICADA ─────────────────────────────`, `✓ CONFIGURATION APPLIED ───────────────────────────────`), 'success', 0);
    await L.log(`   IP:      ${assignedIP}/24`, 'success', 100);
    await L.log(t(`   Gateway: ${server}  ← todo el tráfico sale por aquí`, `   Gateway: ${server}  ← all traffic goes out through here`), 'success', 100);
    await L.log(`   DNS:     ${dns}`, 'success', 100);
    await L.log(t(`   Lease:   válida hasta T+${lease}s`, `   Lease:   valid until T+${lease}s`), 'success', 100);
    await L.log('', 'muted', 200);
    await L.log(t(`── Renovación automática ─────────────────────────────`, `── Automatic renewal ─────────────────────────────────`), 'muted', 0);
    await L.log(t(`   T1 (${lease/2}s ≈ 12h): DHCPREQUEST unicast al servidor para renovar`, `   T1 (${lease/2}s ≈ 12h): DHCPREQUEST unicast to the server to renew`), 'muted', 100);
    await L.log(t(`   T2 (${Math.round(lease*0.875)}s ≈ 21h): si T1 falla, DHCPREQUEST broadcast`, `   T2 (${Math.round(lease*0.875)}s ≈ 21h): if T1 fails, DHCPREQUEST broadcast`), 'muted', 100);
    await L.log(t(`   Expiración: si T2 falla → pierde la IP → nuevo DORA`, `   Expiration: if T2 fails → loses the IP → new DORA`), 'warning', 100);
    await L.log('', 'muted', 100);
    await L.log(`Zeek dhcp.log: mac=${mac}  server=${server}  assigned=${assignedIP}  lease=${lease}  gw=${server}`, 'muted', 0);
  }

  // ─── Demo 2: DHCP Starvation ──────────────────────────────────

  async function runStarvation() {
    const server = document.getElementById('starv-server').value.trim() || '192.168.1.1';
    const pool   = parseInt(document.getElementById('starv-pool').value);
    const rate   = parseInt(document.getElementById('starv-rate').value);
    const out    = document.getElementById('starv-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const timeToExhaust = Math.ceil(pool / rate);

    await L.log(`── DHCP Starvation → ${server} ─────────────────────────`, 'danger', 0);
    await L.log(t(`   Pool total: ${pool} IPs`, `   Total pool: ${pool} IPs`), 'muted', 100);
    await L.log(t(`   Tasa de DISCOVER: ${rate.toLocaleString()} req/s con MACs falsas`, `   DISCOVER rate: ${rate.toLocaleString()} req/s with fake MACs`), 'danger', 100);
    await L.log(t(`   Tiempo estimado para agotar pool: ~${timeToExhaust}s`, `   Estimated time to exhaust pool: ~${timeToExhaust}s`), 'danger', 100);
    await L.log('', 'muted', 300);

    // Simular llenado del pool con MACs falsas
    const steps = 6;
    for (let i = 1; i <= steps; i++) {
      const filled  = Math.round((i / steps) * pool);
      const pct     = Math.round((i / steps) * 100);
      const barLen  = Math.round(pct / 10);
      const bar     = '█'.repeat(barLen) + '░'.repeat(10 - barLen);
      const fakeMac = randMac('52:54:00');
      const fakeIP  = `192.168.1.${rand(1, pool)}`;
      const type    = pct < 60 ? 'warning' : 'danger';

      await L.log(t(`   DISCOVER de ${fakeMac} → lease ${fakeIP}`, `   DISCOVER from ${fakeMac} → lease ${fakeIP}`), type, 220);
      await L.log(t(`   Pool [${bar}] ${filled}/${pool} IPs asignadas a MACs falsas`, `   Pool [${bar}] ${filled}/${pool} IPs assigned to fake MACs`), type, 80);
    }

    await L.log('', 'muted', 300);
    await L.log(t(`🚨 POOL AGOTADO — ${pool}/${pool} IPs asignadas a MACs falsas`, `🚨 POOL EXHAUSTED — ${pool}/${pool} IPs assigned to fake MACs`), 'danger', 0);
    await L.log(t(`   El servidor legítimo no tiene más IPs para ofrecer`, `   The legitimate server has no more IPs to offer`), 'danger', 200);
    await L.log('', 'muted', 200);

    // Simular cliente legítimo que no puede obtener IP
    const victimMac = randMac('aa:bb:cc');
    await L.log(t(`── Cliente legítimo intenta conectarse ───────────────`, `── Legitimate client tries to connect ────────────────`), 'muted', 0);
    await L.log(t(`   DISCOVER de ${victimMac}:68 → 255.255.255.255:67`, `   DISCOVER from ${victimMac}:68 → 255.255.255.255:67`), 'info', 300);
    await L.log(t(`   ...esperando OFFER...`, `   ...waiting for OFFER...`), 'muted', 800);
    await L.log(t(`   ...sin respuesta... (reintento 1/3)`, `   ...no response... (retry 1/3)`), 'warning', 600);
    await L.log(t(`   ...sin respuesta... (reintento 2/3)`, `   ...no response... (retry 2/3)`), 'warning', 600);
    await L.log(t(`   ...sin respuesta... (reintento 3/3)`, `   ...no response... (retry 3/3)`), 'warning', 600);
    await L.log(t(`   ✗ APIPA: 169.254.${rand(1,254)}.${rand(1,254)} — sin acceso a red corporativa`, `   ✗ APIPA: 169.254.${rand(1,254)}.${rand(1,254)} — no corporate network access`), 'danger', 200);
    await L.log('', 'muted', 200);
    await L.log(`── Zeek IOC ─────────────────────────────────────────`, 'muted', 0);
    await L.log(t(`   ${pool} DISCOVER en ${timeToExhaust}s desde MACs 52:54:00:XX:XX:XX`, `   ${pool} DISCOVER in ${timeToExhaust}s from MACs 52:54:00:XX:XX:XX`), 'warning', 100);
    await L.log(t(`   Tasa: ${rate}/s (umbral normal: <5/s por puerto)`, `   Rate: ${rate}/s (normal threshold: <5/s per port)`), 'warning', 100);
    await L.log(`   Sigma: count(DISCOVER) by mac_oui > 100 / 10s → STARVATION`, 'warning', 100);
    await L.log('', 'muted', 200);
    await L.log(t(`── Mitigación ───────────────────────────────────────`, `── Mitigation ───────────────────────────────────────`), 'muted', 0);
    await L.log(t(`   ip dhcp snooping limit rate 15  (en cada puerto de acceso)`, `   ip dhcp snooping limit rate 15  (on each access port)`), 'success', 200);
    await L.log(t(`   → Puerto con >15 DHCP paquetes/s entra en err-disabled`, `   → Port with >15 DHCP packets/s goes err-disabled`), 'success', 100);
  }

  // ─── Demo 3: Rogue DHCP ───────────────────────────────────────

  async function runRogue() {
    const rogueGW  = document.getElementById('rogue-gw').value.trim()     || '192.168.1.200';
    const rogueDNS = document.getElementById('rogue-dns').value.trim()     || '10.0.0.1';
    const victim   = document.getElementById('rogue-victim').value.trim()  || 'aa:11:22:33:44:55';
    const out      = document.getElementById('rogue-output');
    out.innerHTML = '';
    const L = SOC.createLogger(out);

    const xid        = rand(0x10000000, 0xffffffff).toString(16).toUpperCase();
    const victimIP   = `192.168.1.${rand(101, 150)}`;
    const legitDHCP  = '192.168.1.1';

    await L.log(t(`── Rogue DHCP Server activo: ${rogueGW} ────────────────`, `── Rogue DHCP Server active: ${rogueGW} ────────────────`), 'danger', 0);
    await L.log(t(`   Servidor DHCP legítimo: ${legitDHCP} (pool agotado o más lento)`, `   Legitimate DHCP server: ${legitDHCP} (pool exhausted or slower)`), 'muted', 100);
    await L.log(t(`   DNS malicioso: ${rogueDNS}`, `   Malicious DNS: ${rogueDNS}`), 'danger', 100);
    await L.log('', 'muted', 300);

    // DISCOVER del cliente
    await L.log(t(`── Cliente ${victim} busca IP ────────────────────`, `── Client ${victim} looks for IP ─────────────────`), 'info', 0);
    await L.log(`   DISCOVER  src=0.0.0.0:68  dst=255.255.255.255:67`, 'info', 200);
    await L.log(`   XID=0x${xid}  chaddr=${victim}`, 'muted', 100);
    await L.log('', 'muted', 300);

    // El legítimo no responde (pool agotado)
    await L.log(t(`   ${legitDHCP}: (sin respuesta — pool agotado)`, `   ${legitDHCP}: (no response — pool exhausted)`), 'muted', 300);

    // El rogue responde rápido
    await L.log(t(`   ${rogueGW}: ¡OFFER inmediata! ← más rápido / único disponible`, `   ${rogueGW}: immediate OFFER! ← faster / only one available`), 'danger', 200);
    await L.log('', 'muted', 200);

    // OFFER maliciosa
    await L.log(t(`── OFFER maliciosa del Rogue DHCP ────────────────────`, `── Malicious OFFER from the Rogue DHCP ───────────────`), 'danger', 0);
    await L.log(`   src=${rogueGW}:67  dst=255.255.255.255:68`, 'muted', 100);
    await L.log(`   msg_type=2 (DHCPOFFER)  yiaddr=${victimIP}`, 'muted', 100);
    await L.log(`   Opt 1  (Subnet Mask):     255.255.255.0`, 'muted', 80);
    await L.log(t(`   Opt 3  (Default Gateway): ${rogueGW}  ← ⚠ IP del atacante`, `   Opt 3  (Default Gateway): ${rogueGW}  ← ⚠ attacker IP`), 'danger', 80);
    await L.log(t(`   Opt 6  (DNS Servers):     ${rogueDNS}  ← ⚠ DNS malicioso`, `   Opt 6  (DNS Servers):     ${rogueDNS}  ← ⚠ malicious DNS`), 'danger', 80);
    await L.log(t(`   Opt 51 (Lease Time):      300s  ← lease corto = control frecuente`, `   Opt 51 (Lease Time):      300s  ← short lease = frequent control`), 'warning', 80);
    await L.log('', 'muted', 300);

    // REQUEST + ACK
    await L.log(t(`── Cliente acepta y confirma ─────────────────────────`, `── Client accepts and confirms ───────────────────────`), 'warning', 0);
    await L.log(`   REQUEST: Opt 54 server_id=${rogueGW}  requested_ip=${victimIP}`, 'muted', 200);
    await L.log(`   ACK rogue: IP=${victimIP}  GW=${rogueGW}  DNS=${rogueDNS}`, 'danger', 200);
    await L.log('', 'muted', 200);

    // Resultado
    await L.log(t(`✗ CONFIGURACIÓN MALICIOSA APLICADA ──────────────────`, `✗ MALICIOUS CONFIGURATION APPLIED ────────────────────`), 'danger', 0);
    await L.log(t(`   IP:      ${victimIP}/24  (válida — no genera alarma)`, `   IP:      ${victimIP}/24  (valid — raises no alarm)`), 'warning', 100);
    await L.log(t(`   Gateway: ${rogueGW}  ← TODO el tráfico pasa por el atacante`, `   Gateway: ${rogueGW}  ← ALL traffic goes through the attacker`), 'danger', 100);
    await L.log(t(`   DNS:     ${rogueDNS}  ← el atacante controla la resolución de nombres`, `   DNS:     ${rogueDNS}  ← the attacker controls name resolution`), 'danger', 100);
    await L.log('', 'muted', 300);

    // Consecuencias
    await L.log(t(`── Consecuencias del MitM ────────────────────────────`, `── MitM consequences ─────────────────────────────────`), 'danger', 0);
    await L.log(`   ${victim} → ${rogueGW} → Internet`, 'danger', 200);
    await L.log(t(`   El atacante puede: sniff, inyectar, SSL-strip, redirigir DNS`, `   The attacker can: sniff, inject, SSL-strip, redirect DNS`), 'danger', 100);
    await L.log('', 'muted', 200);
    await L.log(t(`── Simulación de tráfico interceptado ────────────────`, `── Simulation of intercepted traffic ─────────────────`), 'muted', 0);
    await L.log(`   ${victimIP} → POST /login HTTP/1.1 → ${rogueGW} → (forwarded) → intranet`, 'danger', 300);
    await L.log(t(`   ⚡ Rogue captura: user=admin&pass=P@ssw0rd123 (texto claro)`, `   ⚡ Rogue captures: user=admin&pass=P@ssw0rd123 (cleartext)`), 'danger', 200);
    await L.log(t(`   DNS query: intranet.empresa.com → responde ${rogueGW} (sinkhole)`, `   DNS query: intranet.empresa.com → answers ${rogueGW} (sinkhole)`), 'danger', 200);
    await L.log('', 'muted', 200);
    await L.log(`── Zeek dhcp.log IOC ────────────────────────────────`, 'muted', 0);
    await L.log(t(`   server_addr=${rogueGW} ≠ DHCP legítimo (${legitDHCP})`, `   server_addr=${rogueGW} ≠ legitimate DHCP (${legitDHCP})`), 'warning', 100);
    await L.log(t(`   gateway=${rogueGW} en lease de ${victim}`, `   gateway=${rogueGW} in ${victim}'s lease`), 'warning', 100);
    await L.log(t(`   → Alerta: "Rogue DHCP detectado en la red"`, `   → Alert: "Rogue DHCP detected on the network"`), 'danger', 100);
  }

  // ─── Reset ────────────────────────────────────────────────────

  function reset() {
    const outputs = ['dhcp-output', 'starv-output', 'rogue-output'];
    outputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = '<div class="log-line"><span class="log-time">[→]</span><span class="log-info">' + t('Esperando simulación DHCP...','Waiting for DHCP simulation...') + '</span></div>';
    });
    document.getElementById('dhcp-mac').value    = 'aa:bb:cc:dd:ee:ff';
    document.getElementById('dhcp-server').value = '192.168.1.1';
    document.getElementById('dhcp-pool').value   = '192.168.1.100-200';
  }


  async function runSpoof() {
    const network  = document.getElementById('spoof-network').value.trim() || '192.168.1.0/24';
    const spType   = document.getElementById('spoof-type').value;
    const L = SOC.createLogger('spoof-output');
    L.clear();

    const baseNet = network.split('/')[0].split('.').slice(0,3).join('.');
    const attackerIP = `${baseNet}.99`;
    const victimIP   = `${baseNet}.${rand(10,50)}`;

    await L.log('=== DHCP OPTION SPOOFING ===', 'data', 0);
    await L.log(t(`Red objetivo: ${network}`, `Target network: ${network}`), 'info', 100);
    await L.log(t(`IP atacante:  ${attackerIP}`, `Attacker IP:  ${attackerIP}`), 'warning', 200);
    await L.log('', 'info', 100);

    if (spType === 'dns') {
      await L.log('[ DHCP OPTION 6 — DNS Spoofing ]', 'data', 200);
      await L.log(t('Objetivo: que las víctimas usen el DNS del atacante', 'Objective: make victims use the attacker DNS'), 'warning', 200);
      await L.log('', 'info', 100);
      await L.log(t('Herramienta: scapy / yersinia', 'Tool: scapy / yersinia'), 'data', 200);
      await L.log('', 'info', 100);
      await L.log(t('Víctima solicita DHCP → atacante responde primero:', 'Victim requests DHCP → attacker responds first:'), 'data', 300);
      await L.log(`  DHCP ACK → IP: ${victimIP}`, 'success', 200);
      await L.log(t(`  DHCP ACK → Gateway: ${baseNet}.1 (legítimo)`, `  DHCP ACK → Gateway: ${baseNet}.1 (legitimate)`), 'success', 200);
      await L.log(t(`  DHCP ACK → DNS Option 6: ${attackerIP}  ← MALICIOSO`, `  DHCP ACK → DNS Option 6: ${attackerIP}  ← MALICIOUS`), 'danger', 300);
      await L.log('', 'info', 100);
      await L.log(t('Víctima resuelve paypal.com:', 'Victim resolves paypal.com:'), 'data', 200);
      await L.log(`  Query → DNS ${attackerIP}`, 'info', 200);
      await L.log(t(`  Response → paypal.com = ${rand(185,195)}.${rand(1,254)}.${rand(1,254)}.${rand(1,254)} (sitio phishing)`, `  Response → paypal.com = ${rand(185,195)}.${rand(1,254)}.${rand(1,254)}.${rand(1,254)} (phishing site)`), 'danger', 400);
      await L.log(t('Credenciales capturadas en servidor falso', 'Credentials captured on fake server'), 'danger', 300);
      await L.log('MITRE: T1557.003 — DHCP Spoofing', 'info', 200);

    } else if (spType === 'gateway') {
      await L.log('[ DHCP OPTION 3 — Default Gateway Spoofing (MitM) ]', 'data', 200);
      await L.log(t('Objetivo: todo el tráfico de la víctima pasa por el atacante', 'Objective: all victim traffic goes through the attacker'), 'warning', 200);
      await L.log('', 'info', 100);
      await L.log(`  DHCP ACK → IP: ${victimIP}`, 'success', 200);
      await L.log(t(`  DHCP ACK → Gateway Option 3: ${attackerIP}  ← MALICIOSO`, `  DHCP ACK → Gateway Option 3: ${attackerIP}  ← MALICIOUS`), 'danger', 300);
      await L.log(t(`  DHCP ACK → DNS: 8.8.8.8 (legítimo para no levantar sospecha)`, `  DHCP ACK → DNS: 8.8.8.8 (legitimate to avoid suspicion)`), 'success', 200);
      await L.log('', 'info', 100);
      await L.log(t('Atacante activa IP forwarding:', 'Attacker enables IP forwarding:'), 'data', 200);
      await L.log('  echo 1 > /proc/sys/net/ipv4/ip_forward', 'data', 200);
      await L.log(t('  iptables -t nat -A PREROUTING -j NFQUEUE (interceptar)', '  iptables -t nat -A PREROUTING -j NFQUEUE (intercept)'), 'data', 200);
      await L.log('', 'info', 100);
      await L.log(t(`Flujo MitM: ${victimIP} → ${attackerIP} → ${baseNet}.1 → Internet`, `MitM flow: ${victimIP} → ${attackerIP} → ${baseNet}.1 → Internet`), 'danger', 400);
      await L.log(t('Todo el tráfico HTTP/HTTPS interceptado en tiempo real', 'All HTTP/HTTPS traffic intercepted in real time'), 'danger', 300);
      await L.log('MITRE: T1557.003 + T1557.001 — DHCP + ARP MitM', 'info', 200);

    } else if (spType === 'domain') {
      await L.log('[ DHCP OPTION 15 — Domain Name Spoofing ]', 'data', 200);
      await L.log(t('Objetivo: unir víctima a un dominio Windows falso', 'Objective: join the victim to a fake Windows domain'), 'warning', 200);
      await L.log('', 'info', 100);
      await L.log(t(`  DHCP ACK → Domain Option 15: evil-corp.local  ← MALICIOSO`, `  DHCP ACK → Domain Option 15: evil-corp.local  ← MALICIOUS`), 'danger', 300);
      await L.log(t('Víctima intenta autenticarse en evil-corp.local', 'Victim tries to authenticate on evil-corp.local'), 'warning', 300);
      await L.log(t('Atacante captura hash NTLM con Responder', 'Attacker captures NTLM hash with Responder'), 'danger', 300);
      await L.log('  [+] NTLMv2 hash: jdoe::EVIL-CORP:...', 'danger', 300);
      await L.log(t('Crack offline con hashcat o relay inmediato', 'Offline crack with hashcat or immediate relay'), 'danger', 200);

    } else {
      await L.log('[ DHCP OPTION 42 — NTP Server Spoofing ]', 'data', 200);
      await L.log(t('Objetivo: desincronizar tiempo → invalidar certificados TLS/Kerberos', 'Objective: desync time → invalidate TLS/Kerberos certificates'), 'warning', 200);
      await L.log('', 'info', 100);
      await L.log(t(`  DHCP ACK → NTP Option 42: ${attackerIP}  ← SERVIDOR NTP FALSO`, `  DHCP ACK → NTP Option 42: ${attackerIP}  ← FAKE NTP SERVER`), 'danger', 300);
      await L.log(t('Atacante sirve tiempo incorrecto (ej: 2020-01-01)', 'Attacker serves incorrect time (e.g. 2020-01-01)'), 'danger', 300);
      await L.log(t('Impacto: tickets Kerberos expirados, certificados TLS rechazados', 'Impact: expired Kerberos tickets, rejected TLS certificates'), 'danger', 300);
      await L.log(t('Resultado: DoS efectivo en entornos AD / Zero Trust', 'Result: effective DoS in AD / Zero Trust environments'), 'danger', 300);
    }

    await L.log('', 'info', 100);
    await L.log(t('[ DETECCION ]', '[ DETECTION ]'), 'data', 200);
    await L.log(t('DHCP Snooping en switches: solo puertos trusted envian DHCP offers', 'DHCP Snooping on switches: only trusted ports send DHCP offers'), 'warning', 200);
    await L.log(t('Zeek: multiples DHCP offers desde distinta MAC en misma subnet', 'Zeek: multiple DHCP offers from different MAC in same subnet'), 'info', 200);
    await L.log(t('Windows Event 1020: conflicto de servidor DHCP detectado', 'Windows Event 1020: DHCP server conflict detected'), 'info', 200);
  }

  return { runDORA, runStarvation, runRogue, runSpoof, reset };

})();

window.dhcpDemo = dhcpDemo;
