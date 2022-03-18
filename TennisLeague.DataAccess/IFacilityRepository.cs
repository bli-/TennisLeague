using TennisLeague.Data;

namespace TennisLeague.DataAccess
{
    public interface IFacilityRepository
    {
        public Facility? Get(int id);
        public IEnumerable<Facility> GetAll();
        public void Add(Facility facility);
        public void Update(Facility facility);
        public void Delete(int id);
    }
}
