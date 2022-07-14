import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';
import { Label } from 'ng2-charts';
import getJSON from "./backend";

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

  //Cargar los valores de los inputs
  sedes: Sede[] = [
    {value: 'La Paz', viewValue: 'Sede La Paz'},
    {value: 'Cochabamba', viewValue: 'Sede Cochabamba'},
    {value: 'Santa Cruz', viewValue: 'Sede Santa Cruz'},
  ];
  carreras: Carrera[] = [
    {value: 'Ingeniería de Sistemas', viewValue: 'Ingeniería de Sistemas'},
    {value: 'Psicología', viewValue: 'Psicología'},
    {value: 'General', viewValue: 'General'},
  ];
  periodos: Periodo[] = [
    {value: 'V-2020', viewValue: 'V-2020'},
    {value: '1-2020', viewValue: '1-2020'},
    {value: 'I-2020', viewValue: 'I-2020'},
    {value: '2-2020', viewValue: '2-2020'},
  ];
  planes: Plan[] = [
    {value: 'PSI-2011', viewValue: 'PSI-2011'},
    {value: 'PSI-2020', viewValue: 'PSI-2020'},
    {value: 'SIS-2009', viewValue: 'SIS-2009'},
    {value: 'SIS-2017', viewValue: 'SIS-2017'},
    {value: 'Todos los Planes', viewValue: 'Todos los Planes'},
  ];
  antiguedad: Antiguedad[] = [
    {value: 'Antiguos', viewValue: 'Antiguos'},
    {value: 'Nuevos', viewValue: 'Nuevos'},
    {value: 'Antiguos y Nuevos', viewValue: 'Antiguos y Nuevos'},
  ];

  //Obtener Valores de los Inputs en cada momento
  public sedeSelected:string = '';
  public carreraSelected:string = '';
  public periodoAcademicoSelected:string = '';
  public planAcademicoSelected:string = '';
  public antiguedadSelected:string = '';

  cambiarSede(event: MatSelectChange){
  	this.sedeSelected = event.value;
  	this.cargarDatos();
  }
  cambiarCarrera(event: MatSelectChange){
  	this.carreraSelected = event.value;
  	this.cargarDatos();
  }
  cambiarPeriodoAcademico(event: MatSelectChange){
  	this.periodoAcademicoSelected = event.value;
  	this.cargarDatos();
  }
  cambiarPlanAcademico(event: MatSelectChange){
  	this.planAcademicoSelected = event.value;
  	this.cargarDatos();
  }
  cambiarAntiguedad(event: MatSelectChange){
  	this.antiguedadSelected = event.value;
  	this.cargarDatos();
  }

  public colores = ['#FFA500','#052854'];
	public labels = ["Varones","Mujeres"];


  public barChartData: ChartDataSets[] = [];
  public barChartLabels: Label[] = [];
  public barChartColors: Color[] = [];
  public barChartLegend = true;
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];
  public barChartOptions = {
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                beginAtZero: true
            }
        }]
    }
};


  //cargamos los datos del json
  cargarJSON(){
	  let datos = [];
	  let labels = [];
	  let listJSON = getJSON(this.sedeSelected, this.carreraSelected, this.periodoAcademicoSelected, this.planAcademicoSelected, this.antiguedadSelected);
	  let datosVarones = [];
	  let datosMujeres = [];
	  for(const index in listJSON){
	  	let label = [listJSON[index].antiguedad,listJSON[index].planAcademico,listJSON[index].periodoAcademico,listJSON[index].carrera, listJSON[index].sede];
	  	labels.push(label);
	  	datosVarones.push(parseInt(listJSON[index].cantidadVarones));
	  	datosMujeres.push(parseInt(listJSON[index].cantidadMujeres));
	  }
	  datos.push(datosVarones, datosMujeres);
	  return [datos, labels] as const;
  }


  //cargamos los datos para los gráficos
  cargarDatos() {
    this.barChartData = [];
    this.barChartColors = [];
    this.barChartLabels = [];
    var [datos, labels] = this.cargarJSON();

    for (const index in datos) {
      this.barChartData.push({ data: datos[index], label: this.labels[index] });
      this.barChartColors.push({backgroundColor: this.colores[index]});
    }
    for (const index in labels) {
      this.barChartLabels.push(labels[index]);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
