import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasteleriaComponent } from './pasteleria.component';

describe('PasteleriaComponent', () => {
	let component:PasteleriaComponent;
	let fixture: ComponentFixture< PasteleriaComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ PasteleriaComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent( PasteleriaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
