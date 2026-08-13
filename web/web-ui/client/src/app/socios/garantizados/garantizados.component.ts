import { Component, OnInit, ViewChild, TemplateRef, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe,formatNumber, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { AhorrosService } from '../../services/ahorros.service';
import { Garantizados } from '../../classes/garantizados';
import {
	Table,
	TableModel,
	TableItem,
	TableHeaderItem,
	Link
} from 'carbon-components-angular';

@Component({
  selector: 'app-garantizados',
  templateUrl: './garantizados.component.html',
  styleUrls: ['./garantizados.component.scss']
})
export class GarantizadosComponent implements OnInit {

	dataGarantizados = [];
	modelGarantizados: TableModel;
	skeletonGarantizadosModel = Table.skeletonModel(5, 9);
	skeletongarantizados = true;

	garantizados: Garantizados;
	datePrestamo: Date;
	notificationObject = {
		type: 'error',
		title: 'Notificación',
		message: 'Usted no cuenta con garantías registradas',
		showClose: false,
		lowContrast: false
	};

	isdata: number;
  constructor(public ibmidservice : IbmidService,
				public db2service : Db2Service,
				private ahorrosservice : AhorrosService,
				private router: Router,
				@Inject(LOCALE_ID) private locale: string) { }

	@ViewChild("activeItemTemplate")
	protected activeItemTemplate: TemplateRef<any>;

 	ngOnInit(): void {

    if (!this.ibmidservice.LoggedIn) {
			this.router.navigate(['/']);
	} else {

			this.modelGarantizados = new TableModel();
			this.modelGarantizados.header = [
				new TableHeaderItem({data: 'Doc.'}),
				new TableHeaderItem({data: 'Nombre socio'}),
				new TableHeaderItem({data: 'Id'}),
				new TableHeaderItem({data: 'Producto'}),
				new TableHeaderItem({data: 'Num Operación'}),
				new TableHeaderItem({data: 'Fecha'}),
				new TableHeaderItem({data: 'Moneda'}),
				new TableHeaderItem({data: 'Monto'}),
				new TableHeaderItem({data: 'Saldo'}),
			];

			this.db2service.getGarantizados(this.ibmidservice.CodEmpleado).subscribe(
				(resp: any) => {
				this.isdata = resp.length;
				  if (resp.length > 0 ) {

       			    for (var i = 0; i < resp.length; i++) {
     			        this.garantizados = resp[i];
            		  	this.datePrestamo = new Date(this.garantizados.fecprestamo.trim());

           				 this.dataGarantizados.push(
							[new TableItem({data : this.garantizados.docidgarantizado.trim() }),
							new TableItem({data : this.garantizados.nombresociogarantizado.trim() }),
							new TableItem({data : this.garantizados.idmovimiento.trim() }),
							new TableItem({data : this.garantizados.nombreproducto.trim() }),
							new TableItem({data : this.garantizados.numoperacion.trim() }),
							new TableItem({data : formatDate( this.datePrestamo, 'dd-MM-yyyy', this.locale) }),
							new TableItem({data : this.garantizados.moneda.trim() }),
    			            new TableItem({data : formatNumber( this.garantizados.monto, this.locale,'1.2-2'), className: "titem-right" }),
    			            new TableItem({data : formatNumber( this.garantizados.saldo, this.locale,'1.2-2'), className: "titem-right" })
             				]
						);

					}

					this.modelGarantizados.data = this.dataGarantizados;
					this.skeletongarantizados = false;

				  }

			});

    }

  }

}
