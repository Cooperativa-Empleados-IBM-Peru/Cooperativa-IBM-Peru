import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstruccionComponent } from './construccion.component';

describe('ConstruccionComponent', () => {
	let component: ConstruccionComponent;
	let fixture: ComponentFixture<ConstruccionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ConstruccionComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ConstruccionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
