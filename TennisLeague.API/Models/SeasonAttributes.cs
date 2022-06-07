namespace TennisLeague.API.Models
{
    public class SeasonAttributes
    {
        public IEnumerable<Season> Seasons { get; set; } = Enumerable.Empty<Season>();
        public IEnumerable<LeagueSeasonStatus> Statuses { get; set; } = Enumerable.Empty<LeagueSeasonStatus>();
    }
}
