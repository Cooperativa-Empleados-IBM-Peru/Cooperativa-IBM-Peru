-- Tables and views related to accounts

CREATE TABLE IF NOT EXISTS MaestroClientesSaldos
	( TipoId CHAR(2) NOT NULL COMPRESS SYSTEM DEFAULT,
	  CodEmpleado CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  NombreEmpleado CHAR(50) NOT NULL COMPRESS SYSTEM DEFAULT ,
	  DireccionEmpleado CHAR(50) COMPRESS SYSTEM DEFAULT ,
	  CodEmpresa CHAR(5) COMPRESS SYSTEM DEFAULT,
	  CtaCliente CHAR(10) NOT NULL COMPRESS SYSTEM DEFAULT,
	  TipoMoneda CHAR(5) COMPRESS SYSTEM DEFAULT,
	  IntAhorroMes DOUBLE COMPRESS SYSTEM DEFAULT,
	  IntMiscelaneoMes DOUBLE COMPRESS SYSTEM DEFAULT,

	  SaldoDispAhorro DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoBloqueoAhorro DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoAportacion DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoMiscelaneo DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoCertificado1 DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoCertificado2 DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoPresSolaFirma DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoPresCortoPlazo DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoPresMedianoPlazo DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoPresLargoPlazo DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoPresHipotecario DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoPresConsumo DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoPresAuto DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoPresPS1 DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoPresEsp1 DOUBLE COMPRESS SYSTEM DEFAULT,
	  SaldoPresEsp2 DOUBLE COMPRESS SYSTEM DEFAULT,

	  FecDispAhorro DATE,
	  FecBloqueoAhorro DATE,
	  FecAportacion DATE,
	  FecMiscelaneo DATE,
	  FecCertificado1 DATE,
	  FecCertificado2 DATE,
	  FecPresSolaFirma DATE,
	  FecPresCortoPlazo DATE,
	  FecPresMedianoPlazo DATE,
	  FecPresLargoPlazo DATE,
	  FecPresHipotecario DATE,
	  FecPresConsumo DATE,
	  FecPresAuto DATE,
	  FecPresPS1 DATE,
	  FecPresEsp1 DATE,
	  FecPresEsp2 DATE,

	  FecModificacion TIMESTAMP(12) DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(CtaCliente)

	)
	VALUE COMPRESSION COMPRESS YES;

CREATE TABLE IF NOT EXISTS MAESTROCLIENTESSALDOSTEMP LIKE MAESTROCLIENTESSALDOS;

CREATE INDEX idxCodEmpSaldos
ON MaestroClientesSaldos(CodEmpleado)
COMPRESS YES;

CREATE OR REPLACE VIEW CUENTASDETALLES AS
SELECT
	CS.UUID,
    (MCSOL.SALDODISPAHORRO + MCSOL.SALDOBLOQUEOAHORRO) SALDOCONTABLESOL,
    (MCUSD.SALDODISPAHORRO + MCUSD.SALDOBLOQUEOAHORRO) SALDOCONTABLEUSD,
    MCSOL.SALDODISPAHORRO SALDODISPAHORROSOL, MCUSD.SALDODISPAHORRO SALDODISPAHORROUSD,
    MCSOL.SALDOBLOQUEOAHORRO SALDOBLOQUEOAHORROSOL, MCUSD.SALDOBLOQUEOAHORRO SALDOBLOQUEOAHORROUSD,
    MCSOL.INTAHORROMES INTAHORROMESSOL, MCUSD.INTAHORROMES INTAHORROMESUSD,
    MCSOL.SALDOAPORTACION SALDOAPORTACIONSOL, MCUSD.SALDOAPORTACION SALDOAPORTACIONUSD,
    MCSOL.SALDOMISCELANEO SALDOMISCELANEOSOL, MCUSD.SALDOMISCELANEO SALDOMISCELANEOUSD,
    MCSOL.INTMISCELANEOMES INTMISCELANEOMESSOL, MCUSD.INTMISCELANEOMES INTMISCELANEOMESUSD
