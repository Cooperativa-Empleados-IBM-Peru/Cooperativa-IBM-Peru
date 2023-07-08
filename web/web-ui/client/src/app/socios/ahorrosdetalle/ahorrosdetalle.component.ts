import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe, formatNumber, formatDate } from '@angular/common';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { AhorrosService } from '../../services/ahorros.service';
import { Router } from '@angular/router';
import {
	Table,
	TableModel,
	TableItem,
	TableHeaderItem
} from 'carbon-components-angular';
import { Movimientos } from '../../classes/movimientos';

@Component({
	selector: 'app-ahorrosdetalle',
	templateUrl: './ahorrosdetalle.component.html',
	styleUrls: ['./ahorrosdetalle.component.scss']
})
export class AhorrosdetalleComponent implements OnInit {

	dataAhorro = [];
	modelAhorro: TableModel;
	skeletonAhorroModel = Table.skeletonModel(10, 6);
	skeletonahorro = true;

	TituloTabla: string;
	tempMonto: number;
	tmpCuenta: string;
	movdetalles: Movimientos;

	dateEmision: Date;
	tipodesc: string;

constructor(public ibmidservice: IbmidService,
		public db2service: Db2Service,
		private ahorrosservice: AhorrosService,
		private router: Router,
		@Inject(LOCALE_ID) private locale: string
) { }

ngOnInit(): void {

    if (!this.ibmidservice.LoggedIn) {
			this.router.navigate(['/']);
		} else {

      this.modelAhorro = new TableModel();
			this.modelAhorro.header = [
				new TableHeaderItem({data: 'Fecha'}),
				new TableHeaderItem({data: 'Código'}),
        new TableHeaderItem({data: 'Descripción'}),
        new TableHeaderItem({data: 'Referencia'}),
        new TableHeaderItem({data: 'Importe'}),
				new TableHeaderItem({data: 'Saldo'}),
			];

      switch ( this.ahorrosservice.Tipo ) {
        case 'miscelaneo' :
          this.tipodesc = 'misceláneo';
          break;

        default :
          this.tipodesc = this.ahorrosservice.Tipo;
          break;
      }

      this.tempMonto = this.ahorrosservice.Monto;
      this.TituloTabla = 'Saldo ' + this.tipodesc + ' (' + this.ahorrosservice.Moneda + ')';

      this.tmpCuenta = this.ahorrosservice.Moneda == 'soles' ? this.ibmidservice.CuentaSoles : this.ibmidservice.CuentaUsd;

      this.db2service.getMovimientosAhorroDetalle(this.tmpCuenta, this.ahorrosservice.Tipo).subscribe(
        (resp: any) => {

          if (resp.length > 0 ) {
            //loop through members to add Monto
            for (var i = 0; i < resp.length; i++) {
              this.movdetalles = resp[i];
              this.movdetalles.saldo = this.tempMonto;
              this.tempMonto -= this.movdetalles.importe;
            }

            //fill table detalle
            for (var i = resp.length - 1; i >= 0; i--) {
              this.movdetalles = resp[i];
              this.dateEmision = new Date(this.movdetalles.fecemision.trim());

              this.dataAhorro.push(
								[new TableItem({data : formatDate( this.dateEmision, 'dd-MM-yyyy', this.locale) }),
								new TableItem({data : this.movdetalles.transaccion.trim() }),
                new TableItem({data : this.movdetalles.texto.trim() }),
                new TableItem({data : this.movdetalles.refalfa.trim() }),
                new TableItem({data : formatNumber( this.movdetalles.importe, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.movdetalles.saldo, this.locale,'1.2-2'), className: "titem-right" })
              ]
							);

            }

            this.modelAhorro.data = this.dataAhorro;
            this.skeletonahorro = false;

          }
        }
      );

    }

  }

}
