using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TennisLeague.Data;
using TennisLeague.DataAccess;

namespace TennisLeague.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FacilityController : ControllerBase
    {
        private readonly IFacilityRepository _facilityRepoistory;
        private readonly IMapper _mapper;

        public FacilityController(IFacilityRepository facilityRepository, IMapper mapper)
        {
            _facilityRepoistory = facilityRepository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public ActionResult<Models.Facility> Get(int id)
        {
            var facility = _facilityRepoistory.Get(id);

            if (facility is null) return new NotFoundResult();

            return _mapper.Map<Models.Facility>(facility);
        }

        [HttpGet]
        public ActionResult<IEnumerable<Models.Facility>> GetAll()
        {
            var facilities = _facilityRepoistory.GetAll();

            return Ok(facilities.Select(f => _mapper.Map<Models.Facility>(f)));
        }

        [HttpPost()]
        public ActionResult<Models.Facility> Create(Models.Facility facilityDto)
        {
            if (facilityDto is null || facilityDto.ID.HasValue)
            {
                return BadRequest();
            }

            var facilityDb = _mapper.Map<Facility>(facilityDto);
            _facilityRepoistory.Add(facilityDb);

            return CreatedAtAction(nameof(Get), new { id = facilityDb.ID }, facilityDto);
        }

        [HttpPut()]
        public ActionResult Edit(Models.Facility facilityDto)
        {
            var facilityDb = _mapper.Map<Facility>(facilityDto);
            _facilityRepoistory.Update(facilityDb);

            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if (_facilityRepoistory.Get(id) == null)
            {
                return BadRequest($"Facility ID {id} not found");
            }

            _facilityRepoistory.Delete(id);
            return Ok();
        }
    }
}
