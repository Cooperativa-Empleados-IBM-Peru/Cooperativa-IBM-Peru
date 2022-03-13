package ibm.coope;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Properties;

import org.apache.commons.lang3.ObjectUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.AccessLevel;

@Data
public class CoopeCargaFiles {

    Logger logger = null;
    private boolean loaddb = true;

    private Connection con;
    private Statement stmt;
    private ResultSet rs;

    BufferedReader fileReader;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private Properties prop;

    CoopeCargaFiles(Properties vprop) {

        logger = LogManager.getLogger(CoopeCargaFiles.class);

        logger.info("Iniciando carga data Cooperativa"); // java.time.LocalDateTime.now());

        prop = vprop;

    }

    public void cargaData() {

        String fname = "";

        try {
    
        if (connectdb2()) {

            logger.info("Calling Stored Procedure TRUNCTEMPS");
            callStoredProc("TRUNCTEMPS()");

            fname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.maestro");
            logger.info("Looking for MaestroClientesSaldos file : " + fname);
            if (loadFileCoope(fname)) {
                logger.info("Loading MaestroClientesSaldos to db2");
                cargaMaestroClientes();

                closeFile();
            }

            fname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.movimientos");
            logger.info("Looking for MovimientoAhorros file : " + fname);
            if (loadFileCoope(fname)) {
                logger.info("Loading MovimientoAhorros to db2");
                cargaMovimientos("AHO");

                closeFile();
            }

            fname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.miscelaneos");
            logger.info("Looking for MovimientoMiscelaneos file : " + fname);
            if (loadFileCoope(fname)) {
                logger.info("Loading MovimientoMiscelaneos to db2");
                cargaMovimientos("MIS");

                closeFile();
            }

            fname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.aportaciones");
            logger.info("Looking for MovimientoAportaciones file : " + fname);
            if (loadFileCoope(fname)) {
                logger.info("Loading MovimientoAportaciones to db2");
                cargaMovimientos("APO");

                closeFile();
            }

            fname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.bloqueo");
            logger.info("Looking for MovimientoBloqueos file : " + fname);
            if (loadFileCoope(fname)) {
                logger.info("Loading MovimientoBloqueos to db2");
                cargaMovimientos("BLQ");

                closeFile();
            }

            fname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.prestamos");
            logger.info("Looking for MaestroPrestamos file : " + fname);
            if (loadFileCoope(fname)) {
                logger.info("Loading MaestroPrestamos to db2");
                cargaMaestroPrestamos();

                closeFile();
            }

            fname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.pagos");
            logger.info("Looking for PlanPagos file : " + fname);
            if (loadFileCoope(fname)) {
                logger.info("LoadingPlanPagos to db2");
                cargaPlanPagos();

                closeFile();
            }

            fname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.certificados");
            logger.info("Looking for Certificados file : " + fname);
            if (loadFileCoope(fname)) {
                logger.info("Loading Certificados to db2");
                cargaCertificados();

                closeFile();

            }

            fname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.garantes");
            logger.info("Looking for Garantes file : " + fname);
            if (loadFileCoope(fname)) {
                logger.info("Loading Garantes to db2");
                cargaGarantes();

                closeFile();

            }

            fname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.garantizados");
            logger.info("Looking for Garantizados file : " + fname);
            if (loadFileCoope(fname)) {
                logger.info("Loading Garantizados to db2");
                cargaGarantizados();

                closeFile();

            }

            fname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.fondoreposicionauto");
            logger.info("Looking for FRA file : " + fname);
            if (loadFileCoope(fname)) {
                logger.info("Loading FRA to db2");
                cargaFra();

                closeFile();

            }

            fname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.fondosiniestroauto");
            logger.info("Looking for Siniestros file : " + fname);
            if (loadFileCoope(fname)) {
                logger.info("Loading Siniestros to db2");
                cargaSiniestros();

                closeFile();

            }


            fname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.videos");
            logger.info("Looking for Videos file : " + fname);
            if (loadFileCoope(fname)) {
                logger.info("Loading Videos to db2");
  
                cargaVideos();

                closeFile();

            }

                Thread.sleep(5000);
                logger.info("calling Stored Procedure MOVEDATA");
                callStoredProc("MOVEDATA()");
                Thread.sleep(5000);
                logger.info("calling Stored Procedure TRUNCTEMPS");
                callStoredProc("TRUNCTEMPS()");
        
                closedb2Connection();

        } // if connectdb2

            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                logger.error(e);
            }

    }

