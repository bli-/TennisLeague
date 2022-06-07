using Microsoft.EntityFrameworkCore;

namespace TennisLeague.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Player> Players { get; set; } = null!;
        public DbSet<Facility> Facilities { get; set; } = null!;
        public DbSet<MatchType> MatchTypes { get; set; } = null!;
        public DbSet<Rating> Ratings { get; set; } = null!;
        public DbSet<LeagueSeason> LeagueSeasons { get; set; } = null!;
        public DbSet<Season> Seasons { get; set; } = null!;
        public DbSet<Session> Sessions { get; set; } = null!;
        public DbSet<SessionFacility> SessionFacilities { get; set; } = null!;
        public DbSet<LeagueSeasonStatus> LeagueSeasonStatuses { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
    }
}