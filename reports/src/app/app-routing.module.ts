import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdiomasComponent } from './idiomas/idiomas.component';
import {PastoralComponent} from './pastoral/pastoral.component';
import { InicioComponent } from './inicio/inicio.component';
import { TomaMateriasComponent } from './toma-materias/toma-materias.component';
import { GenerosComponent } from './generos/generos.component';
import { ResumenComponent } from './resumen/resumen.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent, pathMatch: 'full'},
  {path: 'idiomas', component: IdiomasComponent, pathMatch: 'full'},
  {path: 'pastoral', component: PastoralComponent, pathMatch: 'full'},
  {path: 'tomaMaterias', component: TomaMateriasComponent, pathMatch: 'full'},
  {path: 'generos', component: GenerosComponent, pathMatch: 'full'},
  {path: 'resumen', component: ResumenComponent, pathMatch:'full'},
  {path: '**', redirectTo: '/inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