    private void cargaMaestroClientes() {

        logger.debug("Iniciando variables cargaMaestroClientes");
        String filerow = "";
        String sql = "";
        LocalDate tmpld;

        try {

            sql = "SELECT * FROM MAESTROCLIENTESSALDOSTEMP";
            rs = stmt.executeQuery(sql);

            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopePrusal maestro = new CoopePrusal(filerow);

                if (loaddb) {
                rs.moveToInsertRow();

                rs.updateString("TipoId", maestro.getTipoID());
                rs.updateString("CodEmpleado", maestro.getCodEmpleado());
                rs.updateString("NombreEmpleado", maestro.getNomSocio());
                rs.updateString("DireccionEmpleado", maestro.getDirSocio());
                rs.updateString("CodEmpresa", maestro.getCodEmpresa());
                rs.updateString("CtaCliente", maestro.getCtaCliente());
                rs.updateString("TipoMoneda", maestro.getTipoMonedaPago());
                rs.updateDouble("IntAhorroMes", maestro.getIntAhoMes());
                rs.updateDouble("IntMiscelaneoMes", maestro.getIntMisMes());

                rs.updateDouble("SaldoDispAhorro", maestro.getSalDisAho());
                rs.updateDouble("SaldoBloqueoAhorro", maestro.getSalBloAho());
                rs.updateDouble("SaldoAportacion", maestro.getSalAporta());
                rs.updateDouble("SaldoMiscelaneo", maestro.getSalMiscel());
                rs.updateDouble("SaldoCertificado1", maestro.getSalCert1());
                rs.updateDouble("SaldoCertificado2", maestro.getSalCert2());
                rs.updateDouble("SaldoPresSolaFirma", maestro.getSalPSFirma());
                rs.updateDouble("SaldoPresCortoPlazo", maestro.getSalPCPlazo());
                rs.updateDouble("SaldoPresMedianoPlazo", maestro.getSalPMPlazo());
                rs.updateDouble("SaldoPresLargoPlazo", maestro.getSalPLPlazo());
                rs.updateDouble("SaldoPresHipotecario", maestro.getSalPHipot());
                rs.updateDouble("SaldoPresConsumo", maestro.getSalPConsum());
                rs.updateDouble("SaldoPresAuto", maestro.getSalPAuto());
                rs.updateDouble("SaldoPresPS1", maestro.getSalPPS1());
                rs.updateDouble("SaldoPresEsp1", maestro.getSalPEsp1());
                rs.updateDouble("SaldoPresEsp2", maestro.getSalPEsp2());

                tmpld = maestro.getFecMovDisAho();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecDispAhorro", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovBloAho();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecBloqueoAhorro", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovAporta();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecAportacion", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovMiscel();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecMiscelaneo", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovCert1();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecCertificado1", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovCert2();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecCertificado2", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovPSFirma();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecPresSolaFirma", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovPCPlazo();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecPresCortoPlazo", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovPMPlazo();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecPresMedianoPlazo", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovPLPlazo();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecPresLargoPlazo", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovPHipot();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecPresHipotecario", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovPConsum();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecPresConsumo", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovPAuto();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecPresAuto", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovPPS1();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecPresPS1", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovPEsp1();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecPresEsp1", java.sql.Date.valueOf(tmpld));

                tmpld = maestro.getFecMovPEsp2();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecPresEsp2", java.sql.Date.valueOf(tmpld));

                rs.insertRow();

                } // loaddb
            } // while

            // Close the ResultSet
            rs.close();
            logger.trace("**** Closed JDBC ResultSet");

            con.commit();
         
        } catch (final IOException e) {
            logger.error(e);

        } catch (SQLException ex) {
 
            logger.error("SQLException information");
            logger.error(filerow);
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

        logger.info("Finalizando cargaMaestroClientes"); // + java.time.LocalDateTime.now())

    }

