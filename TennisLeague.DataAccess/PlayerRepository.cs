using TennisLeague.Data;

namespace TennisLeague.API.Access
{
    public class PlayerRepository : IPlayerRepository
    {
        private readonly DataContext _context;

        public PlayerRepository(DataContext context)
        {
            _context = context;
        }

        public int? AddPlayer(Player player)
        {
            _context.Players.Add(player);
            _context.SaveChanges();

            return player.ID;
        }

        public IEnumerable<Player> GetAllPlayers()
        {
            return _context.Players;
        }

        public Player? GetPlayerById(int id)
        {
            return _context.Players.FirstOrDefault(z => z.ID == id);
        }

        public void Update(Player player)
        {
            var match = _context.Players.FirstOrDefault(z => z.ID == player.ID);

            if (match != null)
            {
                match.FirstName = player.FirstName;
                match.LastName = player.LastName;
                match.Email = player.Email;
                match.Phone = player.Phone;
                match.City = player.City;

                _context.SaveChanges();
            }
        }
    }
}
