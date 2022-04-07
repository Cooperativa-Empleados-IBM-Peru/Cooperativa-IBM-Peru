package ibm.coope;

import java.util.Properties;

import org.apache.commons.lang3.time.StopWatch;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import lombok.Data;

@Data
public class CoopeCargaData {
    
    private String resourcefolder = "./resources";
    private String log4jpropfile = resourcefolder + "/log4j2.properties";
    private Logger logger = null;
    private StopWatch watch;
    Properties prop;
 
    CoopeCargaData() {
 
        System.setProperty("log4j.configurationFile", log4jpropfile);
        logger = LogManager.getLogger(CoopeCargaData.class);

        logger.info("===INICIANDO CARGA DE DATOS COPERATIVA IBM PERU===");
        logger.debug("Iniciando contador (watch) de tiempo");

        watch = new StopWatch();
        watch.start();
        prop = CoopeUtils.loadSettings();
        prop.setProperty("resourcefolder", resourcefolder);
        prop.setProperty("log4jpropfile", log4jpropfile);

    }

    public static void main(String[] args) {

        CoopeCargaData coopecarga = new CoopeCargaData();

        String arg;
        if (args.length == 0) {
            arg = "";
        } else {
            arg = args[0];
        }

        coopecarga.carga(arg);

    }

    private void carga(String arg) {

        logger.info("main argument : " + arg);

        switch (arg) {
             case "cargadata" :  
                    CoopeCargaFiles cargadata = new CoopeCargaFiles(prop);
                    cargadata.cargaData();
                    break;

            case "getfiles" :   
                    CoopeSftp sftpcoope = new CoopeSftp(prop);
                    sftpcoope.getFiles();
                    break;

            case "fullcargadata" :
                    CoopeSftp fullcargadatasftp = new CoopeSftp(prop);
                    fullcargadatasftp.getFiles();

                   CoopeCargaFiles fullcargadata = new CoopeCargaFiles(prop);
                   fullcargadata.cargaData();

                  break;

            case "FULL" :
                    CoopeSftp fullsftp = new CoopeSftp(prop);
                    fullsftp.getFiles();

                   CoopeCargaFiles fulldata = new CoopeCargaFiles(prop);
                   fulldata.cargaData();

                  break;

            case "help" :  
            default: 
                    String ayuda = "Se aceptan los siguientes parámetros :" + System.getProperty("line.separator")
                        + "  cargadata     : Esta opción cargará los files de datos de la cuentas de los socios a la bd" + System.getProperty("line.separator")
                        + "  fullcargadata : Esta opción treará los files de datos via sftp, y los cargará en la bd" + System.getProperty("line.separator")
                        + "  getfiles      : Esta opción traerá los files de datos via sftp del server Domino" + System.getProperty("line.separator")
                        + "  help          : Mestra esta información de ayuda";

                        System.out.println(ayuda);
                     break;

        }  // switch(arg)

        // Ending routines
        logger.debug("terminando contador (watch) de tiempo");
        watch.stop();
        logger.info("Time Elapsed: " + watch.toString());
        logger.info("---CARGA DE DATOS DE COOPERATIVA IBM PERU TERMINADA---" + System.getProperty("line.separator") );
        
    }

}