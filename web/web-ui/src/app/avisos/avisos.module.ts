import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvisosRoutingModule } from './avisos-routing.module';
import { InternosComponent } from './internos/internos.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { NoticiasComponent } from './noticias/noticias.component';
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
import { ProveedoresdetalleComponent } from './proveedoresdetalle/proveedoresdetalle.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { CatalogModule, UserModule, TableOfContentsModule } from '@carbon/icons-angular';

@NgModule({
	declarations: [InternosComponent, ProveedoresComponent, NoticiasComponent, ProveedoresdetalleComponent],
	imports: [
		CommonModule,
		AvisosRoutingModule,
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
export class AvisosModule { }
