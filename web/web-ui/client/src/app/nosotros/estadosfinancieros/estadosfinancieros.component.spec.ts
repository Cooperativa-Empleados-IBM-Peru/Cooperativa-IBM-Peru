import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosfinancierosComponent } from './estadosfinancieros.component';

describe('EstadosfinancierosComponent', () => {
	let component: EstadosfinancierosComponent;
	let fixture: ComponentFixture<EstadosfinancierosComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EstadosfinancierosComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EstadosfinancierosComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
