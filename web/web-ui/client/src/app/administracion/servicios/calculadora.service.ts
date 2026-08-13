import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Prestamo } from './prestamo.model';
import { Certificado } from './certificado.model';
import { CloudantService } from '../../services/cloudant.service';
@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
	private prestamos: Prestamo[] = [];
	private dataPagos: Prestamo[] = [];
	private prestamoUpdated = new Subject<Prestamo[]>();
	private certificados: Certificado[] = [];
	private dataCerti: Certificado[] = [];
	private certificadoUpdated = new Subject<Certificado[]>();
  constructor(public cloudantService: CloudantService) { }

	getPrestamosPagos() {
		this.cloudantService.getPrestamosPago()
			.pipe(map((prestamoData) => {
				return prestamoData.rows.map(prestamo => {
					return {
						_id: prestamo.doc._id,
						_rev: prestamo.doc._rev,
						tipo: prestamo.doc.tipo,
						min: prestamo.doc.min,
						max: prestamo.doc.max,
						data: prestamo.doc.data
					};
				});
			}))
			.subscribe(transformedPrestamos => {
				this.prestamos = transformedPrestamos;
				this.dataPagos = transformedPrestamos;
				this.prestamoUpdated.next([...this.prestamos]);
			});
	}

	getCertificados() {
		this.cloudantService.getCertificados()
		.pipe(map((certificadoData) => {
			return certificadoData.rows.map(certificado => {
				return {
					_id: certificado.doc._id,
					_rev: certificado.doc._rev,
					tipo: certificado.doc.tipo,
					data: certificado.doc.data
				};
			});
		}))
		.subscribe(transformedCertificados => {
			this.certificados = transformedCertificados;
			this.dataCerti = transformedCertificados;
			this.certificadoUpdated.next([...this.certificados]);
		});
	}

	getPrestamoUpdateListener() {
		return this.prestamoUpdated.asObservable();
	}

	getCertificadoUpdatedListener() {
		return this.certificadoUpdated.asObservable();
	}

	CalculadoraUpdate(id: string, data: Prestamo ) {

		this.dataPagos.forEach((t, i) => {

			if ( t._id === id) {
				t = data;
				this.cloudantService.updateCalcu(id, t).subscribe( (response: any) => {
					t._rev = response.rev;
				});
			}
		});
		this.prestamoUpdated.next([...this.dataPagos]);

	}

	CertificadoUpdate(id: string, data: Certificado) {
		this.dataCerti.forEach((t, i) => {
			if (t._id === id) {
				t = data;
				this.cloudantService.updateCertificados(id, t).subscribe((response: any) => {
					t._rev = response.rev;
				});
			}
		});
		this.certificadoUpdated.next([...this.dataCerti]);
	}
}
