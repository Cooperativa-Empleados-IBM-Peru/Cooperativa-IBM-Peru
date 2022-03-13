import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalcpagosComponent } from './calcpagos/calcpagos.component';
import { CalccertificadosComponent } from './calccertificados/calccertificados.component';
import { ReglamentocreditoComponent } from './reglamentocredito/reglamentocredito.component';
import { TasasinteresComponent } from './tasasinteres/tasasinteres.component';

const routes: Routes = [
	{
		path: 'calcpagos',
		component: CalcpagosComponent
	},
	{
		path: 'calccertificados',
		component: CalccertificadosComponent
	},
	{
		path: 'reglamentocredito',
		component: ReglamentocreditoComponent
	},
	{
		path: 'tasasinteres',
		component: TasasinteresComponent
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HerramientasRoutingModule { }
