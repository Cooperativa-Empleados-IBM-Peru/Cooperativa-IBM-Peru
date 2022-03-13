import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternosComponent } from './internos.component';

describe('InternosComponent', () => {
	let component: InternosComponent;
	let fixture: ComponentFixture<InternosComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InternosComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InternosComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
