import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Servicio } from './servicio.model';
import { CloudantService } from '../../services/cloudant.service';

@Injectable({
	providedIn: 'root'
})
export class UrlService {
	private servicios: Servicio[] = [];
	private dataStore: Servicio[] = [];
	private serviceUpdated = new Subject<Servicio[]>();
	constructor(public cloudantService: CloudantService) { }

	getServicios() {
		this.cloudantService.getServiciosUrl()
		 .pipe(map((servicioData) => {
			return servicioData.rows.map(servicio => {
				return {
					_id: servicio.doc._id,
					_rev: servicio.doc._rev,
					nombre: servicio.doc.nombre,
					url: servicio.doc.url
				};
			});
		}))
		.subscribe( transformedServices => {
			this.servicios = transformedServices;
			this.dataStore = transformedServices;
			this.serviceUpdated.next([...this.servicios]);
		});
	}

	getServiceUpdateListener() {
		return this.serviceUpdated.asObservable();
	}

	updateServices(id: string, url: string) {

		this.dataStore.forEach((t, i) => {
			if ( t._id === id) {
				t.url = url;
				this.cloudantService.updateServiciosUrl(id, t).subscribe( (response: any) => {
					t._rev = response.rev;
				});
			}
		});
		this.serviceUpdated.next([...this.dataStore]);
	}
}
