import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomotrizComponent } from './automotriz.component';

describe('AutomotrizComponent', () => {
	let component: AutomotrizComponent;
	let fixture: ComponentFixture<AutomotrizComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ AutomotrizComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AutomotrizComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
