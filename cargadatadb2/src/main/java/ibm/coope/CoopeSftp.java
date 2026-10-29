package ibm.coope;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Properties;

import org.apache.sshd.client.SshClient;
import org.apache.sshd.client.session.ClientSession;
import org.apache.sshd.sftp.client.SftpClient;
import org.apache.sshd.sftp.client.SftpClientFactory;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.AccessLevel;

@Data
public class CoopeSftp {

    Logger logger = null;

    private SshClient sshClient;
    private ClientSession sshSession;
    private SftpClient sftpClient;

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

        logger.info("Iniciando Cooperativa sftp");

        prop = vprop;

        sftphost = prop.getProperty("coopesftp.server");
        sftpuser = prop.getProperty("coopesftp.user");
        sftppwd  = prop.getProperty("coopesftp.clave");

        sshClient = SshClient.setUpDefaultClient();
        sshClient.start();

    }

    public void getFiles() {

        logger.info("... iniciando getFiles");

        if (connectSftp()) {

            logger.info(getsessioninfo());

            try {
                downloadFile(prop.getProperty("coopetxt.maestro"));
                downloadFile(prop.getProperty("coopetxt.movimientos"));
                downloadFile(prop.getProperty("coopetxt.miscelaneos"));
                downloadFile(prop.getProperty("coopetxt.aportaciones"));
                downloadFile(prop.getProperty("coopetxt.bloqueo"));
                downloadFile(prop.getProperty("coopetxt.prestamos"));
                downloadFile(prop.getProperty("coopetxt.pagos"));
                downloadFile(prop.getProperty("coopetxt.certificados"));
                downloadFile(prop.getProperty("coopetxt.garantes"));
                downloadFile(prop.getProperty("coopetxt.garantizados"));
                downloadFile(prop.getProperty("coopetxt.fondoreposicionauto"));
                downloadFile(prop.getProperty("coopetxt.fondosiniestroauto"));
                downloadFile(prop.getProperty("coopetxt.videos"));

                // Optional: the socios-personal file may not exist on days without changes.
                String sociosPersonalProp = prop.getProperty("coopetxt.sociospersonal");
                if (sociosPersonalProp != null && !sociosPersonalProp.trim().isEmpty()) {
                    try {
                        downloadFile(sociosPersonalProp);
                    } catch (IOException e) {
                        logger.warn("Socios personal file not available on sftp (skipped): " + e.getMessage());
                    }
                }

            } catch (IOException e) {
                logger.error("SFTP transfer error", e);
            }

        } else {
            logger.warn("Not connected to sftp");
        }

        logger.info("Finalizando sftp de Cooperativa");
        disconnect();

    }

    /**
     * Downloads a single file from the remote SFTP path to the local path.
     * Logs the remote filename, remote file size, and local destination.
     */
    private void downloadFile(String filename) throws IOException {
        String remotefname = prop.getProperty("coopesftp.path") + filename;
        String localfname  = prop.getProperty("coopetxt.path")  + filename;

        SftpClient.Attributes attr = sftpClient.stat(remotefname);
        logger.info(remotefname + " (" + attr.getSize() + ") -> " + localfname);

        try (InputStream in = sftpClient.read(remotefname)) {
            Files.copy(in, Paths.get(localfname), StandardCopyOption.REPLACE_EXISTING);
        }
    }

    private boolean connectSftp() {

        try {
            sshSession = sshClient.connect(sftpuser, sftphost, 22)
                    .verify()
                    .getSession();

            sshSession.addPasswordIdentity(sftppwd);

            sshSession.auth()
                    .verify();

            sftpClient = SftpClientFactory.instance().createSftpClient(sshSession);

            logger.info("sftp connected. Working directory : " + sftpClient.canonicalPath("."));
            return true;

        } catch (IOException e) {
            logger.error("Failed to connect to SFTP server", e);
            return false;
        }

    }

    public void disconnect() {

        try {
            if (sftpClient != null) {
                sftpClient.close();
            }
        } catch (IOException e) {
            logger.warn("Error closing SFTP client", e);
        }

        try {
            if (sshSession != null && sshSession.isOpen()) {
                sshSession.close();
            }
        } catch (IOException e) {
            logger.warn("Error closing SSH session", e);
        }

        if (sshClient != null) {
            sshClient.stop();
        }

    }

    public String getsessioninfo() {

        if (sshSession == null) {
            return "SSH session not established";
        }

        StringBuilder data = new StringBuilder();
        data.append("SSH host : ").append(sftphost);
        data.append(System.getProperty("line.separator"));
        data.append("SSH user : ").append(sftpuser);
        data.append(System.getProperty("line.separator"));

        return data.toString();

    }

}
