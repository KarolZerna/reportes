import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdiomasComponent } from './idiomas/idiomas.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent, pathMatch: 'full'},
  {path: 'idiomas', component: IdiomasComponent, pathMatch: 'full'},
  {path: '**', redirectTo: '/inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