    private void cargaMovimientos(String tipomov) {

        logger.debug("Iniciando variables cargaMovimientos " + tipomov);
        String filerow = "";
        String sql = "";
        LocalDate tmpld;
        LocalDateTime tmpldt;

        try {

            sql = "SELECT * FROM MOVIMIENTOSTEMP";
            rs = stmt.executeQuery(sql);

            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeMovimiento movim = new CoopeMovimiento(filerow);

                if (loaddb) {
                rs.moveToInsertRow();

                rs.updateString("TipoMov", tipomov);
                rs.updateString("CtaCliente", movim.getCtaCliente());
                rs.updateString("Idmov", movim.getIdMov());
                rs.updateString("CodEmpresa", movim.getCodEmpr());
                rs.updateString("TipoPago", movim.getTipoPago());
                rs.updateString("Transaccion", movim.getTransac());
                rs.updateString("Referencia", movim.getReferencia());
                rs.updateString("RefAlfa", movim.getReferAlfa());
                rs.updateString("NumDEpo", movim.getNumDepo());

                tmpldt = movim.getFecEmision();
                if (!ObjectUtils.isEmpty(tmpldt))
                    rs.updateTimestamp("FecEmision", java.sql.Timestamp.valueOf(tmpldt));

                tmpld = movim.getFecVencimiento();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecVencimiento", java.sql.Date.valueOf(tmpld));

                rs.updateDouble("Importe", movim.getImporte());
                rs.updateString("Texto", movim.getTexto());

                rs.insertRow();

                } // loaddb
            } // while

            // Close the ResultSet
            rs.close();
            logger.trace("**** Closed JDBC ResultSet");

            con.commit();      

       } catch (final IOException e) {
            logger.error(e);

        } catch (SQLException ex) {
            logger.error("SQLException information");
            logger.error(filerow);
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

        logger.info("Finalizando cargaMovimientos " + tipomov); // + java.time.LocalDateTime.now())

    }

    private void cargaMaestroPrestamos() {

        logger.debug("Iniciando variables cargaMaestroPrestamos");
        String filerow = "";
        String sql = "";
        LocalDate tmpld;

        try {

            sql = "SELECT * FROM MAESTROPRESTAMOSTEMP";
            rs = stmt.executeQuery(sql);

            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeMaepre prestamo = new CoopeMaepre(filerow);

                if (loaddb) {
                rs.moveToInsertRow();

                rs.updateString("TipoId", prestamo.getTipoId());
                rs.updateString("DocId", prestamo.getDocId());
                rs.updateString("Idmovimiento", prestamo.getIdMov());
                rs.updateString("CodEmpresa", prestamo.getCodEmpr());
                rs.updateString("CtaCliente", prestamo.getCtaCliente());
                rs.updateString("NumOperacion", prestamo.getNumeOperacion());

                tmpld = prestamo.getFecCartera();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecCartera", java.sql.Date.valueOf(tmpld));

                tmpld = prestamo.getFecRenovacion();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecRenovacion", java.sql.Date.valueOf(tmpld));

                tmpld = prestamo.getFecVencimiento();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecVencimiento", java.sql.Date.valueOf(tmpld));

                rs.updateString("TipoPago", prestamo.getTipoPago());
                rs.updateDouble("Monto", prestamo.getMonto());
                rs.updateDouble("Saldo", prestamo.getSaldo());
                rs.updateDouble("Interes", prestamo.getInteres());
                rs.updateInt("NroCuotas", prestamo.getNroCuotas());

                rs.insertRow();

                } // loaddb
            }

            // Close the ResultSet
            rs.close();
            logger.trace("**** Closed JDBC ResultSet");

            con.commit();

        } catch (final IOException e) {
            logger.error(e);

        } catch (SQLException ex) {
            logger.error("SQLException information");
            logger.error(filerow);
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

        logger.info("Finalizando cargaMaestroPrestamos"); // + java.time.LocalDateTime.now())

    }

    private void cargaPlanPagos() {

        logger.debug("Iniciando variables cargaPlanPagos");
        String filerow = "";
        String sql = "";
        LocalDate tmpld;

        try {

            sql = "SELECT * FROM PLANPAGOSTEMP";
            rs = stmt.executeQuery(sql);

            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopePlanpg pago = new CoopePlanpg(filerow);

                if (loaddb) {
                rs.moveToInsertRow();

                rs.updateString("NumOperacion", pago.getNumOpera());
                rs.updateString("IdMovimiento", pago.getIdMov());
                rs.updateInt("Cuota", pago.getNroCuota());

                tmpld = pago.getFecVencimiento();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecVencimiento", java.sql.Date.valueOf(tmpld));

                tmpld = pago.getFecPago();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecPago", java.sql.Date.valueOf(tmpld));

                rs.updateDouble("Monto", pago.getMonto());
                rs.updateDouble("Interes", pago.getInteres());
                rs.updateDouble("InteresMoratorio", pago.getInteresMoratorio());

                rs.insertRow();

                } // loaddb
            } // while

            // Close the ResultSet
            rs.close();
            logger.trace("**** Closed JDBC ResultSet");

            con.commit();

        } catch (final IOException e) {
            logger.error(e);

        } catch (SQLException ex) {
            logger.error("SQLException information");
            logger.error(filerow);
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

        logger.info("Finalizando cargaPlanPagos"); // + java.time.LocalDateTime.now())

    }

