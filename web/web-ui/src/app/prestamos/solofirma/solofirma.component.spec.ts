import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolofirmaComponent } from './solofirma.component';

describe('SolofirmaComponent', () => {
	let component: SolofirmaComponent;
	let fixture: ComponentFixture<SolofirmaComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SolofirmaComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SolofirmaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
