import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
	BreadcrumbModule,
	GridModule,
	TabsModule,
	LoadingModule,
	TableModule,
	LinkModule,
	NotificationModule,
	NotificationService,
	NotificationDisplayService,
	PaginationModule
} from 'carbon-components-angular';
//import '@carbon/charts/styles.css';
import { ChartsModule } from '@carbon/charts-angular';

import { SociosRoutingModule } from './socios-routing.module';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { AhorrosComponent } from './ahorros/ahorros.component';
import { PagosComponent } from './pagos/pagos.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { AhorrosdetalleComponent } from './ahorrosdetalle/ahorrosdetalle.component';
import { PrestamosoperacionComponent } from './prestamosoperacion/prestamosoperacion.component';
import { PrestamosdetalleComponent } from './prestamosdetalle/prestamosdetalle.component';
import { CertificadosdetalleComponent } from './certificadosdetalle/certificadosdetalle.component';
import { GarantizadosComponent } from './garantizados/garantizados.component';
import { AutomovilComponent } from './automovil/automovil.component';
@NgModule({
	declarations: [
		PrestamosComponent,
		AhorrosComponent,
		PagosComponent,
		CertificadosComponent,
		AhorrosdetalleComponent,
		PrestamosoperacionComponent,
		PrestamosdetalleComponent,
		CertificadosdetalleComponent,
		GarantizadosComponent,
		AutomovilComponent
	],
	imports: [
		CommonModule,
		SociosRoutingModule,
		BreadcrumbModule,
		GridModule,
		TabsModule,
		LoadingModule,
		TableModule,
		LinkModule,
		NotificationModule,
		ChartsModule,
		PaginationModule
	],
	providers: [
		NotificationService,
		NotificationDisplayService
	]
})
export class SociosModule { }
