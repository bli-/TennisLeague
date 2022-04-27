using Microsoft.EntityFrameworkCore;
using TennisLeague.Data;
using TennisLeague.DataAccess.Models;

namespace TennisLeague.DataAccess
{
    public class SessionRepository : RepositoryBase<Session, DataContext>
    {
        private readonly DataContext _context;
        public SessionRepository(Data.DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<SessionAttributes> GetSessionAttributes()
        {
            var matchTypesTask = _context.MatchTypes.ToListAsync();
            var ratingsTask = _context.Ratings.ToListAsync();

            await Task.WhenAll(matchTypesTask, ratingsTask);

            return new SessionAttributes
            {
                MatchTypes = matchTypesTask.Result,
                Ratings = ratingsTask.Result
            };
        }
    }
}