FROM
    MaestroClientesSaldos MCSOL,
    MAESTROCLIENTESSALDOS MCUSD,
    COOPESOCIOS CS
WHERE
    MCSOL.TipoMoneda = '01' 
    AND MCUSD.TIPOMONEDA = '02'
    AND MCSOL.CODEMPLEADO = CS.CODEMPLEADO 
    AND MCUSD.CODEMPLEADO = CS.CODEMPLEADO;

CREATE OR REPLACE VIEW ctasSoles AS
SELECT
    MC.*, (MC.SALDODISPAHORRO + MC.SALDOBLOQUEOAHORRO) SALDOCONTABLE, CS.UUID
FROM
    MaestroClientesSaldos MC, COOPESOCIOS CS
WHERE
    TipoMoneda = '01' AND
	MC.CODEMPLEADO = CS.CODEMPLEADO;

CREATE OR REPLACE VIEW ctasUSD AS
SELECT
    MC.*, (MC.SALDODISPAHORRO + MC.SALDOBLOQUEOAHORRO) SALDOCONTABLE, CS.UUID
FROM
    MaestroClientesSaldos MC, COOPESOCIOS CS
WHERE
    TipoMoneda = '02' AND
	MC.CODEMPLEADO = CS.CODEMPLEADO;

CREATE OR REPLACE VIEW CUENTASSALDOS AS
SELECT 
	csol.UUID, 
	csol.SALDOPRESSOLAFIRMA SOLSALDOPRESSOLAFIRMA,
	csol.SALDOPRESCONSUMO SOLSALDOPRESCONSUMO,
	csol.SALDOPRESCORTOPLAZO SOLSALDOPRESCORTOPLAZO,
	csol.SALDOPRESMEDIANOPLAZO SOLSALDOPRESMEDIANOPLAZO,
	csol.SALDOPRESLARGOPLAZO SOLSALDOPRESLARGOPLAZO,
	csol.SALDOPRESHIPOTECARIO SOLSALDOPRESHIPOTECARIO,
	csol.SALDOPRESAUTO SOLSALDOPRESAUTO,
	csol.SALDOPRESPS1 SOLSALDOPRESPS1,
	csol.SALDOPRESESP1 SOLSALDOPRESESP1,
	csol.SALDOPRESESP2 SOLSALDOPRESESP2,
	cusd.SALDOPRESSOLAFIRMA USDSALDOPRESSOLAFIRMA,
	cusd.SALDOPRESCONSUMO USDSALDOPRESCONSUMO,
	cusd.SALDOPRESCORTOPLAZO USDSALDOPRESCORTOPLAZO,
	cusd.SALDOPRESMEDIANOPLAZO USDSALDOPRESMEDIANOPLAZO,
	cusd.SALDOPRESLARGOPLAZO USDSALDOPRESLARGOPLAZO,
	cusd.SALDOPRESHIPOTECARIO USDSALDOPRESHIPOTECARIO,
	cusd.SALDOPRESAUTO USDSALDOPRESAUTO,
	cusd.SALDOPRESPS1 USDSALDOPRESPS1,
	cusd.SALDOPRESESP1 USDSALDOPRESESP1,
	cusd.SALDOPRESESP2 USDSALDOPRESESP2
FROM
	ctassoles csol, ctasusd cusd
WHERE 
	csol.UUID = cusd.UUID;

CREATE OR REPLACE VIEW CTASEMPLEADO AS
SELECT CS.CODEMPLEADO, CS.CTACLIENTE CTASOLES, CD.CTACLIENTE CTAUSD, COOPESOCIOS.UUID
FROM CTASSOLES CS, CTASUSD CD, COOPESOCIOS
WHERE CS.CODEMPLEADO = CD.CODEMPLEADO 
AND CS.CODEMPLEADO = COOPESOCIOS.CODEMPLEADO ;

