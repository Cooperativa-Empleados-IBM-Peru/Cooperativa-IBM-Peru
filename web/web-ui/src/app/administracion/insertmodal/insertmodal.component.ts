import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { BaseModal, ModalService } from 'carbon-components-angular';
import { CloudantService } from '../../services/cloudant.service';
import { Router } from '@angular/router';
import { UrlImageService } from '../servicios/url-image.service';
import { Image } from '../servicios/image.model';

@Component({
  selector: 'app-insertmodal',
  templateUrl: './insertmodal.component.html',
  styleUrls: ['./insertmodal.component.scss']
})
export class InsertmodalComponent extends BaseModal {

  nombre: string;
	url: string;
	url2 : string;
	imagen: Image;
	imagenes: Image[] = [];
	imagenesArreglo = [];
	placeholder1 = 'Ingrese nombre de la imagen';
	placeholder2 = 'Ingrese url de la imagen';
	placeholder3 = 'Ingrese url de la imagen';


	@Output() messageEvent = new EventEmitter<string>();

	constructor(
		@Inject('modalText') public modalText,
        @Inject('size') public size,
        @Inject('data') public data,
		@Inject('urlImage') public urlImage,
        @Inject('btn') public btn,
		private router: Router,
		protected modalService: ModalService,
		public urlImageService: UrlImageService,
		public cloudantService: CloudantService) {
		super();
	}
	onChangeNomIma(event) {
		this.nombre = event.target.value;
	}

	onChangeUrlIma(event) {
		this.url = event.target.value;
	}

	onChangeUrlBoton(event) {
		this.url2 = event.target.value;
	}

	updateUrl() {
        if ( this.btn === 1) {
			// UpdateServices
			if(this.nombre) { this.urlImage.nombre = this.nombre; }
            if(this.url) { this.urlImage.url = this.url; }
            if(this.url2) { this.urlImage.url = this.url2; }
            this.cloudantService.updateImagenesUrl(this.urlImage._id, this.urlImage).subscribe((response: any)=>{
                this.urlImage._rev = response.rev;
      //          console.log('url updated');
                this.redirectTo('/administracion/urlImages');
                this.modalService.destroy();
            });
            /* this.urlService.updateServices(this.urlImage._id, this.url); */
        } else {
            /* this.urlImageService.updateImages(this.urlImage._id, this.url); */
            if(this.nombre) { this.urlImage.nombre = this.nombre; }
            if(this.url) { this.urlImage.url = this.url; }
            if(this.url2) { this.urlImage.url = this.url2; }
            const data = {'nombre': this.nombre, 'url': this.url, 'url2': this.url2}
            this.cloudantService.insertImagenesUrl(data).subscribe((response: any)=>{
        //        console.log('new service');
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
