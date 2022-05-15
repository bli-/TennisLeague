using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TennisLeague.Data;
using TennisLeague.DataAccess;

namespace TennisLeague.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly SessionRepository _sessionRepository;
        private readonly FacilityRepository _faciltyRepository;
        private readonly IMapper _mapper;

        public SessionController(SessionRepository sessionRepository, FacilityRepository facilityRepository, IMapper mapper)
        {
            _sessionRepository = sessionRepository;
            _faciltyRepository = facilityRepository;
            _mapper = mapper;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Models.Session>>> GetAll()
        {
            var sessions = await _sessionRepository.GetAll();

            return Ok(sessions.Select(session => _mapper.Map<Models.Session>(session)));
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Models.Session>> Get(int id)
        {
            var session = await _sessionRepository.GetById(id);

            if (session == null)
            {
                return NotFound();
            }

            return _mapper.Map<Models.Session>(session);
        }

        [HttpGet("season/{seasonId:int}")]
        public async Task<ActionResult<IEnumerable<Models.Session>>> GetBySeasonId(int seasonId)
        {
            var sessions = await _sessionRepository.GetBySeasonId(seasonId);

            return Ok(sessions.Select(session => _mapper.Map<Models.Session>(session)));
        }

        [HttpPost()]
        public async Task<ActionResult> Create(Models.Session sessionDto)
        {
            if (sessionDto is null || sessionDto.ID.HasValue)
            {
                return BadRequest();
            }

            var facilities = await _faciltyRepository.GetByIds(sessionDto.AvailableFacilityIDs);
            var invalidfacilityIds = sessionDto.AvailableFacilityIDs.Except(facilities.Select(f => f.ID));
            if (invalidfacilityIds.Any())
            {
                return BadRequest($"Invalid facility ID(s): {string.Join(',', invalidfacilityIds)}");
            }

            var sessionDb = _mapper.Map<Session>(sessionDto);
            sessionDb = await _sessionRepository.Create(sessionDb);

            await _sessionRepository.UpdateSessionFacilities(sessionDb.ID, sessionDto.AvailableFacilityIDs);

            return CreatedAtAction(nameof(Get), new { id = sessionDb.ID }, sessionDto);
        }

        [HttpPut()]
        public async Task<ActionResult> Edit(Models.Session sessionDto)
        {
            var sessionDb = _mapper.Map<Session>(sessionDto);
            await _sessionRepository.Update(sessionDb);
            return Ok();
        }

        [HttpGet("attributes")]
        public async Task<ActionResult<Models.SessionAttributes>> GetSessionAttributes()
        {
            var attributes = await _sessionRepository.GetSessionAttributes();

            return Ok(_mapper.Map<Models.SessionAttributes>(attributes));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _sessionRepository.UpdateSessionFacilities(id, Enumerable.Empty<int>());
            var result = await _sessionRepository.Delete(id);

            if (result == null)
            {
                return BadRequest($"Session ID {id} not found");
            }
            return Ok();
        }
    }
}
