import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { BaseModal, ModalService } from 'carbon-components-angular';
import { UrlService } from '../servicios/url.service';
import { UrlImageService } from '../servicios/url-image.service';
import { CloudantService } from '../../services/cloudant.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-inputmodal',
	templateUrl: './inputmodal.component.html',
	styleUrls: ['./inputmodal.component.scss']
})
export class InputmodalComponent extends BaseModal {
	url: string;
	name: string;
	@Output() messageEvent = new EventEmitter<string>();
	constructor(
		@Inject('modalText') public modalText,
		@Inject('size') public size,
		@Inject('data') public data,
		@Inject('servicio') public servicio,
		@Inject('btn') public btn,
		protected modalService: ModalService,
		private router: Router,
		public urlService: UrlService,
		public urlImageService: UrlImageService,
		public cloudantService: CloudantService) {
		super();
	}
	onChange(event) {

		this.url = event.target.value;
		// this.data.next(event.target.value);
	}

	onChangeName(event) {
		this.name = event.target.value;
	}

	updateUrl() {
		if ( this.btn === 1) {
			// UpdateServices
			if(this.url) { this.servicio.url = this.url; }
			if(this.name) { this.servicio.nombre = this.name; }

			this.cloudantService.updateServiciosUrl(this.servicio._id, this.servicio).subscribe((response: any)=>{
				this.servicio._rev = response.rev;
		//		console.log('url updated');
				this.redirectTo('/administracion/servicios');
				this.modalService.destroy();
			});
			/* this.urlService.updateServices(this.servicio._id, this.url); */

		} else {
			/* this.urlImageService.updateImages(this.servicio._id, this.url); */
			if(this.url) { this.servicio.url = this.url; }
			if(this.name) { this.servicio.nombre = this.name; }
			const data = {'nombre': this.name, 'url': this.url}
			this.cloudantService.insertServiciosUrl(data).subscribe((response: any)=>{
		//		console.log('new service');
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
