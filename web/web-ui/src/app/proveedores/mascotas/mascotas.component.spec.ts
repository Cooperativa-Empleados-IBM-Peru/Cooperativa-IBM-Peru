import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasComponent } from './mascotas.component';

describe('MascotasComponent', () => {
	let component:MascotasComponent;
	let fixture: ComponentFixture< MascotasComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MascotasComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent( MascotasComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
