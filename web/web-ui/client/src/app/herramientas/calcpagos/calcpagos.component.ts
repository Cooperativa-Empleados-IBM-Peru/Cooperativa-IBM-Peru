import { Component, OnInit } from '@angular/core';
import {
	Table,
	TableModel,
	TableItem,
	TableHeaderItem,
	Link
} from 'carbon-components-angular';
import {  Observable, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Prestamo } from '../../administracion/servicios/prestamo.model';
import { CalculadoraService } from '../../administracion/servicios/calculadora.service';

@Component({
  selector: 'app-calcpagos',
  templateUrl: './calcpagos.component.html',
  styleUrls: ['./calcpagos.component.scss']
})
export class CalcpagosComponent implements OnInit {

	inputValue: String;
	label: String;
	content: String;
	prestamo = [];
	moneda: Object;
	amortizacion = [];
	amortizaciones = [];
	limite: Number;
	interesAnual: Number;
	minMax: String;
	anioBase = [];
	mesBase: Object;
	pagoAnual: Number;
	pagoMensual: Number;
	intereses: Number;
	pagos: Number;
	p1: String;
	m1: String;
	pa: Number;
	pm: Number;
	ti: Number;
	tp: Number;
	prestamoValor: Number;
	periodoAmortizacion: Number;
	anio: String;
	mes: String;
	disabled: Boolean;
	dataCalcu = [];
	modelCalc: TableModel;
	skeletonCalcModel = Table.skeletonModel(10, 10);
	skeletoncalc = false;
	capital:String;
	interesMes: Number;
	monto1: Number;
	interes1: Number;
	interes2: Number;
	meses: Number;
	dataProgram = [];
	modelProgram: TableModel;
	skeletonProgramModel = Table.skeletonModel(10, 10);
	skeletonprogram: false;
	a1: String;
	mo1: String;
	invalidText: string;
	invalid = false;
	placeholder = 'Ingrese capital';

	prestamos: Prestamo[] = [];
	dataPrestamo: any;
	private prestamosSub: Subscription;
	constructor(private router: Router,
		public calculadoraService: CalculadoraService) { }

	ngOnInit(): void {
		this.pagoAnual = 0;
		this.pagoMensual = 0;
		this.prestamoValor = 0;
		this.limite = 0;
		this.intereses = 0;
		this.interesAnual = 0;
		this.pagos = 0;
		this.minMax = '';
		this.pa = 0;
		this.disabled = true;
		this.capital = '';

		this.calculadoraService.getPrestamosPagos();
		this.prestamosSub = this.calculadoraService.getPrestamoUpdateListener()
		.subscribe((prestamos: Prestamo[]) => {
			this.prestamos = prestamos;
			this.prestamo = [];
			prestamos.forEach(element => {
				this.prestamo.push({content: element.tipo});
			});
		});

		this.moneda = [
			{
				content: 'Dólares'
			},
			{
				content: 'Nuevos Soles'
			}
		];
		this.anioBase = [];
		const anio = new Date().getFullYear();
		for (let index = 0; index < 10; index++) {
			this.anioBase.push({content: (anio + index).toString()});
		}

		this.mesBase = [
			{
				content: 'Enero'
			},
			{
				content: 'Febrero'
			},
			{
				content: 'Marzo'
			},
			{
				content: 'Abril'
			},
			{
				content: 'Mayo'
			},
			{
				content: 'Junio'
			},
			{
				content: 'Julio'
			},
			{
				content: 'Agosto'
			},
			{
				content: 'Septiembre'
			},
			{
				content: 'Octubre'
			},
			{
				content: 'Noviembre'
			},
			{
				content: 'Diciembre'
			}
		];


		this.modelCalc = new TableModel();
		this.modelCalc.header = [
			new TableHeaderItem({data: 'Cuota'}),
			new TableHeaderItem({data: 'Mes'}),
			new TableHeaderItem({data: 'Año'}),
			new TableHeaderItem({data: 'Saldo Inicial'}),
			new TableHeaderItem({data: 'Pagos'}),
			new TableHeaderItem({data: 'Principal'}),
			new TableHeaderItem({data: 'Intereses'}),
			new TableHeaderItem({data: 'Principal acumulados'}),
			new TableHeaderItem({data: 'Intereses acumulados'}),
			new TableHeaderItem({data: 'Saldo final'}),
		];
		this.modelProgram = new TableModel();
		this.modelProgram.header = [
			new TableHeaderItem({data: 'Años'}),
			new TableHeaderItem({data: 'Saldo Inicial'}),
			new TableHeaderItem({data: 'Pagos'}),
			new TableHeaderItem({data: 'Principal'}),
			new TableHeaderItem({data: 'Intereses'}),
			new TableHeaderItem({data: 'Principal acumulados'}),
			new TableHeaderItem({data: 'Intereses acumulados'}),
			new TableHeaderItem({data: 'Saldo final'}),
		];
	}


