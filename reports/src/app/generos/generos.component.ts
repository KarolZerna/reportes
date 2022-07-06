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

interface Antiguedad {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css']
})
export class GenerosComponent implements OnInit {
  sedes: Sede[] = [
    {value: 'sede-lp', viewValue: 'Sede La Paz'},
    {value: 'sede-cbb', viewValue: 'Sede Cochabamba'},
    {value: 'sede-sc', viewValue: 'Sede Santa Cruz'},
  ];
  carreras: Carrera[] = [
    {value: 'sis', viewValue: 'Ingeniería de Sistemas'},
    {value: 'psi', viewValue: 'Psicología'},
    {value: 'general', viewValue: 'General'},
  ];
  periodos: Periodo[] = [
    {value: 'v-2022', viewValue: 'V-2020'},
    {value: '1-2022', viewValue: '1-2020'},
    {value: 'i-2022', viewValue: 'I-2020'},
    {value: '2-2022', viewValue: '2-2020'},
  ];
  planes: Plan[] = [
    {value: 'psi-2011', viewValue: 'PSI-2011'},
    {value: 'psi-2020', viewValue: 'PSI-2020'},
    {value: 'sis-2009', viewValue: 'SIS-2009'},
    {value: 'sis-2017', viewValue: 'SIS-2017'},
    {value: 'todos-planes', viewValue: 'Todos los Planes'},
  ];
  antiguedad: Antiguedad[] = [
    {value: 'antiguos', viewValue: 'Antiguos'},
    {value: 'nuevos', viewValue: 'Nuevos'},
    {value: 'antiguos-nuevos', viewValue: 'Antiguos y Nuevos'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
