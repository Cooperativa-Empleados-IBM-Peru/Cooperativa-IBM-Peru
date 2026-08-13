import { Component, OnInit, ViewChild, TemplateRef, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe,formatNumber, formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { CertificadosService } from '../../services/certificados.service';
import { CertificadosDetalles } from '../../classes/certificadosdetalle';
import {
	Table,
	TableModel,
	TableItem,
	TableHeaderItem,
	Link
} from 'carbon-components-angular';

@Component({
  selector: 'app-certificadosdetalle',
  templateUrl: './certificadosdetalle.component.html',
  styleUrls: ['./certificadosdetalle.component.scss']
})
export class CertificadosdetalleComponent implements OnInit {

	dataCertificados = [];
	modelCertificados: TableModel;
	skeletonCertificadosModel = Table.skeletonModel(5, 9);
	skeletoncertificados = true;

	certdetalles : CertificadosDetalles;
	dateEmision : Date;
	dateVenc : Date;

  constructor(public ibmidservice : IbmidService, 
		public db2service : Db2Service,
		private certificadosservice : CertificadosService,
		private router: Router,
		@Inject(LOCALE_ID) private locale: string) { }

  	@ViewChild("activeItemTemplate")
	protected activeItemTemplate: TemplateRef<any>;
	
	@ViewChild("inactiveItemTemplate")
	protected inactiveItemTemplate: TemplateRef<any>;

  ngOnInit(): void {

    if (!this.ibmidservice.LoggedIn) {
			this.router.navigate(['/']);
	} else {

		this.modelCertificados = new TableModel();
		this.modelCertificados.header = [
			new TableHeaderItem({data: 'Número'}),
			new TableHeaderItem({data: 'Vers.'}),
			new TableHeaderItem({data: 'F. emisión'}),
			new TableHeaderItem({data: 'F. vencimiento'}),
			new TableHeaderItem({data: 'Plazo'}),
			new TableHeaderItem({data: 'Tasa de interés'}),
			new TableHeaderItem({data: 'Monto'}),
			new TableHeaderItem({data: 'Interés ganado'}),
			new TableHeaderItem({data: 'Valor total'}),
		];

		this.db2service.getCertificadosDetalles(this.certificadosservice.Cuenta, this.certificadosservice.Tipo).subscribe(
			(resp: any) => {
				if (resp.length > 0) {
		
					for (var i = 0; i < resp.length; i++) {
						this.certdetalles = resp[i];
						this.dateEmision = new Date(this.certdetalles.fecemision.trim());
						this.dateVenc = new Date(this.certdetalles.fecvencimiento.trim());

						this.dataCertificados.push(
							[new TableItem({data : this.certdetalles.numdoc.trim() }),
							new TableItem({data : this.certdetalles.vers.trim() }),	
							new TableItem({data : formatDate( this.dateEmision, 'dd-MM-yyyy', this.locale, 'UTC') }),
							new TableItem({data : formatDate( this.dateVenc, 'dd-MM-yyyy', this.locale, 'UTC') }),
							new TableItem({data : this.certdetalles.plazo }),
							new TableItem({data : formatNumber(this.certdetalles.interes, this.locale,'1.9-9') }),
							new TableItem({data : formatNumber(this.certdetalles.monto, this.locale,'1.2-2') }),
							new TableItem({data : formatNumber(this.certdetalles.interesg, this.locale,'1.2-2') }),
							new TableItem({data : formatNumber(this.certdetalles.valor, this.locale,'1.2-2') }),
							]			
						);
	
					}
	
				}

				this.modelCertificados.data = this.dataCertificados;
				this.skeletoncertificados = false;				

		});

    }

  }

}
