using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisLeague.Data
{
    [Table("SessionFacility")]
    public class SessionFacility : IEntity
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public int FacilityID { get; set; }
        [Required]
        public int SessionID { get; set; }

        public Facility? Facility { get; set; }
        public Session? Session { get; set; }
    }
}
