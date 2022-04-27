using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisLeague.Data
{
    [Table("Player")]
    public class Player : IEntity
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;
        [StringLength(200)]
        public string Email { get; set; } = string.Empty;
        [StringLength(50)]
        public string? Phone { get; set; } = null;
        [StringLength(200)]
        public string? City { get; set; } = null;
    }
}
