import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	BreadcrumbModule,
	GridModule,
	TabsModule,
	LoadingModule,
	TableModule,
	LinkModule,
	ModalModule,
	ButtonModule,
	InputModule,
	ModalService,
	PlaceholderModule,
	PlaceholderService,
	DialogModule,
	PaginationModule,
	SearchModule,
	ComboBoxModule,
	RadioModule,
	NotificationModule,
	NotificationService,
 	NotificationDisplayService
} from 'carbon-components-angular';
import { EditModule, AddModule, CheckmarkFilledModule } from '@carbon/icons-angular';
import { AdministracionRoutingModule } from './administracion-routing.module';
import { ListasociosComponent } from './listasocios/listasocios.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { InputmodalComponent } from './inputmodal/inputmodal.component';
import { EditmodalComponent } from './editmodal/editmodal.component';
import { DeletemodalComponent } from './deletemodal/deletemodal.component';
import { InsertmodalComponent } from './insertmodal/insertmodal.component';
import { DeleteimagenComponent } from './deleteimagen/deleteimagen.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { InsertproveedorComponent } from './proveedor/insertproveedor/insertproveedor.component';
import { CategoriamodalComponent } from './categoriamodal/categoriamodal.component';

import { QuillModule } from "ngx-quill";

@NgModule({
	declarations: [ListasociosComponent, ServiciosComponent, InputmodalComponent, EditmodalComponent, DeletemodalComponent, InsertmodalComponent, DeleteimagenComponent, ProveedorComponent, InsertproveedorComponent, CategoriamodalComponent],
	imports: [
		CommonModule,
		AdministracionRoutingModule,
		BreadcrumbModule,
		GridModule,
		TabsModule,
		LoadingModule,
		TableModule,
		LinkModule,
		ModalModule,
		ButtonModule,
		InputModule,
		PlaceholderModule,
		EditModule,
		DialogModule,
		PaginationModule,
		SearchModule,
		AddModule,
		ComboBoxModule,
		RadioModule,
		NotificationModule,
		CheckmarkFilledModule,
		QuillModule.forRoot({
			modules: {
			  toolbar: {
				container: [
				  [{ 'size': ['small', false, 'large'] }],
				  ['bold', 'italic', 'underline', 'strike'],
				  [{ 'header': 1 }, { 'header': 2 }],
				  [  { 'list': 'bullet' }],
				  [{ 'script': 'sub' }, { 'script': 'super' }],
				  [{ 'indent': '-1' }, { 'indent': '+1' }],
				  [{ 'direction': 'rtl' }],
				  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
				  [{ 'font': [] }],
				  [{ 'align': [] }],
				  ['clean'],
				],


				},
			  },
			}),

		QuillModule
	],
	providers: [ModalService, PlaceholderService, NotificationService, NotificationDisplayService]
})
export class AdministracionModule { }
