import { Component, OnInit } from '@angular/core';
import {  Observable, Subject, Subscription } from 'rxjs';
import { IbmidService } from '../../services/ibmid.service';
import { Image } from 'src/app/administracion/servicios/image.model';
import { UrlImageService } from 'src/app/administracion/servicios/url-image.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

	imagenes: Image[] = [];
	size= "normal";
	isActive = true;
	private servicesSub: Subscription;
	constructor(public ibmidservice: IbmidService,
				public urlImageService: UrlImageService){ }

	ngOnInit(): void {
		this.urlImageService.getServicios();
		this.servicesSub = this.urlImageService.getImagenUpdateListener()
		.subscribe((imagene: Image[]) => {
			this.imagenes = imagene;
		});

	}
	openModal() {
	}
	customOptions: any = {
		loop: true,
		mouseDrag: true,
		navSpeed: 700,
		autoplay: true,
    	autoplayTimeout: 7000,
    	autoplayHoverPause: true,
		responsive: {
		  0: {
			items: 1
		  },
		  400: {
			items: 1
		  },
		  740: {
			items: 1
		  },
		  940: {
			items: 1
		  }
		},
	  }
}

