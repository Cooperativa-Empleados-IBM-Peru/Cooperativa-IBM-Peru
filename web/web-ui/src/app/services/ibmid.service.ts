import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { env } from '../../environments/env';
@Injectable({
	providedIn: 'root'
})
export class IbmidService {

private token: string;
private loggedin: boolean;

private activo: boolean;
private certsolmontos: number;
private certsolvalor: number;
private certusdmontos: number;
private certusdvalor: number;
private codempleado: string;
private codpais: string;
private company: string;
private ctasoles: string;
private ctausd: string;
private ctssolmontos: number;
private ctssolvalor: number;
private ctsusdmontos: number;
private ctsusdvalor: number;
private direccionempleado: string;
private emailempleado: string;
private inbluepages: boolean;
private intahorromessol: number;
private intahorromesusd: number;
private intmiscelaneomessol: number;
private intmiscelaneomesusd: number;
private isadmin: boolean;
private nombreempleado: string;
private saldoaportacionsol: number;
private saldoaportacionusd: number;
private saldobloqueoahorrosol: number;
private saldobloqueoahorrousd: number;
private saldocontablesol: number;
private saldocontableusd: number;
private saldodispahorrosol: number;
private saldodispahorrousd: number;
private saldomiscelaneosol: number;
private saldomiscelaneousd: number;
private solsaldopresauto: number;
private solsaldopresconsumo: number;
private solsaldoprescortoplazo: number;
private solsaldopresesp1: number;
private solsaldopresesp2: number;
private solsaldopreshipotecario: number;
private solsaldopreslargoplazo: number;
private solsaldopresmedianoplazo: number;
private solsaldopresps1: number;
private solsaldopressolafirma: number;
private usdsaldopresauto: number;
private usdsaldopresconsumo: number;
private usdsaldoprescortoplazo: number;
private usdsaldopresesp1: number;
private usdsaldopresesp2: number;
private usdsaldopreshipotecario: number;
private usdsaldopreslargoplazo: number;
private usdsaldopresmedianoplazo: number;
private usdsaldopresps1: number;
private usdsaldopressolafirma: number;
private uuid: string;

private isFetchSource = new BehaviorSubject<boolean>(false);
public isFetch = this.isFetchSource.asObservable();

constructor(private http: HttpClient) {
	this.loggedin = false;
	this.emailempleado = '';
	this.codempleado = '';
	this.isadmin = false;
	this.uuid  = '';

	const subscribeToken = this.requestToken().subscribe((response: any) => {
		if ( response.token ) {
			this.token = response.token;
			this.emailempleado = response.email;
			this.uuid = response.uuid;
			this.isFetchSource.next(true);
			subscribeToken.unsubscribe();
		}
	});
}

/* requestEmail(): Observable<{}> {
	return this.http.get(`/api/token`, this.httpOptions())
.pipe(catchError(this.handleError));
} */

requestToken(): Observable<{}> {
	return this.http.get(`/api/token`, this.httpOptions())
.pipe(catchError(this.handleError));
}

public setToken(token: string): void {
	this.token = token;
}

public getToken(): string {
return this.token;
}

get LoggedIn(): boolean {
	return this.loggedin;
}
set LoggedIn(val: boolean) {
	this.loggedin = val;
}

get Activo(): boolean {
	return this.activo;
}
set Activo(val: boolean) {
	this.activo = val;
}

get CertSolMontos(): number {
	return this.certsolmontos;
}
set CertSolMontos(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.certsolmontos = tmp;
}

get CertSolValor(): number {
	return this.certsolvalor;
}
set CertSolValor(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.certsolvalor = tmp;
}

get CertUsdMontos(): number {
	return this.certusdmontos;
}
set CertUsdMontos(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.certusdmontos = tmp;
}

get CertUsdValor(): number {
	return this.certusdvalor;
}
set CertUsdValor(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.certusdvalor = tmp;
}

get CodEmpleado(): string {
	return this.codempleado;
}
set CodEmpleado(val: string) {
	this.codempleado = val;
}

get CodPais(): string {
	return this.codpais;
}
set CodPais(val: string) {
	this.codpais = val;
}

get Company(): string {
	return this.company;
}
set Company(val: string) {
	this.company = val;
}

get CuentaSoles(): string {
	return this.ctasoles;
}
set CuentaSoles(val: string) {
	this.ctasoles = val;
}

get CuentaUsd(): string {
	return this.ctausd;
}
set CuentaUsd(val: string) {
	this.ctausd = val;
}

get CtsSolMontos(): number {
	return this.ctssolmontos;
}
set CtsSolMontos(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.ctssolmontos = tmp;
}

get CtsSolValor(): number {
	return this.ctssolvalor;
}
set CtsSolValor(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.ctssolvalor = tmp;
}

get CtsUsdMontos(): number {
	return this.ctsusdmontos;
}
set CtsUsdMontos(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.ctsusdmontos = tmp;
}

get CtsUsdValor(): number {
	return this.ctsusdvalor;
}
set CtsUsdValor(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.ctsusdvalor = tmp;
}

get DireccionEmpleado(): string {
	return this.direccionempleado;
}
set DireccionEmpleado(val: string) {
	this.direccionempleado = val;
}

get EmailEmpleado(): string {
	return this.emailempleado;
}
set EmailEmpleado(val: string) {
	this.emailempleado = val;
}

get InBluePages(): boolean {
	return this.inbluepages;
}
set InBluePages(val: boolean) {
	this.inbluepages = val;
}

get IntAhorroMesSol(): number {
	return this.intahorromessol;
}
set IntAhorroMesSol(val: number) {
	this.intahorromessol = val;
}

get IntAhorroMesUsd(): number {
	return this.intahorromesusd;
}
set IntAhorroMesUsd(val: number) {
	this.intahorromesusd = val;
}

get IntMiscelaneoMesSol(): number {
	return this.intmiscelaneomessol;
}
set IntMiscelaneoMesSol(val: number) {
	this.intmiscelaneomessol = val;
}

get IntMiscelaneoMesUsd(): number {
	return this.intmiscelaneomesusd;
}
set IntMiscelaneoMesUsd(val: number) {
	this.intmiscelaneomesusd = val;
}

get IsAdmin(): boolean {
	return this.isadmin;
}
set IsAdmin(val: boolean) {
	this.isadmin = val;
}

get NombreEmpleado(): string {
	return this.nombreempleado;
}
set NombreEmpleado(val: string) {
	this.nombreempleado = val;
}

get SaldoAportacionSol(): number {
	return this.saldoaportacionsol;
}
set SaldoAportacionSol(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.saldoaportacionsol = tmp;
}

get SaldoAportacionUsd(): number {
	return this.saldoaportacionusd;
}
set SaldoAportacionUsd(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.saldoaportacionusd = tmp;
}

get SaldoBloqueoAhorroSol(): number {
	return this.saldobloqueoahorrosol;
}
set SaldoBloqueoAhorroSol(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.saldobloqueoahorrosol = tmp;
}

get SaldoBloqueoAhorroUsd(): number {
	return this.saldobloqueoahorrousd;
}
set SaldoBloqueoAhorroUsd(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.saldobloqueoahorrousd = tmp;
}

get SaldoContableSol(): number {
	return this.saldocontablesol;
}
set SaldoContableSol(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.saldocontablesol = tmp;
}

get SaldoContableUsd(): number {
	return this.saldocontableusd;
}
set SaldoContableUsd(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.saldocontableusd = tmp;
}

get SaldoDispAhorroSol(): number {
	return this.saldodispahorrosol;
}
set SaldoDispAhorroSol(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.saldodispahorrosol = tmp;
}

get SaldoDispAhorroUsd(): number {
	return this.saldodispahorrousd;
}
set SaldoDispAhorroUsd(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.saldodispahorrousd = tmp;
}

get SaldoMiscelaneoSol(): number {
	return this.saldomiscelaneosol;
}
set SaldoMiscelaneoSol(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.saldomiscelaneosol = tmp;
}

get SaldoMiscelaneoUsd(): number {
	return this.saldomiscelaneousd;
}
set SaldoMiscelaneoUsd(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.saldomiscelaneousd = tmp;
}

get SolSaldoPresAuto(): number {
	return this.solsaldopresauto;
}
set SolSaldoPresAuto(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.solsaldopresauto = tmp;
}

get SolSaldoPresConsumo(): number {
	return this.solsaldopresconsumo;
}
set SolSaldoPresConsumo(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.solsaldopresconsumo = tmp;
}

get SolSaldoPresCortoPlazo(): number {
	return this.solsaldoprescortoplazo;
}
set SolSaldoPresCortoPlazo(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.solsaldoprescortoplazo = tmp;
}

get SolSaldoPresEsp1(): number {
	return this.solsaldopresesp1;
}
set SolSaldoPresEsp1(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.solsaldopresesp1 = tmp;
}

get SolSaldoPresEsp2(): number {
	return this.solsaldopresesp2;
}
set SolSaldoPresEsp2(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.solsaldopresesp2 = tmp;
}

get SolSaldoPresHipotecario(): number {
	return this.solsaldopreshipotecario;
}
set SolSaldoPresHipotecario(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.solsaldopreshipotecario = tmp;
}

get SolSaldoPresLargoPlazo(): number {
	return this.solsaldopreslargoplazo;
}
set SolSaldoPresLargoPlazo(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.solsaldopreslargoplazo = tmp;
}

get SolSaldoPresMedianoPlazo(): number {
	return this.solsaldopresmedianoplazo;
}
set SolSaldoPresMedianoPlazo(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.solsaldopresmedianoplazo = tmp;
}

get SolSaldoPresPs1(): number {
	return this.solsaldopresps1;
}
set SolSaldoPresPs1(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.solsaldopresps1 = tmp;
}

get SolSaldoPresSolaFirma(): number {
	return this.solsaldopressolafirma;
}
set SolSaldoPresSolaFirma(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.solsaldopressolafirma = tmp;
}

get UsdSaldoPresAuto(): number {
	return this.usdsaldopresauto;
}
set UsdSaldoPresAuto(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.usdsaldopresauto = tmp;
}

get UsdSaldoPresConsumo(): number {
	return this.usdsaldopresconsumo;
}
set UsdSaldoPresConsumo(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.usdsaldopresconsumo = tmp;
}

get UsdSaldoPresCortoPlazo(): number {
	return this.usdsaldoprescortoplazo;
}
set UsdSaldoPresCortoPlazo(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.usdsaldoprescortoplazo = tmp;
}

get UsdSaldoPresEsp1(): number {
	return this.usdsaldopresesp1;
}
set UsdSaldoPresEsp1(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.usdsaldopresesp1 = tmp;
}

get UsdSaldoPresEsp2(): number {
	return this.usdsaldopresesp2;
}
set UsdSaldoPresEsp2(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.usdsaldopresesp2 = tmp;
}

get UsdSaldoPresHipotecario(): number {
	return this.usdsaldopreshipotecario;
}
set UsdSaldoPresHipotecario(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.usdsaldopreshipotecario = tmp;
}

get UsdSaldoPresLargoPlazo(): number {
	return this.usdsaldopreslargoplazo;
}
set UsdSaldoPresLargoPlazo(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.usdsaldopreslargoplazo = tmp;
}

get UsdSaldoPresMedianoPlazo(): number {
	return this.usdsaldopresmedianoplazo;
}
set UsdSaldoPresMedianoPlazo(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.usdsaldopresmedianoplazo = tmp;
}

get UsdSaldoPresPs1(): number {
	return this.usdsaldopresps1;
}
set UsdSaldoPresPs1(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.usdsaldopresps1 = tmp;
}

get UsdSaldoPresSolaFirma(): number {
	return this.usdsaldopressolafirma;
}
set UsdSaldoPresSolaFirma(val: number) {
	const tmp = Math.round(val * 100) / 100;
	this.usdsaldopressolafirma = tmp;
}

get Uuid(): string {
	return this.uuid;
}
set Uuid(val: string) {
	this.uuid = val;
}


public httpSecureOptions(headers: any = {}): any {
	const token = this.getToken();
	return new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		});
}

public handleError(error: HttpErrorResponse): any {
	return throwError('Something bad happened; please try again later.');
}

private httpOptions(): any {
	return {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};
}

}
