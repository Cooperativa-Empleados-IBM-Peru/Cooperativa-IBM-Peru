import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriaComponent } from './historia/historia.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { EstadosfinancierosComponent } from './estadosfinancieros/estadosfinancieros.component';
import { MemoriasComponent } from './memorias/memorias.component';
import { EstatutoComponent } from './estatuto/estatuto.component';
import { ReglamentosComponent } from './reglamentos/reglamentos.component';
const routes: Routes = [
		{
			path: 'historia',
			component: HistoriaComponent
		  },
		{
			path: 'funcionarios',
			component: FuncionariosComponent
		},
		{
			path: 'directiva',
			component: DirectivaComponent
		},
		{
			path: 'estadosfinancieros',
			component: EstadosfinancierosComponent
		},
		{
			path: 'memorias',
			component: MemoriasComponent
		},
		{
			path: 'estatuto',
			component: EstatutoComponent
		},
		{
			path: 'reglamentos',
			component: ReglamentosComponent
		},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class NosotrosRoutingModule { }
