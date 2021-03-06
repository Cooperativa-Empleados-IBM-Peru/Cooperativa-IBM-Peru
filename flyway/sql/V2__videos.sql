-- Table and views related to Videos

CREATE TABLE IF NOT EXISTS Videos 
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

CREATE TABLE IF NOT EXISTS VIDEOSTEMP LIKE VIDEOS;
