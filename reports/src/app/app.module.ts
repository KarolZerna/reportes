import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { ChartType } from 'chart.js';
 


import {MaterialExampleModule} from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PastoralComponent } from './pastoral/pastoral.component';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { TomaMateriasComponent } from './toma-materias/toma-materias.component';
import { GenerosComponent } from './generos/generos.component'
import { TituladosComponent } from './titulados/titulados.component'

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CabeceraComponent,
    PastoralComponent,
    IdiomasComponent,
    TomaMateriasComponent,
    GenerosComponent,
    TituladosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  public barChartType: ChartType = "bar";
}
