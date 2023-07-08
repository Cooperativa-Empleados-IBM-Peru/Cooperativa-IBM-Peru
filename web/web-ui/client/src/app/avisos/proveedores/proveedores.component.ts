import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Proveedor } from './proveedor.model';
import { Categoria } from './categoria.model';
import { ProveedorService } from './proveedor.service';
import { CategoriaService } from './categoria.service';
import { CloudantService } from '../../services/cloudant.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
	selector: 'app-proveedores',
	templateUrl: './proveedores.component.html',
	styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {


	 proveedores: Proveedor[]  = [];
	 categorias: Categoria[] = [];
	 // products: Productos[];
	 // dataca:categorias[];
	 private categoria: string;
	private mediaSub: Subscription;
	private proveedorSub: Subscription;
	private categoriaSub: Subscription;
	constructor(
		private mediaObserver: MediaObserver,
		public proveedorService: ProveedorService,
		public categoriaService: CategoriaService,
		public cloudantService: CloudantService,
		private router: Router,
		public route: ActivatedRoute
	) { }

	ngOnInit(): void {
		/*
		this.proveedorService.getProveedores();
		this.proveedorSub = this.proveedorService.getProveedorUpdateListener()
		.subscribe((proveedores: Proveedor[]) => {
			this.proveedores = proveedores;
		});
*/
		this.categoriaService.getCategorias();
		this.categoriaSub = this.categoriaService.getCategoriaUpdateListener()
		.subscribe((categoria: Categoria[]) => {
			this.categorias = categoria;
		});

		this.mediaSub = this.mediaObserver.asObservable().subscribe(change=> {change.forEach((v) => {console.log(v.mediaQuery,v.mqAlias);}); });

		this.route.paramMap.subscribe((paramMap: ParamMap) => {
		//	console.log(paramMap.get('categoria'));
			this.categoria = paramMap.get('categoria');
			if(this.categoria) {
				const query = {
					"fields": ["_id", "_rev", "nombre", "categoria", "image", "descripcion", "especificaciones", "catalogo", "pedido" , "contacto", "activo"],
					"selector": {
					  "categoria": {
						"$eq": this.categoria
					  }
					}
				  }
				this.cloudantService.getProveedoresByCategoria(query).subscribe((data)=> {
					this.proveedores = data.docs;
				});
			} else {
				this.proveedorService.getProveedores();
				this.proveedorSub = this.proveedorService.getProveedorUpdateListener()
				.subscribe((proveedores: Proveedor[]) => {
					this.proveedores = proveedores;
	//				console.log(this.proveedores);
				});
			}

		  });
	}

	openDetalle (id: string) {
		this.router.navigate(['avisos/proveedordetalle', id]);
	}

	filterProveedor(categoria: string) {
		if(categoria=='Todos') {
			this.redirectTo('/avisos/proveedores');
		}else if(categoria !='Todos'){
			this.router.navigate(['avisos/proveedores', categoria]); }
	}
	redirectTo(uri: string) {
		this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
		this.router.navigate([uri]));
	}

	customOptions: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: false,
		pullDrag: false,
		dots: false,
		navSpeed: 700,
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true,
		navText: ["", ""],
		responsive: {
		  0: {
			items: 1
		  },
		  400: {
			items: 2
		  },
		  740: {
			items: 3
		  },
		  940: {
			items: 4
		  }
		},
		nav: true
	  };

}







