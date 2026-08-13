import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ConstruccionComponent } from './construccion/construccion.component';

const routes: Routes = [
	{
		path: '',
		component: LandingPageComponent,
	},
	{
		path : 'construccion',
		component: ConstruccionComponent,
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }
