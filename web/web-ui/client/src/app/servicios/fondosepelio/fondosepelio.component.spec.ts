import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FondosepelioComponent } from './fondosepelio.component';

describe('FondosepelioComponent', () => {
	let component: FondosepelioComponent;
	let fixture: ComponentFixture<FondosepelioComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ FondosepelioComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FondosepelioComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
