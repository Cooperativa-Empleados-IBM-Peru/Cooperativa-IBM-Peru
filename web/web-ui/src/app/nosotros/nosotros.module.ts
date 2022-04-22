import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NosotrosRoutingModule } from './nosotros-routing.module'; 
import { HistoriaComponent } from './historia/historia.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component'; 
import { DirectivaComponent } from './directiva/directiva.component'; 
import { EstadosfinancierosComponent } from './estadosfinancieros/estadosfinancieros.component'; 
import { MemoriasComponent } from './memorias/memorias.component'; 
import { EstatutoComponent } from './estatuto/estatuto.component'; 
import { ReglamentosComponent } from './reglamentos/reglamentos.component'; 
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
	declarations: [HistoriaComponent, FuncionariosComponent, DirectivaComponent,EstadosfinancierosComponent, MemoriasComponent, EstatutoComponent, ReglamentosComponent],
	imports: [
		CommonModule,
		NosotrosRoutingModule,
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
export class NosotrosModule { }
