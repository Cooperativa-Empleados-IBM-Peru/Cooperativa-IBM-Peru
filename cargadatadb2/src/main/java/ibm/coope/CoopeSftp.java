package ibm.coope;

import java.util.Properties;

import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpATTRS;
import com.jcraft.jsch.SftpException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.AccessLevel;

@Data
public class CoopeSftp {

    Logger logger = null;

    private JSch jsch;
    private Session sshsession;
    private ChannelSftp channelSftp;
    SftpATTRS attr;
    
    private SFTPLogger myLogger;
    Properties config;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private Properties prop;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private String sftphost;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private String sftpuser;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private String sftppwd;

    CoopeSftp(Properties vprop) {

        logger = LogManager.getLogger(CoopeSftp.class);
        myLogger = new SFTPLogger();

        logger.info("Iniciando Cooperativa sftp");

        prop = vprop;

        sftphost = prop.getProperty("coopesftp.server");
        sftpuser = prop.getProperty("coopesftp.user");
        sftppwd = prop.getProperty("coopesftp.clave");

        JSch.setLogger(myLogger);
        jsch = new JSch();

        config = new Properties();

    }

    public void getFiles() {

        logger.info("... iniciando getFiles");
        String remotefname = "";
        String localfname = "";

        if (connectSftp()) {

            logger.info(getsessioninfo());

            try {
                remotefname = prop.getProperty("coopesftp.path") + prop.getProperty("coopetxt.maestro");
                localfname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.maestro");
                attr = channelSftp.lstat(remotefname);
                logger.info(remotefname + " (" + attr.getSize() +") -> " + localfname);
                channelSftp.get(remotefname , localfname);

                remotefname = prop.getProperty("coopesftp.path") + prop.getProperty("coopetxt.movimientos");
                localfname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.movimientos");
                attr = channelSftp.lstat(remotefname);
                logger.info(remotefname + " (" + attr.getSize() +") -> " + localfname);
                channelSftp.get(remotefname , localfname);

                remotefname = prop.getProperty("coopesftp.path") + prop.getProperty("coopetxt.miscelaneos");
                localfname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.miscelaneos");
                attr = channelSftp.lstat(remotefname);
                logger.info(remotefname + " (" + attr.getSize() +") -> " + localfname);
                channelSftp.get(remotefname , localfname);

                remotefname = prop.getProperty("coopesftp.path") + prop.getProperty("coopetxt.aportaciones");
                localfname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.aportaciones");
                attr = channelSftp.lstat(remotefname);
                logger.info(remotefname + " (" + attr.getSize() +") -> " + localfname);
                channelSftp.get(remotefname , localfname);

                remotefname = prop.getProperty("coopesftp.path") + prop.getProperty("coopetxt.bloqueo");
                localfname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.bloqueo");
                attr = channelSftp.lstat(remotefname);
                logger.info(remotefname + " (" + attr.getSize() +") -> " + localfname);
                channelSftp.get(remotefname , localfname);

                remotefname = prop.getProperty("coopesftp.path") + prop.getProperty("coopetxt.prestamos");
                localfname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.prestamos");
                attr = channelSftp.lstat(remotefname);
                logger.info(remotefname + " (" + attr.getSize() +") -> " + localfname);
                channelSftp.get(remotefname , localfname);

                remotefname = prop.getProperty("coopesftp.path") + prop.getProperty("coopetxt.pagos");
                localfname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.pagos");
                attr = channelSftp.lstat(remotefname);
                logger.info(remotefname + " (" + attr.getSize() +") -> " + localfname);
                channelSftp.get(remotefname , localfname);

                remotefname = prop.getProperty("coopesftp.path") + prop.getProperty("coopetxt.certificados");
                localfname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.certificados");
                attr = channelSftp.lstat(remotefname);
                logger.info(remotefname + " (" + attr.getSize() +") -> " + localfname);
                channelSftp.get(remotefname , localfname);

                remotefname = prop.getProperty("coopesftp.path") + prop.getProperty("coopetxt.garantes");
                localfname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.garantes");
                attr = channelSftp.lstat(remotefname);
                logger.info(remotefname + " (" + attr.getSize() +") -> " + localfname);
                channelSftp.get(remotefname , localfname);

                remotefname = prop.getProperty("coopesftp.path") + prop.getProperty("coopetxt.garantizados");
                localfname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.garantizados");
                attr = channelSftp.lstat(remotefname);
                logger.info(remotefname + " (" + attr.getSize() +") -> " + localfname);
                channelSftp.get(remotefname , localfname);

                remotefname = prop.getProperty("coopesftp.path") + prop.getProperty("coopetxt.fondoreposicionauto");
                localfname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.fondoreposicionauto");
                attr = channelSftp.lstat(remotefname);
                logger.info(remotefname + " (" + attr.getSize() +") -> " + localfname);
                channelSftp.get(remotefname , localfname);

                remotefname = prop.getProperty("coopesftp.path") + prop.getProperty("coopetxt.fondosiniestroauto");
                localfname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.fondosiniestroauto");
                attr = channelSftp.lstat(remotefname);
                logger.info(remotefname + " (" + attr.getSize() +") -> " + localfname);
                channelSftp.get(remotefname , localfname);

                remotefname = prop.getProperty("coopesftp.path") + prop.getProperty("coopetxt.videos");
                localfname = prop.getProperty("coopetxt.path") + prop.getProperty("coopetxt.videos");
                attr = channelSftp.lstat(remotefname);
                logger.info(remotefname + " (" + attr.getSize() +") -> " + localfname);
                channelSftp.get(remotefname , localfname);

            } catch (SftpException e) {
                logger.error(e);

            }

        } else {
            logger.warn("Not connected to sftp");

        }

        logger.info("Finalizando sftp de Cooperativa");
        disconnect();

    }