    private void cargaCertificados() {

        logger.debug("Iniciando variables cargaCertificados");
        String filerow = "";
        String sql = "";
        LocalDate tmpld;

        try {

            sql = "SELECT * FROM CERTIFICADOSTEMP";
            rs = stmt.executeQuery(sql);
  
            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeCertificados certificado = new CoopeCertificados(filerow);

                if (loaddb) {
                rs.moveToInsertRow();
  
                rs.updateString("TipoId", certificado.getTipoId() );
                rs.updateString("CodEmpleado", certificado.getCodEmpleado() );
                rs.updateString("CtaCliente", certificado.getCtaCliente() );
                rs.updateString("DocId", certificado.getDocId() );
                rs.updateString("TipoCert", certificado.getTipoCert() );
                rs.updateString("NumDoc", certificado.getNumDoc() );
                rs.updateString("Vers", certificado.getVers() );
                rs.updateInt("Plazo", certificado.getPlazo() );
                rs.updateString("TipoPago", certificado.getTipoPago() );
   
                rs.updateDouble("Monto", certificado.getMonto() );
                rs.updateDouble("InteresP", certificado.getInteresP() );
                rs.updateDouble("InteresC", certificado.getInteresC() );
                rs.updateDouble("Interes", certificado.getInteres() );

                tmpld = certificado.getFecEmision();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecEmision", java.sql.Date.valueOf(tmpld));

                tmpld = certificado.getFecVencimiento();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecVencimiento", java.sql.Date.valueOf(tmpld));

                rs.insertRow();

                } // loaddb
            }  // while

            // Close the ResultSet
            rs.close();
            logger.trace("**** Closed JDBC ResultSet");
           
            con.commit();
           
        } catch (final IOException e) {
            logger.error(e);

        } catch (SQLException ex) {
            logger.error("SQLException information");
            logger.error(filerow);
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

        logger.info("Finalizando cargaCertificados"); // + java.time.LocalDateTime.now())

    }

