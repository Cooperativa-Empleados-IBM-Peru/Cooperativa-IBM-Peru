package ibm.coope;

import java.util.Properties;
import java.util.UUID;

import java.sql.*;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.AccessLevel;

@Data
public class CoopeSetUuids {
    
    Logger logger = null;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private Properties prop;

    private Connection con;
    private Statement stmt;
    private ResultSet rs;
  
    public void setUuids() {

        if ( connectdb2()) {
   
            setNewUuids();
 
            closedb2Connection();

        }

    }

    CoopeSetUuids(Properties vprop) {

        logger = LogManager.getLogger(CoopeCargaSocios.class);

        logger.info("Iniciando seteo de uuids"); // java.time.LocalDateTime.now());
 
        prop = vprop;
 
    }

    private void setNewUuids() {

        logger.debug("Iniciando variables setNewUuids");
        String sql = "";
  
        try {
           
            sql = "SELECT * FROM COOPESOCIOS";
            rs = stmt.executeQuery(sql);

            while(rs.next()){
                rs.updateString("UUID", UUID.randomUUID().toString() );
                rs.updateRow();
             }

            // Close the ResultSet
            rs.close();
            logger.trace("**** Closed JDBC ResultSet");
          
            con.commit();
           
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

        logger.info("Finalizando carga socios Cooperativa"); // + java.time.LocalDateTime.now());

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