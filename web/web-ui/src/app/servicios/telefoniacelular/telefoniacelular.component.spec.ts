import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefoniacelularComponent } from './telefoniacelular.component';

describe('TelefoniacelularComponent', () => {
	let component: TelefoniacelularComponent;
	let fixture: ComponentFixture<TelefoniacelularComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ TelefoniacelularComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TelefoniacelularComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
