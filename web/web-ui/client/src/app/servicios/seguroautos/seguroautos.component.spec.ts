import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguroautosComponent } from './seguroautos.component';

describe('SeguroautosComponent', () => {
	let component: SeguroautosComponent;
	let fixture: ComponentFixture<SeguroautosComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SeguroautosComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SeguroautosComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