-- TipoMov : AHO, MIS, APO, BLQ
CREATE TABLE IF NOT EXISTS Movimientos
  (   TipoMov CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
	  CtaCliente CHAR(10) NOT NULL COMPRESS SYSTEM DEFAULT,
	  IdMov CHAR(3) NOT NULL COMPRESS SYSTEM DEFAULT,
	  CodEmpresa CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
	  TipoPago CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
	  Transaccion CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
	  Referencia CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  RefAlfa CHAR(10) NOT NULL COMPRESS SYSTEM DEFAULT,
	  NumDepo CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  FecEmision TIMESTAMP(12) NOT NULL,
	  FecVencimiento DATE ,
	  Importe DOUBLE COMPRESS SYSTEM DEFAULT,
	  Texto CHAR(40) NOT NULL COMPRESS SYSTEM DEFAULT,

	  FecModificacion TIMESTAMP(12) DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(TipoMov, CtaCliente, IdMov, CodEmpresa, TipoPago, Transaccion, Referencia, FecEmision)

	)
	VALUE COMPRESSION COMPRESS YES;

CREATE TABLE IF NOT EXISTS MOVIMIENTOSTEMP LIKE MOVIMIENTOS;

CREATE INDEX idxMovCta
ON Movimientos(CtaCliente)
COMPRESS YES;

CREATE OR REPLACE VIEW MOVAHORROS AS
SELECT *
FROM Movimientos
WHERE TIPOMOV = 'AHO';

CREATE OR REPLACE VIEW MOVMISCELANEOS AS
SELECT *
FROM Movimientos
WHERE TIPOMOV = 'MIS';

CREATE OR REPLACE VIEW MOVAPORTACIONES AS
SELECT *
FROM Movimientos
WHERE TIPOMOV = 'APO';

CREATE OR REPLACE VIEW MOVBLOQUEOS AS
SELECT *
FROM Movimientos
WHERE TIPOMOV = 'BLQ';


CREATE TABLE IF NOT EXISTS MaestroPrestamos
  (   TipoId CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
	  DocId CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,	
	  IdMovimiento CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
	  CodEmpresa CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
	  CtaCliente CHAR(10) NOT NULL COMPRESS SYSTEM DEFAULT,
	  NumOperacion CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  FecCartera DATE ,
	  FecRenovacion DATE ,
	  FecVencimiento DATE ,
	  TipoPago CHAR(5) COMPRESS SYSTEM DEFAULT,
	  Monto DOUBLE COMPRESS SYSTEM DEFAULT,
	  Saldo DOUBLE COMPRESS SYSTEM DEFAULT,
	  Interes DOUBLE COMPRESS SYSTEM DEFAULT,
	  NroCuotas SMALLINT COMPRESS SYSTEM DEFAULT,

	  FecModificacion TIMESTAMP(12) DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(TipoId, DocId, IdMovimiento, CodEmpresa, CtaCliente, NumOperacion)

	)
	VALUE COMPRESSION COMPRESS YES;

CREATE TABLE IF NOT EXISTS MAESTROPRESTAMOSTEMP LIKE MAESTROPRESTAMOS;

CREATE INDEX idxPrestamoCta
ON MaestroPrestamos(CtaCliente)
COMPRESS YES;


CREATE TABLE IF NOT EXISTS PlanPagos
   (  NumOperacion CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
      IdMovimiento CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
	  Cuota SMALLINT NOT NULL COMPRESS SYSTEM DEFAULT,
	  FecVencimiento DATE ,
	  FecPago DATE ,
	  Monto DOUBLE COMPRESS SYSTEM DEFAULT,
	  Interes DOUBLE COMPRESS SYSTEM DEFAULT,
	  InteresMoratorio DOUBLE COMPRESS SYSTEM DEFAULT,

	  FecModificacion TIMESTAMP(12) DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(NumOperacion, IdMovimiento, Cuota)

	)
	VALUE COMPRESSION COMPRESS YES;

CREATE TABLE IF NOT EXISTS PLANPAGOSTEMP LIKE PLANPAGOS;

