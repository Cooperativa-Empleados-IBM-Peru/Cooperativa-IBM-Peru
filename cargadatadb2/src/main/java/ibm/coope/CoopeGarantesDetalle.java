package ibm.coope;

import lombok.Data;

@Data
public class CoopeGarantesDetalle {

	private String CodEmpleado;
	private String NumOperacion;	
	private String TipoDocGarante;
	private String DocIdGarante;
	private String NomGarante;

	CoopeGarantesDetalle(String codemp, String nop, String tipodoc, String docid, String nombre) {
	
		this.CodEmpleado = codemp;
		this.NumOperacion = nop;
		this.TipoDocGarante = tipodoc;
		this.DocIdGarante = docid;
		this.NomGarante = nombre;

	}

}
