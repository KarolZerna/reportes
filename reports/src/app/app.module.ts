import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { PastoralComponent } from './pastoral/pastoral.component';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { TestComponent } from './test/test.component'

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CabeceraComponent,
    CardComponent,
    PastoralComponent,
    IdiomasComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
