package ibm.coope;

import lombok.Data;

@Data
public class CoopeVideos  {

	private int i = 0;
		
	private String CodGenVid;
	private String GenVideo;
	private String CodVideo;
	private String TitCastVideo;
	private String TitNavVideo;
	private String protagVideo1;
	private String protagVideo2;
	private String protagVideo3;
	private String protagVideo4;
	private String DirecVideo;
	private String IdiomaVideo;
	private String PaisVideo;
	private short AnnoVideo;
	
	CoopeVideos(String arg1) {
	
		this.CodGenVid = arg1.substring(0, 2).trim();
		this.GenVideo = arg1.substring(2, 22).trim();
		this.CodVideo = arg1.substring(22, 26).trim();
		this.TitCastVideo = CoopeUtils.cleanString(arg1.substring(26, 66).trim() );
		this.TitNavVideo = CoopeUtils.cleanString(arg1.substring(66, 106).trim() );

		this.protagVideo1 = CoopeUtils.cleanString(arg1.substring(106, 136).trim() );
		this.protagVideo2 = CoopeUtils.cleanString(arg1.substring(136, 166).trim() );
		this.protagVideo3 = CoopeUtils.cleanString(arg1.substring(166, 196).trim() );
		this.protagVideo4 = CoopeUtils.cleanString(arg1.substring(196, 226).trim() );
		
		this.DirecVideo = CoopeUtils.cleanString(arg1.substring(226, 256).trim() );
		this.IdiomaVideo = arg1.substring(256, 266).trim();
		this.PaisVideo = arg1.substring(266, 276).trim();
		this.AnnoVideo = Short.parseShort( arg1.substring(276, 280).trim() );
	}
	
}
