-- Table and views related to socios

CREATE TABLE CoopeSocios 
	( CodEmpleado CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  CodPais CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
	  NombreEmpleado CHAR(70) NOT NULL COMPRESS SYSTEM DEFAULT,
	  emailEmpleado CHAR(70) COMPRESS SYSTEM DEFAULT,
	  company CHARACTER(10) COMPRESS SYSTEM DEFAULT,
	  inBluePages BOOLEAN ,
	  Activo BOOLEAN ,
	  isAdmin BOOLEAN DEFAULT FALSE,
	  uuid CHAR(40) NOT NULL COMPRESS SYSTEM DEFAULT,

	  FecModificacion TIMESTAMP(12) DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(CodEmpleado)
	  ) 
	  VALUE COMPRESSION COMPRESS YES;

CREATE TABLE COOPESOCIOSTEMP LIKE COOPESOCIOS;

CREATE VIEW vwCoopeAdmins AS
SELECT *
FROM CoopeSocios
WHERE isAdmin = TRUE;

CREATE VIEW vwSociosExEmpleados AS
SELECT *
FROM CoopeSocios
WHERE inBluePages = FALSE AND Activo = TRUE;

CREATE VIEW vwSociosIBM AS
SELECT *
FROM CoopeSocios
WHERE inBluePages = TRUE AND Activo = TRUE AND Company = 'IBM';

CREATE VIEW vwSociosKYNDRYL AS
SELECT *
FROM CoopeSocios
WHERE inBluePages = TRUE AND Activo = TRUE AND Company = 'KYNDRYL';

CREATE VIEW vwSociosActivos AS
SELECT CODEMPLEADO, CODPAIS, NOMBREEMPLEADO, LOWER(EMAILEMPLEADO) EMAILEMPLEADO, COMPANY, INBLUEPAGES, ACTIVO, ISADMIN, FECMODIFICACION, UUID  
FROM CoopeSocios
WHERE Activo = TRUE;

CREATE VIEW vwSociosInactivos AS
SELECT CODEMPLEADO, CODPAIS, NOMBREEMPLEADO, LOWER(EMAILEMPLEADO) EMAILEMPLEADO, COMPANY, INBLUEPAGES, ACTIVO, ISADMIN, FECMODIFICACION, UUID 
FROM CoopeSocios
WHERE Activo = FALSE;

CREATE INDEX idxEmails
ON COOPESOCIOS(emailEmpleado)
COMPRESS YES;

CREATE UNIQUE INDEX idxSociosUuid
ON COOPESOCIOS(uuid)
COMPRESS YES;

CREATE INDEX idxSociosCompany
ON COOPESOCIOS(company)
COMPRESS YES;

-- Table and views related to Videos

CREATE TABLE Videos 
	( CodGenero CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
	  Genero CHAR(30) NOT NULL COMPRESS SYSTEM DEFAULT,
	  Codigo CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
	  TituloCastellano CHAR(50) COMPRESS SYSTEM DEFAULT,
	  Titulo CHAR(50) COMPRESS SYSTEM DEFAULT,
	  Protagonista1 CHAR(50) COMPRESS SYSTEM DEFAULT,
	  Protagonista2 CHAR(50) COMPRESS SYSTEM DEFAULT,
	  Protagonista3 CHAR(50) COMPRESS SYSTEM DEFAULT,
	  Protagonista4 CHAR(50) COMPRESS SYSTEM DEFAULT,
	  Director CHAR(50) COMPRESS SYSTEM DEFAULT,
	  Idioma CHAR(15) COMPRESS SYSTEM DEFAULT,
	  Pais CHAR(15) COMPRESS SYSTEM DEFAULT,
	  Anno SMALLINT COMPRESS SYSTEM DEFAULT,

	  FecModificacion TIMESTAMP(12) DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(CodGenero, Codigo)
	  ) 
	  VALUE COMPRESSION COMPRESS YES;

CREATE TABLE VIDEOSTEMP LIKE VIDEOS;

-- Tables and views related to accounts

CREATE TABLE MaestroClientesSaldos
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

CREATE TABLE MAESTROCLIENTESSALDOSTEMP LIKE MAESTROCLIENTESSALDOS;

CREATE INDEX idxCodEmpSaldos
ON MaestroClientesSaldos(CodEmpleado)
COMPRESS YES;

CREATE VIEW CUENTASDETALLES AS
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

CREATE VIEW ctasSoles AS
SELECT
    MC.*, (MC.SALDODISPAHORRO + MC.SALDOBLOQUEOAHORRO) SALDOCONTABLE, CS.UUID
