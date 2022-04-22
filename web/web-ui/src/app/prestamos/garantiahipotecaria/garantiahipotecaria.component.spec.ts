import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarantiahipotecariaComponent } from './garantiahipotecaria.component';

describe('GarantiahipotecariaComponent', () => {
	let component: GarantiahipotecariaComponent;
	let fixture: ComponentFixture<GarantiahipotecariaComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ GarantiahipotecariaComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GarantiahipotecariaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
