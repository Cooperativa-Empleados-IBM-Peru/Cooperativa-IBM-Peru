import { Component, OnInit } from '@angular/core';
import { UrlImageService } from 'src/app/administracion/servicios/url-image.service';
import { IbmidService } from 'src/app/services/ibmid.service';
import { Image } from 'src/app/administracion/servicios/image.model';
import { Subscription } from 'rxjs/internal/Subscription';

import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";

@Component({
	selector: 'app-funcionarios',
	templateUrl: './funcionarios.component.html',
	styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {
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
		
		var acc = document.getElementsByClassName("accordion");
		var i;
	
		for (i = 0; i < acc.length; i++) {
		  acc[i].addEventListener("click", function () {
			this.classList.toggle("active");
			var panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
			  panel.style.maxHeight = null;
			} else {
			  panel.style.maxHeight = panel.scrollHeight + "px";
			}
		  });
		}
	}
}