FROM
    MaestroClientesSaldos MC, COOPESOCIOS CS
WHERE
    TipoMoneda = '01' AND
	MC.CODEMPLEADO = CS.CODEMPLEADO;

CREATE VIEW ctasUSD AS
SELECT
    MC.*, (MC.SALDODISPAHORRO + MC.SALDOBLOQUEOAHORRO) SALDOCONTABLE, CS.UUID
FROM
    MaestroClientesSaldos MC, COOPESOCIOS CS
WHERE
    TipoMoneda = '02' AND
	MC.CODEMPLEADO = CS.CODEMPLEADO;

CREATE VIEW CUENTASSALDOS AS
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

CREATE VIEW CTASEMPLEADO AS
SELECT CS.CODEMPLEADO, CS.CTACLIENTE CTASOLES, CD.CTACLIENTE CTAUSD, COOPESOCIOS.UUID
FROM CTASSOLES CS, CTASUSD CD, COOPESOCIOS
WHERE CS.CODEMPLEADO = CD.CODEMPLEADO 
AND CS.CODEMPLEADO = COOPESOCIOS.CODEMPLEADO ;

-- TipoMov : AHO, MIS, APO, BLQ
CREATE TABLE Movimientos
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

CREATE TABLE MOVIMIENTOSTEMP LIKE MOVIMIENTOS;

CREATE INDEX idxMovCta
ON Movimientos(CtaCliente)
COMPRESS YES;

CREATE VIEW MOVAHORROS AS
SELECT *
FROM Movimientos
WHERE TIPOMOV = 'AHO';

CREATE VIEW MOVMISCELANEOS AS
SELECT *
FROM Movimientos
WHERE TIPOMOV = 'MIS';

CREATE VIEW MOVAPORTACIONES AS
SELECT *
FROM Movimientos
WHERE TIPOMOV = 'APO';

CREATE VIEW MOVBLOQUEOS AS
SELECT *
FROM Movimientos
WHERE TIPOMOV = 'BLQ';


CREATE TABLE MaestroPrestamos
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

CREATE TABLE MAESTROPRESTAMOSTEMP LIKE MAESTROPRESTAMOS;

CREATE INDEX idxPrestamoCta
ON MaestroPrestamos(CtaCliente)
COMPRESS YES;


CREATE TABLE PlanPagos
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

CREATE TABLE PLANPAGOSTEMP LIKE PLANPAGOS;

CREATE VIEW PLANPAGOSPENDIENTES AS
SELECT NumOperacion, IdMovimiento, Cuota,
	  FecVencimiento, Monto,
	  Interes, InteresMoratorio,
	  ROUND(Monto + Interes + InteresMoratorio, 2) MONTOCUOTA
FROM PLANPAGOS
WHERE FECPAGO IS NULL;

CREATE VIEW PLANPAGOSCANCELADOS AS
SELECT NumOperacion, IdMovimiento, Cuota,
	  FecVencimiento, FecPago, Monto,
	  Interes, InteresMoratorio,
	  ROUND(Monto + Interes + InteresMoratorio, 2) MONTOCUOTA
FROM PLANPAGOS
WHERE FECPAGO IS NOT NULL;

CREATE VIEW PLANPAGOSMONTOS AS
SELECT NumOperacion, IdMovimiento, Cuota,
		Monto, Interes, InteresMoratorio, 
		ROUND(Monto + Interes + InteresMoratorio, 2) MONTOCUOTA
FROM PLANPAGOS;

CREATE VIEW PLANPAGOSTOTALES AS
SELECT NumOperacion, IdMovimiento, 
		ROUND(SUM(Monto), 2) TOTALMONTOS, ROUND(SUM(Interes), 2) TOTALINTERES, 
        ROUND(SUM(InteresMoratorio), 2) TOTALINTERESMORATORIO,
        ROUND(SUM(MONTOCUOTA), 2) TOTALCUOTAS
FROM PLANPAGOSMONTOS
GROUP BY NUMOPERACION, IDMOVIMIENTO;

CREATE VIEW PLANPAGOSTOTALPENDIENTES AS
SELECT NumOperacion, IdMovimiento, 
		ROUND(SUM(Monto), 2) TOTALMONTOS, ROUND(SUM(Interes), 2) TOTALINTERES, 
        ROUND(SUM(InteresMoratorio), 2) TOTALINTERESMORATORIO,
        ROUND(SUM(MONTOCUOTA), 2) TOTALCUOTAS
