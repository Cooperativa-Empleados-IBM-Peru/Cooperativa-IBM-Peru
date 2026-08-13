import { Component, OnInit, ViewChild, TemplateRef, Inject, LOCALE_ID, Input } from '@angular/core';
import {  Observable, Subject, Subscription } from 'rxjs';

import { IbmidService } from '../../services/ibmid.service';
import { Servicio } from './servicio.model';
import { Prestamo } from './prestamo.model';
import { Certificado } from './certificado.model';
import { Image } from './image.model';
import { UrlImageService } from './url-image.service';
import { UrlService } from './url.service';
import { Router } from '@angular/router';
import { CalculadoraService } from './calculadora.service';
import { CloudantService } from '../../services/cloudant.service';
import {
	Table,
	TableModel,
	TableItem,
	TableHeaderItem,
	Link,
	OverflowMenu,
	OverflowMenuOption,
  ModalService
} from 'carbon-components-angular';
//CATEGORIA
import { Categoria } from '../../avisos/proveedores/categoria.model';
import { CategoriaService } from '../../avisos/proveedores/categoria.service';

import { InputmodalComponent } from '../inputmodal/inputmodal.component';
import { DeleteimagenComponent } from '../deleteimagen/deleteimagen.component';
import { InsertmodalComponent } from '../insertmodal/insertmodal.component';
import { CategoriamodalComponent } from '../categoriamodal/categoriamodal.component';
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {


	ides = [];
	prestamoPagos = [];
	moneda: Array<any>;
	limite: any;
	tasa: any;
	minimo: any;
	maximo: any;
	tipoPrestamo: String;
	tipoMoneda: String;
	id: String;
	calcuPrestamo: Prestamo;
	prestamos: Prestamo[] = [];
	dataF: any;
	placeholder1 = 'Ingrese límite';
	placeholder2 = 'Ingrese tasa';
	placeholder3 = 'Ingrese minimo de años';
	placeholder4 = 'Ingrese máximo de años';
	calcuCertificado: Certificado;
	certificados: Certificado[] = [];
	dataC: any;
	prestamoCerti = [];
	moneda2: Array<any>;
	tipoMoneda2: String;
	limite2: any;
	tasa2: any;
	imagenes: Image[] = [];
	certi = []

	// URL Servicios
	servicioUrl: Servicio;
	servicio: Servicio;
	servicios: Servicio[] = [];
	modelServicio: TableModel;
	skeletonServicio = Table.skeletonModel(10, 3);
	skeletonservicio = true;

	// Imagenes Carrousel
	urlImage:Image;
	imagenModal : Image;
	modelImagen: TableModel;
	skeletonImagen = Table.skeletonModel(10, 3);
	skeletonimagen = true;

	//TABLA-CATEGORIA
	categorias = [];
	modelCategoria : TableModel;
	skeletoncate = false;
	categoriaup : Categoria;
	categoriaModal : Categoria;
	skeletonCate = Table.skeletonModel(10,3);
	dataCategorias: any;
	nombre:String;

	 private servicesSub: Subscription;
	 private prestamosSub: Subscription;
	 private certificadosSub: Subscription;
	@Input() modalText = 'Hello, World';
	@Input() size = 'default';
	@Input() data = '';
	constructor(protected modalService: ModalService,
				public ibmidservice: IbmidService,
				public urlService: UrlService,
				public urlImageService: UrlImageService,
				public calculadoraService: CalculadoraService,
				public cloudantService: CloudantService,
				private router: Router) { }

	@ViewChild("overflowMenuItemTemplate", { static: false})
	protected overflowMenuItemTemplate: TemplateRef<any>;

	@ViewChild("overflowMenuTemplate", { static: false})
	protected overflowMenuTemplate: TemplateRef<any>;

	@ViewChild("overflowTemplate", { static: false})
	protected overflowTemplate: TemplateRef<any>;

	ngOnInit(): void {
		this.moneda = [
			{
				content: 'Dólares'
			},
			{
				content: 'Nuevos Soles'
			}
		];
		this.moneda2 = [
			{
				content: 'Dólares'
			},
			{
				content: 'Nuevos Soles'
			}
		];
		this.limite = '';
		this.tasa = '';
		this.minimo  = '';
		this.maximo = '';
		this.limite2 = '';
		this.tasa2 = '';
		this.prestamoCerti = [];

		this.urlService.getServicios();
		this.servicesSub = this.urlService.getServiceUpdateListener()
		.subscribe((services: Servicio[]) => {
			this.servicios = services;
		});

		this.urlImageService.getServicios();
		this.servicesSub = this.urlImageService.getImagenUpdateListener()
		.subscribe((imagene: Image[]) => {
			this.imagenes = imagene;
		});

		this.calculadoraService.getPrestamosPagos();
		this.prestamosSub = this.calculadoraService.getPrestamoUpdateListener()
		.subscribe((prestamos: Prestamo[]) => {
			this.prestamos = prestamos;
			this.prestamoPagos = [];
			prestamos.forEach(element => {
				this.prestamoPagos.push({content: element.tipo});
			});
		});

		this.calculadoraService.getCertificados();
		this.certificadosSub = this.calculadoraService.getCertificadoUpdatedListener()
		.subscribe((certificados: Certificado[]) => {
			this.certificados = certificados;
			this.certi = [];
			certificados.forEach(element => {
				this.certi.push({content: element.tipo});
			});
			/* setTimeout(() => {
				this.prestamoCerti = certi;
				console.log(this.prestamoCerti);
			}, 1000); */
			this.prestamoCerti = this.certi;
		});

		// URL Servicios
		this.modelServicio = new TableModel();
		this.modelServicio.header = [
			new TableHeaderItem({data: 'Nombre'}),
			new TableHeaderItem({data: 'Url'}),
			new TableHeaderItem({data: 'Acciones' })
		];
		 this.selectPageServicio(1);

		// Imagenes Corrusel
		this.modelImagen = new TableModel();
		this.modelImagen.header = [
			new TableHeaderItem({data: 'Nombre'}),
			new TableHeaderItem({data: 'Imagen'}),
			new TableHeaderItem({data: 'Botón'}),
			new TableHeaderItem({data: 'Acciones'})
		];
		this.selectPageImagen(1);

		// Categorias
		this.modelCategoria = new TableModel();
		this.modelCategoria.header = [
			new TableHeaderItem({data: 'Nombre'}),
			new TableHeaderItem({data: 'Url'}),
			new TableHeaderItem({data: 'Acciones' })
		];
		this.selectPageCate(1);
	}


	openModal(btn: number) {
		switch (btn) {
			case 1:
				this.modalText = 'Modificar Información de Servicios';
				break;
			case 2:
				this.modalText = 'Añadir Servicio';
				this.servicioUrl = {
					'_id': '',
					'_rev': '',
					'nombre': '',
					'url': ''
				};
				break;
		}

		this.modalService.create({
			component: InputmodalComponent,
			inputs: {
				modalText: this.modalText,
				size: this.size,
				data: this.data,
				servicio: this.servicioUrl,
				btn: btn
			}
		});

	}
	openModalImagen(id: string, nombre: string, url: string) {

		this.modalService.create({
			component: InputmodalComponent,
			inputs: {
				modalText: this.modalText,
				inputValue: url,
				size: this.size,
				data: this.data,
				label: nombre,
				id: id,
				btn: 2
			}
		});

	}

	updatePrestamo(event) {

		this.prestamos.forEach(element => {
			if (element.tipo === event.item.content) {
				this.calcuPrestamo = element;
				this.minimo = element.min;
				this.maximo = element.max;
				this.dataF = element.data;
			}
		});
	}

	updateMoneda(event) {
		this.tipoMoneda = event.item.content;

		this.dataF.forEach(element => {
			if (element.moneda === event.item.content  ) {
				this.limite = element.limite;
				this.tasa = element.interes;
			}
		});
	}


	onChangeMin(event) {
		this.minimo = event.target.value;
	}
	onChangeMax(event) {
		this.maximo = event.target.value;
	}
	onChangeTasa(event){
		this.tasa = event.target.value;
	}
	onChangeLimite(event){
		this.limite = event.target.value;
	}
	updateCalculador() {
		this.calcuPrestamo.min = Number(this.minimo.toString().trim());
		this.calcuPrestamo.max = Number(this.maximo.toString().trim());
		if (this.tipoMoneda === 'Nuevos Soles') {
			this.calcuPrestamo.data[0].limite = Number(this.limite.toString().trim());
			this.calcuPrestamo.data[0].interes = Number(this.tasa.toString().trim());
		} else {
			this.calcuPrestamo.data[1].limite = Number(this.limite.toString().trim());
			this.calcuPrestamo.data[1].interes = Number(this.tasa.toString().trim());
		}
		this.calculadoraService.CalculadoraUpdate(this.calcuPrestamo._id, this.calcuPrestamo);
		this.nuevoCalculo();
		// window.alert('Sus cambios se grabaron exitosamente');

	}
	nuevoCalculo() {
		this.redirectTo('/administracion/servicios/');
	}

	redirectTo(uri: string) {
		this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
		this.router.navigate([uri]));
	}
	updateCertificado(event) {
		this.certificados.forEach(element => {
			if (element.tipo === event.item.content) {
				this.calcuCertificado = element;
				this.id = element._id;
				this.dataC = element.data;
			}
		});
	}
	updateMonedaCertificado(event){
		this.tipoMoneda2 = event.item.content;
		this.dataC.forEach(element => {
			if (element.moneda === event.item.content  ) {
			this.limite2 = element.limite;
			this.tasa2 = element.interes;
			}
		});
	}
	onChangeLimiteCertificado(event){
		this.limite2 = event.target.value;
	}
	onChangeTasaCertificado(event){
		this.tasa2 = event.target.value;
	}
	updateCertificad() {
		if ( this.tipoMoneda2 === 'Nuevos Soles') {
			this.calcuCertificado.data[0].limite = Number(this.limite2.toString().trim());
			this.calcuCertificado.data[0].interes = Number(this.tasa2.toString().trim());
		} else {
			this.calcuCertificado.data[1].limite = Number(this.limite2.toString().trim());
			this.calcuCertificado.data[1].interes = Number(this.tasa2.toString().trim());
		}
		this.calculadoraService.CertificadoUpdate(this.calcuCertificado._id, this.calcuCertificado);
		this.nuevoCertificado();
	}

	nuevoCertificado() {
		this.redirectTo('/administracion/servicios/');
	}

	// URL Servicios
	selectPageServicio(page) {
		this.prepareDataServicio(page);
		this.modelServicio.currentPage = page;
	}
	prepareDataServicio(page: number) {
	const dataServicio = [];
	this.cloudantService.getServiciosUrl().subscribe(
			(resp: any) => {

			if (resp.total_rows > 0 ) {
				this.modelServicio.totalDataLength = resp.total_rows;

				for (let i = (page - 1) * this.modelServicio.pageLength ; i < page * this.modelServicio.pageLength && i < this.modelServicio.totalDataLength; i++) {
				this.servicio = resp.rows[i].doc;

				dataServicio.push(
					[ new TableItem({data : this.servicio.nombre }),
					new TableItem({data : this.servicio.url }),
					new TableItem({data: { id: this.servicio._id, rev:this.servicio._rev }, template: this.overflowMenuItemTemplate})
					]
				);

				}

				this.modelServicio.data = dataServicio;
				this.skeletonservicio = false;

			}

		});
	}
	onRowClickServicio(index: number){
//		console.log(this.modelServicio.data[index]);
		this.servicioUrl = {
					'_id': this.modelServicio.data[index][2].data.id,
					'_rev': this.modelServicio.data[index][2].data.rev,
					'nombre': this.modelServicio.data[index][0].data,
					'url': this.modelServicio.data[index][1].data,
		};
	}

	deleteRow() {
		this.modalText = 'Suprimir Servicio';
		this.data = `el servicio ${this.servicioUrl.nombre}`;
		this.modalService.create({
			component: DeleteimagenComponent,
			inputs: {
				modalText: this.modalText,
				size: this.size,
				data: this.data,
				object: this.servicioUrl,
				btn: 1
			}
		});
	}
	//Imagenes Corrusel
	selectPageImagen(page) {
        this.mostrarImagenes(page);
        this.modelImagen.currentPage = page;
	}

	mostrarImagenes(page: number){
		const dataImagenes = [];
		this.cloudantService.getImagenesUrl().subscribe(
			(resp: any) => {
				if ( resp.total_rows > 0 ) {
					this.modelImagen.totalDataLength = resp.total_rows;

					for (let i = (page - 1) * this.modelImagen.pageLength ; i < page * this.modelImagen.pageLength && i < this.modelImagen.totalDataLength; i++) {

						this.urlImage = resp.rows[i].doc;

						dataImagenes.push(
							[
								new TableItem({ data : this.urlImage.nombre }),
								new TableItem({ data : this.urlImage.url}),
								new TableItem({ data : this.urlImage.url2}),
								new TableItem({data: { id: this.urlImage._id, rev:this.urlImage._rev }, template: this.overflowMenuTemplate})
							]

						);

				}

				this.modelImagen.data = dataImagenes;
				this.skeletonimagen = false;
			}
			}
			);
	}

	insertModalImagen(btn: number) {
		switch (btn) {
					case 1:
						this.modalText = 'Modificar Información de Imagen';
						break;
					case 2:
						this.modalText = 'Añadir Imagen';
						this.imagenModal = {
							'_id': '',
							'_rev': '',
							'nombre': '',
							'url': '',
							'url2': ''
						};
						break;
				}
				this.modalService.create({
					component: InsertmodalComponent,
					inputs: {
						modalText: this.modalText,
						size: this.size,
						data: this.data,
						urlImage: this.imagenModal,
						btn: btn
					}
				});

	}

	deleteModalImagen(){
		this.modalText = 'Suprimir Imagen';
		this.data = `la imagen ${this.imagenModal.nombre}`;
		this.modalService.create({
			component: DeleteimagenComponent,
			inputs: {
				modalText: this.modalText,
				size: this.size,
				data: this.data,
				object: this.imagenModal,
				btn: 2
			}
		});
	}

	onRowClickImagen(index: number) {
		this.imagenModal = {
			'_id': this.modelImagen.data[index][3].data.id,
			'_rev': this.modelImagen.data[index][3].data.rev,
			'nombre': this.modelImagen.data[index][0].data,
			'url': this.modelImagen.data[index][1].data,
			'url2': this.modelImagen.data[index][2].data,
		};
	}

	// Categorias
	selectPageCate(page) {
		this.prepareDataCate(page);
		this.modelCategoria.currentPage = page;
	  }
	prepareDataCate(page: number) {
	const dataCat = [];
	this.cloudantService.getCategorias().subscribe(
		(resp: any) => {
//			console.log(resp);
			if ( resp.total_rows > 0 ) {
			  this.modelCategoria.totalDataLength = resp.total_rows;

			  for (let i = (page - 1) * this.modelCategoria.pageLength ; i < page * this.modelCategoria.pageLength && i < this.modelCategoria.totalDataLength; i++) {
				this.categoriaup =resp.rows[i].doc;

				dataCat.push(
				  [ new TableItem({data : this.categoriaup.nombre }),
					new TableItem({data : this.categoriaup.url }),
					new TableItem({data: { id: this.categoriaup._id, rev:this.categoriaup._rev  }, template: this.overflowTemplate})
				  ]
				);

			  }

			  this.modelCategoria.data = dataCat;
			  this.skeletoncate = false;
			}

		  });
	}

	//CLICKROWCATGORIA
	onRowClickCate(index: number) {
			this.categoriaModal = {
				'_id':  this.modelCategoria.data[index][2].data.id,
				'_rev':   this.modelCategoria.data[index][2].data.rev,
				'nombre': this.modelCategoria.data[index][0].data,
				'url':    this.modelCategoria.data[index][1].data, };
	//			console.log(this.modelCategoria.data[index]);
	}

	openModalCategoria(btn: number) {
		switch (btn) {
					case 1:
						this.modalText = 'Modificar Información de Categoria';
						break;
					case 2:
						this.modalText = 'Añadir Categoria';
						this.categoriaModal = {
							'_id': '', 
							'_rev': '',
							'nombre': '',
							'url': '' 
						};
						break;
				}
				this.modalService.create({
					component: CategoriamodalComponent,
					inputs: {
						modalText: this.modalText,
						size: this.size,
						data: this.data,
						categoriaup:this.categoriaModal,
						btn: btn
					}
				});

	}
	//BORRAR CATEGORIA
	deleteCategoria() {
			this.modalText = 'Suprimir Categoria';
			this.data = `la categoria ${this.categoriaModal.nombre}`;
			this.modalService.create({
				component: DeleteimagenComponent,
				inputs: {
					modalText: this.modalText,
					size: this.size,
					data: this.data,
					object: this.categoriaModal,
					btn: 4
				}
			});
	}

}
