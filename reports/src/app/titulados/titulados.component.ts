import { Component, OnInit } from '@angular/core';
import { RestTituladosService } from './rest-titulados.service';
import { Titulados } from './tituladosClass';


interface Sede {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-titulados',
  templateUrl: './titulados.component.html',
  styleUrls: ['./titulados.component.css']
})
export class TituladosComponent implements OnInit {
  sedes: Sede[] = [
    {value: 'LA PAZ', viewValue: 'Sede La Paz'},
    {value: 'COCHABAMBA', viewValue: 'Sede Cochabamba'},
    {value: 'TARIJA', viewValue: 'Sede Tarija'},
  ];


  title = "Titulados with json"
  constructor(private rs : RestTituladosService ){}

  columns = ["sede","grado","carrera","carnetEstudiante","planAcademico","cantidadSemestres","tipoTitulacion","urlTrabajoTitulacion","estado","informacionEmpleo"];
  index : (keyof Titulados) [] = ["sede","grado","carrera","carnetEstudiante","planAcademico","cantidadSemestres","tipoTitulacion","urlTrabajoTitulacion","estado","informacionEmpleo"];

  sede : keyof Titulados = 'sede';
  index2 = [this.sede]


  titulados : Titulados [] = [] ;
  completedDataTitulados : Titulados [] = [] ;
  ngOnInit(): void {
    this.rs.getTitulados().subscribe
    (
      (response)=>
      {
        this.completedDataTitulados = response;
        this.titulados = this.completedDataTitulados;
      },

      (error)=>
      {
        console.log("Error Occured : " + error);
      }
    )
  }

  onselect(item: any) {
    console.log("el valor ingresado fue : " + item.value);
    console.log("ANTES DE FILTRAR : " + this.titulados);
    this.titulados = this.completedDataTitulados.filter( titulado => titulado.sede == item.value)
    console.log("DESPUES DE FILTRAR: " + this.titulados);
  }
}
