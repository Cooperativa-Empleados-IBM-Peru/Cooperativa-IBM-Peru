import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IbmidService } from './services/ibmid.service';
import { Db2Service } from './services/db2.service';
import { MasterLookup } from './classes/masterlookup';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
	title = 'coopeibm-web';

	masterlkup : MasterLookup;

	sidemenuactive = false;
	hasHamburger = true;
	public isToken = false;
	
	constructor(
		private ibmidservice: IbmidService, 
		public db2service: Db2Service,
		private router: Router) {
	}

	ngOnInit(): void {
		this.ibmidservice.isFetch.subscribe((isFetch: boolean) => {
			if( isFetch ) {
				this.isToken = true;

				if ( this.ibmidservice.Uuid == "") {
					setTimeout(() => {
						window.location.href = '/logout';
					}, 1000);

				} else {

				this.db2service.getMasterLookupbyId(this.ibmidservice.Uuid).subscribe(
					(resp: any) => {
						if (resp) {
							console.log("masterlookup data retrieved");
							this.masterlkup = resp;

							this.ibmidservice.Activo = this.masterlkup.activo;
							if ( this.ibmidservice.Activo ) {
								this.ibmidservice.LoggedIn = true;
							}
	
							this.ibmidservice.CertSolMontos = this.masterlkup.certsolmontos;
							this.ibmidservice.CertSolValor = this.masterlkup.certsolvalor;
							this.ibmidservice.CertUsdMontos = this.masterlkup.certusdmontos;
							this.ibmidservice.CertUsdValor = this.masterlkup.certusdvalor;
							this.ibmidservice.CodEmpleado = this.masterlkup.codempleado;
							this.ibmidservice.CodPais = this.masterlkup.codpais;
							this.ibmidservice.Company = this.masterlkup.company;
							this.ibmidservice.CuentaSoles = this.masterlkup.ctasoles;
							this.ibmidservice.CuentaUsd = this.masterlkup.ctausd;
							this.ibmidservice.CtsSolMontos = this.masterlkup.ctssolmontos;
							this.ibmidservice.CtsSolValor = this.masterlkup.ctssolvalor;
							this.ibmidservice.CtsUsdMontos = this.masterlkup.ctsusdmontos;
							this.ibmidservice.CtsUsdValor = this.masterlkup.ctsusdvalor;
							this.ibmidservice.DireccionEmpleado = this.masterlkup.direccionempleado;
							this.ibmidservice.EmailEmpleado = this.masterlkup.emailempleado;
							this.ibmidservice.InBluePages = this.masterlkup.inbluepages;
							this.ibmidservice.IntAhorroMesSol = this.masterlkup.intahorromessol;
							this.ibmidservice.IntAhorroMesUsd = this.masterlkup.intahorromesusd;
							this.ibmidservice.IntMiscelaneoMesSol = this.masterlkup.intmiscelaneomessol;
							this.ibmidservice.IntMiscelaneoMesUsd = this.masterlkup.intmiscelaneomesusd;
							this.ibmidservice.IsAdmin = this.masterlkup.isadmin;
							this.ibmidservice.NombreEmpleado = this.masterlkup.nombreempleado;
							this.ibmidservice.SaldoAportacionSol = this.masterlkup.saldoaportacionsol;
							this.ibmidservice.SaldoAportacionUsd = this.masterlkup.saldoaportacionusd;
							this.ibmidservice.SaldoBloqueoAhorroSol = this.masterlkup.saldobloqueoahorrosol;
							this.ibmidservice.SaldoBloqueoAhorroUsd = this.masterlkup.saldobloqueoahorrousd;
							this.ibmidservice.SaldoContableSol = this.masterlkup.saldocontablesol;
							this.ibmidservice.SaldoContableUsd = this.masterlkup.saldocontableusd;
							this.ibmidservice.SaldoDispAhorroSol = this.masterlkup.saldodispahorrosol;
							this.ibmidservice.SaldoDispAhorroUsd = this.masterlkup.saldodispahorrousd;
							this.ibmidservice.SaldoMiscelaneoSol = this.masterlkup.saldomiscelaneosol;
							this.ibmidservice.SaldoMiscelaneoUsd = this.masterlkup.saldomiscelaneousd;
							this.ibmidservice.SolSaldoPresAuto = this.masterlkup.solsaldopresauto;
							this.ibmidservice.SolSaldoPresConsumo = this.masterlkup.solsaldopresconsumo;
							this.ibmidservice.SolSaldoPresCortoPlazo = this.masterlkup.solsaldoprescortoplazo;
							this.ibmidservice.SolSaldoPresEsp1 = this.masterlkup.solsaldopresesp1;
							this.ibmidservice.SolSaldoPresEsp2 = this.masterlkup.solsaldopresesp2;
							this.ibmidservice.SolSaldoPresHipotecario = this.masterlkup.solsaldopreshipotecario;
							this.ibmidservice.SolSaldoPresLargoPlazo = this.masterlkup.solsaldopreslargoplazo;
							this.ibmidservice.SolSaldoPresMedianoPlazo = this.masterlkup.solsaldopresmedianoplazo;
							this.ibmidservice.SolSaldoPresPs1 = this.masterlkup.solsaldopresps1;
							this.ibmidservice.SolSaldoPresSolaFirma = this.masterlkup.solsaldopressolafirma;
							this.ibmidservice.UsdSaldoPresAuto = this.masterlkup.usdsaldopresauto;
							this.ibmidservice.UsdSaldoPresConsumo = this.masterlkup.usdsaldopresconsumo;
							this.ibmidservice.UsdSaldoPresCortoPlazo = this.masterlkup.usdsaldoprescortoplazo;
							this.ibmidservice.UsdSaldoPresEsp1 = this.masterlkup.usdsaldopresesp1;
							this.ibmidservice.UsdSaldoPresEsp2 = this.masterlkup.usdsaldopresesp2;
							this.ibmidservice.UsdSaldoPresHipotecario = this.masterlkup.usdsaldopreshipotecario;
							this.ibmidservice.UsdSaldoPresLargoPlazo = this.masterlkup.usdsaldopreslargoplazo;
							this.ibmidservice.UsdSaldoPresMedianoPlazo = this.masterlkup.usdsaldopresmedianoplazo;
							this.ibmidservice.UsdSaldoPresPs1 = this.masterlkup.usdsaldopresps1;
							this.ibmidservice.UsdSaldoPresSolaFirma = this.masterlkup.usdsaldopressolafirma;
//							this.ibmidservice.Uuid = this.masterlkup.uuid;

							console.log("masterlookup data loaded");
					}
				});

			}  // if ( this.ibmidservice.Uuid == "") {

			} //  if( isFetch ) {

		});
	}

	redirectTo(uri: string) {
		this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
		this.router.navigate([uri]));
	}

}