	updateSelected(event) {
		this.p1 = event.item.content;
		this.prestamos.forEach(element => {
			if (element.tipo === event.item.content) {
				this.minMax = element.min.toString() + '/' + element.max.toString();
				this.dataPrestamo = element.data;
				this.amortizacion = [];
				this.amortizaciones = [];
				for (let index = element.min; index < (element.max + 1); index++) {
					this.amortizacion.push({content: index.toString()});
					this.amortizaciones.push(index);
				}
			}
		});

	}

updateSelected2(event) {
	this.m1 = event.item.content;
//	console.log(this.p1);
//	console.log(this.m1);

	this.dataPrestamo.forEach(element => {
		if (element.moneda === event.item.content  ) {
			this.limite = element.limite;
			this.interesAnual = element.interes;
		}
	});
}

onChangeCapital(event) {
	// console.log(this.prestamoValor);
	if ( Number(event.target.value) <= 0 ||  Number(event.target.value) > this.limite ) {
		this.invalid = true;
		this.invalidText = 'Ingrese un monto menor al límite';
	} else {
		this.invalid = false;
		this.prestamoValor = event.target.value;
	}
}

updateSelected3(event) {
	this.periodoAmortizacion = event.item.content;
	let x1,x2,x3,x4;
	this.amortizaciones.forEach(element => {
		if (event.item.content === String(element)) {
//			console.log(element);
            this.meses = 12;
            this.interesMes = (Number(this.interesAnual) / 100) / (Number(this.meses) * element);
            this.monto1 = Number(this.interesMes) * Number(this.prestamoValor);
            this.interes1 = 1 + Number(this.interesMes);
			this.interes2 = Math.pow(Number(this.interes1), (Number(this.meses) * element));
			x1 = ((Number(this.monto1) * Number(this.interes2)) / (Number(this.interes2) - 1)).toFixed(2);
			this.pagoMensual = x1;
			x2 = (x1 * Number(this.meses)).toFixed(2);
			this.pagoAnual = x2;
			x3 = (x2 * element).toFixed(2);
			this.pagos = x3;
            x4 = (x3 - Number(this.prestamoValor)).toFixed(2);
            this.intereses = x4;
        }
	});
}
updateSelected4(event){
	this.a1 = event.item.content;
//	console.log(this.a1);
}
updateSelected5(event){
	this.mo1 = event.item.content;
//	console.log(this.mo1);
}

newCalculo() {
	this.redirectTo('/herramientas/calcpagos');
}

mostrarTablita() {
	let calcu = [];
	let anio = []
	let saldo_inicial = [];
	let pagos = [];
	let intereses = [];
	let principal = [];
	let interesesacum = [];
	let principalacum = [];
	let saldofinal = [];
	let cont = 1;
	let intMensual = (Number(this.interesAnual)/100)/(12*Number(this.periodoAmortizacion));
	let auxPrestamo = Number(this.prestamoValor);
	let auxpago = Number(this.pagoMensual);
	let auxInteres = auxPrestamo * intMensual;
	let auxPrincipal = auxpago - auxInteres;
	let auxPrincipalAcum = auxPrincipal;
	let auxInteresAcum = auxInteres;
	let auxSaldoFinal = auxPrestamo - auxPrincipal;
	let mes = this.mo1;
	if(mes == "Enero"){mes = "January"} else if(mes == "Abril"){mes = "April"} else if(mes == "Agosto"){mes = "August"} else if(mes == "Diciembre"){mes = "December"};
	let año = this.a1;
	let x = mes + "-01-" + año;
	var y =  new Date(x);
	var monthNameList = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
	let tablon = [];

	for (var i = 0; i < 12 * Number(this.periodoAmortizacion); i++) {
		  if(cont == 1) {

		  anio.push(y.getFullYear());
		  saldo_inicial.push(auxPrestamo.toFixed(2));
		  pagos.push(auxpago.toFixed(2));
		  intereses.push(auxInteres.toFixed(2));
		  principal.push(auxPrincipal.toFixed(2));
		  interesesacum.push(auxInteresAcum.toFixed(2));
		  principalacum.push(auxPrincipalAcum.toFixed(2));
		  saldofinal.push(auxSaldoFinal.toFixed(2));
		  calcu.push([
				  new TableItem({data: 1}),
				  new TableItem({data: monthNameList[y.getMonth()]}),
				  new TableItem({data: y.getFullYear()}),
				  new TableItem({data: auxPrestamo.toFixed(2)}),
				  new TableItem({data: auxpago.toFixed(2)}),
				  new TableItem({data: auxPrincipal.toFixed(2)}),
				  new TableItem({data: auxInteres.toFixed(2)}),
				  new TableItem({data: auxPrincipalAcum.toFixed(2)}),
				  new TableItem({data: auxInteresAcum.toFixed(2)}),
				  new TableItem({data: auxSaldoFinal.toFixed(2)})
		  ]);
	  } else if (cont === 12 * Number(this.periodoAmortizacion)) {
		auxPrestamo = auxPrestamo - auxPrincipal;
		auxInteres = auxPrestamo * intMensual;
		auxPrincipal = auxpago - auxInteres;
		auxPrincipalAcum = auxPrincipalAcum + auxPrincipal;
		auxInteresAcum = auxInteresAcum + auxInteres;
		auxSaldoFinal = auxPrestamo - auxPrincipal;
		y.setMonth(y.getMonth() + 1);

		anio.push(y.getFullYear());
		saldo_inicial.push(Number(auxPrestamo.toFixed(2)));
		pagos.push(Number(auxpago.toFixed(2)));
		intereses.push(Number(auxInteres.toFixed(2)));
		principal.push(Number(auxPrincipal.toFixed(2)));
		interesesacum.push(Number(auxInteresAcum.toFixed(2)));
		principalacum.push(Number(auxPrincipalAcum.toFixed(2)));
		saldofinal.push(Number(auxSaldoFinal.toFixed(2)));
	  calcu.push([
		new TableItem({data: cont}),
		new TableItem({data: monthNameList[y.getMonth()]}),
		new TableItem({data: y.getFullYear()}),
		new TableItem({data: auxPrestamo.toFixed(2)}),
		new TableItem({data: auxpago.toFixed(2)}),
		new TableItem({data: auxPrincipal.toFixed(2)}),
		new TableItem({data: auxInteres.toFixed(2)}),
		new TableItem({data: auxPrincipalAcum.toFixed(2)}),
		new TableItem({data: auxInteresAcum.toFixed(2)}),
		new TableItem({data: 0})
	  ]);

	} else {
		auxPrestamo = auxPrestamo - auxPrincipal;
		auxInteres = auxPrestamo * intMensual;
		auxPrincipal = auxpago - auxInteres;
		auxPrincipalAcum = auxPrincipalAcum + auxPrincipal;
		auxInteresAcum = auxInteresAcum + auxInteres;
		auxSaldoFinal = auxPrestamo - auxPrincipal;
		y.setMonth(y.getMonth() + 1);

		anio.push(y.getFullYear());
		saldo_inicial.push(Number(auxPrestamo.toFixed(2)));
		pagos.push(Number(auxpago.toFixed(2)));
		intereses.push(Number(auxInteres.toFixed(2)));
		principal.push(Number(auxPrincipal.toFixed(2)));
		interesesacum.push(Number(auxInteresAcum.toFixed(2)));
		principalacum.push(Number(auxPrincipalAcum.toFixed(2)));
		saldofinal.push(Number(auxSaldoFinal.toFixed(2)));
	  calcu.push([
		new TableItem({data: cont}),
		new TableItem({data: monthNameList[y.getMonth()]}),
		new TableItem({data: y.getFullYear()}),
		new TableItem({data: auxPrestamo.toFixed(2)}),
		new TableItem({data: auxpago.toFixed(2)}),
		new TableItem({data: auxPrincipal.toFixed(2)}),
		new TableItem({data: auxInteres.toFixed(2)}),
		new TableItem({data: auxPrincipalAcum.toFixed(2)}),
		new TableItem({data: auxInteresAcum.toFixed(2)}),
		new TableItem({data: auxSaldoFinal.toFixed(2)})
	  ]);
	}
		cont = cont + 1
  }
	this.modelCalc.data = calcu;

	let calcu2 = [];
	let cont2 = 1;
	let saldo_ini = 0;
	let pagoss = 0;
	let principall = 0;
	let interesess = 0;
	for (var i = 0; i < 12* Number(this.periodoAmortizacion); i++) {
		pagoss = pagoss + Number(pagos[i]);
		principall = principall + Number(principal[i]);
		interesess = interesess + Number(intereses[i]);
		if (cont2 == 0 ){
			if(anio[i] !== anio[i-1]){
				calcu2.push([
					new TableItem({data: anio[i-1]}),
                    new TableItem({data: (saldo_inicial[i] + principall-Number(principal[i])).toFixed(2)}),
                    new TableItem({data: (pagoss-Number(pagos[i])).toFixed(2)}),
                    new TableItem({data: (principall-Number(principal[i])).toFixed(2)}),
                    new TableItem({data: (interesess-Number(intereses[i])).toFixed(2)}),
                    new TableItem({data: (principalacum[i-1]).toFixed(2)}),
                    new TableItem({data: (interesesacum[i-1]).toFixed(2)}),
                    new TableItem({data: (saldofinal[i-1]).toFixed(2)})
				]);
				pagoss = Number(pagos[i]);
                principall = Number(principal[i]);
				interesess = Number(intereses[i]);
			}

		}
		if (i == (12 * Number(this.periodoAmortizacion) - 1)) {
			calcu2.push([
				new TableItem({data: anio[i]}),
				new TableItem({data: (saldo_inicial[i] + principall - Number(principal[i])).toFixed(2)}),
				new TableItem({data: pagoss.toFixed(2)}),
				new TableItem({data: principall.toFixed(2)}),
				new TableItem({data: interesess.toFixed(2)}),
				new TableItem({data: principalacum[i].toFixed(2)}),
				new TableItem({data: interesesacum[i].toFixed(2)}),
				new TableItem({data: 0})
			]);
		}
		cont2 = 0;
	}
	this.modelProgram.data = calcu2;
  }

	redirectTo(uri: string) {
		this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
		this.router.navigate([uri]));
	}
	exportAsPdf(){
		/* const DATA = document.getElementById('htmlData');
		const doc = new jsPDF('p', 'pt', 'a4');
		const options = {
		background: 'white',
		scale: 3
		};
		html2canvas(DATA, options).then((canvas) => {

			const img = canvas.toDataURL('image/PNG');

			// Add image Canvas to PDF
			const bufferX = 15;
			const bufferY = 15;
			const imgProps = (doc as any).getImageProperties(img);
			const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
			const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
			doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
			return doc;
		}).then((docResult) => {
			docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
		}); */
	}
}
