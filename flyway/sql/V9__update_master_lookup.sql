CREATE OR REPLACE VIEW VWMASTERLOOKUP AS
SELECT 
	cs.UUID, 
    cs.EMAILEMPLEADO, cs.EMAILEMPLEADO2, cs.CODEMPLEADO, cs.CODPAIS, cs.COMPANY, cs.NOMBREEMPLEADO,  
	cs.INBLUEPAGES, cs.ACTIVO, cs.ISADMIN,
	det.DIRECCIONEMPLEADO,
	ctas.ctasoles, ctas.CTAUSD,
	ctasdet.SALDOCONTABLESOL, ctasdet.SALDOCONTABLEUSD, ctasdet.SALDODISPAHORROSOL, ctasdet.SALDODISPAHORROUSD,
	ctasdet.SALDOBLOQUEOAHORROSOL, ctasdet.SALDOBLOQUEOAHORROUSD, ctasdet.INTAHORROMESSOL, ctasdet.INTAHORROMESUSD,
	ctasdet.SALDOAPORTACIONSOL, ctasdet.SALDOAPORTACIONUSD, ctasdet.SALDOMISCELANEOSOL, ctasdet.SALDOMISCELANEOUSD,
	ctasdet.INTMISCELANEOMESSOL, ctasdet.INTMISCELANEOMESUSD,
	certmontos.CERTSOLVALOR, certmontos.CERTSOLMONTOS, certmontos.CERTUSDVALOR, certmontos.CERTUSDMONTOS,
    certmontos.CTSSOLVALOR, certmontos.CTSSOLMONTOS, certmontos.CTSUSDVALOR, certmontos.CTSUSDMONTOS,
    ctassaldos.SOLSALDOPRESSOLAFIRMA, ctassaldos.SOLSALDOPRESCONSUMO, 
    ctassaldos.SOLSALDOPRESCORTOPLAZO, ctassaldos.SOLSALDOPRESMEDIANOPLAZO, ctassaldos.SOLSALDOPRESLARGOPLAZO,
	ctassaldos.SOLSALDOPRESHIPOTECARIO, ctassaldos.SOLSALDOPRESAUTO,
	ctassaldos.SOLSALDOPRESPS1, ctassaldos.SOLSALDOPRESESP1, ctassaldos.SOLSALDOPRESESP2,
	ctassaldos.USDSALDOPRESSOLAFIRMA, ctassaldos.USDSALDOPRESCONSUMO,
	ctassaldos.USDSALDOPRESCORTOPLAZO, ctassaldos.USDSALDOPRESMEDIANOPLAZO, ctassaldos.USDSALDOPRESLARGOPLAZO,
	ctassaldos.USDSALDOPRESHIPOTECARIO, ctassaldos.USDSALDOPRESAUTO,
	ctassaldos.USDSALDOPRESPS1, ctassaldos.USDSALDOPRESESP1, ctassaldos.USDSALDOPRESESP2
FROM CoopeSocios cs
LEFT JOIN VWSOCIOSDETALLE det
ON
	cs.UUID = det.UUID 
LEFT JOIN CTASEMPLEADO ctas
ON
	cs.CODEMPLEADO = ctas.CODEMPLEADO 
LEFT JOIN CUENTASDETALLES ctasdet
ON
	cs.UUID = ctasdet.UUID
LEFT JOIN CERTIFICADOSMONTOSTOTALESID certmontos
ON
	cs.UUID = certmontos.UUID
LEFT JOIN CUENTASSALDOS ctassaldos
ON
	cs.UUID = ctassaldos.UUID;