import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HipotecarioComponent } from './hipotecario.component';

describe('HipotecarioComponent', () => {
	let component: HipotecarioComponent;
	let fixture: ComponentFixture<HipotecarioComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ HipotecarioComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HipotecarioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
