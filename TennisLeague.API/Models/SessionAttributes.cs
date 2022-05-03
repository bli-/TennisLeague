namespace TennisLeague.API.Models
{
    public class SessionAttributes
    {
        public IEnumerable<MatchType>? MatchTypes { get; set; }
        public IEnumerable<Rating>? Ratings { get; set; }
    }
}
