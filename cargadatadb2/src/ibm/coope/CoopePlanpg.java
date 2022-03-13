package ibm.coope;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;

@Data
public class CoopePlanpg {
		
	private String NumOpera;
	
	private String IdMov;
	private int NroCuota;
	private LocalDate FecVencimiento;
	private LocalDate FecPago;
	private Double Monto;
	private Double Interes;
	private Double InteresMoratorio;

	
	CoopePlanpg(String arg1) {
	
		String tmp;

		BigDecimal tmonto;
		BigDecimal tinteres;
		BigDecimal tinteresmoratorio;
	
		this.NumOpera = arg1.substring(0, 9).trim();
			
		this.IdMov = arg1.substring(9, 13).trim();
		this.NroCuota = Integer.parseInt( arg1.substring(13, 16).trim() );

		tmp = arg1.substring(16, 24).trim();
		if ( !tmp.equals("00000000"))
			this.FecVencimiento = CoopeUtils.convertTolocalDate(tmp, "yyyyMMdd");

		tmp = arg1.substring(24, 32).trim();
		if ( !tmp.equals("00000000"))
			this.FecPago = CoopeUtils.convertTolocalDate(tmp, "yyyyMMdd");
		
		tmonto = new BigDecimal(Double.parseDouble( arg1.substring(45, 46).trim() + arg1.substring(32, 45).trim() ) /100);
		Monto = tmonto.doubleValue();
		
		tinteres = new BigDecimal(Double.parseDouble( arg1.substring(59, 60).trim() + arg1.substring(46, 59).trim() ) /100);
		Interes = tinteres.doubleValue();
	
		tinteresmoratorio = new BigDecimal(Double.parseDouble( arg1.substring(73, 74).trim() + arg1.substring(60, 73).trim() ) /100);
		InteresMoratorio = tinteresmoratorio.doubleValue();
		
	}
		
	
}
