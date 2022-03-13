package ibm.coope;

import java.util.Properties;
import java.util.Vector;

import com.ibm.bluepages.BPResults;
import com.ibm.bluepages.BluePages;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.*;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.AccessLevel;

@Data
public class CoopeCargaSocios {
    
    Logger logger = null;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private Properties prop;
	private BPResults bpresults;

    private Connection con;
    private Statement stmt;
    private ResultSet rs;
  
    BufferedReader csvReader;

    public void cargaSocios() {

        if ( connectdb2()) {
   
            logger.info("Calling Stored Procedure TRUNCSOCIOSTEMP");
            callStoredProc("TRUNCSOCIOSTEMP()");

            if ( loadFileCarga(prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.socios"))) {

                cargaFileSocios();

                closeFileCarga();

            }

            if ( loadFileCarga(prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.admins"))) {

                cargaAdmins();

                closeFileCarga();

            }

            logger.info("calling Stored Procedure MOVEDATASOCIOS");
            callStoredProc("MOVEDATASOCIOS()");
            logger.info("Calling Stored Procedure TRUNCSOCIOSTEMP");
            callStoredProc("TRUNCSOCIOSTEMP()");

            closedb2Connection();

        }

    }

    CoopeCargaSocios(Properties vprop) {

        logger = LogManager.getLogger(CoopeCargaSocios.class);

        logger.info("Iniciando carga socios Cooperativa"); // java.time.LocalDateTime.now());
 
        prop = vprop;
 
    }

    private void cargaFileSocios() {

        logger.debug("Iniciando variables cargaFileSocios");
        String csvrow;
        int bprow;
        int contok = 0;
        int contno = 0;

        boolean inBluePages = true;
        String sql = "";
        String nombre = "";
        String email = "";

        try {
           
            sql = "SELECT * FROM COOPESOCIOSTEMP";
            rs = stmt.executeQuery(sql);

            while ((csvrow = csvReader.readLine()) != null) {

                logger.trace(csvrow);
                final String[] data = csvrow.split(",");
                // do something with the data

                // Search in Bluepage
                logger.debug("buscando en Bluepages, CNUM : " + data[0].trim()
                        + prop.getProperty("coopetxt.country").trim());
                bpresults = BluePages.getPersonByCnum(data[0].trim() + prop.getProperty("coopetxt.country").trim());
                bprow = bpresults.rows();

                if (bprow == 0) {
                    logger.debug(data[0] + " -> " + data[1] + " -> " + data[2] + " ... NOT FOUND in Bluepages");
                    contno++;

                    inBluePages = false;
                    nombre = CoopeUtils.cleanString(data[1]);
                    email = "external@external.com";

                } else if (bprow == 1) {
                    logger.debug(data[0] + " -> " + data[1] + " -> " + data[2] + " ... FOUND in Bluepages!!!");
                    contok++;

                    inBluePages = true;

                    final Vector<String> nameColumn = bpresults.getColumn("NAME");
                    nombre = (String) nameColumn.elementAt(0);

                    final Vector<String> intaddrColumn = bpresults.getColumn("INTERNET");
                    email = (String) intaddrColumn.elementAt(0);

                } // if (bprow == 0)

                    // INSERT NEW RECORD
                    rs.moveToInsertRow();

                    rs.updateString("CodEmpleado", data[0].trim() );
                    rs.updateString("CodPais", prop.getProperty("coopetxt.country").trim() );
                    rs.updateString("NombreEmpleado", nombre );
                    rs.updateString("emailEmpleado", email );
                    rs.updateBoolean("inBluePages", inBluePages );
                    rs.updateBoolean("Activo", true );

                    rs.insertRow();
               
            } // while(csrow...)

            // Close the ResultSet
            rs.close();
            logger.trace("**** Closed JDBC ResultSet");
          
            con.commit();
           
        } catch (final IOException e) {
             logger.error(e);

        } catch (SQLException ex) {
            logger.error("SQLException information");
            while (ex != null) {
                logger.error("Error msg: " + ex.getMessage());
                logger.error("SQLSTATE: " + ex.getSQLState());
                logger.error("Error code: " + ex.getErrorCode());
                logger.error(ex);
                ex = ex.getNextException(); // For drivers that support chained exceptions

            }

            logger.error("Rolling back data here....");
            try{
               if(con!=null)
                  con.rollback();
            }catch(SQLException se2){
               logger.error(se2);
            }//end try

        }

        logger.info("Encontrados en Bluepages : " + contok);
        logger.info("No Encontrados en Bluepages : " + contno);

        logger.info("Finalizando carga socios Cooperativa"); // + java.time.LocalDateTime.now());

    }

    private void cargaAdmins() {

        logger.debug("Iniciando variables cargaAdmins");
        String csvrow;
        int bprow;
  
        String sql;
        Boolean inBluePages = true;
        String nombre = "";
        String codempleado = "";
        String pais = "";
       
        try {
           
            logger.info("Leyendo file de admins");
            while ((csvrow = csvReader.readLine()) != null) {

                logger.trace(csvrow);
    
                // Search in Bluepage
                logger.debug("buscando en Bluepages, email : " + csvrow.trim() );
    
                bpresults = BluePages.getPersonsByInternet(csvrow.trim() );
                bprow = bpresults.rows();

                if (bprow == 0) {
                    logger.debug(csvrow.trim() + " ... NOT FOUND in Bluepages");
    
                    inBluePages = false;
                    nombre = "external admin";
                    codempleado = RandomStringUtils.random(6, true, true);
                    pais = prop.getProperty("coopetxt.country").trim();
    
                } else if (bprow == 1) {
                    logger.debug(csvrow.trim() + " ... FOUND in Bluepages!!!");
      
                    inBluePages = true;

                    final Vector<String> nameColumn = bpresults.getColumn("NAME");
                    nombre = (String) nameColumn.elementAt(0);

                    final Vector<String> codempColumn = bpresults.getColumn("EMPNUM");
                    codempleado = (String) codempColumn.elementAt(0);

                    final Vector<String> ccColumn = bpresults.getColumn("EMPCC");
                    pais = (String) ccColumn.elementAt(0); 

                } // if (bprow == 0)

                // Search in db2
                logger.debug("Buscando en db2, email : " + csvrow.trim() );
                sql = "SELECT * FROM COOPESOCIOSTEMP WHERE LOWER(EMAILEMPLEADO) = '" + csvrow.trim() + "'";
                rs = stmt.executeQuery(sql);

                if (!rs.isBeforeFirst()) {
                    logger.trace(csvrow.trim() + " NOT in db2");

                    // INSERT NEW RECORD
                    rs.moveToInsertRow();

                    rs.updateString("CodEmpleado", codempleado );
                    rs.updateString("CodPais", pais );
                    rs.updateString("NombreEmpleado", nombre );
                    rs.updateString("emailEmpleado", csvrow );
                    rs.updateBoolean("inBluePages", inBluePages );
                    rs.updateBoolean("Activo", true );
                    rs.updateBoolean("isAdmin", true );

                    rs.insertRow();

                } else {
                    logger.trace(csvrow.trim() + " IS in db2");

                    // UPDATE EXISTING RECORD
                    ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("Etc/UTC"));
                    Timestamp timestamp = Timestamp.valueOf(zdt.toLocalDateTime());
                    rs.next();
                    rs.updateBoolean("Activo", true );
                    rs.updateBoolean("isAdmin", true );
                    rs.updateTimestamp("FecModificacion", timestamp);
                    rs.updateRow();
                }

                // Close the ResultSet
                rs.close();
                logger.trace("**** Closed JDBC ResultSet");

                con.commit();
                
            } // while(csrow...)

        } catch (final IOException e) {
             logger.error(e);

        } catch (SQLException ex) {
            logger.error("SQLException information");
            while (ex != null) {
                logger.error("Error msg: " + ex.getMessage());
                logger.error("SQLSTATE: " + ex.getSQLState());
                logger.error("Error code: " + ex.getErrorCode());
                logger.error(ex);
                ex = ex.getNextException(); // For drivers that support chained exceptions

            }

            logger.error("Rolling back data here....");
            try{
               if(con!=null)
                  con.rollback();
            }catch(SQLException se2){
               logger.error(se2);
            }//end try
        }

        logger.info("Finalizando carga admins Cooperativa"); // + java.time.LocalDateTime.now());

    }

    private void callStoredProc(String spname) {

        try {

            String sql = "call " + spname + "";
     //       Statement statement = con.prepareCall(sql);
     Statement statement = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
 
            statement.execute(sql);
            statement.close();

        } catch (SQLException e) {
            logger.error("Error in Stored Procedure : " + spname);
            logger.error(e);

            logger.error("Rolling back data here....");
            try{
               if(con!=null)
                  con.rollback();
            }catch(SQLException se2){
               logger.error(se2);
            }//end try

        }
   
    }

    private boolean connectdb2() {

        boolean db2connected = true;

        logger.info(". conectando a db2");

        try {
            // Load the driver
            Class.forName("com.ibm.db2.jcc.DB2Driver");
            logger.info("**** Loaded the JDBC driver");

            // Create the connection using the IBM Data Server Driver for JDBC and SQLJ
            con = DriverManager.getConnection(prop.getProperty("jdbcurl"), prop.getProperty("username"),
                    prop.getProperty("password"));
            // Commit changes manually
            con.setAutoCommit(false);
            logger.info("**** Created a JDBC connection to the data source");

            stmt = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            logger.debug("**** Created JDBC Statement object");

        } catch (final ClassNotFoundException e) {
            logger.error("Could not load JDBC driver");
            logger.error(e);

            db2connected = false;

        } catch (SQLException ex) {
            logger.error("SQLException information");
            while (ex != null) {
                logger.error("Error msg: " + ex.getMessage());
                logger.error("SQLSTATE: " + ex.getSQLState());
                logger.error("Error code: " + ex.getErrorCode());
                logger.error(ex);
                ex = ex.getNextException(); // For drivers that support chained exceptions

                db2connected = false;
            }
        }

        return db2connected;

    }

    private boolean loadFileCarga(String fname) {

        boolean fileloaded = true;

        logger.info("leyendo archivo ...");

        try {
            logger.debug("opening file : " + fname);
            csvReader = new BufferedReader(new FileReader(fname));

        } catch (final FileNotFoundException e) {
            logger.error(e);

            fileloaded = false;

        }

        return fileloaded;

    }

    private void closeFileCarga() {

        try {
            logger.debug("Cerrando file ...");
            csvReader.close();
            logger.info("file closed ...");

        } catch (IOException e) {
            logger.error(e);
            
        } 
    }

    private void closedb2Connection() {

        try {
              // Close the Statement
              stmt.close();
              logger.info("**** Closed JDBC Statement");
           
              // Close the connection
              logger.debug("Closing connection to db2");
              con.close();
              logger.info("**** Disconnected from db2 data source");
                                 
        }  catch(SQLException ex)  {
               logger.error("SQLException information");
               while(ex!=null) {
                    logger.error("Error msg: " + ex.getMessage());
                    logger.error("SQLSTATE: " + ex.getSQLState());
                    logger.error("Error code: " + ex.getErrorCode());
                    logger.error(ex);
                    ex = ex.getNextException(); // For drivers that support chained exceptions
               
               }
        }
            
    }

}