import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BellezaComponent } from './belleza.component';

describe('BellezaComponent', () => {
	let component:BellezaComponent;
	let fixture: ComponentFixture< BellezaComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ BellezaComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent( BellezaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
