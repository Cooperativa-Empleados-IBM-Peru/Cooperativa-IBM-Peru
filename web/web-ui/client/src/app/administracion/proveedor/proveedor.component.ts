import { Component, OnInit, ViewChild, TemplateRef, Inject, LOCALE_ID, Input } from '@angular/core';
import {  Observable, Subject, Subscription } from 'rxjs';
import { IbmidService } from '../../services/ibmid.service';
import { Router } from '@angular/router';
import { DeleteimagenComponent } from '../deleteimagen/deleteimagen.component';
import { Proveedor} from '../../avisos/proveedores/proveedor.model';
import { elementAt } from 'rxjs/operators';
import { ProveedorService} from '../../avisos/proveedores/proveedor.service';
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

import { CloudantService } from '../../services/cloudant.service';
import { EditmodalComponent } from '../editmodal/editmodal.component';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent implements OnInit {


    proveedores :Proveedor[]=[];
	prov=[];
	cate=[];
	descripcion : String;
	especificaciones:String;
	imagen : String;
	catalogo:String;
    id : String;
	datos : any;
	tipoproveedor:String;
	categoria:String;
	dataProveedores: any;
	modelProveedores: TableModel;
	prove : Proveedor;
	proveedorCoope: Proveedor;
	skeletonIbmer = Table.skeletonModel(10, 3);
	skeletonibmer = true;
	copia: any;
	proveedormodal: any;

	  private proveedor: Subscription;

	  @Input() modalText;
	  @Input() data;
	  @Input() size = 'default';

	  constructor(protected modalService: ModalService,
				  public ibmidservice: IbmidService,
				  public ProveedorService:ProveedorService,
				  public CloudantService:CloudantService,
				  private router: Router) { }

	  @ViewChild("overflowMenuItemTemplate", { static: false})
	  protected overflowMenuItemTemplate: TemplateRef<any>;

  ngOnInit(): void {
	this.descripcion = '';
		this.imagen ='';
		this.catalogo = '';
		this.categoria= '';
		this.especificaciones= '';


		/* this.ProveedorService.getProveedores();
		this.proveedor = this.ProveedorService.getProveedorUpdateListener()

		.subscribe((proveedores:Proveedor[])=> {

				console.log(this.proveedores);
				this.proveedores = proveedores;
				this.prov = [];
				this.cate=[];
				proveedores.forEach(element=>{

					this.prov.push({
						content:element.nombre
					});

					this.cate.push({
						content:element.categoria
					});

				});

		});

		this.ProveedorService.getProveedores(); */



		this.modelProveedores = new TableModel();
		this.modelProveedores.header = [
				  // new TableHeaderItem({data: 'Id Proveedor'}),
				  new TableHeaderItem({data: 'Nombre del Proveedor'}),
				  new TableHeaderItem({data: 'Categoria'}),
				  // new TableHeaderItem({data: 'Activo'}),
				  new TableHeaderItem({data: 'Acciones' })
		];

		// this.modelProveedores.data=this.dataProveedores;
		// this.skeletonibmer = false;
		this.selectPageProveedor(1);


  }

  selectPageProveedor(page) {
	this.prepareDataProveedor(page);
	this.modelProveedores.currentPage = page;
  }
  prepareDataProveedor(page: number) {
	const dataProveedores = [];

	  this.CloudantService.getProveedores().subscribe(
		(resp: any) => {
	//	console.log(resp);
		  if (resp.total_rows > 0 ) {
			//this.copia = resp.rows;
			//console.log(this.copia);
			this.modelProveedores.totalDataLength = resp.total_rows;
			// tslint:disable-next-line: max-line-length
			for (let i = (page - 1) * this.modelProveedores.pageLength ; i < page * this.modelProveedores.pageLength && i < this.modelProveedores.totalDataLength; i++) {
			  this.prove = resp.rows[i].doc;

			  dataProveedores.push(
				[
				  new TableItem({data : this.prove.nombre }),
				  new TableItem({data : this.prove.categoria }),
				new TableItem({data: { id: this.prove._id, rev: this.prove._rev }, template: this.overflowMenuItemTemplate})

				]
			  );

			}

			this.modelProveedores.data = dataProveedores;
			this.skeletonibmer = false;

		  }

	  });
	}

	onRowClickProveedor(index: number){
		this.proveedormodal = {
			'_id': this.modelProveedores.data[index][2].data.id,
			'_rev': this.modelProveedores.data[index][2].data.rev,
			'nombre': this.modelProveedores.data[index][0].data,
			'categoria': this.modelProveedores.data[index][1].data,
		};
	 }

	 editProveedor(btn: number){
		if(btn === 1) {
			this.router.navigate(['administracion/editar-proveedor', this.proveedormodal._id]);
		} else {
			this.router.navigate(['administracion/editar-proveedor']);
		}

	 }
	 deleteProveedor(){
		 /* this.modalService.create({
			component: DeleteimagenComponent,
			inputs:{
				modalText: this.modalText,
				size: this.size,
				proveedorCoope: this.proveedormodal,
			}

		 }); */

		this.modalText = 'Suprimir Proveedor';
		this.data = `el proveedor ${this.proveedormodal.nombre}`;
		this.modalService.create({
			component: DeleteimagenComponent,
			inputs: {
				modalText: this.modalText,
				size: this.size,
				data: this.data,
				object: this.proveedormodal,
				btn: 3
			}
		});


	 }

	 redirectTo(uri: string) {
		this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
		this.router.navigate([uri]));
	 }

}
