import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe,formatNumber, formatDate } from '@angular/common';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { PrestamosService } from '../../services/prestamos.service';
import { Router } from '@angular/router';
import {
	Table,
	TableModel,
	TableItem,
  TableRow,
	TableHeaderItem
} from 'carbon-components-angular';
import { PrestamosPagos } from '../../classes/prestamospagos';
import { MasterPlanPagos } from '../../classes/masterplanpagos';
import { Garantes } from '../../classes/garantes';
//import '@carbon/charts/styles.css';
//import "@carbon/charts/styles.css";

@Component({
  selector: 'app-prestamosdetalle',
  templateUrl: './prestamosdetalle.component.html',
  styleUrls: ['./prestamosdetalle.component.scss']
})
export class PrestamosdetalleComponent implements OnInit {

  canceladosArray = [];
	modelPrestamosCancelados: TableModel;
	skeletonPrestamoModelCancelados = Table.skeletonModel(10, 8);
	skeletonprestamocancelados = true;

  dataPrestamosPendientes = [];
	modelPrestamosPendientes: TableModel;
	skeletonPrestamoModelPendientes = Table.skeletonModel(10, 6);
	skeletonprestamopendientes = true;

  dataTotales = [];
	modelTotales: TableModel;
	skeletonTotales = Table.skeletonModel(3, 5);
  skeletontotales = true;

  dataGarantes = [];
	modelGarantes: TableModel;
	skeletonGarantes = Table.skeletonModel(5, 2);
  skeletongarantes = true;

  TituloTabla : string;
  Interes : string;
  prestamospagos : PrestamosPagos;
  masterplanpagos : MasterPlanPagos;
  garantes : Garantes;
  dateVencimiento : Date;
  datePago : Date;
  cancelado: number;
  pendiente: number;
  mcancelado: number;
  mpendiente: number;
  size: String;
	isActive = true;

  //pie chart for nunero de cuotas
	piecuotas = [];
	piecuotasconf = {
//    "title": "Cuotas",
		"resizable": true,
		"legend": {
				"alignment": "center"
		},
		"donut": {
				"center": {
						"label": "Cuotas"
				},
				"alignment": "center"
		},
		"height": "400px",
		"tooltip": {
			"enabled": false
		}
	};

  //pie chart for montos cuotas
	piemonto = [];
  piemontoconf = {
 //   "title": "Montos",
		"resizable": true,
		"legend": {
				"alignment": "center"
		},
		"donut": {
				"center": {
						"label": "Monto"
				},
				"alignment": "center"
		},
		"height": "400px",
		"tooltip": {
			"enabled": false
		}
	}
  
  constructor(public ibmidservice: IbmidService,
    public db2service: Db2Service,
    private prestamosservice: PrestamosService,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
    ) { }

  ngOnInit(): void {

    if (!this.ibmidservice.LoggedIn) {
			this.router.navigate(['/']);
		} else {

      this.TituloTabla = 'Cuotas préstamo ' + this.prestamosservice.Operacion + ' ( ' + this.prestamosservice.Moneda + ' )';
      this.Interes = formatNumber( this.prestamosservice.Interes, this.locale,'1.9-9')

      this.modelPrestamosCancelados = new TableModel();
			this.modelPrestamosCancelados.header = [
				new TableHeaderItem({data: 'Cuota'}),
				new TableHeaderItem({data: 'Fecha Venc.'}),
        new TableHeaderItem({data: 'Total Cuota'}),
        new TableHeaderItem({data: 'Amortización'}),
        new TableHeaderItem({data: 'Interés'}),
				new TableHeaderItem({data: 'Interés Moratorio'}),
				new TableHeaderItem({data: 'Estado'}),
				new TableHeaderItem({data: 'Fecha Cancelación'}),
			];


      this.modelPrestamosPendientes = new TableModel();
			this.modelPrestamosPendientes.header = [
				new TableHeaderItem({data: 'Cuota'}),
				new TableHeaderItem({data: 'Fecha Venc.'}),
        new TableHeaderItem({data: 'Total Cuota'}),
        new TableHeaderItem({data: 'Amortización'}),
        new TableHeaderItem({data: 'Interés'}),
				new TableHeaderItem({data: 'Interés Moratorio'}),
			];

      this.modelTotales = new TableModel();
			this.modelTotales.header = [
				new TableHeaderItem({data: 'Descripción'}),
        new TableHeaderItem({data: 'Total Cuota'}),
        new TableHeaderItem({data: 'Amortización'}),
        new TableHeaderItem({data: 'Interés'}),
				new TableHeaderItem({data: 'Interés Moratorio'}),
			];

      this.modelGarantes = new TableModel();
			this.modelGarantes.header = [
				new TableHeaderItem({data: 'Documento de identificación'}),
        new TableHeaderItem({data: 'Nombre'}),
			];

			this.selectPageCancelados(1);
			this.selectPagePendientes(1);

      this.db2service.getDetallesGarantes(this.prestamosservice.Operacion).subscribe(
        (resp: any) => {
  
          if (resp.length > 0 ) {

            for (var i = 0; i < resp.length; i++) {

              this.garantes = resp[i];
              this.dataGarantes.push(
                [	new TableItem({data : this.garantes.docidgarante.trim() }),
                  new TableItem({data : this.garantes.nombregarante.trim() })
                ]
              );

            }
          }

          this.modelGarantes.data = this.dataGarantes;
          this.skeletongarantes = false;

        }
      );

      this.db2service.getMasterPlanPagosbyId(this.prestamosservice.Operacion).subscribe(
        (resp: any) => {
 
          if (resp) {

              this.masterplanpagos = resp;

              const rowtotales = new TableRow(
                new TableItem({data : 'Totales' }),
                new TableItem({data : formatNumber( this.masterplanpagos.totalcuotas, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.masterplanpagos.totalmontos, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.masterplanpagos.totalinteres, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.masterplanpagos.totalinteresmoratorio, this.locale,'1.2-2'), className: "titem-right" })
              );
  
              const rowpendientes = new TableRow(
                new TableItem({data : 'Pendientes' }),
                new TableItem({data : formatNumber( this.masterplanpagos.pendtotalcuotas, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.masterplanpagos.pendtotalmontos, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.masterplanpagos.pendtotalinteres, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.masterplanpagos.pendtotalinteresmoratorio, this.locale,'1.2-2'), className: "titem-right" })
              );

              const rowcancelados = new TableRow(
                new TableItem({data : 'Cancelados' }),
                new TableItem({data : formatNumber( this.masterplanpagos.cantotalcuotas, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.masterplanpagos.cantotalmontos, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.masterplanpagos.cantotalinteres, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.masterplanpagos.cantotalinteresmoratorio, this.locale,'1.2-2'), className: "titem-right" })
              );

              this.dataTotales = [
                rowtotales, rowpendientes, rowcancelados
              ];
              this.modelTotales.data = this.dataTotales;
              this.skeletontotales = false;
  
              this.mpendiente = this.masterplanpagos.totalcuotas;
              this.piemonto.push({
                "group": "Pendiente",
                "value": this.mpendiente
              });

              this.mcancelado  = this.masterplanpagos.totalcuotas;
              this.piemonto.push({
                "group": "Cancelado",
                "value": this.mcancelado
              });

          }
   
        }
      );

    }

  }

