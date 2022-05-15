using Microsoft.EntityFrameworkCore;
using TennisLeague.Data;

namespace TennisLeague.DataAccess
{
    public class FacilityRepository : RepositoryBase<Facility, DataContext>
    {
        private DataContext _context;
        public FacilityRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Facility>> GetByIds(IEnumerable<int> ids)
        {
            return await _context.Facilities.Where(f => ids.Contains(f.ID)).ToListAsync();
        }
    }
}
