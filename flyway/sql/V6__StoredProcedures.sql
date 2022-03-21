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