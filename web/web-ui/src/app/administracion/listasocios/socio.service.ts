import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CoopeSocios } from '../../classes/coopesocios';
import { Db2Service } from '../../services/db2.service';

@Injectable({
  providedIn: 'root'
})
export class SocioService {
  public dataLength: number;
  private socios: CoopeSocios[] = [];
	private dataStore: CoopeSocios[] = [];
  //private socioUpdated = new Subject<{ socios: CoopeSocios[]; sociosLength: number }>();
	private socioUpdated = new Subject<CoopeSocios[]>();
  constructor(public db2Service: Db2Service,
	private router: Router) { }

  /* getIbmers(page: number, pageLength: number) {
    this.db2Service.getIbmers().subscribe(
      (resp: any) => {
        const dataIbmer = [];
        if (resp.length > 0 ) {
          this.dataLength = resp.length;
          for (let i = (page - 1) * pageLength ; i < page * pageLength && i < resp.length; i++) {
            dataIbmer.push(resp[i]);
          }
          this.socios = dataIbmer;
          this.dataStore = dataIbmer;
          this.socioUpdated.next({
            socios: [...this.socios],
            sociosLength: resp.length});
        }
      }
    );
  } */

  getIbmers() {
	this.db2Service.getSociosIbm().subscribe(
		(resp: any) => {
			if (resp.length > 0 ) {
				this.socios = resp;
				this.dataStore = resp;
				this.socioUpdated.next([...this.socios]);
			}
		}
	);
  }

  getIbmerUpdateListener() {
		return this.socioUpdated.asObservable();
  }

  updateIbmer(socio: CoopeSocios) {
		/* this.dataStore.forEach((t, i) => {
			if ( t.codempleado.trim() === socio.codempleado.trim()) {
				 t.codempleado = t.codempleado.trim();
				if (email !== '' && nombre !== '') {
				t.emailempleado = email;
				t.nombreempleado = nombre;
				} else if (email !== '' && nombre == '') {
				t.emailempleado = email;
				} else if (email == '' && nombre !== '') {
				t.nombreempleado = nombre;
				} else {
				}
				t.activo = socio.activo;
				t.codempleado = socio.codempleado;
				t.codpais = socio.codpais;
				t.emailempleado = socio.emailempleado;
				// t.fecmodificacion = new Date();
				t.inbluepages = socio.inbluepages;
				t.nombreempleado  = socio.nombreempleado;

				this.db2Service.updateIbmer(socio.codempleado.trim(), t).subscribe((response: any) => {
					console.log('done');
					// this.redirectTo('/administracion/listasocios');
				});

			}
		}); */
		this.db2Service.updateSocio(socio.uuid.trim(), socio).subscribe((response: any) => {
//			console.log('socio updated');
			// this.redirectTo('/administracion/listasocios');
		});
		/* this.socioUpdated.next({
            socios: [...this.dataStore],
			sociosLength: this.dataLength}); */


		//	this.socioUpdated.next([...this.dataStore]);
	}

	deleteIbmer(id: string) {
		this.db2Service.deleteSocio(id.trim()).subscribe(() => {
			// this.getIbmers();
//			console.log('socio deleted');
		});
	}

	redirectTo(uri: string) {
		this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
		this.router.navigate([uri]));
	}
}