CREATE OR REPLACE VIEW PLANPAGOSPENDIENTES AS
SELECT NumOperacion, IdMovimiento, Cuota,
	  FecVencimiento, Monto,
	  Interes, InteresMoratorio,
	  ROUND(Monto + Interes + InteresMoratorio, 2) MONTOCUOTA
FROM PLANPAGOS
WHERE FECPAGO IS NULL;

CREATE OR REPLACE VIEW PLANPAGOSCANCELADOS AS
SELECT NumOperacion, IdMovimiento, Cuota,
	  FecVencimiento, FecPago, Monto,
	  Interes, InteresMoratorio,
	  ROUND(Monto + Interes + InteresMoratorio, 2) MONTOCUOTA
FROM PLANPAGOS
WHERE FECPAGO IS NOT NULL;

CREATE OR REPLACE VIEW PLANPAGOSMONTOS AS
SELECT NumOperacion, IdMovimiento, Cuota,
		Monto, Interes, InteresMoratorio, 
		ROUND(Monto + Interes + InteresMoratorio, 2) MONTOCUOTA
FROM PLANPAGOS;

CREATE OR REPLACE VIEW PLANPAGOSTOTALES AS
SELECT NumOperacion, IdMovimiento, 
		ROUND(SUM(Monto), 2) TOTALMONTOS, ROUND(SUM(Interes), 2) TOTALINTERES, 
        ROUND(SUM(InteresMoratorio), 2) TOTALINTERESMORATORIO,
        ROUND(SUM(MONTOCUOTA), 2) TOTALCUOTAS
FROM PLANPAGOSMONTOS
GROUP BY NUMOPERACION, IDMOVIMIENTO;

CREATE OR REPLACE VIEW PLANPAGOSTOTALPENDIENTES AS
SELECT NumOperacion, IdMovimiento, 
		ROUND(SUM(Monto), 2) TOTALMONTOS, ROUND(SUM(Interes), 2) TOTALINTERES, 
        ROUND(SUM(InteresMoratorio), 2) TOTALINTERESMORATORIO,
        ROUND(SUM(MONTOCUOTA), 2) TOTALCUOTAS
FROM PLANPAGOSPENDIENTES
GROUP BY NUMOPERACION, IDMOVIMIENTO;

CREATE OR REPLACE VIEW PLANPAGOSTOTALCANCELADOS AS
SELECT NumOperacion, IdMovimiento, 
		ROUND(SUM(Monto), 2) TOTALMONTOS, ROUND(SUM(Interes), 2) TOTALINTERES, 
        ROUND(SUM(InteresMoratorio), 2) TOTALINTERESMORATORIO,
        ROUND(SUM(MONTOCUOTA), 2) TOTALCUOTAS
FROM PLANPAGOSCANCELADOS
GROUP BY NUMOPERACION, IDMOVIMIENTO;

CREATE TABLE IF NOT EXISTS Certificados
   (  TipoId CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
  	  CodEmpleado CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  CtaCliente CHAR(10) NOT NULL COMPRESS SYSTEM DEFAULT,
      Docid CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
	  TipoCert CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
 	  NumDoc CHAR(10) NOT NULL COMPRESS SYSTEM DEFAULT,
	  Vers CHAR(5) COMPRESS SYSTEM DEFAULT,
	  Plazo SMALLINT NOT NULL COMPRESS SYSTEM DEFAULT,
	  TipoPago CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
	  Monto DOUBLE COMPRESS SYSTEM DEFAULT,
	  InteresP DOUBLE COMPRESS SYSTEM DEFAULT,
	  InteresC DOUBLE COMPRESS SYSTEM DEFAULT,
	  Interes DOUBLE COMPRESS SYSTEM DEFAULT,
	  FecEmision DATE ,
	  FecVencimiento DATE ,

	  FecModificacion TIMESTAMP(12) DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(TipoCert, CodEmpleado, CtaCliente, NumDoc, TipoPago)

	)
	VALUE COMPRESSION COMPRESS YES;

CREATE TABLE IF NOT EXISTS CERTIFICADOSTEMP LIKE CERTIFICADOS;

