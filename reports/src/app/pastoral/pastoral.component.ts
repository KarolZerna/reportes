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
interface Semestre {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-pastoral',
  templateUrl: './pastoral.component.html',
  styleUrls: ['./pastoral.component.css']
})

export class PastoralComponent implements OnInit {
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
  semestres: Semestre[] = [
    {value: '1er', viewValue: 'Primer Semestre'},
    {value: '2do', viewValue: 'Segundo Semestre'},
    {value: '3er', viewValue: 'Tercer Semestre'},
    {value: '4to', viewValue: 'Cuarto Semestre'},
    {value: '5to', viewValue: 'Quinto Semestre'},
    {value: '6to', viewValue: 'Sexto Semestre'},
    {value: '7mo', viewValue: 'Séptimo Semestre'},
    {value: '8vo', viewValue: 'Octavo Semestre'},
    {value: '9no', viewValue: 'Noveno Semestre'},
    {value: '10mo', viewValue: 'Décimo Semestre'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
