package ibm.coope;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Properties;

public class CoopeUtils {

	private static String resourcefolder = "./resources";
 
	public static Date convertToDate(String input, String vformat) {
	
		Date date = null;
		DateFormat formatter;
		
		try {

			if (null == input) {
				return null;
			}
	
			formatter = new SimpleDateFormat(vformat);
			date = (Date)formatter.parse(input);

		} catch (ParseException e) {
			// Shhh.. try other formats
		}

		return date;
	}

	public static LocalDate convertTolocalDate(String input, String vformat) {

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(vformat);
		LocalDate ld = LocalDate.parse(input, formatter);

		return ld;
	}

	public static LocalTime convertTolocalTime(String input, String vformat) {

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(vformat);
		LocalTime lt = LocalTime.parse(input, formatter);

		return lt;
	}


	public static LocalDateTime convertTolocalDateTime(String input, String vformat) {

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(vformat);
		LocalDateTime ldt = LocalDateTime.parse(input, formatter);

		return ldt;
	}


	public static String toISO8601(Date input) {

		DateTimeFormatter formatter = DateTimeFormatter.ISO_INSTANT;
		return formatter.format(input.toInstant());
	}

	public static String convertToDateISO8601(String input, String vformat) {

		Date date = null;
		if (null == input) {
			return "";
		}

		SimpleDateFormat format = new SimpleDateFormat(vformat);
		try {
			format.setLenient(false);
			date = format.parse(input);

			DateTimeFormatter formatter = DateTimeFormatter.ISO_INSTANT;
			return formatter.format(date.toInstant());

		} catch (ParseException e) {
			// Shhh.. try other formats
			return "";
		}

	}

	public static String nowToDateISO8601() {

		Date date = new Date(System.currentTimeMillis());

		DateTimeFormatter formatter = DateTimeFormatter.ISO_INSTANT;
		return formatter.format(date.toInstant());

	}

	public static String cleanString(String input) {
			
		return input.replaceAll("[^a-z A-Z0-9]", "").trim();
	}

	public static Properties loadSettings() {

		Properties prop = new Properties();

		final String configFileprop = resourcefolder + "/coopeibm.properties";

		try (InputStream inputStream = new FileInputStream(configFileprop)) {
			prop.load(inputStream);
		} catch (IOException ex) {
			ex.printStackTrace();
		}

		return prop;

	}

	
}
