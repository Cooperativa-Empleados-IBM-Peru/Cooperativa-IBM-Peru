import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Tooltip } from 'carbon-components';

import { HeaderComponent } from './header.component';
import { UIShellModule } from 'carbon-components-angular/ui-shell/ui-shell.module';
import { UserAvatarComponent, UserAvatarFilledComponent } from '@carbon/icons-angular';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  TestBed.configureTestingModule({
		declarations: [HeaderComponent],
		imports: [UIShellModule, UserAvatarComponent, UserAvatarFilledComponent]
	  });

});
