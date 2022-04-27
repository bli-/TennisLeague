using TennisLeague.Data;

namespace TennisLeague.DataAccess.Models
{
    public class SessionAttributes
    {
        public IEnumerable<Data.MatchType> MatchTypes { get; set; } = Enumerable.Empty<Data.MatchType>();
        public IEnumerable<Rating> Ratings { get; set; } = Enumerable.Empty<Rating>();
    }
}
