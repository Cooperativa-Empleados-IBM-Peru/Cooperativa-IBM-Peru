import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuModule } from './menu/menu.module'
//import { IbmidService } from './services/ibmid.service';
import { QuillModule } from "ngx-quill";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
  	BrowserModule,
  	BrowserAnimationsModule,
    AppRoutingModule,
    MenuModule,
  	HttpClientModule,
  	QuillModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {

  }

}
