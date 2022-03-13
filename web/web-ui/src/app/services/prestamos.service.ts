import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  // tipo : solafirma, consumo, cortop, medianop, largop, hipotecario, auto, ps, esp1, esp2
  // moneda : soles, usd

  private tipo : string;
  private moneda : string;
  private monto : number;
  private operacion : string;
  private interes : number;

  constructor() { 
    this.tipo = "";
    this.moneda = "";
    this.monto = 0;
    this.operacion = "";
    this.interes = 0;
  }

  get Tipo():string{
    return this.tipo;
  }
  set Tipo(val: string) {
    this.tipo = val;
  }

  get Moneda():string{
    return this.moneda;
  }
  set Moneda(val: string) {
    this.moneda = val;
  }

  get Monto():number{
    return this.monto;
  }
  set Monto(val: number) {
    this.monto = val;
  }

  get Operacion():string{
    return this.operacion;
  }
  set Operacion(val: string) {
    this.operacion = val;
  }

  get Interes():number{
    return this.interes;
  }
  set Interes(val: number) {
    this.interes = val;
  }

}
