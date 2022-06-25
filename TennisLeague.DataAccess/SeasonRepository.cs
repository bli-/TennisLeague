using Microsoft.EntityFrameworkCore;
using TennisLeague.Data;
using TennisLeague.DataAccess.Models;

namespace TennisLeague.DataAccess
{
    public class SeasonRepository : RepositoryBase<LeagueSeason, DataContext>
    {
        private readonly DataContext _context;
        public SeasonRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<SeasonAttributes> GetSeasonAttributes()
        {
            var seasonsOfYear = await _context.Seasons.ToListAsync();
            var statuses = await _context.LeagueSeasonStatuses.ToListAsync();

            return new SeasonAttributes
            {
                Seasons = seasonsOfYear,
                Statuses = statuses
            };
        }

        public async Task<IEnumerable<LeagueSeason>> GetAll(SeasonFilter filter)
        {
            var query = _context.LeagueSeasons.AsQueryable();
            
            if (filter != null)
            {
                if (filter.StatusID.HasValue)
                {
                    query = query.Where(z => z.Status == filter.StatusID);
                }
            }

            return await query.ToListAsync();
        }

        public async Task UpdateSeasonStatuses()
        {
            var nonCompletedSeasons = await _context.LeagueSeasons.Where(s => s.Status != (int)SeasonStatus.Completed).ToListAsync();

            foreach (var season in nonCompletedSeasons)
            {
                if (season.StartDate.AddDays(season.DurationInWeeks * 7) <= DateTime.Now)
                {
                    season.Status = (int)SeasonStatus.Completed;
                }
                else if (season.StartDate <= DateTime.Now)
                {
                    season.Status = (int)SeasonStatus.Active;
                }
                else if (season.RegistrationDate <= DateTime.Now)
                {
                    season.Status = (int)SeasonStatus.OpenRegistration;
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}
