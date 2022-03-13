package ibm.coope;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CoopePrusal {

	private String TipoID;
	private String CodEmpleado;
	private String NomSocio;
	private String DirSocio;
	private String CodEmpresa;
	private String CtaCliente;
	private String TipoMonedaPago;

	private double IntAhoMes;
	private double IntMisMes;
	private double SalDisAho;
	private double SalBloAho;
	private double SalAporta;
	private double SalMiscel;
	private double SalCert1;
	private double SalCert2;
	private double SalPSFirma;
	private double SalPCPlazo;
	private double SalPMPlazo;
	private double SalPLPlazo;
	private double SalPHipot;
	private double SalPConsum;
	private double SalPAuto;
	private double SalPPS1;
	private double SalPEsp1;
	private double SalPEsp2;

	private LocalDate fecMovDisAho;
	private LocalDate fecMovBloAho;
	private LocalDate fecMovAporta;
	private LocalDate fecMovMiscel;
	private LocalDate fecMovCert1;
	private LocalDate fecMovCert2;
	private LocalDate fecMovPSFirma;
	private LocalDate fecMovPCPlazo;
	private LocalDate fecMovPMPlazo;
	private LocalDate fecMovPLPlazo;
	private LocalDate fecMovPHipot;
	private LocalDate fecMovPConsum;
	private LocalDate fecMovPAuto;
	private LocalDate fecMovPPS1;
	private LocalDate fecMovPEsp1;
	private LocalDate fecMovPEsp2;

	private String email;
	private boolean actfecMovDisAho;
	private boolean actfecMovBloAho;
	private boolean actfecMovAporta;
	private boolean actfecMovMiscel;
	private boolean actfecMovCert1;
	private boolean actfecMovCert2;
	private boolean actfecMovPSFirma;
	private boolean actfecMovPCPlazo;
	private boolean actfecMovPMPlazo;
	private boolean actfecMovPLPlazo;
	private boolean actfecMovPHipot;
	private boolean actfecMovPConsum;
	private boolean actfecMovPAuto;
	private boolean actfecMovPPS1;
	private boolean actfecMovPEsp1;
	private boolean actfecMovPEsp2;

	CoopePrusal(String arg1) {

		// Header fields
		this.TipoID = arg1.substring(0, 1).trim();
		this.CodEmpleado = arg1.substring(1, 12).trim();
		this.NomSocio = arg1.substring(12, 52).trim();
		this.DirSocio = arg1.substring(52, 87).trim();
		this.CodEmpresa = arg1.substring(87, 90).trim();
		this.CtaCliente = arg1.substring(90, 97).trim();
		this.TipoMonedaPago = arg1.substring(97, 99).trim();

		String tmp;

		this.IntAhoMes        = Double.parseDouble( arg1.substring(112, 113).trim() + arg1.substring(99, 112).trim() ) /100;
		this.IntMisMes        = Double.parseDouble( arg1.substring(126, 127).trim() + arg1.substring(113, 126).trim() ) /100;
		this.SalDisAho        = Double.parseDouble( arg1.substring(140, 141).trim() + arg1.substring(127, 140).trim() ) /100;
		this.SalBloAho        = Double.parseDouble( arg1.substring(154, 155).trim() + arg1.substring(141, 154).trim() ) /100;
		this.SalAporta        = Double.parseDouble( arg1.substring(168, 169).trim() + arg1.substring(155, 168).trim() ) /100;
		this.SalMiscel	      = Double.parseDouble( arg1.substring(182, 183).trim() + arg1.substring(169, 182).trim() ) /100;
		this.SalCert1         = Double.parseDouble( arg1.substring(196, 197).trim() + arg1.substring(183, 196).trim() ) /100;
		this.SalCert2         = Double.parseDouble( arg1.substring(210, 211).trim() + arg1.substring(197, 210).trim() ) /100;
		this.SalPSFirma       = Double.parseDouble( arg1.substring(224, 225).trim() + arg1.substring(211, 224).trim() ) /100;
		this.SalPCPlazo       = Double.parseDouble( arg1.substring(238, 239).trim() + arg1.substring(225, 238).trim() ) /100;
		this.SalPMPlazo       = Double.parseDouble( arg1.substring(252, 253).trim() + arg1.substring(239, 252).trim() ) /100;
		this.SalPLPlazo       = Double.parseDouble( arg1.substring(266, 267).trim() + arg1.substring(253, 266).trim() ) /100;
		this.SalPHipot        = Double.parseDouble( arg1.substring(280, 281).trim() + arg1.substring(267, 280).trim() ) /100;
		this.SalPConsum       = Double.parseDouble( arg1.substring(294, 295).trim() + arg1.substring(281, 294).trim() ) /100;
		this.SalPAuto	      = Double.parseDouble( arg1.substring(308, 309).trim() + arg1.substring(295, 308).trim() ) /100;
		this.SalPPS1          = Double.parseDouble( arg1.substring(322, 323).trim() + arg1.substring(309, 322).trim() ) /100;
		this.SalPEsp1         = Double.parseDouble( arg1.substring(336, 337).trim() + arg1.substring(323, 336).trim() ) /100;
		this.SalPEsp2         = Double.parseDouble( arg1.substring(350, 351).trim() + arg1.substring(337, 350).trim() ) /100;

		//Date (dd/MM/yyyy) fields
		tmp = arg1.substring(351, 361).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovDisAho	  = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(361, 371).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovBloAho	  = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(371, 381).trim();	
		if ( !tmp.equals("00/00/0000"))
			this.fecMovAporta     = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(381, 391).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovMiscel     = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(391, 401).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovCert1      = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(401, 411).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovCert2      = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(411, 421).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovPSFirma    = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(421, 431).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovPCPlazo    = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(431, 441).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovPMPlazo    = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(441, 451).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovPLPlazo    = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(451, 461).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovPHipot	  = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(461, 471).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovPConsum    = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(471, 481).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovPAuto      = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(481, 491).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovPPS1       = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(491, 501).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovPEsp1      = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");

		tmp = arg1.substring(501, 511).trim();
		if ( !tmp.equals("00/00/0000"))
			this.fecMovPEsp2      = CoopeUtils.convertTolocalDate(tmp, "dd/MM/yyyy");


	}

}
