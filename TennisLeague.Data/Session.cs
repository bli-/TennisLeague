using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisLeague.Data
{
    [Table("Session")]
    public class Session : IEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        public DateTime MatchStart { get; set; } = DateTime.Now;
        [Required]
        public string Gender { get; set; } = string.Empty;
        [Required]
        public int SeasonID { get; set; }
        [Required]
        public int RatingID { get; set; }
        [Required]
        public int MatchTypeID { get; set; }

        public Season? Season { get; set; }
        public Rating? Rating { get; set; }
        public MatchType? MatchType { get; set; }
    }
}
