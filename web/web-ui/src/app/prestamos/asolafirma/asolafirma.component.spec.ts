import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ASolafirmaComponent } from './asolafirma.component';

describe('ASolafirmaComponent', () => {
	let component: ASolafirmaComponent;
	let fixture: ComponentFixture<ASolafirmaComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ASolafirmaComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ASolafirmaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
