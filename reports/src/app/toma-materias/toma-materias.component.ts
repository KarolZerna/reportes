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


@Component({
  selector: 'app-toma-materias',
  templateUrl: './toma-materias.component.html',
  styleUrls: ['./toma-materias.component.css']
})
export class TomaMateriasComponent implements OnInit {
  sedes: Sede[] = [
    {value: 'sede-lp', viewValue: 'Sede La Paz'},
    {value: 'sede-cbb', viewValue: 'Sede Cochabamba'},
    {value: 'sede-sc', viewValue: 'Sede Santa Cruz'},
  ];
  carreras: Carrera[] = [
    {value: 'der', viewValue: 'Derecho'},
    {value: 'fyl', viewValue: 'Filosofía y Letras'},
    {value: 'sis', viewValue: 'Ingeniería de Sistemas'},
  ];
  periodos: Periodo[] = [
    {value: 'v-2022', viewValue: 'V-2022'},
    {value: '2-2022', viewValue: '2-2022'},
    {value: 'i-2022', viewValue: 'I-2022'},
    {value: '1-2022', viewValue: '1-2022'},
    {value: 'v-2022', viewValue: 'V-2021'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
