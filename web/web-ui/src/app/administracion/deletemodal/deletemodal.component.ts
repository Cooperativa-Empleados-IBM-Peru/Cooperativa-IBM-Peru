import { Component, Inject } from '@angular/core';
import { BaseModal, ModalService } from 'carbon-components-angular';
import { SocioService } from '../listasocios/socio.service';
import { Router } from '@angular/router';
import { Db2Service } from '../../services/db2.service';

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.scss']
})
export class DeletemodalComponent extends BaseModal {

	constructor(
		@Inject('modalText') public modalText,
		@Inject('size') public size,
		@Inject('socio') public socio,
		protected modalService: ModalService,
		public socioService: SocioService,
		private router: Router,
		public db2Service: Db2Service
	) { super();

		}



  deleteSocio() {
	this.db2Service.deleteSocio(this.socio.codempleado).subscribe(() => {
	//	console.log('deleted');
		this.redirectTo('/administracion/listasocios');
		this.modalService.destroy();
	});
  }

  redirectTo(uri: string) {
	this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
	this.router.navigate([uri]));
  }

}
