import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CertificadosService {

  private cuenta : string;
  private tipo : string;

  constructor() {

    this.cuenta = "";
    this.tipo = "";

   }

  get Tipo():string{
    return this.tipo;
  }
  set Tipo(val: string) {
    this.tipo = val;
  }

  get Cuenta():string{
    return this.cuenta;
  }
  set Cuenta(val: string) {
    this.cuenta = val;
  }

}
