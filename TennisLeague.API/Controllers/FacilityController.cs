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
        private readonly FacilityRepository _facilityRepoistory;
        private readonly IMapper _mapper;

        public FacilityController(FacilityRepository facilityRepository, IMapper mapper)
        {
            _facilityRepoistory = facilityRepository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Facility>> Get(int id)
        {
            var facility = await _facilityRepoistory.GetById(id);

            if (facility is null) return new NotFoundResult();

            return _mapper.Map<Models.Facility>(facility);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Facility>>> GetAll()
        {
            var facilities = await _facilityRepoistory.GetAll();

            return Ok(facilities.Select(f => _mapper.Map<Models.Facility>(f)));
        }

        [HttpPost()]
        public async Task<ActionResult<Models.Facility>> Create(Models.Facility facilityDto)
        {
            if (facilityDto is null || facilityDto.ID.HasValue)
            {
                return BadRequest();
            }

            var facilityDb = _mapper.Map<Facility>(facilityDto);
            facilityDb = await _facilityRepoistory.Create(facilityDb);

            return CreatedAtAction(nameof(Get), new { id = facilityDb.ID }, facilityDto);
        }

        [HttpPut()]
        public async Task<ActionResult> Edit(Models.Facility facilityDto)
        {
            var facilityDb = _mapper.Map<Facility>(facilityDto);
            _ = await _facilityRepoistory.Update(facilityDb);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await _facilityRepoistory.Delete(id);

            if (result == null)
            {
                return BadRequest($"Facility ID {id} not found");
            }
            return Ok();
        }
    }
}
