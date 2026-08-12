package ibm.coope;

import lombok.Data;

@Data
public class CoopeSocioPersonal {
    private String docume;
    private String tipdid;
    private String docide;
    private String apepat;
    private String apemat;
    private String nombre;
    private String direcc;
    private String locali;
    private String provin;
    private String depart;
    private String ncompl;
    private String nombc2;
    private String telcel;
    private String nacion;
    private String cciuda;
    private String nomcon;
    private String dnicy;
    private String estciv;
    private String cargam;
    private String oficio;
    private String secto1;

    public CoopeSocioPersonal() {
    }

    public CoopeSocioPersonal(String[] parts) {
        if (parts != null && parts.length >= 21) {
            this.docume = parts[0];
            this.tipdid = parts[1];
            this.docide = parts[2];
            this.apepat = parts[3];
            this.apemat = parts[4];
            this.nombre = parts[5];
            this.direcc = parts[6];
            this.locali = parts[7];
            this.provin = parts[8];
            this.depart = parts[9];
            this.ncompl = parts[10];
            this.nombc2 = parts[11];
            this.telcel = parts[12];
            this.nacion = parts[13];
            this.cciuda = parts[14];
            this.nomcon = parts[15];
            this.dnicy  = parts[16];
            this.estciv = parts[17];
            this.cargam = parts[18];
            this.oficio = parts[19];
            this.secto1 = parts[20];
        }
    }
}