FROM PLANPAGOSPENDIENTES
GROUP BY NUMOPERACION, IDMOVIMIENTO;

CREATE VIEW PLANPAGOSTOTALCANCELADOS AS
SELECT NumOperacion, IdMovimiento, 
		ROUND(SUM(Monto), 2) TOTALMONTOS, ROUND(SUM(Interes), 2) TOTALINTERES, 
        ROUND(SUM(InteresMoratorio), 2) TOTALINTERESMORATORIO,
        ROUND(SUM(MONTOCUOTA), 2) TOTALCUOTAS
FROM PLANPAGOSCANCELADOS
GROUP BY NUMOPERACION, IDMOVIMIENTO;

CREATE TABLE Certificados
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

CREATE TABLE CERTIFICADOSTEMP LIKE CERTIFICADOS;

CREATE VIEW CERTIFICADOSMONTOS AS
SELECT TipoId, TipoCert, CodEmpleado, CtaCliente,
        NumDoc, Vers, Plazo, TipoPago,
		Monto, InteresP, InteresC, Interes, 
		ROUND(InteresC + InteresP, 2) INTERESG,
		ROUND(monto + InteresC + InteresP, 2) VALOR,
		FecEmision, FecVencimiento		
FROM CERTIFICADOS;

CREATE VIEW CERTIFICADOSMONTOSTOTALES AS
SELECT TRIM(TipoCert) || '-' || TRIM(CtaCliente) id, TipoCert, CodEmpleado, CtaCliente, TipoPago, 
		ROUND(SUM(Monto), 2) TOTALMONTOS, ROUND(SUM(InteresP), 2) TOTALINTERESP, 
        ROUND(SUM(InteresC), 2) TOTALINTERESC, ROUND(SUM(Interes), 2) TOTALINTERES,
		ROUND(SUM(Valor), 2) TOTALVALOR
FROM CERTIFICADOSMONTOS
GROUP BY TIPOCERT, CODEMPLEADO, CTACLIENTE, TIPOPAGO;

CREATE VIEW CERTIFICADOSMONTOSTOTALESID AS
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


CREATE TABLE Garantes
   (  CodEmpleado CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
   	  NumOperacion CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
      IdMovimiento CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
      TipoDoc CHAR(3) NOT NULL COMPRESS SYSTEM DEFAULT,

	  FecModificacion TIMESTAMP(12) DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(CodEmpleado, NumOperacion)

	)
	VALUE COMPRESSION COMPRESS YES;

CREATE TABLE GARANTESTEMP LIKE GARANTES;

CREATE TABLE GarantesDetalle
   (  CodEmpleado CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  NumOperacion CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
      TipoDocGarante CHAR(5) NOT NULL COMPRESS SYSTEM DEFAULT,
      DocIdGarante CHAR(15) NOT NULL COMPRESS SYSTEM DEFAULT,
	  NombreGarante CHAR(50) COMPRESS SYSTEM DEFAULT,

	  FecModificacion TIMESTAMP(12) DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(CodEmpleado, NumOperacion, DocIdGarante)

	)
	VALUE COMPRESSION COMPRESS YES;

CREATE TABLE GARANTESDETALLETEMP LIKE GARANTESDETALLE;

CREATE TABLE Garantizados
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

CREATE TABLE GARANTIZADOSTEMP LIKE GARANTIZADOS;

CREATE TABLE Fra
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

CREATE TABLE FRATEMP LIKE FRA;

CREATE TABLE Siniestros
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

CREATE TABLE SINIESTROSTEMP LIKE SINIESTROS;

CREATE VIEW VWSociosDetalle AS
SELECT UNIQUE CS.CODEMPLEADO, CS.NOMBREEMPLEADO, CS.EMAILEMPLEADO, MC.DIRECCIONEMPLEADO, CS.UUID 
FROM  COOPESOCIOS CS
LEFT JOIN MAESTROCLIENTESSALDOS MC
ON MC.CODEMPLEADO = CS.CODEMPLEADO;

CREATE VIEW CERTIFICADOSSOLES AS 
SELECT *
FROM CERTIFICADOS
WHERE TIPOCERT = '01';

CREATE VIEW CERTIFICADOSUSD AS 
SELECT *
FROM CERTIFICADOS
WHERE TIPOCERT = '02';

CREATE VIEW CTSSOLES AS 
SELECT *
FROM CERTIFICADOS
WHERE TIPOCERT = '03';

