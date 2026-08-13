import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListasociosComponent } from './listasocios/listasocios.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { InsertproveedorComponent } from './proveedor/insertproveedor/insertproveedor.component';
const routes: Routes = [
	{
		path: 'listasocios',
		component: ListasociosComponent
	},
	{
		path: 'servicios',
		component: ServiciosComponent
	},
	{
		path: 'proveedor',
		component: ProveedorComponent
	},
	{
		path: 'editar-proveedor',
		component: InsertproveedorComponent
	},
	{
		path: 'editar-proveedor/:id',
		component: InsertproveedorComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdministracionRoutingModule { }
