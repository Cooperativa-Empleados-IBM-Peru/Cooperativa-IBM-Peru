import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { UIShellModule } from 'carbon-components-angular';
import { UserAvatarModule, UserAvatarFilledModule, LogoutModule, HelpModule } from '@carbon/icons-angular';

import { HeaderComponent } from './header/header.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
// import { IbmidService } from '../services/ibmid.service';

@NgModule({
  declarations: [HeaderComponent, SidemenuComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    UIShellModule,
    UserAvatarModule,
	UserAvatarFilledModule,
	LogoutModule,
	HelpModule
  ],
  exports: [HeaderComponent, SidemenuComponent]
})
export class MenuModule { }
