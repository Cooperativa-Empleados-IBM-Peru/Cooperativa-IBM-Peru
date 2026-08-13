import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerramientasRoutingModule } from './herramientas-routing.module';

import { CalcpagosComponent } from './calcpagos/calcpagos.component';
import { CalccertificadosComponent } from './calccertificados/calccertificados.component';
import { ReglamentocreditoComponent } from './reglamentocredito/reglamentocredito.component';
import { TasasinteresComponent } from './tasasinteres/tasasinteres.component';

import {
	GridModule,
	LoadingModule,
	ModalModule,
	ButtonModule,
	InputModule,
	ComboBoxModule,
	ModalService,
	PlaceholderModule,
	PlaceholderService,
	TableModule
} from 'carbon-components-angular';
import { DownloadModule } from '@carbon/icons-angular';

@NgModule({
  declarations: [CalcpagosComponent, CalccertificadosComponent, ReglamentocreditoComponent, TasasinteresComponent],
  imports: [
    CommonModule,
    HerramientasRoutingModule,
    GridModule,
    InputModule,
    ButtonModule,
    ComboBoxModule,
    TableModule,
    DownloadModule
  ]
})
export class HerramientasModule { }
