import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrestamosComponent } from './prestamos/prestamos.component';
import { PrestamosoperacionComponent } from './prestamosoperacion/prestamosoperacion.component';
import { PrestamosdetalleComponent } from './prestamosdetalle/prestamosdetalle.component';
import { AhorrosComponent } from './ahorros/ahorros.component';
import { AhorrosdetalleComponent } from './ahorrosdetalle/ahorrosdetalle.component';
import { PagosComponent } from './pagos/pagos.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { CertificadosdetalleComponent } from './certificadosdetalle/certificadosdetalle.component';
import { GarantizadosComponent } from './garantizados/garantizados.component';
import { AutomovilComponent } from './automovil/automovil.component';

const routes: Routes = [
	{
		path: 'prestamos',
		component: PrestamosComponent
	},
	{
		path: 'prestamosoperacion',
		component: PrestamosoperacionComponent
	},
	{
		path: 'prestamosdetalle',
		component: PrestamosdetalleComponent
	},
	{
		path: 'ahorros',
		component: AhorrosComponent
	},
	{
		path: 'ahorrosdetalle',
		component: AhorrosdetalleComponent
	},
	{
		path: 'pagos',
		component: PagosComponent
	},
	{
		path: 'certificados',
		component: CertificadosComponent
	},
	{
		path: 'certificadosdetalle',
		component: CertificadosdetalleComponent
	},
	{
		path: 'garantizados',
		component: GarantizadosComponent
	},
	{
		path: 'automovil',
		component: AutomovilComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SociosRoutingModule { }
