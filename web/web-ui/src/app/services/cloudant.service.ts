import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders,  HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { env } from '../../environments/env';

const endpoint = env.cloudant.url;

@Injectable({
  providedIn: 'root'
})
export class CloudantService {

  	constructor(private http: HttpClient) {

   }
   	getServiciosUrl(): Observable<any> {
		const params = new HttpParams()
			.set('include_docs', 'true' );
		return this.http.get(endpoint + 'servicios/_all_docs', {'headers': this.httpOptions(), 'params': params})
		.pipe(catchError(this.handleError));
	}
	insertServiciosUrl(data: Object): Observable<any> {
		return this.http.post( endpoint + 'servicios', data, this.httpOptions())
		.pipe(catchError(this.handleError));
	}

	updateServiciosUrl(id: string, url: Object): Observable<any> {
		return this.http.put(endpoint + `servicios/${id}`, url , this.httpOptions())
	.pipe(catchError(this.handleError));
	}

	deleteServiciosUrl(id: string, rev: string): Observable<any> {
		return this.http.delete(endpoint + `servicios/${id}`+ `?rev=${rev}`, this.httpOptions())
		.pipe(catchError(this.handleError));
	}

	getImagenesUrl(): Observable<any> {
		const params = new HttpParams()
			.set('include_docs', 'true' );
		return this.http.get(endpoint + 'imagenes/_all_docs', {'headers': this.httpOptions(), 'params': params})
		.pipe(catchError(this.handleError));
	}

	insertImagenesUrl(data: Object): Observable<any> {
		return this.http.post( endpoint + 'imagenes', data, this.httpOptions())
		.pipe(catchError(this.handleError));
	}

	updateImagenesUrl(id: string, url: Object): Observable<any> {
		return this.http.put(endpoint + `imagenes/${id}`, url , this.httpOptions())
	.pipe(catchError(this.handleError));
	}

	deleteImagenesUrl(id: string, rev: string) : Observable<any> {
		return this.http.delete(endpoint + `imagenes/${id}`+ `?rev=${rev}`, this.httpOptions())
		.pipe(catchError(this.handleError));
	}

	getPrestamosPago(): Observable<any> {
		const params = new HttpParams()
			.set('include_docs', 'true');
		return this.http.get(endpoint + 'prestamos/_all_docs', {'headers': this.httpOptions(), 'params': params})
		.pipe(catchError(this.handleError));
	}
	getCertificados(): Observable<any> {
		const params = new HttpParams()
			.set('include_docs', 'true');
		return this.http.get(endpoint + 'certificados/_all_docs', {'headers': this.httpOptions(), 'params': params})
		.pipe(catchError(this.handleError));
	}

	updateCalcu(id: string, data: Object): Observable<any> {
		return this.http.put(endpoint + `prestamos/${id}`, data , this.httpOptions())
	.pipe(catchError(this.handleError));
	}

	updateCertificados(id: string, data: Object): Observable<any> {
		return this.http.put(endpoint + `certificados/${id}`, data , this.httpOptions())
	.pipe(catchError(this.handleError));
	}

	getProveedores(): Observable<any> {
		const params = new HttpParams()
			.set('include_docs', 'true' );
		return this.http.get(endpoint + 'proveedores/_all_docs', {'headers': this.httpOptions(), 'params': params})
		.pipe(catchError(this.handleError));
	}

	getProveedor(id: string): Observable<any> {
		const params = new HttpParams();
		return this.http.get(endpoint + `proveedores/${id}`, {'headers': this.httpOptions(), 'params': params})
		.pipe(catchError(this.handleError));
	}

	getCategorias(): Observable<any> {
		const params = new HttpParams()
			.set('include_docs', 'true' );
		return this.http.get(endpoint + 'categorias/_all_docs', {'headers': this.httpOptions(), 'params': params})
		.pipe(catchError(this.handleError));
	}

	//ACTUALIZAR-CATEGORIA
	updateCategoria(id: string, url: Object): Observable<any> {
		return this.http.put(endpoint + `categorias/${id}`, url,   this.httpOptions())
	.pipe(catchError(this.handleError));
	}

	//INSERTAR-CATEGORIA
	insertCategoria(data: Object): Observable<any> {
		return this.http.post( endpoint + 'categorias', data,this.httpOptions())
		.pipe(catchError(this.handleError));
	}

	//BORRAR-CATEGORIA
	deleteCategoria(id: string, rev: string) : Observable<any> {
		return this.http.delete(endpoint + `categorias/${id}`+ `?rev=${rev}`, this.httpOptions())
		.pipe(catchError(this.handleError));
	}

	getProveedoresByCategoria(query: Object): Observable<any> {
		return this.http.post(endpoint + `proveedores/_find`, query , this.httpOptions())
	.pipe(catchError(this.handleError));
	}

	updateProveedor(id: string, proveedor: Object) :  Observable<any>{
        const params = new HttpParams()

          return this.http.put(endpoint + `coopeproveedor/${id}`, proveedor ,this.httpOptions())
          .pipe(catchError(this.handleError));
	}

	deleteProveedor(id: string, rev: string) : Observable<any>{
		return this.http.delete(endpoint + `proveedores/${id}`+ `?rev=${rev}`, this.httpOptions())
		.pipe(catchError(this.handleError));
	}

	insertProveedor(data: Object): Observable<any> {
		return this.http.post( endpoint + 'proveedores', data,this.httpOptions())
		.pipe(catchError(this.handleError));
	}
	public httpSecureOptions(headers: any = {}): any {
		return {
			headers: new HttpHeaders(Object.assign({}, {
				'Content-Type': 'application/json'
			}, headers))
		};
	}

	public handleError(error: HttpErrorResponse): any {
		return throwError('Something bad happened; please try again later.');
	}

	private httpOptions(): any {
		return {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa(`${env.cloudant.username}:${env.cloudant.password}`)
			})
		};
	}

}
