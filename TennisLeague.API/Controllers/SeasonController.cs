using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TennisLeague.API.Models;
using TennisLeague.DataAccess;
using LeagueSeason = TennisLeague.Data.LeagueSeason;

namespace TennisLeague.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SeasonController : ControllerBase
    {
        private readonly SeasonRepository _seasonRepository;
        private readonly IMapper _mapper;

        public SeasonController(SeasonRepository seasonRepository, IMapper mapper)
        {
            _seasonRepository = seasonRepository;
            _mapper = mapper;
        }
        
        [HttpGet]
        public async Task<ActionResult<Models.LeagueSeason>> Get([FromQuery] SeasonFilter filterDto)
        {
            var filter = _mapper.Map<DataAccess.Models.SeasonFilter>(filterDto);
            var seasons = await _seasonRepository.GetAll(filter);

            return Ok(seasons.Select(season => _mapper.Map<Models.LeagueSeason>(season)));
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Models.LeagueSeason>> Get(int id)
        {
            var season = await _seasonRepository.GetById(id);

            if (season != null)
            {
                return _mapper.Map<Models.LeagueSeason>(season);
            }

            return NotFound();
        }

        [HttpPost()]
        public async Task<ActionResult> Create(Models.LeagueSeason seasonDto)
        {
            if (seasonDto is null || seasonDto.ID.HasValue)
            {
                return BadRequest();
            }

            var seasonDb = _mapper.Map<LeagueSeason>(seasonDto);
            seasonDb = await _seasonRepository.Create(seasonDb);

            return CreatedAtAction(nameof(Get), new { id = seasonDb.ID }, seasonDto);
        }

        [HttpPut()]
        public async Task<ActionResult> Edit(Models.LeagueSeason seasonDto)
        {
            var seasonDb = _mapper.Map<LeagueSeason>(seasonDto);
            await _seasonRepository.Update(seasonDb);
            return Ok();
        }

        [HttpGet("attributes")]
        public async Task<ActionResult<Models.SeasonAttributes>> GetSeasonAttributes()
        {
            var attributes = await _seasonRepository.GetSeasonAttributes();

            return Ok(_mapper.Map<Models.SeasonAttributes>(attributes));
        }
    }
}
