import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglamentosComponent } from './reglamentos.component';

describe('ReglamentosComponent', () => {
	let component: ReglamentosComponent;
	let fixture: ComponentFixture<ReglamentosComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ReglamentosComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ReglamentosComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
