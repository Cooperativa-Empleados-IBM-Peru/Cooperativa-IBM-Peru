import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Proveedor } from './proveedor.model';
import { CloudantService } from '../../services/cloudant.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

	private proveedores: Proveedor[] = [];
	private dataStore: Proveedor[] = [];
	private proveedorUpdated = new Subject<Proveedor[]>();
	constructor(public cloudantService: CloudantService) { }

	getProveedores() {
		this.cloudantService.getProveedores()
		 .pipe(map((proveedorData) => {
			return proveedorData.rows.map(proveedor => {
					return {
						_id: proveedor.doc._id,
						_rev: proveedor.doc._rev,
						nombre: proveedor.doc.nombre,
						categoria: proveedor.doc.categoria,
						image: proveedor.doc.image,
						descripcion: proveedor.doc.descripcion,
						especificaciones: proveedor.doc.especificaciones,
						catalogo: proveedor.doc.catalogo,
						pedido: proveedor.doc.pedido,
						contacto: proveedor.doc.contacto,
						activo: proveedor.doc.activo
					};
			});
		}))
		.subscribe( transformedServices => {
			this.proveedores = transformedServices;
			this.dataStore = transformedServices;
			this.proveedorUpdated.next([...this.proveedores]);
		});
	}

	getProveedorUpdateListener() {
		return this.proveedorUpdated.asObservable();
	}

}
