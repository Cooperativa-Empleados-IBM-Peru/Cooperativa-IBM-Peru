import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module'; 
import { TecnologiahogarComponent } from './tecnologiahogar/tecnologiahogar.component'; 
import { ProductoshogarComponent } from './productoshogar/productoshogar.component';
import { PasteleriaComponent } from './pasteleria/pasteleria.component';
import { VinosComponent } from './vinos/vinos.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { MenajeComponent } from './menaje/menaje.component';
import { BellezaComponent } from './belleza/belleza.component';
import { ViajesComponent } from './viajes/viajes.component';
import { GimnasiosComponent } from './gimnasios/gimnasios.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { AutomotrizComponent } from './automotriz/automotriz.component';

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
	declarations: [TecnologiahogarComponent, ProductoshogarComponent, PasteleriaComponent, 
		VinosComponent, MascotasComponent, MenajeComponent, BellezaComponent,
		ViajesComponent,GimnasiosComponent, RestaurantesComponent, AutomotrizComponent],
	imports: [
		CommonModule,
		ProveedoresRoutingModule,
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
export class ProveedoresModule { }
