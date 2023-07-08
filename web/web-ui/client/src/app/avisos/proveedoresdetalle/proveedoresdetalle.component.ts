import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CloudantService } from '../../services/cloudant.service';
import { Proveedor } from '../proveedores/proveedor.model';
@Component({
  selector: 'app-proveedoresdetalle',
  templateUrl: './proveedoresdetalle.component.html',
  styleUrls: ['./proveedoresdetalle.component.scss']
})
export class ProveedoresdetalleComponent implements OnInit {
	proveedor: Proveedor;
	private proveedorId: string;
  constructor(public route: ActivatedRoute, public cloudantService: CloudantService) { }

  ngOnInit(): void {
	this.route.paramMap.subscribe((paramMap: ParamMap) => {
//		console.log(paramMap.get('id'));
		this.proveedorId = paramMap.get('id');
		this.cloudantService.getProveedor(this.proveedorId).subscribe(proveedorData => {
//			console.log(proveedorData);
			this.proveedor = proveedorData;
		});
  	});

  }
}
