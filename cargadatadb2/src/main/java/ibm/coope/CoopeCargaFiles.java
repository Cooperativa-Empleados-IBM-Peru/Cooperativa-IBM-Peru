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
   
    private Connection con;
 
    BufferedReader fileReader;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private Properties prop;

    final int batchSize = 500;
  
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
                logger.error(e);
            }

    }

    private void cargaMaestroClientes() {

        logger.debug("Iniciando variables cargaMaestroClientes");
        String filerow = "";
        String sql = "";
        LocalDate tmpld;

        try {

            sql = "INSERT INTO MAESTROCLIENTESSALDOSTEMP (TipoId, CodEmpleado, " +
            " NombreEmpleado, DireccionEmpleado, CodEmpresa, CtaCliente, " +
            " TipoMoneda, IntAhorroMes, IntMiscelaneoMes, " +
            " SaldoDispAhorro, SaldoBloqueoAhorro, SaldoAportacion, SaldoMiscelaneo, " +
            " SaldoCertificado1, SaldoCertificado2, SaldoPresSolaFirma, " +
            " SaldoPresCortoPlazo, SaldoPresMedianoPlazo, SaldoPresLargoPlazo, " +
            " SaldoPresHipotecario, SaldoPresConsumo, SaldoPresAuto, " +
            " SaldoPresPS1, SaldoPresEsp1, SaldoPresEsp2, " +
            " FecDispAhorro, FecBloqueoAhorro, FecAportacion, FecMiscelaneo, " +
            " FecCertificado1, FecCertificado2, FecPresSolaFirma, " +
            " FecPresCortoPlazo, FecPresMedianoPlazo, FecPresLargoPlazo, " +
            " FecPresHipotecario, FecPresConsumo, FecPresAuto, " +
            " FecPresPS1, FecPresEsp1, FecPresEsp2) " +
            " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
            " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
            " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
            " ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
            " ?)";
            
            PreparedStatement ps = con.prepareStatement(sql);
            int count = 0;
 
            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopePrusal maestro = new CoopePrusal(filerow);

                ps.setString(1, maestro.getTipoID());
                ps.setString(2, maestro.getCodEmpleado());
                ps.setString(3, maestro.getNomSocio());
                ps.setString(4, maestro.getDirSocio());
                ps.setString(5, maestro.getCodEmpresa());
                ps.setString(6, maestro.getCtaCliente());
                ps.setString(7, maestro.getTipoMonedaPago());
                ps.setDouble(8, maestro.getIntAhoMes());
                ps.setDouble(9, maestro.getIntMisMes());
                ps.setDouble(10, maestro.getSalDisAho());
                ps.setDouble(11, maestro.getSalBloAho());
                ps.setDouble(12, maestro.getSalAporta());
                ps.setDouble(13, maestro.getSalMiscel());
                ps.setDouble(14, maestro.getSalCert1());
                ps.setDouble(15, maestro.getSalCert2());
                ps.setDouble(16, maestro.getSalPSFirma());
                ps.setDouble(17, maestro.getSalPCPlazo());
                ps.setDouble(18, maestro.getSalPMPlazo());
                ps.setDouble(19, maestro.getSalPLPlazo());
                ps.setDouble(20, maestro.getSalPHipot());
                ps.setDouble(21, maestro.getSalPConsum());
                ps.setDouble(22, maestro.getSalPAuto());
                ps.setDouble(23, maestro.getSalPPS1());
                ps.setDouble(24, maestro.getSalPEsp1());
                ps.setDouble(25, maestro.getSalPEsp2());

                ps.setNull(26, Types.DATE);
                tmpld = maestro.getFecMovDisAho();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(26, java.sql.Date.valueOf(tmpld));

                ps.setNull(27, Types.DATE);
                tmpld = maestro.getFecMovBloAho();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(27, java.sql.Date.valueOf(tmpld));
    
                ps.setNull(28, Types.DATE);
                tmpld = maestro.getFecMovAporta();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(28, java.sql.Date.valueOf(tmpld));
 
                ps.setNull(29, Types.DATE);
                tmpld = maestro.getFecMovMiscel();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(29, java.sql.Date.valueOf(tmpld));
    
                ps.setNull(30, Types.DATE);
                tmpld = maestro.getFecMovCert1();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(30, java.sql.Date.valueOf(tmpld));
    
                ps.setNull(31, Types.DATE);
                tmpld = maestro.getFecMovCert2();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(31, java.sql.Date.valueOf(tmpld));
    
                ps.setNull(32, Types.DATE);
                tmpld = maestro.getFecMovPSFirma();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(32, java.sql.Date.valueOf(tmpld));
          
                ps.setNull(33, Types.DATE);
                tmpld = maestro.getFecMovPCPlazo();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(33, java.sql.Date.valueOf(tmpld));
    
                ps.setNull(34, Types.DATE);
                tmpld = maestro.getFecMovPMPlazo();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(34, java.sql.Date.valueOf(tmpld));
    
                ps.setNull(35, Types.DATE);
                tmpld = maestro.getFecMovPLPlazo();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(35, java.sql.Date.valueOf(tmpld));
                       
                ps.setNull(36, Types.DATE);
                tmpld = maestro.getFecMovPHipot();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(36, java.sql.Date.valueOf(tmpld));
    
                ps.setNull(37, Types.DATE);
                tmpld = maestro.getFecMovPConsum();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(37, java.sql.Date.valueOf(tmpld));
    
                ps.setNull(38, Types.DATE);
                tmpld = maestro.getFecMovPAuto();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(38, java.sql.Date.valueOf(tmpld));
    
                ps.setNull(39, Types.DATE);
                tmpld = maestro.getFecMovPPS1();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(39, java.sql.Date.valueOf(tmpld));
    
                ps.setNull(40, Types.DATE);
                tmpld = maestro.getFecMovPEsp1();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(40, java.sql.Date.valueOf(tmpld));
    
                ps.setNull(41, Types.DATE);
                tmpld = maestro.getFecMovPEsp2();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(41, java.sql.Date.valueOf(tmpld));
    
                ps.addBatch();

                if(++count % batchSize == 0) {
                    ps.executeBatch();
                }
   
            } // while

            ps.executeBatch();
            ps.close();

            logger.trace("**** Closed JDBC PreparedStatement");
        
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

            sql = "INSERT INTO MOVIMIENTOSTEMP (TipoMov, CtaCliente, " +
            " IdMov, CodEmpresa, TipoPago, Transaccion, " +
            " Referencia, RefAlfa, NumDepo, " +
            " FecEmision, FecVencimiento, Importe, Texto) " +
            " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
            " ?, ?, ?)";
            
            PreparedStatement ps = con.prepareStatement(sql);
            int count = 0;
 
            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeMovimiento movim = new CoopeMovimiento(filerow);

                ps.setString(1, tipomov);
                ps.setString(2, movim.getCtaCliente());
                ps.setString(3, movim.getIdMov());
                ps.setString(4, movim.getCodEmpr());
                ps.setString(5, movim.getTipoPago());
                ps.setString(6, movim.getTransac());
                ps.setString(7, movim.getReferencia());
                ps.setString(8, movim.getReferAlfa());
                ps.setString(9, movim.getNumDepo());
   
                ps.setNull(10, Types.TIMESTAMP);
                tmpldt = movim.getFecEmision();
                if (!ObjectUtils.isEmpty(tmpldt))
                    ps.setTimestamp(10, java.sql.Timestamp.valueOf(tmpldt));

                ps.setNull(11, Types.DATE);
                tmpld = movim.getFecVencimiento();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(11, java.sql.Date.valueOf(tmpld));

                ps.setDouble(12, movim.getImporte());
                ps.setString(13, movim.getTexto());

                ps.addBatch();

                if(++count % batchSize == 0) {
                    ps.executeBatch();
                }
  
            } // while

            ps.executeBatch();
            ps.close();

            logger.trace("**** Closed JDBC PreparedStatement");

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

            sql = "INSERT INTO MAESTROPRESTAMOSTEMP (TipoId, DocId, " +
            " IdMovimiento, CodEmpresa, CtaCliente, NumOperacion, " + 
            " FecCartera, FecRenovacion, FecVencimiento, " +
            " TipoPago, Monto, Saldo, Interes, NroCuotas) " +
            " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
            " ?, ?, ?, ?)";

            PreparedStatement ps = con.prepareStatement(sql);
            int count = 0;
 
            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeMaepre prestamo = new CoopeMaepre(filerow);

                ps.setString(1, prestamo.getTipoId());
                ps.setString(2, prestamo.getDocId());
                ps.setString(3, prestamo.getIdMov());
                ps.setString(4, prestamo.getCodEmpr());
                ps.setString(5, prestamo.getCtaCliente());
                ps.setString(6, prestamo.getNumeOperacion());

                ps.setNull(7, Types.DATE);
                tmpld = prestamo.getFecCartera();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(7, java.sql.Date.valueOf(tmpld));

                ps.setNull(8, Types.DATE);
                tmpld = prestamo.getFecRenovacion();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(8, java.sql.Date.valueOf(tmpld));

                ps.setNull(9, Types.DATE);
                tmpld = prestamo.getFecVencimiento();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(9, java.sql.Date.valueOf(tmpld));

                ps.setString(10, prestamo.getTipoPago());
                ps.setDouble(11, prestamo.getMonto());
                ps.setDouble(12, prestamo.getSaldo());
                ps.setDouble(13, prestamo.getInteres());
                ps.setInt(14, prestamo.getNroCuotas());

                ps.addBatch();

                if(++count % batchSize == 0) {
                    ps.executeBatch();
                }

            }

            ps.executeBatch();
            ps.close();

            logger.trace("**** Closed JDBC PreparedStatement");

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

            sql = "INSERT INTO PLANPAGOSTEMP (NumOperacion, IdMovimiento, " +
            " Cuota, FecVencimiento, FecPago, " +
            " Monto, Interes, InteresMoratorio ) " +
            " VALUES (?, ?, ?, ?, ?, ?, ?, ? )";
 
            PreparedStatement ps = con.prepareStatement(sql);
            int count = 0;

            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopePlanpg pago = new CoopePlanpg(filerow);

                ps.setString(1, pago.getNumOpera());
                ps.setString(2, pago.getIdMov());
                ps.setInt(3, pago.getNroCuota());

                ps.setNull(4, Types.DATE);
                tmpld = pago.getFecVencimiento();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(4, java.sql.Date.valueOf(tmpld));

                ps.setNull(5, Types.DATE);
                tmpld = pago.getFecPago();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(5, java.sql.Date.valueOf(tmpld));

                ps.setDouble(6, pago.getMonto());
                ps.setDouble(7, pago.getInteres());
                ps.setDouble(8, pago.getInteresMoratorio());

                ps.addBatch();

                if(++count % batchSize == 0) {
                    ps.executeBatch();
                }

            } // while

            ps.executeBatch();
            ps.close();

            logger.trace("**** Closed JDBC PreparedStatement");

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

            sql = "INSERT INTO CERTIFICADOSTEMP (TipoId, CodEmpleado, " +
            " CtaCliente, DocId, TipoCert, NumDoc, " +
            " Vers, Plazo, TipoPago, " +
            " Monto, InteresP, InteresC, Interes, " +
            " FecEmision, FecVencimiento ) " +
            " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
            " ?, ?, ?, ?, ?)";
 
            PreparedStatement ps = con.prepareStatement(sql);
            int count = 0;

            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeCertificados certificado = new CoopeCertificados(filerow);
 
                ps.setString(1, certificado.getTipoId() );
                ps.setString(2, certificado.getCodEmpleado() );
                ps.setString(3, certificado.getCtaCliente() );
                ps.setString(4, certificado.getDocId() );
                ps.setString(5, certificado.getTipoCert() );
                ps.setString(6, certificado.getNumDoc() );
                ps.setString(7, certificado.getVers() );
                ps.setInt(8, certificado.getPlazo() );
                ps.setString(9, certificado.getTipoPago() );
                ps.setDouble(10, certificado.getMonto() );
                ps.setDouble(11, certificado.getInteresP() );
                ps.setDouble(12, certificado.getInteresC() );
                ps.setDouble(13, certificado.getInteres() );

                ps.setNull(14, Types.DATE);
                tmpld = certificado.getFecEmision();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(14, java.sql.Date.valueOf(tmpld));

                ps.setNull(15, Types.DATE);
                tmpld = certificado.getFecVencimiento();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(15, java.sql.Date.valueOf(tmpld));

                ps.addBatch();

                if(++count % batchSize == 0) {
                    ps.executeBatch();
                }
    
            }  // while

            ps.executeBatch();
            ps.close();

            logger.trace("**** Closed JDBC PreparedStatement");
           
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
        String sqldet = "";
        String tipodocgarante;
        String docidgarante;
        String nombregarante;
   
        CoopeGarantesDetalle garantedet;
        
        try {

            sqldet = "INSERT INTO GARANTESDETALLETEMP (CodEmpleado, NumOperacion, " +
            " TipoDocGarante, DocIdGarante, NombreGarante ) " +
            " VALUES (?, ?, ?, ?, ? )";
    
            sql = "INSERT INTO GARANTESTEMP (CodEmpleado, NumOperacion, " +
            " IdMovimiento, TipoDoc ) " +
            " VALUES (?, ?, ?, ? )";
    
            PreparedStatement ps = con.prepareStatement(sql);
            int count = 0;
            PreparedStatement psdet = con.prepareStatement(sqldet);
            int countdet = 0;
 
            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeGarantes garante = new CoopeGarantes(filerow);
   
                ps.setString(1, garante.getCodEmpleado() );
                ps.setString(2, garante.getNumOperacion() );
                ps.setString(3, garante.getIdMovim() );
                ps.setString(4, garante.getTipoDoc() );
     
                ps.addBatch();

                if(++count % batchSize == 0) {
                    ps.executeBatch();
                }
    
                //Detalles
                tipodocgarante = filerow.substring(25, 26).trim();
                docidgarante = filerow.substring(26, 37).trim();
                nombregarante = filerow.substring(37, 67).trim();
                if (tipodocgarante.length() > 0 && docidgarante.length() > 0 ) {  
                    garantedet = new CoopeGarantesDetalle(garante.getCodEmpleado(), garante.getNumOperacion(), tipodocgarante, docidgarante, nombregarante);
    
                    psdet.setString(1, garantedet.getCodEmpleado() );
                    psdet.setString(2, garantedet.getNumOperacion() );
                    psdet.setString(3, garantedet.getTipoDocGarante() );
                    psdet.setString(4, garantedet.getDocIdGarante() );
                    psdet.setString(5, garantedet.getNomGarante() );
    
                    psdet.addBatch();

                    if(++countdet % batchSize == 0) {
                        psdet.executeBatch();
                    }
                 }    

                tipodocgarante = filerow.substring(67, 68).trim();
                docidgarante = filerow.substring(68, 79).trim();
                nombregarante = filerow.substring(79, 109).trim();
                if (tipodocgarante.length() > 0 && docidgarante.length() > 0 ) {  
                    garantedet = new CoopeGarantesDetalle(garante.getCodEmpleado(), garante.getNumOperacion(), tipodocgarante, docidgarante, nombregarante);

                    psdet.setString(1, garantedet.getCodEmpleado() );
                    psdet.setString(2, garantedet.getNumOperacion() );
                    psdet.setString(3, garantedet.getTipoDocGarante() );
                    psdet.setString(4, garantedet.getDocIdGarante() );
                    psdet.setString(5, garantedet.getNomGarante() );
    
                    psdet.addBatch();

                    if(++countdet % batchSize == 0) {
                        psdet.executeBatch();
                    }
               }    
                     
                tipodocgarante = filerow.substring(109, 110).trim();
                docidgarante = filerow.substring(110, 121).trim();
                nombregarante = filerow.substring(121, 151).trim();
                if (tipodocgarante.length() > 0 && docidgarante.length() > 0 ) { 
                    garantedet = new CoopeGarantesDetalle(garante.getCodEmpleado(), garante.getNumOperacion(), tipodocgarante, docidgarante, nombregarante);
 
                    psdet.setString(1, garantedet.getCodEmpleado() );
                    psdet.setString(2, garantedet.getNumOperacion() );
                    psdet.setString(3, garantedet.getTipoDocGarante() );
                    psdet.setString(4, garantedet.getDocIdGarante() );
                    psdet.setString(5, garantedet.getNomGarante() );
    
                    psdet.addBatch();

                    if(++countdet % batchSize == 0) {
                        psdet.executeBatch();
                    }
               }    
                      
                tipodocgarante = filerow.substring(151, 152).trim();
                docidgarante = filerow.substring(152, 163).trim();
                nombregarante = filerow.substring(163, 193).trim();
                if (tipodocgarante.length() > 0 && docidgarante.length() > 0 ){
                    garantedet = new CoopeGarantesDetalle(garante.getCodEmpleado(), garante.getNumOperacion(), tipodocgarante, docidgarante, nombregarante);
 
                    psdet.setString(1, garantedet.getCodEmpleado() );
                    psdet.setString(2, garantedet.getNumOperacion() );
                    psdet.setString(3, garantedet.getTipoDocGarante() );
                    psdet.setString(4, garantedet.getDocIdGarante() );
                    psdet.setString(5, garantedet.getNomGarante() );
    
                    psdet.addBatch();

                    if(++countdet % batchSize == 0) {
                        psdet.executeBatch();
                    }
               }    
       
                
                tipodocgarante = filerow.substring(193, 194).trim();
                docidgarante = filerow.substring(194, 205).trim();
                nombregarante = filerow.substring(205, 235).trim();
                if (tipodocgarante.length() > 0 && docidgarante.length() > 0 ) {
                    garantedet = new CoopeGarantesDetalle(garante.getCodEmpleado(), garante.getNumOperacion(), tipodocgarante, docidgarante, nombregarante);
 
                    psdet.setString(1, garantedet.getCodEmpleado() );
                    psdet.setString(2, garantedet.getNumOperacion() );
                    psdet.setString(3, garantedet.getTipoDocGarante() );
                    psdet.setString(4, garantedet.getDocIdGarante() );
                    psdet.setString(5, garantedet.getNomGarante() );
    
                    psdet.addBatch();

                    if(++countdet % batchSize == 0) {
                        psdet.executeBatch();
                    }
                }    
       
           }

           ps.executeBatch();
           ps.close();

           psdet.executeBatch();
           psdet.close();

           logger.trace("**** Closed JDBC PreparedStatement");

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

            sql = "INSERT INTO GARANTIZADOSTEMP (TipoDoc, CodEmpleado, " +
            " NombreSocio, TipoDocGarantizado, DocIdGarantizado, NombreSocioGarantizado, " +
            " IdMovimiento, NombreProducto, NumOperacion, FecPrestamo, " +
            " Moneda, Monto, Saldo) " +
            " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
            " ?, ?, ?)";
 
            PreparedStatement ps = con.prepareStatement(sql);
            int count = 0;

            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeGarantizados garantizado = new CoopeGarantizados(filerow);

                ps.setString(1, garantizado.getTipoDoc() );
                ps.setString(2, garantizado.getCodEmpleado() );
                ps.setString(3, garantizado.getNomSocio() );
                ps.setString(4, garantizado.getTipoDocIdGarantizado() );
                ps.setString(5, garantizado.getDocIdGarantizado() );
                ps.setString(6, garantizado.getNomSocioGarantizado() );
                ps.setString(7, garantizado.getIdMovim() );
                ps.setString(8, garantizado.getNomProducto() );
                ps.setString(9, garantizado.getNumOperacion() );

                ps.setNull(10, Types.DATE);
                tmpld = garantizado.getFecPrestamo();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(10, java.sql.Date.valueOf(tmpld));

                ps.setString(11, garantizado.getMoneda() );
                ps.setDouble(12, garantizado.getMonto() );
                ps.setDouble(13, garantizado.getSaldo() );

                ps.addBatch();

                if(++count % batchSize == 0) {
                    ps.executeBatch();
                }
           
            }

            ps.executeBatch();
            ps.close();

            logger.trace("**** Closed JDBC PreparedStatement");

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

            sql = "INSERT INTO FRATEMP (TipoDoc, CodEmpleado, " +
            " NombreSocio, Placa, Propietario, FecInscripcion, " +
            " Modelo, Marca, Clase, Color, AnnoFabricacion, " +
            " Serie, Motor, Tarjeta, Valor, Accesorios) " +
            " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
            " ?, ?, ?, ?, ?, ? )";
 
            PreparedStatement ps = con.prepareStatement(sql);
            int count = 0;

            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeFRA fra = new CoopeFRA(filerow);

                ps.setString(1, fra.getTipoDoc() );
                ps.setString(2, fra.getCodEmpleado() );
                ps.setString(3, fra.getNomSocio() );
                ps.setString(4, fra.getPlaca() );
                ps.setString(5, fra.getPropietario() );

                ps.setNull(6, Types.DATE);
                tmpld = fra.getFecInscripcion();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(6, java.sql.Date.valueOf(tmpld));

                ps.setString(7, fra.getModelo() );
                ps.setString(8, fra.getMarca() );
                ps.setString(9, fra.getClase() );
                ps.setString(10, fra.getColor() );
                ps.setShort(11, fra.getAnnoFabricacion() );
                ps.setString(12, fra.getSerie() );
                ps.setString(13, fra.getMotor() );
                ps.setString(14, fra.getTarjeta() );
                ps.setDouble(15, fra.getValor() );
                ps.setDouble(16, fra.getAccesorios() );

                ps.addBatch();

                if(++count % batchSize == 0) {
                    ps.executeBatch();
                }

            }

            ps.executeBatch();
            ps.close();
            
            logger.trace("**** Closed JDBC PreparedStatement");

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

            sql = "INSERT INTO SINIESTROSTEMP (TipoDoc, CodEmpleado, " +
            " Placa, FecSiniestro, Codigo, Descripcion, Numero, " +
            " Estado, Lugar, Franquicia, Comisaria, " +
            " NumDenuncia, Importe, NumConformidad) " +
            " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, " +
            " ?, ?, ?, ?)";
 
            PreparedStatement ps = con.prepareStatement(sql);
            int count = 0;

            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeSiniestros siniestro = new CoopeSiniestros(filerow);

                ps.setString(1, siniestro.getTipoDoc() );
                ps.setString(2, siniestro.getCodEmpleado() );
                ps.setString(3, siniestro.getPlaca() );

                ps.setNull(4, Types.DATE);
                tmpld = siniestro.getFecSiniestro();
                if (!ObjectUtils.isEmpty(tmpld))
                    ps.setDate(4, java.sql.Date.valueOf(tmpld));

                ps.setString(5, siniestro.getCodigo() );
                ps.setString(6, siniestro.getDescripcion() );
                ps.setString(7, siniestro.getNumero() );
                ps.setString(8, siniestro.getEstado() );
                ps.setString(9, siniestro.getLugar() );
                ps.setString(10, siniestro.getFranquicia() );
                ps.setString(11, siniestro.getComisaria() );
                ps.setString(12, siniestro.getNumDenuncia() );
                ps.setDouble(13, siniestro.getImporte() );
                ps.setString(14, siniestro.getNumConformidad() );

                ps.addBatch();

                if(++count % batchSize == 0) {
                    ps.executeBatch();
                }

            }

            ps.executeBatch();
            ps.close();

            logger.trace("**** Closed JDBC PreparedStatement");

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

            sql = "INSERT INTO VIDEOSTEMP (CodGenero, Genero, Codigo, " +
                "TituloCastellano, Titulo, Protagonista1, Protagonista2, " +
                "Protagonista3, Protagonista4, Director, Idioma, Pais, Anno ) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";

            PreparedStatement ps = con.prepareStatement(sql);
            int count = 0;

            while ((filerow = fileReader.readLine()) != null) {

                logger.trace(filerow);

                CoopeVideos video = new CoopeVideos(filerow);

                ps.setString(1, video.getCodGenVid());
                ps.setString(2, video.getGenVideo());
                ps.setString(3, video.getCodVideo());
                ps.setString(4, video.getTitCastVideo());
                ps.setString(5, video.getTitNavVideo());
                ps.setString(6, video.getProtagVideo1());
                ps.setString(7, video.getProtagVideo2());
                ps.setString(8, video.getProtagVideo3());
                ps.setString(9, video.getProtagVideo4());
                ps.setString(10, video.getDirecVideo());
                ps.setString(11, video.getIdiomaVideo());
                ps.setString(12, video.getPaisVideo());
                ps.setInt(13, video.getAnnoVideo());
                ps.addBatch();

                if(++count % batchSize == 0) {
                        ps.executeBatch();
                }

            }  //while

            ps.executeBatch();
            ps.close();

            logger.trace("**** Closed JDBC PreparedStatement");

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