  selectPageCancelados(page) {
	  this.prepareDataCancelados(page);
    this.modelPrestamosCancelados.currentPage = page;
  }

  prepareDataCancelados(page: number) {
	  const dataPrestamosCancelados = [];

	  this.db2service.getPagosCancelados(this.prestamosservice.Operacion).subscribe(
        (resp: any) => {
			this.cancelado = resp.length;
			this.piecuotas.push({
				"group": "Pagadas",
				"value": this.cancelado
			});

      if (resp.length > 0 ) {

			this.modelPrestamosCancelados.totalDataLength = resp.length;
			// tslint:disable-next-line: max-line-length
			for (let i = (page - 1) * this.modelPrestamosCancelados.pageLength ; i < page * this.modelPrestamosCancelados.pageLength && i < this.modelPrestamosCancelados.totalDataLength; i++) {
              this.prestamospagos = resp[i];

              this.dateVencimiento = new Date(this.prestamospagos.fecvencimiento.trim());
              this.datePago = new Date(this.prestamospagos.fecpago.trim());

              dataPrestamosCancelados.push(
								[	new TableItem({data : this.prestamospagos.cuota }),
                new TableItem({data : formatDate( this.dateVencimiento, 'dd-MM-yyyy', this.locale) }),
                new TableItem({data : formatNumber( this.prestamospagos.montocuota, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.prestamospagos.monto, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.prestamospagos.interes, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.prestamospagos.interesmoratorio, this.locale,'1.2-2'), className: "titem-right" }),
								new TableItem({data : 'CAN' }),
                new TableItem({data : formatDate( this.datePago, 'dd-MM-yyyy', this.locale) })
              ]
			        );

            }

          }

          this.modelPrestamosCancelados.data = dataPrestamosCancelados;
          this.skeletonprestamocancelados = false;

        }
      );

  }

  selectPagePendientes(page) {
	  this.prepareDataPendientes(page);
	  this.modelPrestamosPendientes.currentPage = page;
  }

  prepareDataPendientes(page: number) {
	  const dataPrestamosPendientes = [];

	  this.db2service.getPagosPendientes(this.prestamosservice.Operacion).subscribe(
        (resp: any) => {

			this.pendiente = resp.length;
			this.piecuotas.push({
				"group": "Pendientes",
				"value": this.pendiente
			});

      if (resp.length > 0 ) {
			this.modelPrestamosPendientes.totalDataLength = resp.length;
            //fill table detalle
            for (let i = (page - 1) * this.modelPrestamosPendientes.pageLength ; i < page * this.modelPrestamosPendientes.pageLength && i < this.modelPrestamosPendientes.totalDataLength; i++) {
              this.prestamospagos = resp[i];

              this.dateVencimiento = new Date(this.prestamospagos.fecvencimiento.trim());

              dataPrestamosPendientes.push(
                [	new TableItem({data : this.prestamospagos.cuota }),
                new TableItem({data : formatDate( this.dateVencimiento, 'dd-MM-yyyy', this.locale) }),
                new TableItem({data : formatNumber( this.prestamospagos.montocuota, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.prestamospagos.monto, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.prestamospagos.interes, this.locale,'1.2-2'), className: "titem-right" }),
                new TableItem({data : formatNumber( this.prestamospagos.interesmoratorio, this.locale,'1.2-2'), className: "titem-right" })
              ]
              );

            }

          }

          this.modelPrestamosPendientes.data = dataPrestamosPendientes;
          this.skeletonprestamopendientes = false;

        }
      );

    }

}
