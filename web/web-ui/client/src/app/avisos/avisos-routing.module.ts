import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProveedoresComponent } from './proveedores/proveedores.component';
import { InternosComponent } from './internos/internos.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { ProveedoresdetalleComponent } from './proveedoresdetalle/proveedoresdetalle.component';
const routes: Routes = [
		{
		  path: 'proveedores',
		  component: ProveedoresComponent
		},
		{
			path: 'internos',
			component: InternosComponent
		  },
		  {
			path: 'noticias',
			component: NoticiasComponent
		  },
		  {
			  path: 'proveedordetalle/:id',
			  component: ProveedoresdetalleComponent
		  },
		  {
			path: 'proveedores/:categoria',
			component: ProveedoresComponent
		  }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AvisosRoutingModule { }
