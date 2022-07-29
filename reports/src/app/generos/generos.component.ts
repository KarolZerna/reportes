import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';
import { Label } from 'ng2-charts';
import { isEmpty } from 'rxjs';
import { cargarJSON, getSelectItemsDefault, getOpcionesInputs} from "./service";

interface Sede {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css']
})

export class GenerosComponent implements OnInit {

  //Obtener Valores de los Inputs en cada momento
  public sedeSelected:string = getSelectItemsDefault().sede;
  public carreraSelected:string[] = [getSelectItemsDefault().carrera];
  public periodoAcademicoSelected:string[] = [getSelectItemsDefault().periodoAcademico];
  public planAcademicoSelected:string[] = [getSelectItemsDefault().planAcademico];
  public antiguedadSelected:string[] = [getSelectItemsDefault().antiguedad];

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

  sedes: Sede[] = [
    {value: 'La Paz', viewValue: 'Sede La Paz'},
    {value: 'Cochabamba', viewValue: 'Sede Cochabamba'},
    {value: 'Santa Cruz', viewValue: 'Sede Santa Cruz'},
  ];
  carreras: string[] = [];
  periodos: string[] = ['V-2020','1-2020','I-2020','2-2020'];
  planes: string[] = [];
  antiguedad: string[] = ['Antiguos','Nuevos','Antiguos y Nuevos'];

  //Cargar los valores de los inputs
  cargarOpcionesSelect(){
    [this.carreras, this.planes] = getOpcionesInputs(this.sedeSelected, this.carreraSelected);
    for(var index = this.planAcademicoSelected.length - 1; index >= 0 ; index--){
      if(!this.planes.includes(this.planAcademicoSelected[index])){
        this.planAcademicoSelected.splice(index, 1);
        console.log(this.planAcademicoSelected);
      }
    }
    if(this.planAcademicoSelected.length == 0){
      this.planAcademicoSelected = [this.planes[0]];
    }
    console.log(this.planAcademicoSelected);
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
      yAxes: [{display: true, ticks: {beginAtZero: true}}]
    }
  };


  //cargamos los datos para los gráficos
  cargarDatos() {
    this.barChartData = [];
    this.barChartColors = [];
    this.barChartLabels = [];
    this.cargarOpcionesSelect();//Cambia las opciones de los inputs, si no hay valor selccionado toma el primero por defecto
    var [datos, labels] = cargarJSON(this.sedeSelected, this.carreraSelected, this.periodoAcademicoSelected, this.planAcademicoSelected, this.antiguedadSelected);
    for (const index in datos) {
      this.barChartData.push({ data: datos[index], label: this.labels[index] });
      this.barChartColors.push({backgroundColor: this.colores[index]});
    }
    for (const index in labels) {
      this.barChartLabels.push(labels[index]);
    }
  }

  constructor() { 
    this.cargarDatos();
  }

  ngOnInit(): void {
  }

}
