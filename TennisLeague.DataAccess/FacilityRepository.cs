using TennisLeague.Data;

namespace TennisLeague.DataAccess
{
    public class FacilityRepository : IFacilityRepository
    {
        private readonly DataContext _context;

        public FacilityRepository(DataContext context)
        {
            _context = context;
        }

        public void Add(Facility facility)
        {
            _context.Facilities.Add(facility);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var facility = _context.Facilities.FirstOrDefault(z => z.ID == id);

            if (facility != null)
            {
                _context.Remove(facility);
                _context.SaveChanges();
            }
        }

        public Facility? Get(int id)
        {
            return _context.Facilities.FirstOrDefault(z => z.ID == id);
        }

        public IEnumerable<Facility> GetAll()
        {
            return _context.Facilities.ToList();
        }

        public void Update(Facility facility)
        {
            var match = _context.Facilities.FirstOrDefault(z => z.ID == facility.ID);

            if (match != null)
            {
                match.Name = facility.Name;
                match.AddressLine1 = facility.AddressLine1;
                match.AddressLine2 = facility.AddressLine2;
                match.City = facility.City;
                match.State = facility.State;
                match.Zip5 = facility.Zip5;
                match.Phone = facility.Phone;
                match.Email = facility.Email;
                match.NumberOfCourts = facility.NumberOfCourts;
                _context.SaveChanges();
            }
        }
    }
}
