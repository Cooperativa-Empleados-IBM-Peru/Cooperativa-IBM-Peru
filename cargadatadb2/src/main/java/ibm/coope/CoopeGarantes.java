package ibm.coope;

import lombok.Data;

@Data
public class CoopeGarantes {
	
	private String NumOperacion;
	private String IdMovim;
	private String TipoDoc;
	private String CodEmpleado;
	
	CoopeGarantes(String arg1) {
	
		this.NumOperacion = arg1.substring(0, 9).trim();
		this.IdMovim = arg1.substring(9, 13).trim();
		this.TipoDoc = arg1.substring(13, 14).trim();
		this.CodEmpleado = arg1.substring(14, 25).trim();

	}

}