CREATE VIEW CTSUSD AS 
SELECT *
FROM CERTIFICADOS
WHERE TIPOCERT = '04';

CREATE VIEW CERTIFICADOSSOLESMONTOS AS
SELECT TipoId, TipoCert, CodEmpleado, CtaCliente,
        NumDoc, Vers, Plazo, TipoPago,
		Monto, InteresP, InteresC, Interes, 
		ROUND(InteresC + InteresP, 2) INTERESG,
		ROUND(monto + InteresC + InteresP, 2) VALOR,
		FecEmision, FecVencimiento		
FROM CERTIFICADOSSOLES;

CREATE VIEW CERTIFICADOSSOLESMONTOSTOTALES AS
SELECT TipoCert, CodEmpleado, CtaCliente, TipoPago, 
		ROUND(SUM(Monto), 2) TOTALMONTOS, ROUND(SUM(InteresP), 2) TOTALINTERESP, 
        ROUND(SUM(InteresC), 2) TOTALINTERESC, ROUND(SUM(Interes), 2) TOTALINTERES,
		ROUND(SUM(Valor), 2) TOTALVALOR
FROM CERTIFICADOSSOLESMONTOS
GROUP BY TIPOCERT, CODEMPLEADO, CTACLIENTE, TIPOPAGO;

CREATE VIEW CERTIFICADOSUSDMONTOS AS
SELECT TipoId, TipoCert, CodEmpleado, CtaCliente,
        NumDoc, Vers, Plazo, TipoPago,
		Monto, InteresP, InteresC, Interes, 
		ROUND(InteresC + InteresP, 2) INTERESG,
		ROUND(monto + InteresC + InteresP, 2) VALOR,
		FecEmision, FecVencimiento		
FROM CERTIFICADOSUSD;

CREATE VIEW CERTIFICADOSUSDMONTOSTOTALES AS
SELECT TipoCert, CodEmpleado, CtaCliente, TipoPago, 
		ROUND(SUM(Monto), 2) TOTALMONTOS, ROUND(SUM(InteresP), 2) TOTALINTERESP, 
        ROUND(SUM(InteresC), 2) TOTALINTERESC, ROUND(SUM(Interes), 2) TOTALINTERES,
		ROUND(SUM(Valor), 2) TOTALVALOR
FROM CERTIFICADOSUSDMONTOS
GROUP BY TIPOCERT, CODEMPLEADO, CTACLIENTE, TIPOPAGO;

CREATE VIEW CTSSOLESMONTOS AS
SELECT TipoId, TipoCert, CodEmpleado, CtaCliente,
        NumDoc, Vers, Plazo, TipoPago,
		Monto, InteresP, InteresC, Interes, 
		ROUND(InteresC + InteresP, 2) INTERESG,
		ROUND(monto + InteresC + InteresP, 2) VALOR,
		FecEmision, FecVencimiento		
FROM CTSSOLES;

CREATE VIEW CTSSOLESMONTOSTOTALES AS
SELECT TipoCert, CodEmpleado, CtaCliente, TipoPago, 
		ROUND(SUM(Monto), 2) TOTALMONTOS, ROUND(SUM(InteresP), 2) TOTALINTERESP, 
        ROUND(SUM(InteresC), 2) TOTALINTERESC, ROUND(SUM(Interes), 2) TOTALINTERES,
		ROUND(SUM(Valor), 2) TOTALVALOR
FROM CTSSOLESMONTOS
GROUP BY TIPOCERT, CODEMPLEADO, CTACLIENTE, TIPOPAGO;

CREATE VIEW CTSUSDMONTOS AS
SELECT TipoId, TipoCert, CodEmpleado, CtaCliente,
        NumDoc, Vers, Plazo, TipoPago,
		Monto, InteresP, InteresC, Interes, 
		ROUND(InteresC + InteresP, 2) INTERESG,
		ROUND(monto + InteresC + InteresP, 2) VALOR,
		FecEmision, FecVencimiento		
FROM CTSUSD;

CREATE VIEW CTSUSDMONTOSTOTALES AS
SELECT TipoCert, CodEmpleado, CtaCliente, TipoPago, 
		ROUND(SUM(Monto), 2) TOTALMONTOS, ROUND(SUM(InteresP), 2) TOTALINTERESP, 
        ROUND(SUM(InteresC), 2) TOTALINTERESC, ROUND(SUM(Interes), 2) TOTALINTERES,
		ROUND(SUM(Valor), 2) TOTALVALOR
