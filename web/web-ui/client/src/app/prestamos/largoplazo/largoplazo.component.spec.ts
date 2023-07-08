import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LargoplazoComponent } from './largoplazo.component';

describe('LargoplazoComponent', () => {
	let component: LargoplazoComponent;
	let fixture: ComponentFixture<LargoplazoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LargoplazoComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LargoplazoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
