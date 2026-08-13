import { Component,Inject } from '@angular/core';
import { BaseModal, ModalService } from 'carbon-components-angular';
import { Router } from '@angular/router';
import { CloudantService } from '../../services/cloudant.service';
import { UrlImageService } from '../servicios/url-image.service';

@Component({
  selector: 'app-deleteimagen',
  templateUrl: './deleteimagen.component.html',
  styleUrls: ['./deleteimagen.component.scss']
})
export class DeleteimagenComponent extends BaseModal {

  constructor(
		@Inject('modalText') public modalText,
		@Inject('size') public size,
		@Inject('data') public data,
		@Inject('object') public object,
		@Inject('btn') public btn,
		protected modalService: ModalService,
		private router: Router,
		public cloudantService: CloudantService,
		public urlImageService: UrlImageService
	) { super();

		}


		deleteImagen(){
			if(this.btn === 1) {
				this.cloudantService.deleteServiciosUrl(this.object._id, this.object._rev).subscribe(() => {
				//	console.log('deleted');
					this.redirectTo('/administracion/servicios');
					this.modalService.destroy();
				});
			} else if(this.btn === 2){
				this.cloudantService.deleteImagenesUrl(this.object._id, this.object._rev).subscribe(() => {
				//	console.log('image deleted');
					this.redirectTo('/administracion/servicios');
					this.modalService.destroy();
				});
			} else if ( this.btn ===  3){
				this.cloudantService.deleteProveedor(this.object._id, this.object._rev).subscribe(() => {
				//	console.log('proveedor deleted');
					this.redirectTo('/administracion/proveedor');
					this.modalService.destroy();
				});
			} else {
				this.cloudantService.deleteCategoria(this.object._id, this.object._rev).subscribe(() => {
				//	console.log('categoria deleted');
					this.redirectTo('/administracion/servicios');
					this.modalService.destroy();
				  });
			}

		}

		  redirectTo(uri: string) {
			this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
			this.router.navigate([uri]));
		  }


}