FROM CTSUSDMONTOS
GROUP BY TIPOCERT, CODEMPLEADO, CTACLIENTE, TIPOPAGO;

CREATE VIEW PRSOLAFIRMA AS
SELECT M.*
FROM MAESTROPRESTAMOS M
WHERE IDMOVIMIENTO = '0201';

CREATE VIEW PRCORTOPLAZO AS
SELECT M.*
FROM MAESTROPRESTAMOS M
WHERE IDMOVIMIENTO = '0202';

CREATE VIEW PRACADEMICO AS
SELECT M.*
FROM MAESTROPRESTAMOS M
WHERE IDMOVIMIENTO = '0203';

CREATE VIEW PRLARGOPLAZO AS
SELECT M.*
FROM MAESTROPRESTAMOS M
WHERE IDMOVIMIENTO = '0204';

CREATE VIEW PRHIPOTECARIO AS
SELECT M.*
FROM MAESTROPRESTAMOS M
WHERE IDMOVIMIENTO = '0205';

CREATE VIEW PRCONSUMO AS
SELECT M.*
FROM MAESTROPRESTAMOS M
WHERE IDMOVIMIENTO = '0206';

CREATE VIEW PRAUTOMOVIL AS
SELECT M.*
FROM MAESTROPRESTAMOS M
WHERE IDMOVIMIENTO = '0207';

CREATE VIEW PRPS AS
SELECT M.*
FROM MAESTROPRESTAMOS M
WHERE IDMOVIMIENTO = '0208';

CREATE VIEW PRESP1 AS
SELECT M.*
FROM MAESTROPRESTAMOS M
WHERE IDMOVIMIENTO = '0209';

CREATE VIEW PRESP2 AS
SELECT M.*
FROM MAESTROPRESTAMOS M
WHERE IDMOVIMIENTO = '0210';

CREATE TABLE UsersLogin 
	( emailEmpleado CHAR(70) NOT NULL COMPRESS SYSTEM DEFAULT,
	  FecLogin TIMESTAMP(12) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	  PRIMARY KEY(emailEmpleado, FecLogin)
	  ) 
	  VALUE COMPRESSION COMPRESS YES;

CREATE INDEX idxLoginEmail
ON USERSLOGIN(emailEmpleado)
COMPRESS YES;

CREATE INDEX idxLoginFecha
ON USERSLOGIN(FecLogin)
COMPRESS YES;

CREATE VIEW LOGINUSERS AS
SELECT DATE(FECLOGIN) FECHA, COUNT(*) CANTIDAD
FROM USERSLOGIN
GROUP BY DATE(FECLOGIN);

CREATE VIEW VWMASTERPLANPAGOS AS
SELECT 
	tot.NUMOPERACION, tot.IDMOVIMIENTO,
	tot.TOTALMONTOS, tot.TOTALINTERES, tot.TOTALINTERESMORATORIO, tot.TOTALCUOTAS,
	pend.TOTALMONTOS PENDTOTALMONTOS, pend.TOTALINTERES PENDTOTALINTERES,
	pend.TOTALINTERESMORATORIO PENDTOTALINTERESMORATORIO, pend.TOTALCUOTAS PENDTOTALCUOTAS,
	canc.TOTALMONTOS CANTOTALMONTOS, canc.TOTALINTERES CANTOTALINTERES,
	canc.TOTALINTERESMORATORIO CANTOTALINTERESMORATORIO, canc.TOTALCUOTAS CANTOTALCUOTAS
FROM 
	PLANPAGOSTOTALES tot
LEFT JOIN PLANPAGOSTOTALPENDIENTES pend
ON
	tot.NUMOPERACION = pend.NUMOPERACION AND 
	tot.IDMOVIMIENTO = pend.IDMOVIMIENTO 
LEFT JOIN PLANPAGOSTOTALCANCELADOS canc
ON
	tot.NUMOPERACION = canc.NUMOPERACION AND 
	tot.IDMOVIMIENTO = canc.IDMOVIMIENTO;

CREATE VIEW VWMASTERLOOKUP AS
SELECT 
	cs.UUID, cs.EMAILEMPLEADO , cs.CODEMPLEADO, cs.CODPAIS, cs.COMPANY, cs.NOMBREEMPLEADO,  
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

-- Stored Procedures

--#SET TERMINATOR @
CREATE PROCEDURE TRUNCTEMPS()
LANGUAGE SQL
P1:
  BEGIN

COMMIT;
UPDATE COOPESOCIOS SET EMAILEMPLEADO = TRIM(LOWER(EMAILEMPLEADO));

