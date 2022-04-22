import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OncosaludComponent } from './oncosalud.component';

describe('OncosaludComponent', () => {
	let component: OncosaludComponent;
	let fixture: ComponentFixture<OncosaludComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ OncosaludComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OncosaludComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
