package ibm.coope;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.jcraft.jsch.Logger;

public class SFTPLogger implements Logger {

	private SimpleDateFormat sdf = new SimpleDateFormat("kk:mm:ss SSS ");
	
	public SFTPLogger() {
	
	}
	
	public boolean isEnabled(int level){
	      return true;
    }

	 public void log(int level, String message){
		System.out.println(message);
	}

	public String currentTime() {
		Date timeNow = new Date();
		return sdf.format(timeNow);
	}
	
}
