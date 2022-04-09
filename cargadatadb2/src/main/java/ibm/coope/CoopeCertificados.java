package ibm.coope;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CoopeCertificados {
	
	private String TipoId;
	private String DocId;
	private String TipoCert;
	private String CodEmpleado;
	private String CtaCliente;
	private String NumDoc;
	private String Vers;
	private Integer Plazo;
	private String TipoPago;

	private Double Monto;
	private Double InteresP;
	private Double InteresC;
	private Double Interes;
	private Double InteresG;
	
	private LocalDate fecEmision;
	private LocalDate fecVencimiento;

	CoopeCertificados(String arg1) {

		String tmp;

		this.TipoId = arg1.substring(0, 1).trim();
		this.CodEmpleado = arg1.substring(1, 12).trim();
		this.TipoCert = arg1.substring(12, 14).trim();
		this.DocId = arg1.substring(14, 17).trim();
		this.CtaCliente = arg1.substring(17, 24).trim();
		this.NumDoc = arg1.substring(24, 32).trim();
		this.Vers = arg1.substring(32, 34).trim();
		this.Plazo = Integer.parseInt(arg1.substring(42, 45).trim() );
		this.TipoPago = arg1.substring(53, 55).trim();
		this.Monto = Double.parseDouble(arg1.substring(68, 69).trim() + arg1.substring(55, 68).trim() ) /100;
		this.InteresP = Double.parseDouble(arg1.substring(82, 83).trim() + arg1.substring(69, 82).trim() ) /100;
		this.InteresC = Double.parseDouble(arg1.substring(96, 97).trim() + arg1.substring(83, 96).trim() ) /100;
		this.Interes = Double.parseDouble(arg1.substring(97, 109).trim() ) /1000000000;

		tmp = arg1.substring(34, 42).trim();
		if ( !tmp.equals("00000000"))
			this.fecEmision = CoopeUtils.convertTolocalDate(tmp, "yyyyMMdd");

		tmp = arg1.substring(45, 53).trim();
		if ( !tmp.equals("00000000"))
			this.fecVencimiento = CoopeUtils.convertTolocalDate(tmp, "yyyyMMdd");

	}
	
}
