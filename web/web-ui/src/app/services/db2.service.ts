import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient,
         HttpParams,
         HttpErrorResponse,
         HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { IbmidService } from './ibmid.service';
import { UUID } from 'angular2-uuid';
import { env } from '../../environments/env';

const endpoint = env.coopeapi.apiurl;

@Injectable({
  providedIn: 'root'
})

export class Db2Service {
	uuidValue: string;
  constructor(private http: HttpClient, private secureService: IbmidService	) {

  }

  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  generateUUID(){
    this.uuidValue=UUID.UUID();
    return this.uuidValue;
  }

  getExSociobyId(id : string) : Observable<any>{
    //id : COOPESOCIOS uuid
    const params = new HttpParams();

      return this.http.get(endpoint + `vwsociosinactivos/${id}`, { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
      .pipe(
       catchError(this.secureService.handleError)
      )
  }

  getSocioDireccionbyId(id : string) : Observable<any>{
    //id : COOPESOCIOS uuid
    const params = new HttpParams();

      return this.http.get(endpoint + `vwsociosdetalles/${id}`, { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
      .pipe(
       catchError(this.secureService.handleError)
      )
  }

  getMasterLookupbyId(id : string) : Observable<any>{
    //id : COOPESOCIOS uuid
    const params = new HttpParams();

    return this.http.get(endpoint + `vwmasterlookups/${id}`, { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
      .pipe(
       catchError(this.secureService.handleError)
      )
  }

  getMasterPlanPagosbyId(id : string) : Observable<any>{
    //id : NUMOPERACION
    const params = new HttpParams();

    return this.http.get(endpoint + `vwmasterplanpagos/${id}`, { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
      .pipe(
       catchError(this.secureService.handleError)
      )
  }

  getMovimientosAhorroDetalle(cuenta : string, tipo : string) : Observable<any>{
     //This don't have id because it has to return many entries for the account
      let lbcont : string;
      switch (tipo) {
        case "contable" :
          lbcont = "movahorros";
          break;

        case "bloqueado" :
          lbcont = "movbloqueos";
          break;

        case "aportaciones" :
          lbcont = "movaportaciones";
          break;

        case "miscelaneo" :
          lbcont = "movmiscelaneos";
          break;

      }

      const params = new HttpParams()
        .set('filter', '{"where":{"ctacliente":"' + cuenta + '"}, "order":["fecemision DESC"]}');

        return this.http.get(endpoint + lbcont, { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
        .pipe(
         catchError(this.secureService.handleError)
        )
  }

  getOperacionesPrestamos(cuenta : string, tipo : string) : Observable<any>{
         //This don't have id because it has to return many entries for the account
        let lbcont : string;
        switch (tipo) {

          case "medianop" :
            lbcont = "pracademico";
            break;

          case "auto" :
            lbcont = "prautomovil";
            break;

          case "consumo" :
            lbcont = "prconsumo";
            break;

          case "cortop" :
            lbcont = "prcortoplazo";
            break;

          case "esp1" :
            lbcont = "presp1";
            break;

          case "esp2" :
            lbcont = "presp2";
            break;

          case "hipotecario" :
            lbcont = "prhipotecario";
            break;

          case "largop" :
            lbcont = "prlargoplazo";
            break;

          case "ps" :
            lbcont = "prps";
            break;

          case "solafirma" :
            lbcont = "prsolafirma";
            break;

        }

        const params = new HttpParams()
          .set('filter', '{"where":{"ctacliente":"' + cuenta + '"}, "order":["feccartera ASC"]}');

          return this.http.get(endpoint + lbcont, { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
          .pipe(
           catchError(this.secureService.handleError)
          )
  }

  getPagosCancelados(operacion : string) : Observable<any>{
        //This don't have id because it has to return many entries for the operation
        const params = new HttpParams()
          .set('filter', '{"where":{"numoperacion":"' + operacion + '"}, "order":["cuota ASC"]}');

          return this.http.get(endpoint + 'planpagoscancelados', { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
          .pipe(
           catchError(this.secureService.handleError)
          )
  }

  getPagosPendientes(operacion : string) : Observable<any>{
        //This don't have id because it has to return many entries for the operation
        const params = new HttpParams()
            .set('filter', '{"where":{"numoperacion":"' + operacion + '"}, "order":["cuota ASC"]}');

            return this.http.get(endpoint + 'planpagospendientes', { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
            .pipe(
             catchError(this.secureService.handleError)
            )
  }

  getPagosTotales(operacion : string) : Observable<any>{
        //This don't have id because it has to return many entries for the operation
        const params = new HttpParams()
          .set('filter', '{"where":{"numoperacion":"' + operacion + '"}}');

          return this.http.get(endpoint + 'planpagostotales', { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
          .pipe(
           catchError(this.secureService.handleError)
          )
  }

  getPagosTotalPendientesbyId(id : string) : Observable<any>{
        //id : numoperacion
        const params = new HttpParams()

          return this.http.get(endpoint + `planpagostotalpendientes/${id}`, { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
          .pipe(
           catchError(this.secureService.handleError)
          )
  }

  getPagosTotalCanceladosbyId(id : string) : Observable<any>{
        //id : numoperacion
        const params = new HttpParams()

          return this.http.get(endpoint + `planpagostotalcancelados/${id}`, { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
          .pipe(
           catchError(this.secureService.handleError)
          )
  }

  getDetallesGarantes(operacion : string) : Observable<any>{
        //This don't have id because it has to return many entries for numoperacion
        const params = new HttpParams()
          .set('filter', '{"where":{"numoperacion":"' + operacion + '"}, "order":["docidgarante ASC"]}');

          return this.http.get(endpoint + 'garantesdetalle', { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
          .pipe(
           catchError(this.secureService.handleError)
          )
  }

  getCertificadosDetalles(cuenta : string, tipo : string) : Observable<any>{
        //This don't have id because it returns many entries for cta. and tipo
        const params = new HttpParams()
          .set('filter', '{"where":{"ctacliente":"' + cuenta + '", "tipocert":"' + tipo + '"}, "order":["fecemision ASC", "numdoc ASC"] }');

          return this.http.get(endpoint + 'certificadosmontos', { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
          .pipe(
           catchError(this.secureService.handleError)
          )
  }

  getGarantizados(codemp : string) : Observable<any>{
       //This don't have an id because it can return many entries for cod.empleado
        const params = new HttpParams()
          .set('filter', '{"where":{"codempleado":"' + codemp + '"} }');

          return this.http.get(endpoint + 'garantizados', { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
          .pipe(
           catchError(this.secureService.handleError)
          )
  }

  getFra(codemp : string) : Observable<any>{
        //This don't have an id because it can return many entries for cod.empleado
        const params = new HttpParams()
          .set('filter', '{"where":{"codempleado":"' + codemp + '"} }');

          return this.http.get(endpoint + 'fra', { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
          .pipe(
           catchError(this.secureService.handleError)
          )
  }

  getSiniestros(codemp : string) : Observable<any>{
        //This don't have an id because it can return many entries by cod.empleado
        const params = new HttpParams()
          .set('filter', '{"where":{"codempleado":"' + codemp + '"} }');

          return this.http.get(endpoint + 'siniestros', { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
          .pipe(
           catchError(this.secureService.handleError)
          )
  }

  getSociosIbm() : Observable<any>{
      const params = new HttpParams()

        return this.http.get(endpoint + 'vwsociosibm', { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
        .pipe(
         catchError(this.secureService.handleError)
        )
  }

  getSociosKyndryl() : Observable<any>{
      const params = new HttpParams()

        return this.http.get(endpoint + 'vwsocioskyndryl', { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
        .pipe(
         catchError(this.secureService.handleError)
        )
  }

  getSociosExEmpleados() : Observable<any>{
      const params = new HttpParams()

        return this.http.get(endpoint + 'vwsociosexempleados', { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
        .pipe(
         catchError(this.secureService.handleError)
        )
  }

  getSocioById(id: string) : Observable<any>{
    const params = new HttpParams()

      return this.http.get(endpoint + `coopesocios/${id}`, { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
      .pipe(
       catchError(this.secureService.handleError)
      )
}

	getExsocios() : Observable<any>{
	  	const params = new HttpParams()

		    return this.http.get(endpoint + 'vwsociosinactivos', { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
		    .pipe(
		     catchError(this.secureService.handleError)
		    )
	}

  updateSocio(id: string, socio: Object) :  Observable<any>{
        const params = new HttpParams()

        const updSocio = JSON.parse(JSON.stringify(socio));
        updSocio.uuid = updSocio.uuid.trim();
        updSocio.nombreempleado = updSocio.nombreempleado.trim();
       
        return this.http.put(endpoint + `coopesocios/${id}`, updSocio ,{ params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
          .pipe(
          catchError(this.secureService.handleError)
        )
	}

	deleteSocio(id: string) : Observable<any>{
	  	const params = new HttpParams()

		  return this.http.delete(endpoint + `coopesocios/${id}`, { params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
		  .pipe(
		    catchError(this.secureService.handleError)
		  )

	}

	addSocio(socio: Object) :Observable<any>{
	  	const params = new HttpParams()
console.log(socio);
		  return this.http.post(endpoint + 'coopesocios', socio ,{ params, 'headers': this.secureService.httpSecureOptions(), responseType: 'json'} )
		  .pipe(
		    catchError(this.secureService.handleError)
		  )
	}

   private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}