    private void cargaGarantes() {

        logger.debug("Iniciando variables cargaGarantes");
        String filerow = "";
        String sql = "";
        String tipodocgarante;
        String docidgarante;
        String nombregarante;

        Statement stmtdet;
        ResultSet rsdet;
    
        CoopeGarantesDetalle garantedet;
        
        try {

            stmtdet = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
            logger.debug("**** Created JDBC Statement Details object");

            sql = "SELECT * FROM GARANTESDETALLETEMP";
            rsdet = stmtdet.executeQuery(sql);

            sql = "SELECT * FROM GARANTESTEMP";
            rs = stmt.executeQuery(sql);

            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeGarantes garante = new CoopeGarantes(filerow);

                if (loaddb) {
                // INSERT NEW RECORD
                rs.moveToInsertRow();

                rs.updateString("NumOperacion", garante.getNumOperacion() );
                rs.updateString("CodEmpleado", garante.getCodEmpleado() );
                rs.updateString("IdMovimiento", garante.getIdMovim() );
                rs.updateString("TipoDoc", garante.getTipoDoc() );
     
                rs.insertRow();
    
                //Detalles
                tipodocgarante = filerow.substring(25, 26).trim();
                docidgarante = filerow.substring(26, 37).trim();
                nombregarante = filerow.substring(37, 67).trim();
                if (tipodocgarante.length() > 0 && docidgarante.length() > 0 ) {  
                    garantedet = new CoopeGarantesDetalle(garante.getCodEmpleado(), garante.getNumOperacion(), tipodocgarante, docidgarante, nombregarante);
                    rsdet.moveToInsertRow();
 
                    rsdet.updateString("CodEmpleado", garantedet.getCodEmpleado() );
                    rsdet.updateString("TipoDocGarante", garantedet.getTipoDocGarante() );
                    rsdet.updateString("DocIdgarante", garantedet.getDocIdGarante() );
                    rsdet.updateString("NombreGarante", garantedet.getNomGarante() );
                    rsdet.updateString("NumOperacion", garantedet.getNumOperacion() );
 
                    rsdet.insertRow();
                }    

                tipodocgarante = filerow.substring(67, 68).trim();
                docidgarante = filerow.substring(68, 79).trim();
                nombregarante = filerow.substring(79, 109).trim();
                if (tipodocgarante.length() > 0 && docidgarante.length() > 0 ) {  
                    garantedet = new CoopeGarantesDetalle(garante.getCodEmpleado(), garante.getNumOperacion(), tipodocgarante, docidgarante, nombregarante);
                    rsdet.moveToInsertRow();
 
                    rsdet.updateString("CodEmpleado", garantedet.getCodEmpleado() );
                    rsdet.updateString("TipoDocGarante", garantedet.getTipoDocGarante() );
                    rsdet.updateString("DocIdgarante", garantedet.getDocIdGarante() );
                    rsdet.updateString("NombreGarante", garantedet.getNomGarante() );
                    rsdet.updateString("NumOperacion", garantedet.getNumOperacion() );
 
                    rsdet.insertRow();                   
                }    
                     
                tipodocgarante = filerow.substring(109, 110).trim();
                docidgarante = filerow.substring(110, 121).trim();
                nombregarante = filerow.substring(121, 151).trim();
                if (tipodocgarante.length() > 0 && docidgarante.length() > 0 ) { 
                    garantedet = new CoopeGarantesDetalle(garante.getCodEmpleado(), garante.getNumOperacion(), tipodocgarante, docidgarante, nombregarante);
                    rsdet.moveToInsertRow();

                    rsdet.updateString("CodEmpleado", garantedet.getCodEmpleado() );
                    rsdet.updateString("TipoDocGarante", garantedet.getTipoDocGarante() );
                    rsdet.updateString("DocIdgarante", garantedet.getDocIdGarante() );
                    rsdet.updateString("NombreGarante", garantedet.getNomGarante() );
                    rsdet.updateString("NumOperacion", garantedet.getNumOperacion() );
 
                    rsdet.insertRow();                    
                }    
                      
                tipodocgarante = filerow.substring(151, 152).trim();
                docidgarante = filerow.substring(152, 163).trim();
                nombregarante = filerow.substring(163, 193).trim();
                if (tipodocgarante.length() > 0 && docidgarante.length() > 0 ){
                    garantedet = new CoopeGarantesDetalle(garante.getCodEmpleado(), garante.getNumOperacion(), tipodocgarante, docidgarante, nombregarante);
                    rsdet.moveToInsertRow();
 
                    rsdet.updateString("CodEmpleado", garantedet.getCodEmpleado() );
                    rsdet.updateString("TipoDocGarante", garantedet.getTipoDocGarante() );
                    rsdet.updateString("DocIdgarante", garantedet.getDocIdGarante() );
                    rsdet.updateString("NombreGarante", garantedet.getNomGarante() );
                    rsdet.updateString("NumOperacion", garantedet.getNumOperacion() );
 
                    rsdet.insertRow();                   
                }    
       
                
                tipodocgarante = filerow.substring(193, 194).trim();
                docidgarante = filerow.substring(194, 205).trim();
                nombregarante = filerow.substring(205, 235).trim();
                if (tipodocgarante.length() > 0 && docidgarante.length() > 0 ) {
                    garantedet = new CoopeGarantesDetalle(garante.getCodEmpleado(), garante.getNumOperacion(), tipodocgarante, docidgarante, nombregarante);
                    rsdet.moveToInsertRow();
 
                    rsdet.updateString("CodEmpleado", garantedet.getCodEmpleado() );
                    rsdet.updateString("TipoDocGarante", garantedet.getTipoDocGarante() );
                    rsdet.updateString("DocIdgarante", garantedet.getDocIdGarante() );
                    rsdet.updateString("NombreGarante", garantedet.getNomGarante() );
                    rsdet.updateString("NumOperacion", garantedet.getNumOperacion() );
 
                    rsdet.insertRow();                   
                }    
       
                } // loaddb
            }

          // Close the ResultSet
          rs.close();
          logger.trace("**** Closed JDBC ResultSet");

          con.commit();

        } catch (final IOException e) {
          logger.error(e);

        } catch (SQLException ex) {
          logger.error("SQLException information");
          logger.error(filerow);
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


        logger.info("Finalizando cargaGarantes"); // + java.time.LocalDateTime.now());

    }