COMMIT;
TRUNCATE TABLE MAESTROCLIENTESSALDOSTEMP IMMEDIATE;

COMMIT;
TRUNCATE TABLE MOVIMIENTOSTEMP IMMEDIATE;

COMMIT;
TRUNCATE TABLE MAESTROPRESTAMOSTEMP IMMEDIATE;

COMMIT;
TRUNCATE TABLE CERTIFICADOSTEMP IMMEDIATE;

COMMIT;
TRUNCATE TABLE GARANTESTEMP IMMEDIATE;

COMMIT;
TRUNCATE TABLE GARANTESDETALLETEMP IMMEDIATE;

COMMIT;
TRUNCATE TABLE GARANTIZADOSTEMP IMMEDIATE;

COMMIT;
TRUNCATE TABLE FRATEMP IMMEDIATE;

COMMIT;
TRUNCATE TABLE PLANPAGOSTEMP IMMEDIATE;

COMMIT;
TRUNCATE TABLE SINIESTROSTEMP IMMEDIATE;

COMMIT;
TRUNCATE TABLE VIDEOSTEMP IMMEDIATE;

COMMIT;

  END P1@
--#SET TERMINATOR ;
 
--#SET TERMINATOR @
CREATE PROCEDURE MOVEDATA()
LANGUAGE SQL
P1:
  BEGIN

COMMIT;
TRUNCATE TABLE MAESTROCLIENTESSALDOS IMMEDIATE;
COMMIT;
INSERT INTO MAESTROCLIENTESSALDOS (SELECT * FROM MAESTROCLIENTESSALDOSTEMP);

COMMIT;
TRUNCATE TABLE MOVIMIENTOS IMMEDIATE;
COMMIT;
INSERT INTO MOVIMIENTOS (SELECT * FROM MOVIMIENTOSTEMP);

COMMIT;
TRUNCATE TABLE MAESTROPRESTAMOS IMMEDIATE;
COMMIT;
INSERT INTO MAESTROPRESTAMOS (SELECT * FROM MAESTROPRESTAMOSTEMP);

COMMIT;
TRUNCATE TABLE PLANPAGOS IMMEDIATE;
COMMIT;
INSERT INTO PLANPAGOS (SELECT * FROM PLANPAGOSTEMP);

COMMIT;
TRUNCATE TABLE CERTIFICADOS IMMEDIATE;
COMMIT;
INSERT INTO CERTIFICADOS (SELECT * FROM CERTIFICADOSTEMP);

COMMIT;
TRUNCATE TABLE GARANTES IMMEDIATE;
COMMIT;
INSERT INTO GARANTES (SELECT * FROM GARANTESTEMP);

COMMIT;
TRUNCATE TABLE GARANTESDETALLE IMMEDIATE;
COMMIT;
INSERT INTO GARANTESDETALLE (SELECT * FROM GARANTESDETALLETEMP);

COMMIT;
TRUNCATE TABLE GARANTIZADOS IMMEDIATE;
COMMIT;
INSERT INTO GARANTIZADOS (SELECT * FROM GARANTIZADOSTEMP);

COMMIT;
TRUNCATE TABLE FRA IMMEDIATE;
COMMIT;
INSERT INTO FRA (SELECT * FROM FRATEMP);

COMMIT;
TRUNCATE TABLE SINIESTROS IMMEDIATE;
COMMIT;
INSERT INTO SINIESTROS (SELECT * FROM SINIESTROSTEMP);

COMMIT;
TRUNCATE TABLE VIDEOS IMMEDIATE;
COMMIT;
INSERT INTO VIDEOS (SELECT * FROM VIDEOSTEMP);

COMMIT;

  END P1@
--#SET TERMINATOR ;

--#SET TERMINATOR @
CREATE PROCEDURE TRUNCSOCIOSTEMP()
LANGUAGE SQL
P1:
  BEGIN

COMMIT;
TRUNCATE TABLE COOPESOCIOSTEMP IMMEDIATE;

COMMIT;

  END P1@
--#SET TERMINATOR ;

--#SET TERMINATOR @
CREATE PROCEDURE MOVEDATASOCIOS()
LANGUAGE SQL
P1:
  BEGIN

COMMIT;
TRUNCATE TABLE COOPESOCIOS IMMEDIATE;
COMMIT;
INSERT INTO COOPESOCIOS (SELECT * FROM COOPESOCIOSTEMP);

COMMIT;

  END P1@
--#SET TERMINATOR ;