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
    }
}
