using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TennisLeague.DataAccess;
using TennisLeague.Data;

namespace TennisLeague.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PlayerController: ControllerBase
    {
        private readonly PlayerRepository _playerRepository;
        private readonly IMapper _mapper;

        public PlayerController(PlayerRepository playerRepository, IMapper mapper)
        {
            _playerRepository = playerRepository;
            _mapper = mapper;
        }

        [HttpGet()]
        public async Task<ActionResult<Models.Player>> GetAll()
        {
            var players = await _playerRepository.GetAll();

            return Ok(players.Select(player => _mapper.Map<Models.Player>(player)));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Player>> Get(int id)
        {
            var player = await _playerRepository.GetById(id);

            if (player != null)
            {
                return _mapper.Map<Models.Player>(player);
            }

            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> Create(Models.Player playerDto)
        {
            if (playerDto is null || playerDto.ID.HasValue)
            {
                return BadRequest();
            }

            var playerDb = _mapper.Map<Player>(playerDto);
            playerDb = await _playerRepository.Create(playerDb);

            return CreatedAtAction(nameof(Get), new { id = playerDb.ID }, playerDto);
        }

        [HttpPut()]
        public async Task<ActionResult> Edit(Models.Player playerDto)
        {
            var playerDb = _mapper.Map<Player>(playerDto);
            await _playerRepository.Update(playerDb);

            return Ok();
        }
    }
}
