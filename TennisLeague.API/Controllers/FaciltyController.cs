using Microsoft.AspNetCore.Mvc;
using TennisLeague.Data;
using TennisLeague.DataAccess;

namespace TennisLeague.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FaciltyController
    {
        private readonly IFacilityRepository _facilityRepoistory;

        public FaciltyController(IFacilityRepository facilityRepository)
        {
            _facilityRepoistory = facilityRepository;
        }

        [HttpGet]
        public ActionResult<Models.Facility> Get(int id)
        {
            var facilityDb = _facilityRepoistory.Get(id);

            if (facilityDb is null) return new NotFoundResult();

            return new Models.Facility
            {
                Name = facilityDb.Name,
                City = facilityDb.City,
                State = facilityDb.State,
                Zip = facilityDb.Zip5,
                MaxPlayers = facilityDb.MaxPlayers,
                Fee = facilityDb.Fee,
            };
        }

        [HttpPost()]
        public ActionResult Create(Models.Facility facility)
        {
            var facilityDb = new Facility
            {
                Name = facility.Name
            };
            _facilityRepoistory.Add(facilityDb);

            return new OkResult();
        }

        public ActionResult Edit(int id)
        {
            throw new NotImplementedException();
        }

        public ActionResult Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