    private boolean connectSftp() {

        boolean flag = false;

        try {

            sshsession = jsch.getSession(sftpuser, sftphost); 
            sshsession.setPassword(sftppwd);

            sshsession.setConfig("compression.s2c", "zlib@openssh.com,zlib,none");
            sshsession.setConfig("compression.c2s", "zlib@openssh.com,zlib,none");
            sshsession.setConfig("compression_level", "9");
          
            config.put("StrictHostKeyChecking", "no");
            sshsession.setConfig(config);

            sshsession.connect();
			
			if (sshsession.isConnected() ) {
				channelSftp = (ChannelSftp) sshsession.openChannel("sftp");
	     
                channelSftp.setOutputStream(System.out, true);
                channelSftp.setExtOutputStream(System.out, true);
                
                channelSftp.connect();

                if ( channelSftp.isConnected() ) {
                     logger.info("sftp connected. Working directory : " + channelSftp.pwd() );
                     logger.info("sftp protocol version : " + channelSftp.version() );
    
                     flag = true;
                } 

            } 
            
            return flag;
      

        } catch (JSchException | SftpException e) {
            logger.error(e);
            return false;
        }

    }

    public void disconnect() {

        if (channelSftp.isConnected() )
            channelSftp.disconnect();
    
        if (sshsession.isConnected() )
            sshsession.disconnect();

  	}

    public String getsessioninfo() {
		
		StringBuilder data = new StringBuilder();
		
		data.append("SSH Server version : " + sshsession.getServerVersion());
		data.append( System.getProperty("line.separator") );
		data.append("SSH Client version : " + sshsession.getClientVersion());
		data.append( System.getProperty("line.separator") );
		data.append("SSH host : " + sshsession.getHost() );
		data.append( System.getProperty("line.separator") );
		data.append("SSH port : " + sshsession.getPort() );
        data.append( System.getProperty("line.separator") );

		return data.toString();
		
    }
    
}