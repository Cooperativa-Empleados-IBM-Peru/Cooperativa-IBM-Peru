package ibm.coope;

import java.time.LocalDate;

import lombok.Data;
@Data
public class CoopeGarantizados {
	
	private String TipoDoc;
	private String CodEmpleado;
	private String NomSocio;
	private String TipoDocIdGarantizado;
	private String DocIdGarantizado;
	private String NomSocioGarantizado;
	private String IdMovim;
	private String NomProducto;
	private String NumOperacion;
	private LocalDate FecPrestamo;
	private String Moneda;
	private Double Monto;
	private Double Saldo;

	private String email;
	
	CoopeGarantizados(String arg1) {

		String tmp;

		this.TipoDoc = arg1.substring(0, 1).trim();
		this.CodEmpleado = arg1.substring(1, 12).trim();
		this.NomSocio = arg1.substring(12, 42).trim();
		this.TipoDocIdGarantizado = arg1.substring(42, 43).trim();
		this.DocIdGarantizado = arg1.substring(43, 54).trim();
		this.NomSocioGarantizado = arg1.substring(54, 84).trim();
		this.IdMovim = arg1.substring(84, 88).trim();
		this.NomProducto = arg1.substring(88, 118).trim();
		this.NumOperacion = arg1.substring(118, 127).trim();

		tmp = arg1.substring(127, 135).trim();
		if ( !tmp.equals("00000000"))
			this.FecPrestamo = CoopeUtils.convertTolocalDate(tmp, "ddMMyyyy");

		this.Moneda = arg1.substring(135, 138);
		this.Monto = Double.parseDouble( arg1.substring(151, 152).trim() + arg1.substring(138, 151).trim() ) /100;
		this.Saldo = Double.parseDouble( arg1.substring(165, 166).trim() + arg1.substring(152, 165).trim() ) /100;

	}

}
