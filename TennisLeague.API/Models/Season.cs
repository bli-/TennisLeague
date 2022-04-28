namespace TennisLeague.API.Models
{
    public class Season
    {
        public int? ID { get; set; }
        public string Description { get; set; } = String.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
