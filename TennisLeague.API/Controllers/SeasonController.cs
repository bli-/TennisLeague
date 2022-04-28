using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TennisLeague.Data;
using TennisLeague.DataAccess;

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

        [HttpGet()]
        public async Task<ActionResult<Models.Season>> GetAll()
        {
            var seasons = await _seasonRepository.GetAll();

            return Ok(seasons.Select(season => _mapper.Map<Models.Season>(season)));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Season>> Get(int id)
        {
            var season = await _seasonRepository.GetById(id);

            if (season != null)
            {
                return _mapper.Map<Models.Season>(season);
            }

            return NotFound();
        }

        [HttpPost()]
        public async Task<ActionResult> Create(Models.Season seasonDto)
        {
            if (seasonDto is null || seasonDto.ID.HasValue)
            {
                return BadRequest();
            }

            var seasonDb = _mapper.Map<Season>(seasonDto);
            seasonDb = await _seasonRepository.Create(seasonDb);

            return CreatedAtAction(nameof(Get), new { id = seasonDb.ID }, seasonDto);
        }

        [HttpPut()]
        public async Task<ActionResult> Edit(Models.Season seasonDto)
        {
            var seasonDb = _mapper.Map<Season>(seasonDto);
            await _seasonRepository.Update(seasonDb);
            return Ok();
        }
    }
}
