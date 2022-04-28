namespace TennisLeague.API.Models
{
    public class Session
    {
        public int? ID { get; set; }
        public DateTime MatchStart { get; set; }
        public string Gender { get; set; } = string.Empty;
        public int SeasonID { get; set; }
        public int RatingID { get; set; }
        public int MatchTypeID { get; set; }
        public IEnumerable<int> AvailableFacilityIDs { get; set; } = Enumerable.Empty<int>();
    }
}
