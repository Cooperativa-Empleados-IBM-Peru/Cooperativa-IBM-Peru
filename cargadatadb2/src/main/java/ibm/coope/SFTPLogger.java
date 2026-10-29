package ibm.coope;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Utility class kept for potential future SSH diagnostic use.
 * The JSch-specific Logger interface has been removed together with the JSch library.
 * Apache MINA SSHD routes its internal log output through SLF4J / Log4j automatically.
 */
public class SFTPLogger {

    private SimpleDateFormat sdf = new SimpleDateFormat("kk:mm:ss SSS ");

    public SFTPLogger() {
    }

    public String currentTime() {
        Date timeNow = new Date();
        return sdf.format(timeNow);
    }

}
