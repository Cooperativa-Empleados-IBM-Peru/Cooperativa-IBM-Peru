import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenajeComponent } from './menaje.component';

describe('MenajeComponent', () => {
	let component:MenajeComponent;
	let fixture: ComponentFixture< MenajeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MenajeComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent( MenajeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
