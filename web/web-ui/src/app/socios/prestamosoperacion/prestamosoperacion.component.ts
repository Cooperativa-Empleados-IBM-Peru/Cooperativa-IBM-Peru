import { Component, OnInit, Inject, LOCALE_ID, ViewChild, TemplateRef } from '@angular/core';
import { DecimalPipe,formatNumber, formatDate } from '@angular/common';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { PrestamosService } from '../../services/prestamos.service';
import { Router } from '@angular/router';
import {
	Table,
	TableModel,
	TableItem,
	TableHeaderItem
} from 'carbon-components-angular';
import { Prestamos } from '../../classes/prestamos';

@Component({
  selector: 'app-prestamosoperacion',
  templateUrl: './prestamosoperacion.component.html',
  styleUrls: ['./prestamosoperacion.component.scss']
})
export class PrestamosoperacionComponent implements OnInit {

  dataPrestamos = [];
	modelPrestamos: TableModel;
	skeletonPrestamoModel = Table.skeletonModel(10, 8);
	skeletonprestamo = true;

  TituloTabla : string;
  tempMonto : number;
  tmpCuenta : string;
  prestamooperacion : Prestamos;

  dateCartera : Date;
  dateVencimiento : Date;
  tipodesc : string;

  constructor(public ibmidservice : IbmidService, 
    public db2service : Db2Service,
    private prestamosservice : PrestamosService,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
    ) { }

    @ViewChild("activeItemTemplate")
    protected activeItemTemplate: TemplateRef<any>;
  
    @ViewChild("inactiveItemTemplate")
    protected inactiveItemTemplate: TemplateRef<any>;
  
  ngOnInit(): void {

    if (!this.ibmidservice.LoggedIn) {
			this.router.navigate(['/']);
		} else {

      this.modelPrestamos = new TableModel();
			this.modelPrestamos.header = [
				new TableHeaderItem({data: 'Cod.'}),
				new TableHeaderItem({data: 'Número'}),
        new TableHeaderItem({data: 'Fecha girado'}),
        new TableHeaderItem({data: 'Fecha venc.'}),
        new TableHeaderItem({data: 'Cuotas'}),
				new TableHeaderItem({data: 'Interes'}),
				new TableHeaderItem({data: 'Monto'}),
				new TableHeaderItem({data: 'Saldo'})
			];

      switch ( this.prestamosservice.Tipo ) {
          // tipo : solafirma, consumo, cortop, medianop, largop, hipotecario, auto, ps, esp1, esp2
        case "solafirma" :
          this.tipodesc = "a sola firma";
          break;

        case "cortop" :
          this.tipodesc = "corto plazo";
          break;

        case "medianop" :
          this.tipodesc = "mediano plazo";
          break;

        case "largop" :
          this.tipodesc = "largo plazo";
          break;

        case "auto" :
          this.tipodesc = "automóvil";
          break;

        case "esp1" :
          this.tipodesc = "especial 1";
          break;

        case "esp2" :
          this.tipodesc = "especial 2";
          break;
          
        default :
          this.tipodesc = this.prestamosservice.Tipo;
          break;
      }

      this.tempMonto = this.prestamosservice.Monto;
      this.TituloTabla = 'Préstamo ' + this.tipodesc + ' (' + this.prestamosservice.Moneda + ')';
   
      this.tmpCuenta = this.prestamosservice.Moneda == 'soles' ? this.ibmidservice.CuentaSoles : this.ibmidservice.CuentaUsd;
      this.db2service.getOperacionesPrestamos(this.tmpCuenta, this.prestamosservice.Tipo).subscribe(
        (resp: any) => {
  
          if (resp.length > 0 ) {
  
            //fill table operacion
            for (var i = 0; i < resp.length; i++) {
              this.prestamooperacion = resp[i];

              this.dateCartera = new Date( this.prestamooperacion.feccartera.trim() );
              this.dateVencimiento = new Date( this.prestamooperacion.fecvencimiento.trim() );
              this.dataPrestamos.push(
								[new TableItem({data : this.prestamooperacion.idmovimiento.trim() }),
								new TableItem({data : {name : this.prestamooperacion.numoperacion.trim(),
                operacion : this.prestamooperacion.numoperacion.trim(), interes: this.prestamooperacion.interes },
                template: this.activeItemTemplate,
                }),
                new TableItem({data : formatDate( this.dateCartera, 'dd-MM-yyyy', this.locale) }),
                new TableItem({data : formatDate( this.dateVencimiento, 'dd-MM-yyyy', this.locale) }),
                new TableItem({data : this.prestamooperacion.nrocuotas }),
                new TableItem({data : formatNumber( this.prestamooperacion.interes, this.locale,'1.9-9'), className: "titem-right" }),            
                new TableItem({data : formatNumber( this.prestamooperacion.monto, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.prestamooperacion.saldo, this.locale,'1.2-2'), className: "titem-right" })
              ]
							);
 
            }

            this.modelPrestamos.data = this.dataPrestamos;
            this.skeletonprestamo = false;

          }
        }
      );

    }

  }

  openPrestamoDetalle(operacion : string, interes : number) {
    this.prestamosservice.Operacion = operacion;
    this.prestamosservice.Interes = interes;
		this.router.navigate(['socios/prestamosdetalle']);
  }
  
}
