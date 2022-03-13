package ibm.coope;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CoopeMaepre {
	
	private String TipoId;
	private String DocId;
	private String IdMov;
	private String CodEmpr;
	private String CtaCliente;
	private String NumeOperacion;
	private LocalDate FecCartera;
	private LocalDate FecRenovacion;
	private LocalDate FecVencimiento;	
	private String TipoPago;
	private double Monto;
	private double Saldo;
	private double Interes;
	private int NroCuotas;
	
	CoopeMaepre(String arg1) {
	
		String tmp;

		this.TipoId = arg1.substring(0, 1).trim();
		this.DocId = arg1.substring(1, 12).trim();
		this.IdMov = arg1.substring(12, 16).trim();
		this.CodEmpr = arg1.substring(16, 19).trim();
		this.CtaCliente = arg1.substring(19, 26).trim();		
		this.NumeOperacion = arg1.substring(26, 35).trim();
		
		tmp = arg1.substring(35, 43).trim();
		if ( !tmp.equals("00000000"))
			this.FecCartera = CoopeUtils.convertTolocalDate(tmp, "yyyyMMdd");

		tmp = arg1.substring(43, 51).trim();
		if ( !tmp.equals("00000000"))
			this.FecRenovacion = CoopeUtils.convertTolocalDate(tmp, "yyyyMMdd");

		tmp = arg1.substring(51, 59).trim();
		if ( !tmp.equals("00000000"))
			this.FecVencimiento = CoopeUtils.convertTolocalDate(tmp, "yyyyMMdd");

		this.TipoPago = arg1.substring(59, 61).trim();		
		this.Monto = Double.parseDouble( arg1.substring(74, 75).trim() + arg1.substring(61, 74).trim() ) /100;
		this.Saldo = Double.parseDouble( arg1.substring(88, 89).trim() + arg1.substring(75, 88).trim() ) /100;
		this.Interes = Double.parseDouble( arg1.substring(89, 101).trim() ) /1000000000;	
		this.NroCuotas = Integer.parseInt( arg1.substring(101, 104).trim() );
	}
	
}
