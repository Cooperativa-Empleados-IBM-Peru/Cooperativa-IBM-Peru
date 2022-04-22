import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GimnasiosComponent } from './gimnasios.component';

describe('GimnasiosComponent', () => {
	let component:GimnasiosComponent;
	let fixture: ComponentFixture< GimnasiosComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ GimnasiosComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent( GimnasiosComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
