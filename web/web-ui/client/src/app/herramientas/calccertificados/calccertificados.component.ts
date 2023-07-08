import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-calccertificados',
  templateUrl: './calccertificados.component.html',
  styleUrls: ['./calccertificados.component.scss']
})

export class CalccertificadosComponent implements OnInit {

	certificado: Object;
	moneda: Object;
	intereses: Number;
	total: Number;
	limiteDias: Number;
	tipoInteres: Number;
	capital: any;
	p1: String;
	m1: String;
	disabled: Boolean;
	tiempo: Number;
	elevado: Number;
	tasaMensual: Number;
	n1: number;
	num1: Number;
	placeholder = "Ingrese capital";

  constructor(private router: Router) { }

  ngOnInit(): void {
	  this.total = 0;
	  this.limiteDias = 0;
	  this.tipoInteres = 0;
	  this.capital = '';
	  this.intereses = 0;
	  this.tasaMensual = 0;
	  this.elevado = 0;
	  this.n1 = 0;
	  this.total = 0;
	  this.num1 = 0;
	  this.disabled = true;
	  this.certificado = [
		{
			content: 'Certificado a 090 días'
		},
		{
			content: 'Certificado a 180 días'
		},
		{
			content: 'Certificado a 360 días'
		},
		{
			content: 'Certificado a 720 días'
		}
	  ];
	  this.moneda = [
		{
			content: 'Nuevos Soles'
		},
		{
			content: 'Dólares'
		}
	  ]
  }

  updateSelected(event){
		this.p1 = event.item.content;
  }

  updateSelected2(event){
	  this.m1 = event.item.content;
//	  console.log(this.p1);
//	  console.log(this.m1);
	  if(this.p1 == 'Certificado a 090 días' && this.m1 == 'Dólares'){
		this.limiteDias = 90;
		this.tipoInteres = 1.5;
		this.tasaMensual = 0.24148772;
	  }
	  else if(this.p1 == 'Certificado a 090 días' && this.m1 == 'Nuevos Soles'){
		this.limiteDias = 90;
		this.tipoInteres = 5.00;
		this.tasaMensual = 0.407412378;
	  }
	  else if(this.p1 == 'Certificado a 180 días' && this.m1 == 'Dólares'){
		this.limiteDias = 180;
		this.tipoInteres = 1.75;
		this.tasaMensual = 0.144676542;
	  }
	  else if(this.p1 == 'Certificado a 180 días' && this.m1 == 'Nuevos Soles'){
		this.limiteDias = 180;
		this.tipoInteres = 5.25;
		this.tasaMensual = 0.427312777;
	  }
	  else if(this.p1 == 'Certificado a 360 días' && this.m1 == 'Dólares'){
		this.limiteDias = 360;
		this.tipoInteres = 2.00;
		this.tasaMensual = 0.16515813;
	  }
	  else if(this.p1 == 'Certificado a 360 días' && this.m1 == 'Nuevos Soles'){
		this.limiteDias = 360;
		this.tipoInteres = 5.50;
		this.tasaMensual = 0.447169892;
	  }
	  else if(this.p1 == 'Certificado a 720 días' && this.m1 == 'Dólares'){
		this.limiteDias = 720;
		this.tipoInteres = 2.25;
		this.tasaMensual = 0.185593754;
	  }
	  else if(this.p1 == 'Certificado a 720 días' && this.m1 == 'Nuevos Soles'){
		this.limiteDias = 720;
		this.tipoInteres = 6.00;
		this.tasaMensual = 0.486755057;
	  }
  }
  onChange(event){
	let x1,x2,x3,tiempo,n1,capital,inter;
	capital = event.target.value;
	tiempo = Number(this.limiteDias)/30;
	n1 = 1+(Number(this.tasaMensual)/100);
	x1 = Math.pow(Number(n1),Number(tiempo));
	inter=Number(capital) * Number(x1);
	x2 = ( Number(inter) - Number(capital)).toFixed(2);
	this.intereses = x2;
	x3 = Number(capital) + Number(x2);
	this.total = x3;
//	console.log(capital);
//	console.log(x1);
}
	newCalculo() {
		this.redirectTo('/herramientas/calccertificados');
	}
	redirectTo(uri: string) {
		this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
		this.router.navigate([uri]));
	}
}
