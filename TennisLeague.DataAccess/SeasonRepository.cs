using Microsoft.EntityFrameworkCore;
using TennisLeague.Data;

namespace TennisLeague.DataAccess
{
    public class SeasonRepository : RepositoryBase<LeagueSeason, DataContext>
    {
        private readonly DataContext _context;
        public SeasonRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Season>> GetSeasonsOfYear()
        {
            return await _context.Seasons.ToListAsync();
        }
    }
}
