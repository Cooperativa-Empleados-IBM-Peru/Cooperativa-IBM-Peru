import { Component, OnInit, ViewChild, TemplateRef, Inject, LOCALE_ID } from '@angular/core';
import { DecimalPipe, formatNumber } from '@angular/common';
import { Router } from '@angular/router';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { AhorrosService } from '../../services/ahorros.service';
//import { CuentasDetalleAhorro } from '../../classes/cuentasdetalleahorro';
import {
	Table,
	TableModel,
	TableItem,
	TableHeaderItem,
	Link,
	NotificationService,
	NotificationDisplayService,
	TableRow
} from 'carbon-components-angular';

@Component({
	selector: 'app-ahorros',
	templateUrl: './ahorros.component.html',
	styleUrls: ['./ahorros.component.scss']
})
export class AhorrosComponent implements OnInit {

	dataAhorro = [];
	modelAhorro: TableModel;
	skeletonAhorroModel = Table.skeletonModel(6, 3);
	skeletonahorro = true;

	dataMisc = [];
	modelMisc: TableModel;
	skeletonMiscModel = Table.skeletonModel(2, 3);
	skeletonmisc = true;

	// cuentas: CuentasDetalleAhorro;

	notificationObject = {
		type: 'error',
		title: 'Notificación',
		message: 'Usted no cuenta con ahorros registrados',
		showClose: false,
		lowContrast: false
	};

	constructor(public ibmidservice : IbmidService,
				public db2service : Db2Service,
				private ahorrosservice : AhorrosService,
				private router: Router,
				protected notificationService: NotificationService,
    			protected notificationDisplayService: NotificationDisplayService,
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

			this.modelAhorro = new TableModel();
			this.modelAhorro.header = [
				new TableHeaderItem({data: 'Cuentas de ahorro'}),
				new TableHeaderItem({data: 'Soles'}),
				new TableHeaderItem({data: 'Dólares'}),
			];

			this.modelMisc = new TableModel();
			this.modelMisc.header = [
				new TableHeaderItem({data: 'Misceláneo'}),
				new TableHeaderItem({data: 'Soles'}),
				new TableHeaderItem({data: 'Dólares'}),
			];

			if(this.ibmidservice.Uuid) {

				const saldocontsol = this.ibmidservice.SaldoContableSol;
				const saldocontusd = this.ibmidservice.SaldoContableUsd;
				const saldodispahorrosol = this.ibmidservice.SaldoDispAhorroSol;
				const saldodispahorrousd = this.ibmidservice.SaldoDispAhorroUsd;
				const saldobloqueoahorrosol = this.ibmidservice.SaldoBloqueoAhorroSol;
				const saldobloqueoahorrousd = this.ibmidservice.SaldoBloqueoAhorroUsd;
				const intahorromessol = this.ibmidservice.IntAhorroMesSol;
				const intahorromesusd = this.ibmidservice.IntAhorroMesUsd;
				const saldoaportacionsol = this.ibmidservice.SaldoAportacionSol;
				const saldoaportacionusd = this.ibmidservice.SaldoAportacionUsd;
				const saldomiscelaneosol = this.ibmidservice.SaldoMiscelaneoSol;
				const saldomiscelaneousd = this.ibmidservice.SaldoMiscelaneoUsd;
				const intmiscelaneomessol = this.ibmidservice.IntMiscelaneoMesSol;
				const intmiscelaneomesusd = this.ibmidservice.IntMiscelaneoMesUsd;

				setTimeout(() => {

					const rowcontable = new TableRow(
						new TableItem({data: "Contable"}), 
						new TableItem({data : {name : formatNumber(saldocontsol, this.locale,'1.2-2'),
							tipo : "contable", moneda : "soles", monto : saldocontsol },
							template: saldocontsol != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(saldocontusd, this.locale,'1.2-2'),
							tipo : "contable", moneda : "usd", monto : saldocontusd},
							template: saldocontusd != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"})
					);
	
					const rowdisponible = new TableRow(
						new TableItem({data: "Disponible"}), 
						new TableItem({data : formatNumber(saldodispahorrosol, this.locale,'1.2-2'), className: "titem-right"}),
						new TableItem({data : formatNumber(saldodispahorrousd, this.locale,'1.2-2'), className: "titem-right"})
					);
	
					const rowbloqueado = new TableRow(
						new TableItem({data: "Bloqueado"}), 
						new TableItem({data : {name : formatNumber(saldobloqueoahorrosol, this.locale, '1.2-2'),
							tipo : "bloqueado", moneda : "soles", monto : saldobloqueoahorrosol},
							template: saldobloqueoahorrosol != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"}),
						   new TableItem({data : {name : formatNumber(saldobloqueoahorrousd, this.locale,'1.2-2'),
							tipo : "bloqueado", moneda : "usd", monto : saldobloqueoahorrousd},
							template: saldobloqueoahorrousd != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							classname: "titem-right"})
						);
	
					const rowintereses = new TableRow(
							new TableItem({data: "Intereses por Pagar"}), 
							new TableItem({data : formatNumber(intahorromessol, this.locale,'1.2-2'), className: "titem-right"}),
							new TableItem({data : formatNumber(intahorromesusd, this.locale,'1.2-2'), className: "titem-right"})
					);
		
					const rowaportaciones = new TableRow(
						new TableItem({data: "Aportaciones"}), 
						new TableItem({data : {name : formatNumber(saldoaportacionsol, this.locale,'1.2-2'),
							tipo : "aportaciones", moneda : "soles", monto : saldoaportacionsol},
							template: saldoaportacionsol != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(saldoaportacionusd, this.locale,'1.2-2'),
							tipo : "aportaciones", moneda : "usd", monto : saldoaportacionusd},
							template: saldoaportacionusd != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"})
					);
	
					const rowmiscelaneo = new TableRow(
						new TableItem({data: "Intereses por PagarMisceláneo"}), 
						new TableItem({data : {name : formatNumber(saldomiscelaneosol, this.locale, '1.2-2'),
							tipo : "miscelaneo", moneda: "soles", monto : saldomiscelaneosol},
							template: saldomiscelaneosol != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(saldomiscelaneousd, this.locale,'1.2-2'),
							tipo : "miscelaneo", moneda : "usd", monto : saldomiscelaneousd },
							template: saldomiscelaneousd != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"})
						);
	
					const rowinteresmisc = new TableRow(
						new TableItem({data: "Intereses por Pagar"}), 
						new TableItem({data : formatNumber(intmiscelaneomessol, this.locale,'1.2-2'), className: "titem-right"}),
						new TableItem({data : formatNumber(intmiscelaneomesusd, this.locale,'1.2-2'), className: "titem-right"})
					);
	
	
					this.dataAhorro = [
						rowcontable, rowdisponible, rowbloqueado, rowintereses, rowaportaciones
					];
	
					this.modelAhorro.data = this.dataAhorro;
					this.skeletonahorro = false;
	
					this.dataMisc = [
						rowmiscelaneo, rowinteresmisc
					];
	
					this.modelMisc.data = this.dataMisc;
					this.skeletonmisc = false;

				}, 1000);

			}
		}

	}

	openAhorroDetalle(tipo : string, moneda : string, monto : number) {
		this.ahorrosservice.Tipo = tipo;
		this.ahorrosservice.Moneda = moneda;
		this.ahorrosservice.Monto = monto;
		this.router.navigate(['socios/ahorrosdetalle']);
	}

	closeNotificationBanner() {
		this.notificationService.close(this.notificationObject);
   		// this.notificationService.onClose.closed=true;
		this.notificationDisplayService.close(this.notificationObject);
	}
}
