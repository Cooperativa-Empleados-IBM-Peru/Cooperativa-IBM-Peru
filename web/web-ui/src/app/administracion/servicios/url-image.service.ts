import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Image } from './image.model';
import { CloudantService } from '../../services/cloudant.service';

@Injectable({
	providedIn: 'root'
})
export class UrlImageService {
	private imagenes: Image[] = [];
	private dataStore: Image[] = [];
	private imagenUpdated = new Subject<Image[]>();
	constructor(public cloudantService: CloudantService) { }

	getServicios() {
		this.cloudantService.getImagenesUrl()
		 .pipe(map((imagenData) => {
			return imagenData.rows.map(imagen=> {
				return {
					_id: imagen.doc._id,
					_rev: imagen.doc._rev,
					nombre: imagen.doc.nombre,
					url: imagen.doc.url,
					url2: imagen.doc.url2
				};
			});
		}))
		.subscribe( transformedServices => {
			this.imagenes = transformedServices;
			this.dataStore = transformedServices;
			this.imagenUpdated.next([...this.imagenes]);
		});
	}

	getImagenUpdateListener(){
		return this.imagenUpdated.asObservable();
	}

	updateImages(id: string, url: string){
		this.dataStore.forEach((t, i) => {
			if ( t._id === id) {
				t.url = url;
				this.cloudantService.updateImagenesUrl(id, t).subscribe( (response: any) => {
					t._rev = response.rev;
				});
			}
		});
		this.imagenUpdated.next([...this.dataStore]);
	}
}
