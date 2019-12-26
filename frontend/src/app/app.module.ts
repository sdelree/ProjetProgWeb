import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { MainModule } from './main/main.module';
import { HttpClientModule } from '@angular/common/http';
import { AccountModule } from './account/account.module';
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryApiService } from "./in-memory-api.service";
import { environment } from "../environments/environment";

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
    HttpClientInMemoryWebApiModule.forRoot(InMemoryApiService, {host: environment.backendUrl, apiBase: '/', passThruUnknownUrl: true}),
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
