using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TennisLeague.Data
{
    [Table("LeagueSeason")]
    public class LeagueSeason : IEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        public int SeasonID { get; set; }
        [Required]
        public short Year { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public short DurationInWeeks { get; set; }
    }
}