    private void cargaGarantizados() {

        logger.debug("Iniciando variables cargaGarantizados");
        String filerow = "";
        String sql = "";
        LocalDate tmpld;

        try {

            sql = "SELECT * FROM GARANTIZADOSTEMP";
            rs = stmt.executeQuery(sql);
            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeGarantizados garantizado = new CoopeGarantizados(filerow);

                if (loaddb) {
                // INSERT NEW RECORD
                rs.moveToInsertRow();

                rs.updateString("TipoDoc", garantizado.getTipoDoc() );
                rs.updateString("CodEmpleado", garantizado.getCodEmpleado() );
                rs.updateString("NombreSocio", garantizado.getNomSocio() );
                rs.updateString("TipoDocGarantizado", garantizado.getTipoDocIdGarantizado() );
                rs.updateString("DocIdGarantizado", garantizado.getDocIdGarantizado() );
                rs.updateString("NombreSocioGarantizado", garantizado.getNomSocioGarantizado() );
                rs.updateString("IdMovimiento", garantizado.getIdMovim() );
                rs.updateString("NombreProducto", garantizado.getNomProducto() );
                rs.updateString("numOperacion", garantizado.getNumOperacion() );

                tmpld = garantizado.getFecPrestamo();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecPrestamo", java.sql.Date.valueOf(tmpld));

                rs.updateString("Moneda", garantizado.getMoneda() );
                rs.updateDouble("Monto", garantizado.getMonto() );
                rs.updateDouble("Saldo", garantizado.getSaldo() );

                rs.insertRow();
            
                } // loaddb
            }

          // Close the ResultSet
          rs.close();
          logger.trace("**** Closed JDBC ResultSet");

          con.commit();

        } catch (final IOException e) {
            logger.error(e);

        } catch (SQLException ex) {
          logger.error("SQLException information");
          logger.error(filerow);
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

        logger.info("Finalizando cargaGarantizados"); // + java.time.LocalDateTime.now());

    }

    private void cargaFra() {

        logger.debug("Iniciando variables cargaFra");
        String filerow = "";
        String sql = "";
        LocalDate tmpld;

        try {

            sql = "SELECT * FROM FRATEMP";
            rs = stmt.executeQuery(sql);
    
            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeFRA fra = new CoopeFRA(filerow);

                if (loaddb) {
                // INSERT NEW RECORD
                rs.moveToInsertRow();

                rs.updateString("TipoDoc", fra.getTipoDoc() );
                rs.updateString("CodEmpleado", fra.getCodEmpleado() );
                rs.updateString("NombreSocio", fra.getNomSocio() );
                rs.updateString("Placa", fra.getPlaca() );
                rs.updateString("Propietario", fra.getPropietario() );

                tmpld = fra.getFecInscripcion();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecInscripcion", java.sql.Date.valueOf(tmpld));

                rs.updateString("Propietario", fra.getPropietario() );
                rs.updateString("Marca", fra.getMarca() );
                rs.updateString("Modelo", fra.getModelo() );
                rs.updateString("Clase", fra.getClase() );
                rs.updateString("Color", fra.getColor() );
                rs.updateShort("AnnoFabricacion", fra.getAnnoFabricacion() );
                rs.updateString("Serie", fra.getSerie() );
                rs.updateString("Motor", fra.getMotor() );
                rs.updateString("Tarjeta", fra.getTarjeta() );
                 
                rs.updateDouble("Valor", fra.getValor() );
                rs.updateDouble("Accesorios", fra.getAccesorios() );

                rs.insertRow();

                } // loaddb
            }

            // Close the ResultSet
            rs.close();
            logger.trace("**** Closed JDBC ResultSet");

            con.commit();

        } catch (final IOException e) {
            logger.error(e);

        } catch (SQLException ex) {
            logger.error("SQLException information");
            logger.error(filerow);
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

        logger.info("Finalizando cargaFra"); // + java.time.LocalDateTime.now());

    }

