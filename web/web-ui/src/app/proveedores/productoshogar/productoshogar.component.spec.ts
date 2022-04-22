import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoshogarComponent } from './productoshogar.component';

describe('ProductoshogarComponent', () => {
	let component:ProductoshogarComponent;
	let fixture: ComponentFixture< ProductoshogarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ProductoshogarComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent( ProductoshogarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
