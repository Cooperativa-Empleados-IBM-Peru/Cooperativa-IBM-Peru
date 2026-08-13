import { Injectable } from '@angular/core';
import { Categoria } from './categoria.model';
import { CloudantService } from '../../services/cloudant.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

	private categorias: Categoria[] = [];
	private dataStore: Categoria[] = [];
	private categoriaUpdated = new Subject<Categoria[]>();

  constructor(public cloudantService: CloudantService) { }
  getCategorias() {
	this.cloudantService.getCategorias()
	 .pipe(map((categoriaData) => {
		return categoriaData.rows.map(categoria => {
			return {
				_id: categoria.doc._id,
				_rev: categoria.doc._rev,
				nombre: categoria.doc.nombre,
				url: categoria.doc.url,
			};
		});
	}))
	.subscribe( transformedServices => {
		this.categorias = transformedServices;
		this.dataStore = transformedServices;
		this.categoriaUpdated.next([...this.categorias]);
	});
}

getCategoriaUpdateListener() {
	return this.categoriaUpdated.asObservable();
}
}
