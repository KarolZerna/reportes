namespace UTSI_API.Models
{
    public class ProcedenciaAcademica
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public int Genero { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string Nacionalidad { get; set; }
        public string Estado { get; set; }


        public int IdProcedenciaAcademica { get; set; }
    }
}