CREATE OR REPLACE VIEW CERTIFICADOSMONTOS AS
SELECT TipoId, TipoCert, CodEmpleado, CtaCliente,
        NumDoc, Vers, Plazo, TipoPago,
		Monto, InteresP, InteresC, Interes, 
		ROUND(InteresC + InteresP, 2) INTERESG,
		ROUND(monto + InteresC + InteresP, 2) VALOR,
		FecEmision, FecVencimiento		
FROM CERTIFICADOS;

CREATE OR REPLACE VIEW CERTIFICADOSMONTOSTOTALES AS
SELECT TRIM(TipoCert) || '-' || TRIM(CtaCliente) id, TipoCert, CodEmpleado, CtaCliente, TipoPago, 
		ROUND(SUM(Monto), 2) TOTALMONTOS, ROUND(SUM(InteresP), 2) TOTALINTERESP, 
        ROUND(SUM(InteresC), 2) TOTALINTERESC, ROUND(SUM(Interes), 2) TOTALINTERES,
		ROUND(SUM(Valor), 2) TOTALVALOR
FROM CERTIFICADOSMONTOS
GROUP BY TIPOCERT, CODEMPLEADO, CTACLIENTE, TIPOPAGO;

CREATE OR REPLACE VIEW CERTIFICADOSMONTOSTOTALESID AS
SELECT
	c.UUID,
    certsol.TOTALVALOR CERTSOLVALOR,
    certsol.TOTALMONTOS CERTSOLMONTOS,
    certusd.TOTALVALOR CERTUSDVALOR,
    certusd.TOTALMONTOS CERTUSDMONTOS,
    ctssol.TOTALVALOR CTSSOLVALOR,
    ctssol.TOTALMONTOS CTSSOLMONTOS,
    ctsusd.TOTALVALOR CTSUSDVALOR,
    ctsusd.TOTALMONTOS CTSUSDMONTOS
FROM
    COOPESOCIOS c 
LEFT JOIN CERTIFICADOSMONTOSTOTALES certsol
ON
	certsol.CODEMPLEADO = c.CODEMPLEADO AND 
    certsol.TIPOCERT = '01'
LEFT JOIN CERTIFICADOSMONTOSTOTALES certusd
ON
	certusd.CODEMPLEADO = c.CODEMPLEADO AND 
    certusd.TIPOCERT = '02'
LEFT JOIN  CERTIFICADOSMONTOSTOTALES ctssol
ON
	ctssol.CODEMPLEADO = c.CODEMPLEADO AND 
    ctssol.TIPOCERT = '03'
LEFT JOIN CERTIFICADOSMONTOSTOTALES ctsusd
ON
	ctsusd.CODEMPLEADO = c.CODEMPLEADO AND 
    ctsusd.TIPOCERT = '04';


CREATE TABLE IF NOT EXISTS Garantes
   (  CodEmpleado CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
   	  NumOperacion CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
      IdMovimiento CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
      TipoDoc CHAR(3) NOT NULL COMPRESS SYSTEM DEFAULT,

	  FecModificacion TIMESTAMP(12) DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(CodEmpleado, NumOperacion)

	)
	VALUE COMPRESSION COMPRESS YES;

CREATE TABLE IF NOT EXISTS GARANTESTEMP LIKE GARANTES;

CREATE TABLE IF NOT EXISTS GarantesDetalle
   (  CodEmpleado CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  NumOperacion CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
      TipoDocGarante CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
      DocIdGarante CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  NombreGarante CHAR(50) COMPRESS SYSTEM DEFAULT,

	  FecModificacion TIMESTAMP(12) DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(CodEmpleado, NumOperacion, DocIdGarante)

	)
	VALUE COMPRESSION COMPRESS YES;

CREATE TABLE IF NOT EXISTS GARANTESDETALLETEMP LIKE GARANTESDETALLE;

