import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AhorrosService {
  // tipo : contable, bloqueado, aportaciones, miscelaneo
  // moneda : soles, usd

  private tipo : string;
  private moneda : string;
  private monto : number;

  constructor() { 

    this.tipo = "";
    this.moneda = "";
    this.monto = 0;
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

}
