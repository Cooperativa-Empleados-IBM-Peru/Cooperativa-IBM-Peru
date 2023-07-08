import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module'; 
import { FondosepelioComponent } from './fondosepelio/fondosepelio.component'; 
import { SeguroautosComponent } from './seguroautos/seguroautos.component'; 
import { TelefoniacelularComponent } from './telefoniacelular/telefoniacelular.component'; 
import { OncosaludComponent } from './oncosalud/oncosalud.component'; 


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
	declarations: [FondosepelioComponent, SeguroautosComponent, TelefoniacelularComponent, OncosaludComponent],
	imports: [
		CommonModule,
		ServiciosRoutingModule,
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
export class ServiciosModule { }
