import { Component, OnInit } from '@angular/core';
import { RestTituladosService } from './rest-titulados.service';
import { Titulados } from './titulados';

@Component({
  selector: 'app-titulados',
  templateUrl: './titulados.component.html',
  styleUrls: ['./titulados.component.css']
})
export class TituladosComponent implements OnInit {

  title = "Titulados with json"
  constructor(private rs : RestTituladosService ){}

  columns = ["sede","grado","carrera","carnetEstudiante","planAcademico","cantidadSemestres","tipoTitulacion","urlTrabajoTitulacion","estado","informacionEmpleo"];
  index : (keyof Titulados) [] = ["sede","grado","carrera","carnetEstudiante","planAcademico","cantidadSemestres","tipoTitulacion","urlTrabajoTitulacion","estado","informacionEmpleo"];

  sede : keyof Titulados = 'sede';
  index2 = [this.sede]


  titulados : Titulados [] = [] ;

  ngOnInit(): void {
    this.rs.getTitulados().subscribe
    (
      (response)=>
      {
        this.titulados = response;
      },

      (error)=>
      {
        console.log("Error Occured : " + error);
      }
    )
  }
}
