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
        private readonly IPlayerRepository _playerRepository;
        private readonly IMapper _mapper;

        public PlayerController(IPlayerRepository playerRepository, IMapper mapper)
        {
            _playerRepository = playerRepository;
            _mapper = mapper;
        }

        [HttpGet()]
        public ActionResult<Models.Player> GetAll()
        {
            var players = _playerRepository.GetAllPlayers();

            return Ok(players.Select(player => _mapper.Map<Models.Player>(player)));
        }

        [HttpGet("{id}")]
        public ActionResult<Models.Player> Get(int id)
        {
            var player = _playerRepository.GetPlayerById(id);

            if (player != null)
            {
                return _mapper.Map<Models.Player>(player);
            }

            return NotFound();
        }

        [HttpPost]
        public ActionResult Create(Models.Player playerDto)
        {
            if (playerDto is null || playerDto.ID.HasValue)
            {
                return BadRequest();
            }

            var playerDb = _mapper.Map<Player>(playerDto);
            _playerRepository.AddPlayer(playerDb);

            return CreatedAtAction(nameof(Get), new { id = playerDb.ID }, playerDto);
        }

        [HttpPut()]
        public ActionResult Edit(Models.Player playerDto)
        {
            var playerDb = _mapper.Map<Player>(playerDto);
            _playerRepository.Update(playerDb);

            return Ok();
        }
    }
}
