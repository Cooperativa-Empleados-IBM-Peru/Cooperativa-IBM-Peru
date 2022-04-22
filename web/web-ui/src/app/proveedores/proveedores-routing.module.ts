import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
		
		  {
			path: 'tecnologiahogar',
			component: TecnologiahogarComponent
		  },
		  {
			path: 'productoshogar',
			component: ProductoshogarComponent
		  }, {
			path: 'pasteleria',
			component: PasteleriaComponent
		  }, {
			path: 'vinos',
			component: VinosComponent
		  }, {
			path: 'mascotas',
			component: MascotasComponent
		  }, {
			path: 'menaje',
			component: MenajeComponent
		  }, {
			path: 'belleza',
			component:  BellezaComponent 
		  }, {
			path: 'viajes',
			component: ViajesComponent
		  }, {
			path: 'gimnasios',
			component: GimnasiosComponent
		  }, {
			path: 'restaurantes',
			component:  RestaurantesComponent
		  }, {
			path: 'automotriz',
			component: AutomotrizComponent
		  },
		  
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
