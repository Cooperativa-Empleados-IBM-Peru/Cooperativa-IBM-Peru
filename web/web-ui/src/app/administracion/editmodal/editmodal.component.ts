import { Component, Inject } from '@angular/core';
import { BaseModal, ModalService, NotificationDisplayService, NotificationService } from 'carbon-components-angular';
import { SocioService } from '../listasocios/socio.service';
import { Router } from '@angular/router';
import { Db2Service } from '../../services/db2.service';
@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrls: ['./editmodal.component.scss']
})
export class EditmodalComponent extends BaseModal {

	activo: string;
	blue: string;
	comp = 'IBM';
  constructor(
    @Inject('modalText') public modalText,
	@Inject('size') public size,
	@Inject('data') public data,
	@Inject('socio') public socio,
    protected modalService: ModalService,
	public socioService: SocioService,
	private router: Router,
	public db2Service: Db2Service,
	protected notificationService: NotificationService,
    protected notificationDisplayService: NotificationDisplayService
  ) { super();

	}

	onChangeCodEmp(event) {
		this.socio.codempleado = event.target.value;
	}

	onChangeCodPais(event) {
		this.socio.codpais = event.target.value;
	}
	onChangeCompany(event) {
		this.comp = event.target.value;
	}

  	onChangeEmail(event) {
		this.socio.emailempleado = event.target.value;
	}
	onChangeEmail2(event) {
		this.socio.emailempleado2 = event.target.value;
	}
  	onChangeName(event) {
		this.socio.nombreempleado = event.target.value;
	}
	onChangeActivo(event) {
	//	console.log(event.value);
		this.activo = event.value;
	}
	onChangeBlue(event) {
		this.blue = event.value;
	}
	updateSelected(event) {
	//	console.log(event.item.content);
	}

	saveSocio(btn: number) {
		if (this.activo) {this.socio.activo = (this.activo.trim() === 'si') ? true : false; }
		if (this.blue) { this.socio.inbluepages = (this.blue.trim() === 'si') ? true : false; }
		this.socio.company = this.comp.trim();

		this.socio.fecmodificacion =  new Date().toISOString();

		if (btn === 1) {

			this.db2Service.updateSocio(this.socio.uuid.trim(), this.socio).subscribe((response: any) => {
				this.redirectTo('/administracion/listasocios');
				this.modalService.destroy();
				setTimeout(() => {
					this.showNotification(1);
				}, 2000);
			});
		} else {
			this.socio.uuid = this.db2Service.generateUUID();

			this.db2Service.addSocio(this.socio).subscribe(() => {

				this.redirectTo('/administracion/listasocios');
				this.modalService.destroy();
				setTimeout(() => {
					this.showNotification(2);
				}, 2000);
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
