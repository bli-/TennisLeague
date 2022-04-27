using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisLeague.Data
{
    [Table("Facility")]
    public class Facility : IEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; } = null;
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string Zip5 { get; set; }
        public string? Phone { get; set; } = null;
        public string? Email { get; set; } = null;
        [Required]
        public int NumberOfCourts { get; set; }
    }
}
