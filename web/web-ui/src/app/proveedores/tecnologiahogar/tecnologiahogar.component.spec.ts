import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnologiahogarComponent } from './tecnologiahogar.component';

describe('TecnologiahogarComponent', () => {
	let component:TecnologiahogarComponent;
	let fixture: ComponentFixture< TecnologiahogarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ TecnologiahogarComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent( TecnologiahogarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
