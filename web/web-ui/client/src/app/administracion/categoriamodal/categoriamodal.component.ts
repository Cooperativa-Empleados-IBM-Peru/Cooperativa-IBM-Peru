import { Component, Inject } from '@angular/core';
import { BaseModal, ModalService, NotificationDisplayService, NotificationService } from 'carbon-components-angular'; 
import { Categoria } from '../../avisos/proveedores/categoria.model'; 
import { CategoriaService } from '../../avisos/proveedores/categoria.service';  
import { CloudantService } from 'src/app/services/cloudant.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-categoriamodal',
  templateUrl: './categoriamodal.component.html',
  styleUrls: ['./categoriamodal.component.scss']
})
export class CategoriamodalComponent extends BaseModal {

	nombre:string;
	url:string;
	categoria:Categoria;
	categorias: Categoria [] = [];

  constructor(
  	@Inject('modalText') public modalText,
	@Inject('size') public size,
	@Inject('data') public data,
	@Inject('categoriaup') public categoriaup,
	@Inject('btn') public btn,
  
  public categoriaService: CategoriaService,
  public cloudantService: CloudantService,
  protected modalService: ModalService,
  private router: Router, 
	protected notificationService: NotificationService,
  protected notificationDisplayService: NotificationDisplayService
  ) { super();

	}

	  onChangeNombreCate(event) {
		this.nombre  = event.target.value;
	}

	  onChangeUrlCate(event) {
		this.url = event.target.value;
	}

	guardarUpdateCategoria() {  
        if ( this.btn === 1) { 
			if(this.nombre) { this.categoriaup.nombre = this.nombre; }
            if(this.url) { this.categoriaup.url = this.url; } 
            this.cloudantService.updateCategoria(this.categoriaup._id, this.categoriaup).subscribe((response: any)=>{
                this.categoriaup._rev = response.rev;
  //              console.log('Categoria updated');
                this.redirectTo('/administracion/servicios');
                this.modalService.destroy();
            });
		} else {
            if(this.nombre) { this.categoriaup.nombre = this.nombre; }
            if(this.url) { this.categoriaup.url = this.url; } 
            const data = {'nombre': this.nombre, 'url': this.url}
         	this.cloudantService.insertCategoria(data).subscribe((response: any)=>{
   //             console.log('new service');
                this.redirectTo('/administracion/servicios');
                this.modalService.destroy();
            }); 
		}
	}

	redirectTo(uri: string) {
		this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
		this.router.navigate([uri]));
  }
  
	showNotification(btn: number) {
		switch (btn) {
			case 1:
				this.notificationService.showToast ({
					type: 'success',
					title: 'Excelente',
					subtitle: 'Se han realizado los cambios'  ,
					target: '.notification-container',
					duration: 6000
				});
				break;
			case 2:
				this.notificationService.showNotification ({
					type: 'success',
					title: 'Excelente',
					subtitle: 'Se han añadido un nuevo socio'  ,
					target: '.notification-container',
					duration: 6000
				});
				break; 
		}
	}

}
