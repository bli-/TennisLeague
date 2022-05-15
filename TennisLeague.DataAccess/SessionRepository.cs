using Microsoft.EntityFrameworkCore;
using TennisLeague.Data;
using TennisLeague.DataAccess.Models;

namespace TennisLeague.DataAccess
{
    public class SessionRepository : RepositoryBase<Session, DataContext>
    {
        private readonly DataContext _context;
        public SessionRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async override Task<Session?> GetById(int id)
        {
            var session = await _context.Sessions.Include(s => s.Facilities).FirstOrDefaultAsync(s => s.ID == id);

            if (session is null)
            {
                return null;
            }

            return session;
        }

        public async Task<IEnumerable<Session>> GetBySeasonId(int seasonId)
        {
            return await _context.Sessions.Include(s => s.Facilities).Where(s => s.SeasonID == seasonId).ToListAsync();
        }

        public async Task<SessionAttributes> GetSessionAttributes()
        {
            var matchTypes = await _context.MatchTypes.ToListAsync();
            var ratings = await _context.Ratings.ToListAsync();

            return new SessionAttributes
            {
                MatchTypes = matchTypes,
                Ratings = ratings
            };
        }

        public async Task UpdateSessionFacilities(int sessionId, IEnumerable<int> facilityIds)
        {
            var session = _context.Sessions.Include(s => s.Facilities).FirstOrDefault(s => s.ID == sessionId);

            if (session is null)
            {
                throw new ArgumentException($"Invalid session ID: {sessionId}");
            }

            if (session.Facilities is not null && session.Facilities.Any())
            {
                _context.RemoveRange(session.Facilities);
                await _context.SaveChangesAsync();
            }

            if (facilityIds.Any())
            {
                var updatedFacilities = facilityIds.Select(facilityId => new SessionFacility
                {
                    SessionID = sessionId,
                    FacilityID = facilityId
                });
                _context.SessionFacilities.AddRange(updatedFacilities);
            }

            await _context.SaveChangesAsync();
        }
    }
}
