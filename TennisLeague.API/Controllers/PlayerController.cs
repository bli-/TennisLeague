using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TennisLeague.Data;

namespace TennisLeague.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PlayerController
    {
        private readonly DataContext _dataContext;

        public PlayerController(DataContext context)
        {
            _dataContext = context;
        }

        [HttpGet()]
        public ActionResult<Models.Player> GetAll()
        {
            var players = _dataContext.Players.Select(p => 
                new Models.Player
                {
                    ID = p.ID,
                    FirstName = p.FirstName,
                    LastName = p.LastName,
                    Email = p.Email,
                    Phone = p.Phone
                }
            );

            return new OkObjectResult(players);
        }

        [HttpGet("{id}")]
        public ActionResult<Models.Player> Get(int id)
        {
            var player = _dataContext.Players.FirstOrDefault(z => z.ID == id);

            if (player != null)
            {
                return new Models.Player
                {
                    ID = player.ID,
                    FirstName = player.FirstName,
                    LastName = player.LastName,
                    Email = player.Email,
                    Phone = player.Phone
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

            _dataContext.Players.Add(playerDb);
            _dataContext.SaveChanges();

            return new OkResult();
        }
    }
}
