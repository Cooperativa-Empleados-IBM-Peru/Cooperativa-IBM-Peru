package ibm.coope;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CoopeFRA {

	String tmp;

	private String TipoDoc;
	private String CodEmpleado;
	private String NomSocio;
	private String Placa;
	private LocalDate FecInscripcion;
	private String Propietario;
	private String Marca;
	private String Modelo;
	private String Clase;
	private String Color;
	private short AnnoFabricacion;
	private String Serie;
	private String Motor;
	private String Tarjeta;
	private Double Valor;
	private Double Accesorios;
	
	CoopeFRA(String arg1) {
		
		this.TipoDoc  = arg1.substring(0, 1).trim();
		this.CodEmpleado = arg1.substring(1, 12).trim();
		this.NomSocio = arg1.substring(12, 52).trim();
		this.Placa	  = arg1.substring(52, 58).trim();

		tmp = arg1.substring(58, 66).trim();
		if ( !tmp.equals("00000000"))
			this.FecInscripcion = CoopeUtils.convertTolocalDate(tmp, "yyyyMMdd");

		this.Propietario = arg1.substring(66, 96).trim();
		this.Marca	  = arg1.substring(96, 111).trim();
		this.Modelo   = arg1.substring(111, 126).trim();
		this.Clase	  = arg1.substring(126, 141).trim();
		this.Color	  = arg1.substring(141, 156).trim();
		this.AnnoFabricacion = Short.parseShort( arg1.substring(156, 160).trim() );
		this.Serie	  = arg1.substring(160, 180).trim();
		this.Motor	  = arg1.substring(180, 200).trim();
		this.Tarjeta  = arg1.substring(200, 210).trim();
		
		this.Valor    = Double.parseDouble( arg1.substring(218, 219).trim() + arg1.substring(210, 218).trim() ) /100;
		this.Accesorios = Double.parseDouble( arg1.substring(227, 228).trim() + arg1.substring(219, 227).trim() ) /100;

	}
	
}
