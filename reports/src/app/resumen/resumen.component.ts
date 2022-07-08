import { Component, OnInit } from '@angular/core';

interface Sede {
  value: string;
  viewValue: string;
}

interface Carrera {
  value: string;
  viewValue: string;
}

interface Periodo {
  value: string;
  viewValue: string;
}

interface Plan {
  value: string;
  viewValue: string;
}

interface Materia {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  sedes: Sede[] = [
    {value: 'sede-lp', viewValue: 'Sede La Paz'},
    {value: 'sede-cbb', viewValue: 'Sede Cochabamba'},
    {value: 'sede-sc', viewValue: 'Sede Santa Cruz'},
    {value: 'sede-tj', viewValue: 'Sede Tarija'},
  ];
  carreras: Carrera[] = [
    {value: 'der', viewValue: 'Derecho'},
    {value: 'fyl', viewValue: 'Filosofía y Letras'},
    {value: 'sis', viewValue: 'Ingeniería de Sistemas'},
  ];
  periodos: Periodo[] = [
    {value: 'v-2022', viewValue: 'V-2021'},
    {value: '2-2022', viewValue: '2-2021'},
    {value: 'i-2022', viewValue: 'I-2021'},
    {value: '1-2022', viewValue: '1-2021'},
    {value: 'v-2022', viewValue: 'V-2020'},
  ];
  planes: Plan[] = [
    {value: 'sis-2007', viewValue: 'SIS-2007'},
    {value: 'sis-2017', viewValue: 'SIS-2017'},
  ];
  materias: Materia[] = [
    {value: 'sis-112', viewValue: 'Introducción a la programación'},
    {value: 'sis-122', viewValue: 'Programación I'},
    {value: 'sis-132', viewValue: 'Programación II'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
