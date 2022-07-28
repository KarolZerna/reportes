import { Component, OnInit } from '@angular/core';
import { RestTituladosService } from './rest-titulados.service';
import { Titulados } from './tituladosClass';

import { MatSelectChange } from '@angular/material/select';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';
import { Label } from 'ng2-charts';

import { Chart } from 'chart.js';

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

  constructor(private rs : RestTituladosService ){}

  columns = ["sede","grado","carrera","carnetEstudiante","planAcademico","cantidadSemestres","tipoTitulacion","urlTrabajoTitulacion","estado","informacionEmpleo"];
  index : (keyof Titulados) [] = ["sede","grado","carrera","carnetEstudiante","planAcademico","cantidadSemestres","tipoTitulacion","urlTrabajoTitulacion","estado","informacionEmpleo"];


  titulados : Titulados [] = [] ;
  completedDataTitulados : Titulados [] = [] ;
  idChar  = document.getElementById("bar-chart") as HTMLCanvasElement
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
    {value: '----', viewValue: 'Todos'},
    {value: '2006', viewValue: '2006'},
    {value: '2010', viewValue: '2010'},
    {value: '2009', viewValue: '2009'},
    {value: '2006', viewValue: '2006'},
    {value: '2012', viewValue: '2012'},
    {value: '2001', viewValue: '2001'},
  ];

  optionSelected : string = '----';
  filterBySede(item: any) {
    console.log("el valor ingresado fue : " + item.value);
    this.optionSelected = item.value;
    this.titulados = this.completedDataTitulados.filter(titulado => titulado.sede == item.value)
    //this.loadDataGraph()
    let [careersFiltered, quantityCareers] = this.filterAccordingSede_Carreras(item.value)
    console.log( "careersFiltered: " + careersFiltered )
    console.log( "quantityCareers: " + quantityCareers )
    this.loadDataGraph_withCareersFiltered(careersFiltered,quantityCareers)
  }
  filterByCarrera(item: any) {
    console.log("el valor ingresado fue : " + item.value);
    this.optionSelected = item.value;
    this.titulados = this.completedDataTitulados.filter(titulado => titulado.carrera == item.value)
    this.loadDataGraph()
  }
  filterByPlanAcademico(item: any) {
    console.log("el valor ingresado fue : " + item.value);
    this.optionSelected = item.value;
    this.titulados = this.completedDataTitulados.filter(titulado => titulado.planAcademico == item.value);
    this.loadDataGraph()
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
  loadDataGraph_withCareersFiltered(careersFiltered : any,quantityCareers: any){
    // Try my own of graph
    var labelDinamic  = 'Cantidad de estudiantes en : ' + this.optionSelected ;
    console.log("el valor de labelDinamic : " + labelDinamic);
    this.barChartData  = [
      { data: quantityCareers , label: 'Total de Titulados'}
    ];
    this.barChartLabels= careersFiltered ;
    this.barChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(155,255,0,0.28)',
      },
    ];
    this.barChartLegend = true;
    this.barChartPlugins = [];
  }

  loadDataGraph(){
    // Try my own of graph
    var labelDinamic  = 'Cantidad de estudiantes en : ' + this.optionSelected ;
    console.log("el valor de labelDinamic : " + labelDinamic);
    this.barChartData  = [
      { data: [80,90,98,87,49,75], label: labelDinamic},
      { data: [85, 72, 78, 75, 77, 75], label: 'Top 2' },
      { data: [85, 72, 78, 75, 77, 75], label: 'Top 3' }
    ];
    this.barChartLabels= ['Ing.Sistemas', 'February', 'March', 'April', 'May', 'June'];
    this.barChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(155,255,0,0.28)',
      },
    ];
    this.barChartLegend = true;
    this.barChartPlugins = [];
  }

  filterAccordingSede_Carreras( sedeSelected : string){
    let TituladosSede = this.completedDataTitulados.filter(titulado => titulado.sede == sedeSelected) ;
    let listaCarreras = [...new Set(TituladosSede.map(json => json.carrera))];
    let quantityCarreras = [];
    for( let index in listaCarreras){
      console.log("listaCarreras" + listaCarreras[index] );
      quantityCarreras.push(TituladosSede.filter( titulado => titulado.carrera == listaCarreras[index] ).length);
    }
   return [listaCarreras,quantityCarreras];
  }

}
