namespace TennisLeague.API.Models
{
    public class LeagueSeason
    {
        public int? ID { get; set; }
        public int SeasonID { get; set; }
        public int Year { get; set; }
        public DateTime StartDate { get; set; }
        public int DurationInWeeks { get; set; }
        public int StatusID { get; set; }
        public DateTime RegistrationDate { get; set; }
    }
}
