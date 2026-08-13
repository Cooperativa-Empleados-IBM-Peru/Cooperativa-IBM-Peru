import { Component, Inject, OnInit } from '@angular/core';
import { ProveedorService } from '../../../avisos/proveedores/proveedor.service';
import { Proveedor } from '../../../avisos/proveedores/proveedor.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CloudantService } from '../../../services/cloudant.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

//DESCRIPCION
import { CustomOption, EditorChangeContent, EditorChangeSelection } from "ngx-quill";

@Component({
  selector: 'app-insertproveedor',
  templateUrl: './insertproveedor.component.html',
  styleUrls: ['./insertproveedor.component.scss']
})
export class InsertproveedorComponent implements OnInit {
	proveedor :Proveedor[]=[];
	_id: String;
	nombre : String;
	descripcion : String;
	especificaciones : String;
	categoria = [];
	data : any;
	placeholder= '';
	activo: String;
	image:String;
	catalogo: string;
	  pedido: string;
	  contacto: string;
	  url:String;
	proveedorId: string;
	proveedores: Proveedor;
	titulo: string;
	private proveedorSub: Subscription;

	constructor( private router: Router,
	  private ProveedorService: ProveedorService,
		public cloudantService: CloudantService,
	  public proveedorService: ProveedorService,
	  public route: ActivatedRoute) { }

	ngOnInit(): void {
	 /*  this._id = " ";
	  this.nombre = " ";
	  this.descripcion = " ";
	  this.especificaciones= " "; */
	  this.categoria= [];

	  this.ProveedorService.getProveedores();

	  this.proveedorSub = this.ProveedorService.getProveedorUpdateListener()
	  .subscribe((llenar : Proveedor[]) =>{

		this.proveedor = llenar;
		this.categoria=[];
		llenar.forEach(element =>{
		  this.categoria.push(
			{
			  content: element.categoria
			}
		  );
//	  console.log(this.categoria);
		});

	  });

	  this.route.paramMap.subscribe((paramMap: ParamMap) => {
		// console.log(paramMap.get('id'));
		this.proveedorId = paramMap.get('id');
		if (this.proveedorId) {
			this.titulo = 'Modificar Proveedor';
			this.cloudantService.getProveedor(this.proveedorId).subscribe(proveedorData => {
//				console.log(proveedorData);
				this.proveedores = proveedorData;
				this._id = this.proveedores._id;
				this.nombre = this.proveedores.nombre;
				this.image = this.proveedores.image;
				this.descripcion = this.proveedores.descripcion;
				this.especificaciones= this.proveedores.especificaciones;
				this.catalogo = this.proveedores.catalogo;
				this.pedido = this.proveedores.pedido;
				this.contacto = this.proveedores.contacto;
			});
		} else {
			this.titulo = 'Añadir Proveedor';
			this._id = " ";
			this.nombre = " ";
			this.image = "";
			this.descripcion = " ";
			this.especificaciones= " ";
			this.especificaciones= " ";
			this.catalogo = "";
			this.pedido = "";
			this.contacto = "";
		}

  	});

	}

	onChangeIdProveedor(event){
		this._id = event.target.value;
  }

  onChangeNombre(event){
		this.nombre= event.target.value;
  }

  onChangeImagen(event){
	  this.image= event.target.value;
   }

  onChangeCategoria(event){
		this.categoria= event.item.content;
  }

  onChangePedido(event){
	this.pedido = event.target.value;
  }

  onChangeCatalogo(event){
	  this.catalogo= event.target.value;
  }

  onChangeDescripcion(event){
	  this.descripcion = event.target.value;
  }

  //CONTACTO QUILL
  onChangeContacto(event:any){
	  const texto2 = event?.html;
	  this.contacto = texto2;
//	  console.log(texto2);
//	  console.log('editado', texto2)
  }

	//DESCRIPCION QUILL
  onChangeEspecificaciones(event:any){
	  const texto = event?.html;
	  this.especificaciones = texto;
//	  console.log(texto);
//	  console.log('editado', texto)
  }

  onChangeActivo(event) {
//		console.log(event.value);
		this.activo = event.value;
   }

	newProveedor(){
		this.data={
			"_id":this._id,
			"nombre": this.nombre,
			"categoria": this.categoria,
			"descripcion": this.descripcion,
			"especificaciones": this.especificaciones,
			"activo": this.activo,
			"image":this.image,
			"catalogo": this.catalogo,
			"pedido": this.pedido,
			"contacto":this.contacto,
		  }
	  this.cloudantService.insertProveedor(this.data).subscribe((response: any)=>{
//		console.log('new PROVEEDOR');
		this.redirectTo('/administracion/mantenimientoproveedor');

		});

	}

	  redirectTo(uri: string) {
		this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
		this.router.navigate([uri]));
	  }
	  //DESCRIPCION
	options: CustomOption[] = [
		{
		  import: "attributors/style/size",
		  whitelist: void 0
		}
	  ];



		public editorOptions = {
			toolbar: [
				['bold', 'italic', 'underline', 'strike'],        // toggled buttons
				[{ 'header': 1 }, { 'header': 2 }],               // custom button values
				[ { 'list': 'bullet' }],
				[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
				[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
				['clean'],                                         // remove formatting button
			],
		};


}
