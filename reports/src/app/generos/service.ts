import {datos, generos} from './data';

function getJSON(sede:string, carrera:string[], periodoAcademico:string[], planAcademico:string[], antiguedad:string[]){
    var jsonSede = datos.filter(generos =>generos.sede == sede);
    var listaJson:generos[] = [];

    for(const indexCarrera in carrera){
        for(const indexPeriodoAcademico in periodoAcademico){
            for(const indexPlanAcademico in planAcademico){
                for(const indexAntiguedad in antiguedad){
                    listaJson = listaJson.concat(jsonSede.filter(json =>json.carrera == carrera[indexCarrera]).
                                                        filter(json =>json.periodoAcademico == periodoAcademico[indexPeriodoAcademico]).
                                                        filter(json =>json.planAcademico == planAcademico[indexPlanAcademico]).
                                                        filter(json =>json.antiguedad == antiguedad[indexAntiguedad])
                                                );
                }
            }
        }
    }
    listaJson.sort((a, b) => a.carrera.localeCompare(b.carrera) || a.periodoAcademico.localeCompare(b.periodoAcademico));
    return listaJson;
}

function cargarJSON(sedeSelected:string, carreraSelected:string[], periodoAcademicoSelected:string[], planAcademicoSelected:string[], antiguedadSelected:string[]){
    let datosGrafico = [];
    let labelsGrafico = [];
    let datosVarones = [];
    let datosMujeres = [];
    let listaJSON = getJSON(sedeSelected, carreraSelected, periodoAcademicoSelected, planAcademicoSelected, antiguedadSelected);
    for(const index in listaJSON){
        let label = [   "Estudiantes: " + listaJSON[index].antiguedad,
                        "Plan: " + listaJSON[index].planAcademico,
                        "Período: " + listaJSON[index].periodoAcademico,
                        "Carrera: " + listaJSON[index].carrera,
                        "Sede: " + listaJSON[index].sede
                    ];
        labelsGrafico.push(label);
        datosVarones.push(parseInt(listaJSON[index].cantidadVarones));
        datosMujeres.push(parseInt(listaJSON[index].cantidadMujeres));
    }
    datosGrafico.push(datosVarones, datosMujeres);
    getOpcionesInputs(sedeSelected, carreraSelected);
    return [datosGrafico, labelsGrafico] as const;
}

function getOpcionesInputs(sedeSelected:string, carreraSelected:string[]){
    let jsonSede = datos.filter(generos =>generos.sede == sedeSelected);
    let listaCarreras = [...new Set(jsonSede.map(json => json.carrera))];
    let jsonCarreras:generos[]=[];
    for(const indexCarrera in carreraSelected){
        jsonCarreras = jsonCarreras.concat(jsonSede.filter(generos =>generos.carrera == carreraSelected[indexCarrera]));
    }
    let listaPlanes = [...new Set(jsonCarreras.map(json => json.planAcademico))];
    return [listaCarreras, listaPlanes] as const;
}

function getSelectItemsDefault(){
    return datos[0];
}

export {cargarJSON, getSelectItemsDefault, getOpcionesInputs};