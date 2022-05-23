using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace UTSI_API.Models
{
    public class Estudiante
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int Genero { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Nacionalidad{ get; set; }
        public string Estado { get; set; }


        public int IdProcedenciaAcademica { get; set; }
    }
}
