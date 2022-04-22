import { Component, OnInit } from '@angular/core';
import { UrlImageService } from 'src/app/administracion/servicios/url-image.service';
import { IbmidService } from 'src/app/services/ibmid.service';
import { Image } from 'src/app/administracion/servicios/image.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
	selector: 'app-academico',
	templateUrl: './academico.component.html',
	styleUrls: ['./academico.component.scss']
})
export class AcademicoComponent implements OnInit {

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
