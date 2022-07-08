import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';
import { Label } from 'ng2-charts';

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
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 10, 56, 55, 40], label: 'Cantidad de estudiantes inscritos' },
  ];
  public barChartLabels: Label[] = [
    '1er',
    '2do',
    '3er',
    '4to',
    '5to',
    '6to',
    '7mo',
    '8vo',
    '9no',
    '10mo',
  ];

  public barChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,0,255,0.3)',
    },
  ];
  public barChartLegend = true;
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];
  
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