    private void cargaSiniestros() {

        logger.debug("Iniciando variables cargaSiniestros");
        String filerow = "";
        String sql = "";
        LocalDate tmpld;

        try {

            sql = "SELECT * FROM SINIESTROSTEMP";
            rs = stmt.executeQuery(sql);
     
            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeSiniestros siniestro = new CoopeSiniestros(filerow);

                if (loaddb) {
                // INSERT NEW RECORD
                rs.moveToInsertRow();

                rs.updateString("TipoDoc", siniestro.getTipoDoc() );
                rs.updateString("CodEmpleado", siniestro.getCodEmpleado() );
                rs.updateString("Placa", siniestro.getPlaca() );
                rs.updateString("Numero", siniestro.getNumero() );
                rs.updateString("Codigo", siniestro.getCodigo() );
                rs.updateString("Descripcion", siniestro.getDescripcion() );
                
                tmpld = siniestro.getFecSiniestro();
                if (!ObjectUtils.isEmpty(tmpld))
                    rs.updateDate("FecSiniestro", java.sql.Date.valueOf(tmpld));

                rs.updateString("Estado", siniestro.getEstado() );
                rs.updateString("Lugar", siniestro.getLugar() );
                rs.updateString("Franquicia", siniestro.getFranquicia() );
                rs.updateString("Comisaria", siniestro.getComisaria() );
                rs.updateString("numDenuncia", siniestro.getNumDenuncia() );
                rs.updateDouble("Importe", siniestro.getImporte() );
                rs.updateString("NumConformidad", siniestro.getNumConformidad() );

                rs.insertRow();

                } // loaddb
            }

            // Close the ResultSet
            rs.close();
            logger.trace("**** Closed JDBC ResultSet");

          con.commit();


        } catch (final IOException e) {
            logger.error(e);

        } catch (SQLException ex) {
            logger.error("SQLException information");
            logger.error(filerow);
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

        logger.info("Finalizando cargaSiniestros"); // + java.time.LocalDateTime.now());

    }

    private void cargaVideos() {

        logger.debug("Iniciando variables cargaVideos");
        String filerow = "";
        String sql = "";

        try {

            sql = "SELECT * FROM VIDEOSTEMP";
            rs = stmt.executeQuery(sql);

            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeVideos video = new CoopeVideos(filerow);

                if (loaddb) {
                // INSERT NEW RECORD
                rs.moveToInsertRow();

                rs.updateString("CodGenero", video.getCodGenVid());
                rs.updateString("Genero", video.getGenVideo());
                rs.updateString("Codigo", video.getCodVideo());
                rs.updateString("TituloCastellano", video.getTitCastVideo());
                rs.updateString("Titulo", video.getTitNavVideo());
                rs.updateString("Protagonista1", video.getProtagVideo1());
                rs.updateString("Protagonista2", video.getProtagVideo2());
                rs.updateString("Protagonista3", video.getProtagVideo3());
                rs.updateString("Protagonista4", video.getProtagVideo4());
                rs.updateString("Director", video.getDirecVideo());
                rs.updateString("Idioma", video.getIdiomaVideo());
                rs.updateString("Pais", video.getPaisVideo());
                rs.updateInt("Anno", video.getAnnoVideo());

                rs.insertRow();

                } // loaddb
            } // while

            // Close the ResultSet
            rs.close();
            logger.trace("**** Closed JDBC ResultSet");

            con.commit();

        } catch (final IOException e) {
            logger.error(e);

        } catch (SQLException ex) {
            logger.error("SQLException information");
            logger.error(filerow);
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

        logger.info("Finalizando cargaVideos"); // + java.time.LocalDateTime.now());

    }

    private void callStoredProc(String spname) {

        try {

            String sql = "call " + spname + "";
     //       Statement statement = con.prepareCall(sql);
            Statement statement = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
 
            if (loaddb) {
                statement.execute(sql);
                statement.close();
            }

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

    private boolean loadFileCoope(String filecoope) {

        boolean fileloaded = true;

        logger.info("leyendo archivo " + filecoope);

        try {
            logger.debug("file : " + filecoope);
            fileReader = new BufferedReader(
                    new FileReader(filecoope) );

        } catch (final FileNotFoundException e) {
            logger.error(e);

            fileloaded = false;

        }

        return fileloaded;

    }

    private void closeFile() {

        try {
            logger.debug("Cerrando file");
            fileReader.close();
            logger.info("file closed");

        } catch (IOException e) {
           logger.error(e);
            
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
            logger.info("**** Created a JDBC connection to the data source. Autocommit : " + con.getAutoCommit() );

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