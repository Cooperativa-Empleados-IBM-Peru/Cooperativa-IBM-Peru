import { Component, OnInit, Inject, LOCALE_ID, ViewChild, TemplateRef} from '@angular/core';
import { DecimalPipe,formatNumber } from '@angular/common';
import { Router } from '@angular/router';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { PrestamosService } from '../../services/prestamos.service';
//import { CuentasSaldos } from '../../classes/cuentassaldos';
import {
	Table,
	TableModel,
	TableItem,
	TableRow,
	TableHeaderItem
} from 'carbon-components-angular';


@Component({
	selector: 'app-prestamos',
	templateUrl: './prestamos.component.html',
	styleUrls: ['./prestamos.component.scss']
})
export class PrestamosComponent implements OnInit {

	dataPrestamo = [];
	modelPrestamo: TableModel;
	skeletonPrestamoModel = Table.skeletonModel(11, 3);
	skeletonprestamo = true;

//	cuentas : CuentasSaldos;
	solsaldopressolafirma = this.ibmidservice.SolSaldoPresSolaFirma == null ? 0 : this.ibmidservice.SolSaldoPresSolaFirma;
	usdsaldopressolafirma = this.ibmidservice.UsdSaldoPresSolaFirma == null ? 0 : this.ibmidservice.UsdSaldoPresSolaFirma;
	solsaldopresconsumo = this.ibmidservice.SolSaldoPresConsumo == null ? 0 : this.ibmidservice.SolSaldoPresConsumo;
	usdsaldopresconsumo = this.ibmidservice.UsdSaldoPresConsumo == null ? 0 : this.ibmidservice.UsdSaldoPresConsumo;
	solsaldoprescortoplazo = this.ibmidservice.SolSaldoPresCortoPlazo == null ? 0 : this.ibmidservice.SolSaldoPresCortoPlazo;
	usdsaldoprescortoplazo = this.ibmidservice.UsdSaldoPresCortoPlazo == null ? 0 : this.ibmidservice.UsdSaldoPresCortoPlazo;
	solsaldopresmedianoplazo = this.ibmidservice.SolSaldoPresMedianoPlazo == null ? 0 : this.ibmidservice.SolSaldoPresMedianoPlazo;
	usdsaldopresmedianoplazo = this.ibmidservice.UsdSaldoPresMedianoPlazo == null ? 0 : this.ibmidservice.UsdSaldoPresMedianoPlazo;
	solsaldopreslargoplazo = this.ibmidservice.SolSaldoPresLargoPlazo == null ? 0 : this.ibmidservice.SolSaldoPresLargoPlazo;
	usdsaldopreslargoplazo = this.ibmidservice.UsdSaldoPresLargoPlazo == null ? 0 : this.ibmidservice.UsdSaldoPresLargoPlazo;
	solsaldopreshipotecario = this.ibmidservice.SolSaldoPresHipotecario == null ? 0 : this.ibmidservice.SolSaldoPresHipotecario;
	usdsaldopreshipotecario = this.ibmidservice.UsdSaldoPresHipotecario == null ? 0 : this.ibmidservice.UsdSaldoPresHipotecario;
	solsaldopresauto = this.ibmidservice.SolSaldoPresAuto == null ? 0 : this.ibmidservice.SolSaldoPresAuto;
	usdsaldopresauto = this.ibmidservice.UsdSaldoPresAuto == null ? 0 : this.ibmidservice.UsdSaldoPresAuto;
	solsaldopresps1 = this.ibmidservice.SolSaldoPresPs1 == null ? 0 : this.ibmidservice.SolSaldoPresPs1;
	usdsaldopresps1 = this.ibmidservice.UsdSaldoPresPs1 == null ? 0 : this.ibmidservice.UsdSaldoPresPs1;
	solsaldopresesp1 = this.ibmidservice.SolSaldoPresEsp1 == null ? 0 : this.ibmidservice.SolSaldoPresEsp1;
	usdsaldopresesp1 = this.ibmidservice.UsdSaldoPresEsp1 == null ? 0 : this.ibmidservice.UsdSaldoPresEsp1;
	solsaldopresesp2 = this.ibmidservice.SolSaldoPresEsp2 == null ? 0 : this.ibmidservice.SolSaldoPresEsp2;
	usdsaldopresesp2 = this.ibmidservice.UsdSaldoPresEsp2 == null ? 0 : this.ibmidservice.UsdSaldoPresEsp2;

