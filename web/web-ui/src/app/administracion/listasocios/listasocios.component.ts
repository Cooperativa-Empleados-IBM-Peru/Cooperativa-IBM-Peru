import { Component, OnInit, ViewChild, TemplateRef, Inject, LOCALE_ID, Input } from '@angular/core';
import { Router } from '@angular/router';
import {  Observable, Subject, Subscription } from 'rxjs';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { CoopeSocios } from '../../classes/coopesocios';
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
import { EditmodalComponent } from '../editmodal/editmodal.component';
import { DeletemodalComponent } from '../deletemodal/deletemodal.component';

import { SocioService } from './socio.service';

@Component({
  selector: 'app-listasocios',
  templateUrl: './listasocios.component.html',
  styleUrls: ['./listasocios.component.scss']
})
export class ListasociosComponent implements OnInit {

  sociosIbmer: CoopeSocios[];
	 private sociosSub: Subscription;
	 // tslint:disable-next-line: member-ordering
	 id: String;

  	socios = [];
	dataSocios: any;			//para searchSociosIbm

	modelSocios: TableModel;	//para searchSociosIbm
	modelIbmer: TableModel;
	skeletonIbmer = Table.skeletonModel(6, 4);
	skeletonibmer = true;

	modelKyndryl: TableModel;
	skeletonKyndryl = Table.skeletonModel(6, 4);
	skeletonkyndryl = true;

  // dataExibmer = [];
	jubilados = [];
	dataJubilados: any;				//para searchJubilados
	modelJubilados: TableModel;		//para serachJubilados
	modelExibmer: TableModel;
	skeletonExibmer = Table.skeletonModel(6, 4);
	skeletonexibmer = true;

	modelExSocio: TableModel;
	skeletonExSocio = Table.skeletonModel(6, 4);
	skeletonexsocio = true;

	socioCoope: CoopeSocios;
	socio : CoopeSocios;

  @Input() modalText;
  @Input() activo;
  @Input() blue;
  @Input() disable;
  @Input() size = 'default';
  protected data: Observable<string> = new Subject<string>();

  constructor(
	public ibmidservice: IbmidService,
	public db2service: Db2Service,
  	protected modalService: ModalService,
  	public socioService: SocioService,
	private router: Router
  ) { }

	@ViewChild("overflowMenuItemTemplate", { static: false})
	protected overflowMenuItemTemplate: TemplateRef<any>;

  ngOnInit(): void {

    if (!this.ibmidservice.LoggedIn || !this.ibmidservice.IsAdmin) {
			this.router.navigate(['/']);
	} else {

      	this.modelIbmer = new TableModel();
		this.modelIbmer.header = [
			new TableHeaderItem({data: 'Cod. Socio'}),
			new TableHeaderItem({data: 'Email'}),
			new TableHeaderItem({data: 'Nombre'}),
			new TableHeaderItem({data: 'Acciones' })
		];

	  	this.modelKyndryl =  new TableModel();
	  	this.modelKyndryl.header = [
			new TableHeaderItem({data: 'Cod. Socio'}),
		  	new TableHeaderItem({data: 'Email'}),
		  	new TableHeaderItem({data: 'Nombre'}),
		  	new TableHeaderItem({data: 'Acciones' })
	  	];

      	this.modelExibmer = new TableModel();
		this.modelExibmer.header = [
			new TableHeaderItem({data: 'Cod. Socio'}),
			new TableHeaderItem({data: 'Email'}),
			new TableHeaderItem({data: 'Nombre'}),
        	new TableHeaderItem({data: 'Acciones' })
		];
/*	  
		this.modelJubilados =  new TableModel();
	  	this.modelJubilados.header = [
		  	new TableHeaderItem({data: 'Cod. Socio'}),
		  	new TableHeaderItem({data: 'Email'}),
		  	new TableHeaderItem({data: 'Nombre'}),
		  	new TableHeaderItem({data: 'Acciones' })
	  	];
*/	  
		this.modelExSocio = new TableModel();
		this.modelExSocio.header = [
			new TableHeaderItem({data: 'Cod. Socio'}),
			new TableHeaderItem({data: 'Email'}),
			new TableHeaderItem({data: 'Nombre'}),
        	new TableHeaderItem({data: 'Acciones' })
		];

      	this.selectPageIbmer(1);
	  	this.selectPageKyndryl(1);
	  	this.selectPageExIbmer(1);
	  	this.selectPageExSocio(1);
/*
	  this.db2service.getIbmers().subscribe(
        (resp: any) => {

          if (resp.length > 0 ) {

            for (var i = 0; i < resp.length; i++) {
              this.socio = resp[i];

              this.socios.push(
                [	new TableItem({data : this.socio.codempleado }),
                  new TableItem({data : this.socio.emailempleado }),
                  new TableItem({data : this.socio.nombreempleado }),
                  new TableItem({data: { id: this.socio.uuid }, template: this.overflowMenuItemTemplate})
                ]
              );

            }

            this.modelSocios.data = this.socios;
          }

		});

		this.db2service.getExibmers().subscribe(
			(resp: any) => {

			  if (resp.length > 0 ) {

				for (var i = 0; i < resp.length; i++) {
				  this.socio = resp[i];

				  this.jubilados.push(
					[	new TableItem({data : this.socio.codempleado }),
					  new TableItem({data : this.socio.emailempleado }),
					  new TableItem({data : this.socio.nombreempleado }),
					  new TableItem({data: { id: this.socio.uuid }, template: this.overflowMenuItemTemplate})
					]
				  );

				}


				this.modelJubilados.data = this.jubilados;
			  }

		});
*/
    }

  }

