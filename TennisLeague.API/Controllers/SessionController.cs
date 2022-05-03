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

            if (session != null)
            {
                return _mapper.Map<Models.Session>(session);
            }

            return NotFound();
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

            var facilityIds = sessionDto.AvailableFacilityIDs;
            var facilityTasks = facilityIds.Select(f => _faciltyRepository.GetById(f));
            var results = await Task.WhenAll(facilityTasks);
            if (results.Any(result => result is null))
            {
                return BadRequest("Invalid facility selection(s)");
            }

            var sessionDb = _mapper.Map<Session>(sessionDto);
            sessionDb = await _sessionRepository.Create(sessionDb);

            var sessionFacilities = await _sessionRepository.UpdateSessionFacilities(sessionDb.ID, facilityIds);

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
    }
}
