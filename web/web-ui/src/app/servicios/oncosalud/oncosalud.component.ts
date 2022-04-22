import { Component, OnInit } from '@angular/core';
import { UrlImageService } from 'src/app/administracion/servicios/url-image.service';
import { IbmidService } from 'src/app/services/ibmid.service';
import { Image } from 'src/app/administracion/servicios/image.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
	selector: 'app-oncosalud',
	templateUrl: './oncosalud.component.html',
	styleUrls: ['./oncosalud.component.scss']
})
export class OncosaludComponent implements OnInit {

	imagenes: Image[] = [];
	size= "normal";
	isActive = true;
	private servicesSub: Subscription;
	constructor(public ibmidservice: IbmidService,
		public urlImageService: UrlImageService) { }

	ngOnInit(): void {
		this.urlImageService.getServicios();
		this.servicesSub = this.urlImageService.getImagenUpdateListener()
		.subscribe((imagene: Image[]) => {
			this.imagenes = imagene;
		});
	}

}
