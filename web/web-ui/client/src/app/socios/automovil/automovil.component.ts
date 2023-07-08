import { Component, OnInit, Inject, LOCALE_ID, ViewChild, TemplateRef } from '@angular/core';
import { DecimalPipe,formatNumber, formatDate } from '@angular/common';
import { IbmidService } from '../../services/ibmid.service';
import { Db2Service } from '../../services/db2.service';
import { Router } from '@angular/router';
import {
	Table,
	TableModel,
	TableItem,
  TableHeaderItem
} from 'carbon-components-angular';
import { Fra } from '../../classes/fra';
import { Siniestros } from '../../classes/siniestros';

@Component({
  selector: 'app-automovil',
  templateUrl: './automovil.component.html',
  styleUrls: ['./automovil.component.scss']
})
export class AutomovilComponent implements OnInit {

  dataAutomoviles = [];
	modelAutomoviles: TableModel;
	skeletonAutomoviles = Table.skeletonModel(5, 6);
  skeletonautomoviles = true;

  dataSiniestros = [];
	modelSiniestros: TableModel;
	skeletonSiniestros = Table.skeletonModel(5, 6);
	skeletonsiniestros = true;

  	automovil: Fra;
  	siniestro: Siniestros;
 	dateSiniestro: Date;
  	dateIngreso: Date;
	notificationObject = {
		type: 'error',
		title: 'Notificación',
		message: 'Usted no cuenta con automóviles registrados',
		showClose: false,
		lowContrast: false
	};
	isauto: number;
	notiObject = {
		type: 'error',
		title: 'Notificación',
		message: 'Usted no cuenta con siniestros registrados',
		showClose: false,
		lowContrast: false
	};
	isSiniestro: number;
  constructor(public ibmidservice : IbmidService,
    public db2service : Db2Service,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
    ) { }

  @ViewChild("tautomovil")
  protected tautomovil: TemplateRef<any>;

  @ViewChild("tsiniestro")
  protected tsiniestro: TemplateRef<any>;

  ngOnInit(): void {

    if (!this.ibmidservice.LoggedIn) {
			this.router.navigate(['/']);
		} else {

      this.modelAutomoviles = new TableModel();
			this.modelAutomoviles.header = [
				new TableHeaderItem({data: 'Placa'}),
				new TableHeaderItem({data: 'Marca'}),
				new TableHeaderItem({data: 'Modelo'}),
				new TableHeaderItem({data: 'Clase'}),
				new TableHeaderItem({data: 'Año'}),
				new TableHeaderItem({data: 'Valor'}),
			];

      this.modelSiniestros = new TableModel();
			this.modelSiniestros.header = [
				new TableHeaderItem({data: 'Placa'}),
				new TableHeaderItem({data: 'Código'}),
				new TableHeaderItem({data: 'Número'}),
				new TableHeaderItem({data: 'Fecha'}),
				new TableHeaderItem({data: 'Descripción'}),
				new TableHeaderItem({data: 'Costo'}),
			];

      this.db2service.getFra(this.ibmidservice.CodEmpleado).subscribe(
        (resp: any) => {
			this.isauto = resp.length;
          if (resp.length > 0 ) {

            //fill table detalle
            for (var i = 0; i < resp.length; i++) {
              this.automovil = resp[i];

              this.dateIngreso = new Date(this.automovil.fecinscripcion.trim());

              this.dataAutomoviles.push(
                [	new TableItem({data : this.automovil.placa.trim(),
                  expandedData: {serie : this.automovil.serie, motor : this.automovil.motor,
                                 propietario : this.automovil.propietario, tarjeta : this.automovil.tarjeta,
                                 fecingreso : formatDate( this.dateIngreso, 'dd-MM-yyyy', this.locale),
                                 accesorios : formatNumber( this.automovil.accesorios, this.locale,'1.2-2') },
                  expandedTemplate: this.tautomovil
                }),
                new TableItem({data : this.automovil.marca.trim() }),
                new TableItem({data : this.automovil.modelo.trim() }),
                new TableItem({data : this.automovil.clase.trim() }),
                new TableItem({data : this.automovil.annofabricacion }),
                new TableItem({data : formatNumber( this.automovil.valor, this.locale,'1.2-2'), className: "titem-right" }),
              ]
							);

            }

          }

          this.modelAutomoviles.data = this.dataAutomoviles;
          this.skeletonautomoviles = false;

        }
      );


      this.db2service.getSiniestros(this.ibmidservice.CodEmpleado).subscribe(
        (resp: any) => {
			this.isSiniestro = resp.length;
          if (resp.length > 0 ) {

            //fill table detalle
            for (var i = 0; i < resp.length; i++) {
              this.siniestro = resp[i];

              this.dateSiniestro = new Date(this.siniestro.fecsiniestro.trim());

              this.dataSiniestros.push(
                [	new TableItem({data : this.siniestro.placa.trim(),
                  expandedData: {estado : this.siniestro.estado, lugar : this.siniestro.lugar,
                    franquicia : this.siniestro.franquicia, comisaria : this.siniestro.comisaria,
                    conformidad : this.siniestro.numconformidad
                   },
                  expandedTemplate: this.tsiniestro
                }),
                new TableItem({data : this.siniestro.codigo.trim() }),
                new TableItem({data : this.siniestro.numero.trim() }),
                new TableItem({data : formatDate( this.dateSiniestro, 'dd-MM-yyyy', this.locale) }),
                new TableItem({data : this.siniestro.descripcion.trim() }),
                new TableItem({data : formatNumber( this.siniestro.importe, this.locale,'1.2-2'), className: "titem-right" }),
              ]
							);

            }

          }

          this.modelSiniestros.data = this.dataSiniestros;
          this.skeletonsiniestros = false;

        }
      );


    }

  }

}
