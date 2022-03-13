import { Component, OnInit } from '@angular/core';
import { HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IbmidService } from '../../services/ibmid.service';
import { UrlService } from '../../administracion/servicios/url.service';
import { Servicio } from '../../administracion/servicios/servicio.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @HostBinding('class.bx--header') headerClass = true;

  sidemenuactive = false;
  hasHamburger = true;
  servicios: Servicio[] = [];
	private servicesSub: Subscription;

constructor(public ibmidservice: IbmidService,
	public urlService: UrlService,
	private router: Router) { }

	
	ngOnInit(): void {
			this.urlService.getServicios();
			this.servicesSub = this.urlService.getServiceUpdateListener()
			.subscribe((services: Servicio[]) => {
				this.servicios = services;
		});

	}

	onClickSalir() {
		window.location.href = '/logout';
	}

	onclickHelp() {
		window.open('https://ibm-peru.slack.com/archives/CH4R8RSQH', '_blank');
	}
}
