using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TennisLeague.API.Access;
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

            return _mapper.Map<Models.Player>(players);
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

        [HttpPut]
        public ActionResult Put(Models.Player player)
        {
            if (player is null || player.ID.HasValue)
            {
                return new BadRequestResult();
            }

            var playerDb = _mapper.Map<Player>(player);

            int? playerId;
            try
            {
                playerId = _playerRepository.AddPlayer(playerDb);
            } 
            catch (Exception)
            {
                return new BadRequestObjectResult("Player could not be added");
            }

            return Ok();
        }
    }
}
