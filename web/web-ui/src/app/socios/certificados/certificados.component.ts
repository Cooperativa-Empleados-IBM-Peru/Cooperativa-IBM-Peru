import { Component, OnInit, ViewChild, TemplateRef, Inject, LOCALE_ID } from '@angular/core';
import { formatNumber } from '@angular/common';
import { Router } from '@angular/router';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { CertificadosService } from '../../services/certificados.service';
//import { CertificadosMontosTotales } from '../../classes/certificadosmontostotales';
import {
	Table,
	TableModel,
	TableItem,
	TableRow,
	TableHeaderItem
} from 'carbon-components-angular';


@Component({
	selector: 'app-certificados',
	templateUrl: './certificados.component.html',
	styleUrls: ['./certificados.component.scss']
})
export class CertificadosComponent implements OnInit {

	dataCertificados = [];
	modelCertificados: TableModel;
	skeletonCertificadosModel = Table.skeletonModel(3, 3);
	skeletoncertificados = true;
//	certificados : CertificadosMontosTotales;

	certsolvalor = this.ibmidservice.CertSolValor == null? 0 : this.ibmidservice.CertSolValor;
	certsolmontos = this.ibmidservice.CertSolMontos == null? 0 : this.ibmidservice.CertSolMontos;
	certusdvalor = this.ibmidservice.CertUsdValor == null? 0 : this.ibmidservice.CertUsdValor;
	certusdmontos = this.ibmidservice.CertUsdMontos == null? 0 : this.ibmidservice.CertUsdMontos;
	ctssolvalor = this.ibmidservice.CtsSolValor == null? 0 : this.ibmidservice.CtsSolValor;
	ctssolmontos = this.ibmidservice.CtsSolMontos == null? 0 : this.ibmidservice.CtsSolMontos;
	ctsusdvalor = this.ibmidservice.CtsUsdValor == null? 0 : this.ibmidservice.CtsUsdValor;
	ctsusdmontos = this.ibmidservice.CtsUsdMontos == null? 0 : this.ibmidservice.CtsUsdMontos;

	notificationObject = {
		type: 'error',
		title: 'Notificación',
		message: 'Usted no cuenta con certificados registrados',
		showClose: false,
		lowContrast: false
	};

	isdata: number;

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

		/* let certificadosoles : CertificadosTotales = {} as any;
		let certificadousd : CertificadosTotales = {} as any;
		let ctssoles : CertificadosTotales = {} as any;
		let ctsusd : CertificadosTotales = {} as any; */

		if (!this.ibmidservice.LoggedIn) {
			this.router.navigate(['/']);
		} else {

			this.modelCertificados = new TableModel();
			this.modelCertificados.header = [
				new TableHeaderItem({data: 'Depósitos a plazo'}),
				new TableHeaderItem({data: 'Soles'}),
				new TableHeaderItem({data: 'Dólares'}),
			];

//	TIPOCERT- 01 : Certificado Soles
//			- 02 : Certificado Dólares
//			- 03 : CTS Soles
//			- 04 : CTS Dólares

			if(this.ibmidservice.Uuid) {
	
				setTimeout(() => {

					const rowcertificados = new TableRow(
						new TableItem({data : 'Certificados'}),
						new TableItem({data : {name : formatNumber(this.certsolvalor, this.locale,'1.2-2'),
							tipo : "01", cuenta : this.ibmidservice.CuentaSoles },
							template: this.certsolmontos == 0 && this.certsolvalor == 0 ? this.inactiveItemTemplate : this.activeItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(this.certusdvalor, this.locale,'1.2-2'),
							tipo : "02", cuenta : this.ibmidservice.CuentaUsd},
							template: this.certusdmontos == 0 && this.certusdvalor == 0 ? this.inactiveItemTemplate : this.activeItemTemplate,
							className: "titem-right"})
					);
					rowcertificados.disabled = this.certsolvalor == 0 && this.certsolmontos == 0 && this.certusdvalor == 0 && this.certusdmontos == 0 ? true : false;

					const rowcts = new TableRow(
						new TableItem({data : 'CTS'}),
						new TableItem({data : {name : formatNumber(this.ctssolvalor, this.locale,'1.2-2'),
							tipo : "03", cuenta : this.ibmidservice.CuentaSoles },
							template: this.ctssolmontos == 0 && this.ctssolvalor == 0 ? this.inactiveItemTemplate : this.activeItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(this.ctsusdvalor, this.locale,'1.2-2'),
							tipo : "04", cuenta : this.ibmidservice.CuentaUsd},
							template: this.ctsusdmontos == 0 && this.ctsusdvalor == 0 ? this.inactiveItemTemplate : this.activeItemTemplate,
							className: "titem-right"})
					);
					rowcts.disabled = this.ctssolvalor == 0 && this.ctssolmontos == 0 && this.ctsusdvalor == 0 && this.ctsusdmontos == 0 ? true : false;
				
					this.dataCertificados = [
						rowcertificados, rowcts
					];

					this.modelCertificados.data = this.dataCertificados;
					this.skeletoncertificados = false;

				}, 1000);

			}

		}

	}

	openCertificadosDetalle(tipo : string, cuenta : string) {
		this.certificadosservice.Tipo = tipo;
		this.certificadosservice.Cuenta = cuenta;
		this.router.navigate(['socios/certificadosdetalle']);
	}
}
