import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { FondosepelioComponent } from './fondosepelio/fondosepelio.component';
import { SeguroautosComponent } from './seguroautos/seguroautos.component';
import { TelefoniacelularComponent } from './telefoniacelular/telefoniacelular.component';
import { OncosaludComponent } from './oncosalud/oncosalud.component';

const routes: Routes = [
		{
			path: 'fondosepelio',
			component: FondosepelioComponent
		  },
		  {
			path: 'seguroautos',
			component: SeguroautosComponent
		  },
		  {
			path: 'telefoniacelular',
			component: TelefoniacelularComponent
		  },
		  {
			path: 'oncosalud',
			component: OncosaludComponent
		  },
		
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ServiciosRoutingModule { }
