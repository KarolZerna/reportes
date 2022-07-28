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

  columns = ["sede","grado","carrera","carnetEstudiante","planAcademico","cantidadSemestres","tipoTitulacion","urlTrabajoTitulacion","estado"];
  // "informacionEmpleo"
  index : (keyof Titulados) [] = ["sede","grado","carrera","carnetEstudiante","planAcademico","cantidadSemestres","tipoTitulacion","urlTrabajoTitulacion","estado"];
  
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

  // Basic settings for graph
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


  sedes: ValueFilterInterface[] = [
    {value: 'LA PAZ', viewValue: 'Sede La Paz'},
    {value: 'COCHABAMBA', viewValue: 'Sede Cochabamba'},
    {value: 'TARIJA', viewValue: 'Sede Tarija'},
    {value: 'SANTA CRUZ', viewValue: 'Sede Santa Cruz'},
  ];
  carreras: ValueFilterInterface[] = [
    {value: '-', viewValue: 'Elige una Sede'}
    /*
    {value: 'ADMINISTRACIÓN DE EMPRESAS', viewValue: 'ADMINISTRACIÓN DE EMPRESAS'},
    {value: 'PSICOLOGÍA', viewValue: 'PSICOLOGÍA'},
    {value: 'INGENIERÍA CIVIL', viewValue: 'INGENIERÍA CIVIL'},
    {value: 'INGENIERÍA QUÍMICA', viewValue: 'INGENIERÍA QUÍMICA'},*/
  ];
  periodos: ValueFilterInterface[] = [
    {value: '-', viewValue: 'Todos'},
    /*
    {value: '2006', viewValue: '2006'},
    {value: '2010', viewValue: '2010'},
    {value: '2009', viewValue: '2009'},
    {value: '2006', viewValue: '2006'},
    {value: '2012', viewValue: '2012'},
    {value: '2001', viewValue: '2001'},*/
  ];

  updateOptionsInputs_careersAndPlans( listCareers : any , listPlans : any){
    let newcarreras: ValueFilterInterface[] = []
    let newPlans: ValueFilterInterface[] = []
    for( let index in listCareers){
      newcarreras.push({ value: listCareers[index] , viewValue: listCareers[index] });
    }
    for( let index in listPlans){
      newPlans.push({ value: listPlans[index] , viewValue: listPlans[index] });
    }
    this.carreras = newcarreras;
    this.periodos = newPlans;
  }
  updateOptionsInputs_onlyPlans(listPlans : any){
    let newPlans: ValueFilterInterface[] = []
    for( let index in listPlans){
      newPlans.push({ value: listPlans[index] , viewValue: listPlans[index] });
    }
    this.periodos = newPlans;
  }

  sedeSelected : string = 'all';
  careerSelected : string = 'all';
  plansSelected : any [] = [] ;
  listCareers : any [] = [] ;

  filterBySede(item: any) {
    console.log("el valor SEDE ingresado fue : " + item.value);
    this.sedeSelected = item.value;
    // to show table
    this.titulados = this.completedDataTitulados.filter(titulado => titulado.sede == item.value)

    // To download for graph
    let [careersFiltered, quantityCareers, listPlans] = this.filterDataAccordingSede(item.value)
    this.listCareers = careersFiltered;
    this.plansSelected = listPlans;
    this.updateOptionsInputs_careersAndPlans(careersFiltered,listPlans)
    this.loadDataGraph_withCareersFiltered(careersFiltered,quantityCareers)
  }
  filterByCarrera(item: any) {
    console.log("el valor CARRERA ingresado fue : " + item.value);
    this.careerSelected = item.value;
    this.listCareers = [item.value ]
    // to show table
    if(  this.sedeSelected == 'all'){
      this.titulados = this.completedDataTitulados.filter(titulado => titulado.carrera == item.value)
    }else{
      this.titulados = this.completedDataTitulados.filter(titulado => titulado.carrera == item.value && titulado.sede == this.sedeSelected)
    }

    // To download data for graph
    let [listaAcademicPlans,quantityAcademicPlans] = this.filterDataAccordingCareers(item.value)
    this.plansSelected = listaAcademicPlans;
    this.updateOptionsInputs_onlyPlans(this.plansSelected)
    this.loadDataGraph_withOneCareer(listaAcademicPlans,quantityAcademicPlans);
  }

  filterByPlanAcademico(item: any) {
    console.log("el valor ingresado fue : " + item.value);
    this.plansSelected = item.value;
    this.titulados = [];

    if(  this.careerSelected == 'all'){
      for ( let index in this.plansSelected ){
        this.titulados = this.titulados.concat(this.completedDataTitulados.filter(titulado => titulado.planAcademico == this.plansSelected[index] && titulado.sede == this.sedeSelected));
      }
    }else{
      for ( let index in this.plansSelected ){
        this.titulados = this.titulados.concat(this.completedDataTitulados.filter(titulado => titulado.planAcademico == this.plansSelected[index] && titulado.sede == this.sedeSelected && titulado.carrera == this.careerSelected));
      }
    }

    // To download data for graph
    let dataPlansAcademics = this.filterDataAccordingAcademicPlans(this.titulados);
    this.loadDataGraph_withPlansAcademics(dataPlansAcademics)
  }


  loadDataGraph_withCareersFiltered(careersFiltered : any,quantityCareers: any){
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
  
  loadDataGraph_withOneCareer(listaAcademicPlans: any ,quantityAcademicPlans: any){
    // Try my own of graph
    this.barChartData  = [
      { data: quantityAcademicPlans , label: 'Total de Titulados'}
    ];
    this.barChartLabels= listaAcademicPlans ;
    this.barChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(155,255,0,0.28)',
      },
    ];
    this.barChartLegend = true;
    this.barChartPlugins = [];
  }

  loadDataGraph_withPlansAcademics( dataPlansAcademics : any){
    this.barChartData  = dataPlansAcademics;
    this.barChartLabels= this.listCareers;
    this.barChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(155,255,0,0.28)',
      },
    ];
    this.barChartLegend = true;
    this.barChartPlugins = [];
  }

  loadDataGraph_basicExample(){
    // Try my own of graph
    var labelDinamic  = 'Cantidad de estudiantes en : ' ;
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

  filterDataAccordingSede( sedeSelected : string){
    let TituladosSede = this.completedDataTitulados.filter(titulado => titulado.sede == sedeSelected) ;
    let listaCarreras = [...new Set(TituladosSede.map(json => json.carrera))];
    let listaPlans= [...new Set(TituladosSede.map(json => json.planAcademico))];
    let quantityCarreras = [];
    for( let index in listaCarreras){
      console.log("listaCarreras" + listaCarreras[index] );
      quantityCarreras.push(TituladosSede.filter( titulado => titulado.carrera == listaCarreras[index] ).length);
    }
   return [listaCarreras,quantityCarreras,listaPlans];
  }

  filterDataAccordingCareers( careerSelected : string){
    let academicPlans = this.completedDataTitulados.filter(titulado => titulado.sede == this.sedeSelected && titulado.carrera == careerSelected) ;
    let listaAcademicPlans = [...new Set(academicPlans.map(json => json.planAcademico))];
    let quantityAcademicPlans = [];
    for( let index in listaAcademicPlans){
      quantityAcademicPlans.push(academicPlans.filter( titulado => titulado.planAcademico == listaAcademicPlans[index] ).length);
    }
   return [listaAcademicPlans,quantityAcademicPlans];
  }

  filterDataAccordingAcademicPlans(dataFiltered : Titulados[]){
    let quantity ;
    let dataOnePlans = [] ;
    let data_plans  = [];
    for ( let indexPlan in this.plansSelected) 
    {
      dataOnePlans = [] ;
      for (let indexCareer in this.listCareers){
        quantity = dataFiltered.filter(t => t.planAcademico == this.plansSelected[indexPlan] && t.carrera == this.listCareers[indexCareer]).length;
        dataOnePlans.push(quantity);
      }
      data_plans.push({ label: this.plansSelected[indexPlan] , data: dataOnePlans });
    }
    return data_plans
  }


}
