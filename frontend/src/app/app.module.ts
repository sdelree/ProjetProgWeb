import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { MainModule } from './main/main.module';
import { HttpClientModule } from '@angular/common/http';
import { AccountModule } from './account/account.module';
import { httpInterceptorProviders } from './http-interceptors';
import { registerLocaleData } from '@angular/common';
import localfr from '@angular/common/locales/fr';

registerLocaleData(localfr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MainModule,
    AccountModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
