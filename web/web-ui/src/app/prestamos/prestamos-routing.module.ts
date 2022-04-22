import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { PrestamosComponent } from './prestamos/prestamos.component';
import { TasasinteresComponent } from './tasasinteres/tasasinteres.component';
import { SimuladorComponent } from './simulador/simulador.component';
import { SolofirmaComponent } from './solofirma/solofirma.component';
import { ConsumoComponent } from './consumo/consumo.component';
import { LargoplazoComponent } from './largoplazo/largoplazo.component';
import { HipotecarioComponent } from './hipotecario/hipotecario.component';
import { GarantiahipotecariaComponent } from './garantiahipotecaria/garantiahipotecaria.component';
import { AutomotrizComponent } from './automotriz/automotriz.component';
import { AcademicoComponent } from './academico/academico.component';
import { EscolarComponent } from './escolar/escolar.component';

const routes: Routes = [
		
		  {
			path: 'tasasinteres',
			component: TasasinteresComponent
		  },
		  {
			path: 'simulador',
			component: SimuladorComponent
		  },
		  {
			path: 'solofirma',
			component: SolofirmaComponent
		  },
		  {
			path: 'consumo',
			component: ConsumoComponent
		  },
		  {
			path: 'largoplazo',
			component: LargoplazoComponent
		  },
		  {
			path: 'hipotecario',
			component: HipotecarioComponent
		  },
		  {
			path: 'garantiahipotecaria',
			component: GarantiahipotecariaComponent
		  },
		  {
			path: 'automotriz',
			component: AutomotrizComponent
		  },
		  {
			path: 'academico',
			component: AcademicoComponent
		  },
		  {
			path: 'escolar',
			component: EscolarComponent
		  },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PrestamosRoutingModule { }