  //Socios Empleados IBM
  selectPageIbmer(page) {
    this.prepareDataIbmer(page);
    this.modelIbmer.currentPage = page;
  }

  prepareDataIbmer(page: number) {
	const dataIbmer = [];

    this.db2service.getSociosIbm().subscribe(
      (resp: any) => {

        if (resp.length > 0 ) {
          this.modelIbmer.totalDataLength = resp.length;
          // tslint:disable-next-line: max-line-length
          for (let i = (page - 1) * this.modelIbmer.pageLength ; i < page * this.modelIbmer.pageLength && i < this.modelIbmer.totalDataLength; i++) {
            this.socio = resp[i];

            dataIbmer.push(
              [ new TableItem({data : this.socio.codempleado }),
                new TableItem({data : this.socio.emailempleado }),
                new TableItem({data : this.socio.nombreempleado }),
                new TableItem({data: { id: this.socio.uuid }, template: this.overflowMenuItemTemplate})
              ]
            );

          }

          this.modelIbmer.data = dataIbmer;
          this.skeletonibmer = false;

        }

	  });

  }

  //Socios empleados KYNDRYL
  selectPageKyndryl(page) {
    this.prepareDataKyndryl(page);
    this.modelKyndryl.currentPage = page;
  }

  prepareDataKyndryl(page: number) {
	const dataKyndryl = [];

    this.db2service.getSociosKyndryl().subscribe(
      (resp: any) => {

        if (resp.length > 0 ) {
          this.modelKyndryl.totalDataLength = resp.length;
          // tslint:disable-next-line: max-line-length
          for (let i = (page - 1) * this.modelKyndryl.pageLength ; i < page * this.modelKyndryl.pageLength && i < this.modelKyndryl.totalDataLength; i++) {
            this.socio = resp[i];

            dataKyndryl.push(
              [ new TableItem({data : this.socio.codempleado }),
                new TableItem({data : this.socio.emailempleado }),
                new TableItem({data : this.socio.nombreempleado }),
                new TableItem({data: { id: this.socio.uuid }, template: this.overflowMenuItemTemplate})
              ]
            );

          }

          this.modelKyndryl.data = dataKyndryl;
          this.skeletonkyndryl = false;

        }

	  });

  }

  //Socios EX empleados IBM KYNDRYL
  selectPageExIbmer(page) {
  	this.prepareDataExIbmer(page);
    this.modelExibmer.currentPage = page;
  }

  prepareDataExIbmer(page: number) {
  const dataExibmer = [];
  this.db2service.getSociosExEmpleados().subscribe(
        (resp: any) => {

          if (resp.length > 0 ) {
            this.modelExibmer.totalDataLength = resp.length;

            for (let i = (page - 1) * this.modelExibmer.pageLength ; i < page * this.modelExibmer.pageLength && i < this.modelExibmer.totalDataLength; i++) {
              this.socio = resp[i];

              dataExibmer.push(
                [ new TableItem({data : this.socio.codempleado }),
                  new TableItem({data : this.socio.emailempleado }),
                  new TableItem({data : this.socio.nombreempleado }),
                  new TableItem({data: { id: this.socio.uuid }, template: this.overflowMenuItemTemplate})
                ]
              );

            }

            this.modelExibmer.data = dataExibmer;
            this.skeletonexibmer = false;

          }

        });
  }

  //Ex Socios
  selectPageExSocio(page) {
	this.prepareDataExSocio(page);
    this.modelExSocio.currentPage = page;
  }

