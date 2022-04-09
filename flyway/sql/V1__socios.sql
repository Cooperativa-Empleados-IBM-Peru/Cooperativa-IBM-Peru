-- Table and views related to socios

CREATE TABLE IF NOT EXISTS CoopeSocios 
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

CREATE TABLE IF NOT EXISTS COOPESOCIOSTEMP LIKE COOPESOCIOS;

CREATE OR REPLACE VIEW vwCoopeAdmins AS
SELECT *
FROM CoopeSocios
WHERE isAdmin = TRUE;

CREATE OR REPLACE VIEW vwSociosExEmpleados AS
SELECT *
FROM CoopeSocios
WHERE inBluePages = FALSE AND Activo = TRUE;

CREATE OR REPLACE VIEW vwSociosIBM AS
SELECT *
FROM CoopeSocios
WHERE inBluePages = TRUE AND Activo = TRUE AND Company = 'IBM';

CREATE OR REPLACE VIEW vwSociosKYNDRYL AS
SELECT *
FROM CoopeSocios
WHERE inBluePages = TRUE AND Activo = TRUE AND Company = 'KYNDRYL';

CREATE OR REPLACE VIEW vwSociosActivos AS
SELECT CODEMPLEADO, CODPAIS, NOMBREEMPLEADO, LOWER(EMAILEMPLEADO) EMAILEMPLEADO, COMPANY, INBLUEPAGES, ACTIVO, ISADMIN, FECMODIFICACION, UUID  
FROM CoopeSocios
WHERE Activo = TRUE;

CREATE OR REPLACE VIEW vwSociosInactivos AS
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