CREATE TABLE IF NOT EXISTS Garantizados
   (  TipoDoc CHAR(3) NOT NULL COMPRESS SYSTEM DEFAULT,
      CodEmpleado CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  NombreSocio CHAR(50) COMPRESS SYSTEM DEFAULT,
 	  TipoDocGarantizado CHAR(3) NOT NULL COMPRESS SYSTEM DEFAULT,
      DocIdGarantizado CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  NombreSocioGarantizado CHAR(50) COMPRESS SYSTEM DEFAULT,
      IdMovimiento CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
	  NombreProducto CHAR(40) COMPRESS SYSTEM DEFAULT,
	  NumOperacion CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  FecPrestamo DATE,
	  Moneda CHAR(5) COMPRESS SYSTEM DEFAULT,
	  Monto DOUBLE COMPRESS SYSTEM DEFAULT,
	  Saldo DOUBLE COMPRESS SYSTEM DEFAULT,

	  FecModificacion TIMESTAMP(12) DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(CodEmpleado, DocIdGarantizado, NumOperacion)

	)
	VALUE COMPRESSION COMPRESS YES;

CREATE TABLE IF NOT EXISTS GARANTIZADOSTEMP LIKE GARANTIZADOS;

CREATE TABLE IF NOT EXISTS Fra
   (  TipoDoc CHAR(3) NOT NULL COMPRESS SYSTEM DEFAULT,
      CodEmpleado CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  NombreSocio CHAR(50) COMPRESS SYSTEM DEFAULT,
	  Placa CHAR(10) NOT NULL COMPRESS SYSTEM DEFAULT,
	  Propietario CHAR(40) COMPRESS SYSTEM DEFAULT,
	  FecInscripcion DATE,
	  Modelo CHAR(20) COMPRESS SYSTEM DEFAULT,
	  Marca CHAR(20) COMPRESS SYSTEM DEFAULT,
	  Clase CHAR(20) COMPRESS SYSTEM DEFAULT,
	  Color CHAR(20) COMPRESS SYSTEM DEFAULT,
	  AnnoFabricacion SMALLINT COMPRESS SYSTEM DEFAULT,
	  Serie CHAR(25) COMPRESS SYSTEM DEFAULT,
	  Motor CHAR(25) COMPRESS SYSTEM DEFAULT,
	  Tarjeta CHAR(15) COMPRESS SYSTEM DEFAULT,
	  Valor DOUBLE COMPRESS SYSTEM DEFAULT,
	  Accesorios DOUBLE COMPRESS SYSTEM DEFAULT,

	  FecModificacion TIMESTAMP(12) DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(CodEmpleado, Placa)

	)
	VALUE COMPRESSION COMPRESS YES;

CREATE TABLE IF NOT EXISTS FRATEMP LIKE FRA;

CREATE TABLE IF NOT EXISTS Siniestros
   (  TipoDoc CHAR(3) NOT NULL COMPRESS SYSTEM DEFAULT,
      CodEmpleado CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  Placa CHAR(10) NOT NULL COMPRESS SYSTEM DEFAULT,
	  FecSiniestro DATE,
	  Codigo CHAR(5) COMPRESS SYSTEM DEFAULT,
	  Descripcion CHAR(40) COMPRESS SYSTEM DEFAULT,
	  Numero CHAR(10) NOT NULL COMPRESS SYSTEM DEFAULT,
	  Estado CHAR(25) COMPRESS SYSTEM DEFAULT,
	  Lugar CHAR(40) COMPRESS SYSTEM DEFAULT,
	  Franquicia CHAR(15) COMPRESS SYSTEM DEFAULT,
	  Comisaria CHAR(25) COMPRESS SYSTEM DEFAULT,
	  NumDenuncia CHAR(10) COMPRESS SYSTEM DEFAULT,
	  Importe DOUBLE COMPRESS SYSTEM DEFAULT,
	  NumConformidad CHAR(10) COMPRESS SYSTEM DEFAULT,

	  FecModificacion TIMESTAMP(12) DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(CodEmpleado, Placa, Numero)

	)
	VALUE COMPRESSION COMPRESS YES;

CREATE TABLE IF NOT EXISTS SINIESTROSTEMP LIKE SINIESTROS;
