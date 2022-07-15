import { Component, OnInit } from '@angular/core';
import { RestTituladosService } from './rest-titulados.service';
import { Titulados } from './tituladosClass';


interface ValueFilterInterface {
  value: string;
  viewValue: string;
}

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

  sedes: ValueFilterInterface[] = [
    {value: 'LA PAZ', viewValue: 'Sede La Paz'},
    {value: 'COCHABAMBA', viewValue: 'Sede Cochabamba'},
    {value: 'TARIJA', viewValue: 'Sede Tarija'},
    {value: 'SANTA CRUZ', viewValue: 'Sede Santa Cruz'},
  ];
  carreras: ValueFilterInterface[] = [
    {value: 'INGENIERÍA DE SISTEMAS', viewValue: 'INGENIERÍA DE SISTEMAS'},
    {value: 'ADMINISTRACIÓN DE EMPRESAS', viewValue: 'ADMINISTRACIÓN DE EMPRESAS'},
    {value: 'PSICOLOGÍA', viewValue: 'PSICOLOGÍA'},
    {value: 'INGENIERÍA CIVIL', viewValue: 'INGENIERÍA CIVIL'},
    {value: 'INGENIERÍA QUÍMICA', viewValue: 'INGENIERÍA QUÍMICA'},
  ];
  periodos: ValueFilterInterface[] = [
    {value: '2006', viewValue: '2006'},
    {value: '2010', viewValue: '2010'},
    {value: '2009', viewValue: '2009'},
    {value: '2006', viewValue: '2006'},
    {value: '2012', viewValue: '2012'},
    {value: '2001', viewValue: '2001'},
  ];

  filterBySede(item: any) {
    console.log("el valor ingresado fue : " + item.value);
    this.titulados = this.completedDataTitulados.filter(titulado => titulado.sede == item.value)
  }
  filterByCarrera(item: any) {
    console.log("el valor ingresado fue : " + item.value);
    this.titulados = this.titulados.filter(titulado => titulado.carrera == item.value)
  }
  filterByPeriodo(item: any) {
    console.log("el valor ingresado fue : " + item.value);
    this.titulados = this.titulados.filter(titulado => titulado.planAcademico == item.value)
  }
}
