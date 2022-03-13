package ibm.coope;

import java.util.concurrent.atomic.AtomicInteger;
import java.time.LocalDate;

import lombok.Data;

@Data
public class CoopeSiniestros {

	private AtomicInteger cont;

	private String TipoDoc;
	private String CodEmpleado;
	
	private String Placa;
	private LocalDate FecSiniestro;
	private String Codigo;
	private String Descripcion;
	private String Numero;
	private String Estado;
	private String Lugar;
	private String Franquicia;
	private String Comisaria;
	private String NumDenuncia;
	private Double Importe;
	private String NumConformidad;
	
	CoopeSiniestros(String arg1) {

		String tmp;

		this.TipoDoc     = arg1.substring(0, 1).trim();
		this.CodEmpleado = arg1.substring(1, 12).trim();

		this.Placa = arg1.substring(12, 18).trim();
		this.Codigo = arg1.substring(18, 20).trim();
		this.Descripcion = arg1.substring(20, 50).trim();
		this.Numero = arg1.substring(50, 57).trim();

		tmp = arg1.substring(57, 65).trim();
		if ( !tmp.equals("00000000"))
			this.FecSiniestro = CoopeUtils.convertTolocalDate(tmp, "yyyyMMdd");

		this.Estado = arg1.substring(71, 91).trim();
		this.Lugar = arg1.substring(91, 121).trim();
		this.Franquicia = arg1.substring(121, 131).trim();
		this.Comisaria = arg1.substring(131, 151).trim();
		this.NumDenuncia = arg1.substring(151, 159).trim();
		this.Importe = Double.parseDouble( arg1.substring(167, 168).trim() + arg1.substring(159, 167).trim() ) /100;
		this.NumConformidad = arg1.substring(168, 173).trim();

	}
	
}
