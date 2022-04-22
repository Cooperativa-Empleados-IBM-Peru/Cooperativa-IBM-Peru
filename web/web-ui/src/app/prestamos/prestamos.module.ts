import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrestamosRoutingModule } from './prestamos-routing.module'; 
import { TasasinteresComponent } from './tasasinteres/tasasinteres.component'; 
import { SimuladorComponent } from './simulador/simulador.component'; 
import { SolofirmaComponent } from './solofirma/solofirma.component'; 
import { ConsumoComponent } from './consumo/consumo.component'; 
import { LargoplazoComponent } from './largoplazo/largoplazo.component'; 
import { HipotecarioComponent } from './hipotecario/hipotecario.component'; 
import { GarantiahipotecariaComponent } from './garantiahipotecaria/garantiahipotecaria.component'; 
import { AutomotrizComponent } from './automotriz/automotriz.component'; 
import { AcademicoComponent } from './academico/academico.component'; 
import { EscolarComponent } from './escolar/escolar.component'; 
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlModule } from 'ngx-owl-carousel';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
	NotificationModule,
	NotificationService,
	NotificationDisplayService,
	GridModule,
	ListModule
} from 'carbon-components-angular';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { CatalogModule, UserModule, TableOfContentsModule } from '@carbon/icons-angular';

@NgModule({
	declarations: [TasasinteresComponent, SimuladorComponent, SolofirmaComponent, ConsumoComponent,
	LargoplazoComponent, 
	HipotecarioComponent,
	GarantiahipotecariaComponent,
	AutomotrizComponent,
	AcademicoComponent,
	EscolarComponent],
	imports: [
		CommonModule,
		PrestamosRoutingModule,
		NotificationModule,
		GridModule,
		ListModule,
		CarouselModule,
		OwlModule,
		FlexLayoutModule,
		MatCardModule,
		MatButtonModule,
		MatGridListModule,
		CatalogModule,
		UserModule,
		ListModule,
		TableOfContentsModule
	],
	providers:[
		NotificationService,
		NotificationDisplayService
	]
})
export class PrestamosModule { }