  prepareDataExSocio(page: number) {
	const dataExSocio = [];
	this.db2service.getExsocios().subscribe(
		(resp: any) => {
			if (resp.length > 0 ) {
				this.modelExSocio.totalDataLength = resp.length;

				for (let i = (page - 1) * this.modelExSocio.pageLength ; i < page * this.modelExSocio.pageLength && i < this.modelExSocio.totalDataLength; i++) {
				  this.socio = resp[i];

				  dataExSocio.push(
					[ new TableItem({data : this.socio.codempleado }),
					  new TableItem({data : this.socio.emailempleado }),
					  new TableItem({data : this.socio.nombreempleado }),
					  new TableItem({data: { id: this.socio.uuid }, template: this.overflowMenuItemTemplate})
					]
				  );
				}
				this.modelExSocio.data = dataExSocio;
				this.skeletonexsocio = false;

			  }
		}
	);
  }

//Socios empleados IBM
  searchSociosIbm(value) {
	this.searchValueSociosIbm(this.modelSocios, value);
 }
  searchValueSociosIbm(model, value: string) {
	if (value) {
		this.dataSocios = model.data.filter(item => {
			// tslint:disable-next-line: max-line-length
			return (item[0].data.toLowerCase().includes(value.toLowerCase()) || item[1].data.toLowerCase().includes(value.toLowerCase()) || item[2].data.toLowerCase().includes(value.toLowerCase()));
		});
		this.modelIbmer.totalDataLength = this.dataSocios.length;
		this.modelIbmer.data = this.dataSocios;
	}
 }
 clearSearchSociosIbm() {
	this.skeletonibmer = true;
	this.selectPageIbmer(1);
 }

//Socios ex empleados IBM KYNDRYL
  searchJubilados(value: string) {
	this.searchValueJubilado(this.modelJubilados, value);
  }
  searchValueJubilado(model, value: string) {

	if (value) {
		this.dataJubilados = model.data.filter(item => {
			// tslint:disable-next-line: max-line-length
			return (item[0].data.toLowerCase().includes(value.toLowerCase()) || item[1].data.toLowerCase().includes(value.toLowerCase()) || item[2].data.toLowerCase().includes(value.toLowerCase()));
		});
		this.modelExibmer.totalDataLength = this.dataJubilados.length;
		this.modelExibmer.data = this.dataJubilados;
	}
  }

  clearSearchJubilados() {
	  this.skeletonexibmer = true;
	  this.selectPageExIbmer(1);
  }

  openModal(btn: number) {
    switch (btn) {
      case 1:
        this.modalText = 'Modificar Información de Socio';
        break;
      case 2:
		this.modalText = 'Añadir Socio';
		this.socioCoope = {
			'activo': true,
			'codempleado': '',
			'codpais': '',
			'emailempleado': '',
			'emailempleado2': '',
			'fecmodificacion': '',
			'inbluepages': true,
			'isadmin': false,
			'nombreempleado': '',
			'uuid': ''
		};

        break;
    }
		this.modalService.create({
			component: EditmodalComponent,
			inputs: {
				modalText: this.modalText,
				size: this.size,
				data: btn,
				socio: this.socioCoope
			}
		});

	}

  	onRowClickIbmer(index: number) {
	//	console.log('Row item selected:', index);
		this.id = this.modelIbmer.data[index][3].data.id;

		this.db2service.getSocioById(this.id.trim()).subscribe(
			(resp: any) => {
				if (resp) {
					this.socioCoope = resp;
					this.socioCoope.codempleado = this.socioCoope.codempleado.trim();
					this.socioCoope.codpais = this.socioCoope.codpais.trim();
					this.socioCoope.emailempleado = this.socioCoope.emailempleado.trim();
					this.socioCoope.emailempleado2 = this.socioCoope.emailempleado2.trim();
					this.socioCoope.nombreempleado = this.socioCoope.nombreempleado.trim();
	//	console.log(this.socioCoope);
				}
		});

	}
	onRowClickExIbmer(index: number) {
	//	console.log('Row item selected:', index);
		this.id = this.modelExibmer.data[index][3].data.id;
	//	console.log(this.id);
		this.db2service.getSocioById(this.id.trim()).subscribe(
			(resp: any) => {

				if (resp) {

					this.socioCoope = resp;
					this.socioCoope.codempleado = this.socioCoope.codempleado.trim();
					this.socioCoope.codpais = this.socioCoope.codpais.trim();
					this.socioCoope.emailempleado = this.socioCoope.emailempleado.trim();
					this.socioCoope.emailempleado2 = this.socioCoope.emailempleado2.trim();
					this.socioCoope.nombreempleado = this.socioCoope.nombreempleado.trim();
					// console.log(this.socioCoope);
				}
		});
	}

	onRowClickExSocio(index: number) {
	//	console.log('Row item selected:', index);
		this.id = this.modelExSocio.data[index][3].data.id;

		this.db2service.getExSociobyId(this.id.trim()).subscribe(
			(resp: any) => {
				if (resp) {
					this.socioCoope = resp;
					this.socioCoope.codempleado = this.socioCoope.codempleado.trim();
					this.socioCoope.codpais = this.socioCoope.codpais.trim();
					this.socioCoope.emailempleado = this.socioCoope.emailempleado.trim();
					this.socioCoope.emailempleado2 = this.socioCoope.emailempleado2.trim();
					this.socioCoope.nombreempleado = this.socioCoope.nombreempleado.trim();
	//				console.log(this.socioCoope);
				}
		});
	}

	deleteSocio() {
		this.modalText = 'Suprimir socio';
		this.modalService.create({
			component: DeletemodalComponent,
			inputs: {
				modalText: this.modalText,
				size: this.size,
				socio: this.socioCoope
			}
		});
	}
	redirectTo(uri: string) {
		this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
		this.router.navigate([uri]));
	 }
}
