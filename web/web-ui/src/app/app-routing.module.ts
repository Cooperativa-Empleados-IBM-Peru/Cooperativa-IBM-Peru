import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
	},
	{
		path: 'socios',
		loadChildren: () =>
			import('./socios/socios.module').then(
				(m) => m.SociosModule
			),
	},
	{
		path: 'herramientas',
		loadChildren: () =>
			import('./herramientas/herramientas.module').then(
				(m) => m.HerramientasModule
			),
	},
	{
		path: 'avisos',
		loadChildren: () =>
			import('./avisos/avisos.module').then(
				(m) => m.AvisosModule
			),
	},
	{
		path: 'administracion',
		loadChildren: () =>
			import('./administracion/administracion.module').then(
				(m) => m.AdministracionModule
			),
	} //,
//	{
//		path: 'logout',
//		redirectTo: '/logout'
//	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
