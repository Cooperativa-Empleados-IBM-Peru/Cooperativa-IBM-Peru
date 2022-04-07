package ibm.coope;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.apache.commons.lang3.StringUtils;

import lombok.Data;

@Data
public class CoopeMovimiento  {
	
	private String TipoMovimiento;
	private String CtaCliente;

	private String IdMov;
	private String CodEmpr;	
	private String TipoPago;
	private String Transac;
	private String Referencia;
	private String ReferAlfa;
	private String NumDepo;
	private LocalDateTime FecEmision;
	private LocalDate FecVencimiento;
	private Double Importe;
	private String Texto;
	
	int i;

	CoopeMovimiento(String arg1) {

		this.CtaCliente = arg1.substring(4, 11).trim();

		IdMov = arg1.substring(0, 1).trim();          
		CodEmpr = arg1.substring(1, 4).trim();
		TipoPago = arg1.substring(11, 13).trim();
		Transac = arg1.substring(13, 17).trim();
		Referencia = arg1.substring(17, 27).trim();
		ReferAlfa = arg1.substring(27, 35).trim();
		NumDepo = arg1.substring(35, 45).trim();
		
		String tmp;

		tmp = arg1.substring(45, 59).trim();
		if ( !tmp.equals("00000000000000")) {
			//Validate some data that is wrong in the file
			int i=Integer.parseInt( StringUtils.right(tmp, 2) ); 
			if ( i > 59 )
				tmp = StringUtils.left(tmp, 12).concat("59");

			FecEmision = CoopeUtils.convertTolocalDateTime( tmp, "yyyyMMddHHmmss" );
		}
		
		tmp = arg1.substring(59, 67).trim();
		if ( !tmp.equals("00000000"))
			FecVencimiento = CoopeUtils.convertTolocalDate( tmp, "yyyyMMdd" );
	
		Importe = Double.parseDouble( arg1.substring(80, 81).trim() + arg1.substring(67, 80).trim() ) /100;
		
		Texto = arg1.substring(81).trim();

	}
	
	
}