	notificationObject = {
		type: 'error',
		title: 'Notificación',
		message: 'Usted no cuenta con préstamos registrados',
		showClose: false,
		lowContrast: false
	};

	constructor(public ibmidservice : IbmidService,
		public db2service : Db2Service,
		private prestamosservice : PrestamosService,
		@Inject(LOCALE_ID) private locale: string,
		private router: Router
		) { }

	@ViewChild("activeItemTemplate")
	protected activeItemTemplate: TemplateRef<any>;

	@ViewChild("inactiveItemTemplate")
	protected inactiveItemTemplate: TemplateRef<any>;

	ngOnInit(): void {

		if (!this.ibmidservice.LoggedIn) {
			this.router.navigate(['/']);
		} else {

			this.modelPrestamo = new TableModel();
			this.modelPrestamo.header = [
				new TableHeaderItem({data: 'Préstamos'}),
				new TableHeaderItem({data: 'Soles'}),
				new TableHeaderItem({data: 'Dólares'}),
			];

			if (this.ibmidservice.Uuid) {

				setTimeout(() => {

					const rowsolafirma = new TableRow (
						new TableItem({data : 'A Sola firma'}),
						new TableItem({data : {name : formatNumber(this.solsaldopressolafirma, this.locale,'1.2-2'),
							tipo : "solafirma", moneda : "soles", monto : this.solsaldopressolafirma },
							template: this.solsaldopressolafirma != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(this.usdsaldopressolafirma, this.locale,'1.2-2'),
							tipo : "solafirma", moneda : "usd", monto : this.usdsaldopressolafirma},
							template: this.usdsaldopressolafirma != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"})
					);
					rowsolafirma.disabled = this.solsaldopressolafirma > 0 || this.usdsaldopressolafirma > 0 ? false : true;
					
					const rowconsumo = new TableRow(
						new TableItem({data : 'Consumo'}),
						new TableItem({data : {name : formatNumber(this.solsaldopresconsumo, this.locale,'1.2-2'),
							tipo : "consumo", moneda : "soles", monto : this.solsaldopresconsumo },
							template: this.solsaldopresconsumo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(this.usdsaldopresconsumo, this.locale,'1.2-2'),
							tipo : "consumo", moneda : "usd", monto : this.usdsaldopresconsumo},
							template: this.usdsaldopresconsumo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"})
					);
					rowconsumo.disabled = this.solsaldopresconsumo > 0 || this.usdsaldopresconsumo > 0 ? false : true;

					const rowcortoplazo = new TableRow(
						new TableItem({data : 'Corto Plazo'}),
						new TableItem({data : {name : formatNumber(this.solsaldoprescortoplazo, this.locale,'1.2-2'),
							tipo : "cortop", moneda : "soles", monto : this.solsaldoprescortoplazo },
							template: this.solsaldoprescortoplazo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(this.usdsaldoprescortoplazo, this.locale,'1.2-2'),
							tipo : "cortop", moneda : "usd", monto : this.usdsaldoprescortoplazo},
							template: this.usdsaldoprescortoplazo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"})
					);
					rowcortoplazo.disabled = this.solsaldoprescortoplazo > 0 || this.usdsaldoprescortoplazo > 0 ? false : true;
					
					const rowmedplazo = new TableRow(
						new TableItem({data : 'Mediano Plazo'}),
						new TableItem({data : {name : formatNumber(this.solsaldopresmedianoplazo, this.locale,'1.2-2'),
							tipo : "medianop", moneda : "soles", monto : this.solsaldopresmedianoplazo },
							template: this.solsaldopresmedianoplazo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(this.usdsaldopresmedianoplazo, this.locale,'1.2-2'),
							tipo : "medianop", moneda : "usd", monto : this.usdsaldopresmedianoplazo},
							template: this.usdsaldopresmedianoplazo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"})
					);
					rowmedplazo.disabled = this.solsaldopresmedianoplazo > 0 || this.usdsaldopresmedianoplazo > 0 ? false : true;
					
					const rowlargoplazo = new TableRow(
						new TableItem({data : 'Largo Plazo'}),
						new TableItem({data : {name : formatNumber(this.solsaldopreslargoplazo, this.locale,'1.2-2'),
							tipo : "largop", moneda : "soles", monto : this.solsaldopreslargoplazo },
							template: this.solsaldopreslargoplazo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(this.usdsaldopreslargoplazo, this.locale,'1.2-2'),
							tipo : "largop", moneda : "usd", monto : this.usdsaldopreslargoplazo},
							template: this.usdsaldopreslargoplazo != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"})
					);
					rowlargoplazo.disabled = this.solsaldopreslargoplazo > 0 || this.usdsaldopreslargoplazo > 0 ? false : true;
					
					const rowhipotecario = new TableRow(
						new TableItem({data : 'Hipotecario'}),
						new TableItem({data : {name : formatNumber(this.solsaldopreshipotecario, this.locale,'1.2-2'),
							tipo : "hipotecario", moneda : "soles", monto : this.solsaldopreshipotecario },
							template: this.solsaldopreshipotecario != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(this.usdsaldopreshipotecario, this.locale,'1.2-2'),
							tipo : "hipotecario", moneda : "usd", monto : this.usdsaldopreshipotecario},
							template: this.usdsaldopreshipotecario != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"})
					);
					rowhipotecario.disabled = this.solsaldopreshipotecario > 0 || this.usdsaldopreshipotecario > 0 ? false : true;
					
					const rowauto = new TableRow(
						new TableItem({data : 'Automóvil'}),
						new TableItem({data : {name : formatNumber(this.solsaldopresauto, this.locale,'1.2-2'),
							tipo : "auto", moneda : "soles", monto : this.solsaldopresauto },
							template: this.solsaldopresauto != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(this.usdsaldopresauto, this.locale,'1.2-2'),
							tipo : "auto", moneda : "usd", monto : this.usdsaldopresauto},
							template: this.usdsaldopresauto != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"})
					);
					rowauto.disabled = this.solsaldopresauto > 0 || this.usdsaldopresauto > 0 ? false : true;
					
					const rowps = new TableRow(
						new TableItem({data : 'PS'}),
						new TableItem({data : {name : formatNumber(this.solsaldopresps1, this.locale,'1.2-2'),
							tipo : "ps", moneda : "soles", monto : this.solsaldopresps1 },
							template: this.solsaldopresps1 != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(this.usdsaldopresps1, this.locale,'1.2-2'),
							tipo : "ps", moneda : "usd", monto : this.usdsaldopresps1},
							template: this.usdsaldopresps1 != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"})
					);
					rowps.disabled = this.solsaldopresps1 > 0 || this.usdsaldopresps1 > 0 ? false : true;

					const rowesp1 = new TableRow(
						new TableItem({data : 'Especial 1'}),
						new TableItem({data : {name : formatNumber(this.solsaldopresesp1, this.locale,'1.2-2'),
							tipo : "esp1", moneda : "soles", monto : this.solsaldopresesp1 },
							template: this.solsaldopresesp1 != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(this.usdsaldopresesp1, this.locale,'1.2-2'),
							tipo : "esp1", moneda : "usd", monto : this.usdsaldopresesp1},
							template: this.usdsaldopresesp1 != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"})
					);
					rowesp1.disabled = this.solsaldopresesp1 > 0 || this.usdsaldopresesp1 > 0 ? false : true;
					
					const rowesp2 = new TableRow(
						new TableItem({data : 'Especial 2'}),
						new TableItem({data : {name : formatNumber(this.solsaldopresesp2, this.locale,'1.2-2'),
							tipo : "esp2", moneda : "soles", monto : this.solsaldopresesp2 },
							template: this.solsaldopresesp2 != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"}),
						new TableItem({data : {name : formatNumber(this.usdsaldopresesp2, this.locale,'1.2-2'),
							tipo : "esp2", moneda : "usd", monto : this.usdsaldopresesp2},
							template: this.usdsaldopresesp2 != 0 ? this.activeItemTemplate : this.inactiveItemTemplate,
							className: "titem-right"})
					);
					rowesp2.disabled = this.solsaldopresesp2 > 0 || this.usdsaldopresesp2 > 0 ? false : true;

					this.dataPrestamo = [
						rowsolafirma, rowconsumo, rowcortoplazo, rowmedplazo, rowlargoplazo, rowhipotecario, rowauto,
						rowps, rowesp1, rowesp2
					];
					this.modelPrestamo.data = this.dataPrestamo;
					this.skeletonprestamo = false;

				}, 1000);

			}
		}
	}

	openPrestamoOperacion(tipo : string, moneda : string, monto : number) {
		this.prestamosservice.Tipo = tipo;
		this.prestamosservice.Moneda = moneda;
		this.prestamosservice.Monto = monto;
		this.router.navigate(['socios/prestamosoperacion']);
	}

}
