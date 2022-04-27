using TennisLeague.Data;

namespace TennisLeague.DataAccess
{
    public class FacilityRepository : RepositoryBase<Facility, DataContext>
    {
        public FacilityRepository(DataContext context) : base(context)
        {
        }
    }
}
