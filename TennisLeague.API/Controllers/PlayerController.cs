using Microsoft.AspNetCore.Mvc;
using TennisLeague.API.Access;
using TennisLeague.Data;

namespace TennisLeague.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PlayerController
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayerController(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        [HttpGet()]
        public ActionResult<Models.Player> GetAll()
        {
            var players = _playerRepository.GetAllPlayers();

            return new OkObjectResult(players);
        }

        [HttpGet("{id}")]
        public ActionResult<Models.Player> Get(int id)
        {
            var player = _playerRepository.GetPlayerById(id);

            if (player != null)
            {
                return new Models.Player
                {
                    ID = player.ID,
                    FirstName = player.FirstName,
                    LastName = player.LastName,
                    Email = player.Email,
                    Phone = player.Phone,
                    City = player.City
                };
            }

            return new NotFoundResult();
        }

        [HttpPut]
        public IActionResult Put(Models.Player player)
        {
            if (player.ID.HasValue)
            {
                return new BadRequestResult();
            }

            var playerDb = new Player
            {
                FirstName = player.FirstName,
                LastName = player.LastName,
                Email = player.Email,
                Phone = player.Phone
            };

            int? playerId;
            try
            {
                playerId = _playerRepository.AddPlayer(playerDb);
            } 
            catch (Exception)
            {
                return new BadRequestObjectResult("Player could not be added");
            }

            return new OkResult();
        }
    }
}
