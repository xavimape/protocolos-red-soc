# Security Policy

## Objetivo del proyecto

Este repositorio tiene fines exclusivamente educativos y está orientado a:

* Comprensión del funcionamiento interno de 9 protocolos de red (DNS, HTTP/HTTPS, TCP, UDP, DHCP, SMB, FTP, SSH, TLS/SSL)
* SOC (Security Operations Center) y análisis de telemetría
* DFIR / Forensia Digital
* Detection Engineering

El contenido busca enseñar cómo funciona cada protocolo, por qué es vulnerable a determinados ataques, y cómo se ve ese ataque en telemetría real — no proveer herramientas ofensivas funcionales.

---

## Uso responsable

Este proyecto NO promueve:

* actividades ilegales o no autorizadas
* uso ofensivo de las técnicas descritas contra infraestructura ajena
* despliegue de las simulaciones como herramientas de ataque reales

Los "Demo Lab" de cada módulo son **simuladores visuales en JavaScript** que corren 100% en el navegador:

* no envían, capturan ni modifican tráfico de red real
* no se conectan a ningún servidor, dispositivo o servicio externo
* los paquetes, logs y payloads mostrados son generados localmente con fines pedagógicos

Todos los labs, ejercicios y mini-challenges deben utilizarse únicamente en:

* entornos educativos y controlados
* análisis autorizado
* laboratorios de práctica (home lab, CTF, entornos de formación)

---

## Naturaleza de las simulaciones

Los simuladores de ataque (SYN Flood, DNS Poisoning, NTLM Relay, SSL Stripping, etc.) incluidos en este proyecto:

* están escritos en JavaScript para visualización en el navegador
* representan el flujo lógico del ataque, no una implementación funcional del mismo
* no incluyen código capaz de ejecutar el ataque real contra un objetivo
* priorizan claridad pedagógica sobre fidelidad técnica exhaustiva

Para práctica ofensiva/defensiva real, utilizar entornos de laboratorio dedicados y autorizados (labs propios, CTFs, plataformas como TryHackMe/HTB) y herramientas auditadas (Wireshark, Zeek, Suricata, nmap, etc.).

---

## Reporte de problemas

Si encontrás:

* errores técnicos en la descripción de un protocolo o ataque
* información desactualizada (CVEs, RFCs, técnicas de detección)
* exposición accidental de información sensible
* problemas de seguridad en el código JavaScript del sitio

por favor abrir un Issue describiendo:

* módulo/archivo afectado
* comportamiento observado vs. esperado
* referencia técnica (RFC, CVE, herramienta)
* pasos para reproducir

---

## Contenido simulado

Los logs, capturas de tráfico y payloads mostrados en los labs y ejercicios son:

* generados o simplificados con fines didácticos
* inspirados en RFCs, CVEs y reportes públicos de la industria (no en incidentes reales sin autorización)
* no representativos de datos de producción ni de infraestructura real

No deben considerarse evidencia forense ni material de producción sin validación adicional.

---

## Alcance

Este proyecto es una plataforma educativa open-source y no reemplaza:

* herramientas de análisis de red auditadas (Wireshark, Zeek, Suricata)
* auditorías de seguridad profesionales
* pruebas de penetración autorizadas
* asesoramiento de seguridad formal
