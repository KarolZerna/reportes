export class Titulados
{
    sede: string;
    grado: string;
    carrera: string;
    carnetEstudiante: string;
    planAcademico: string;
    cantidadSemestres: string;
    tipoTitulacion: string;
    urlTrabajoTitulacion: string;
    estado: string;
    informacionEmpleo: string;
    
    constructor(sede: string,grado: string,carrera: string,carnetEstudiante: string,planAcademico: string,cantidadSemestres: string,
                tipoTitulacion: string,urlTrabajoTitulacion: string,estado: string,informacionEmpleo: string){
        this.sede = sede;
        this.grado = grado;
        this.carrera = carrera;
        this.carnetEstudiante = carnetEstudiante;
        this. planAcademico = planAcademico;
        this.cantidadSemestres = cantidadSemestres;
        this.tipoTitulacion = tipoTitulacion;
        this.urlTrabajoTitulacion = urlTrabajoTitulacion;
        this.estado = estado;
        this.informacionEmpleo = informacionEmpleo;
    }
}