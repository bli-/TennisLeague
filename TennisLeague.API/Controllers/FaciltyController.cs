using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TennisLeague.Data;
using TennisLeague.DataAccess;

namespace TennisLeague.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FaciltyController : ControllerBase
    {
        private readonly IFacilityRepository _facilityRepoistory;
        private readonly IMapper _mapper;

        public FaciltyController(IFacilityRepository facilityRepository, IMapper mapper)
        {
            _facilityRepoistory = facilityRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<Models.Facility> Get(int id)
        {
            var facility = _facilityRepoistory.Get(id);

            if (facility is null) return new NotFoundResult();

            return _mapper.Map<Models.Facility>(facility);
        }

        [HttpPost()]
        public ActionResult<Models.Facility> Create(Models.Facility facilityDto)
        {
            var facilityDb = _mapper.Map<Facility>(facilityDto);
            _facilityRepoistory.Add(facilityDb);

            return CreatedAtAction(nameof(Get), new { id = facilityDb.ID }, facilityDto);
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
