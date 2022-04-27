using TennisLeague.Data;

namespace TennisLeague.DataAccess
{
    public class PlayerRepository : RepositoryBase<Player, DataContext>
    {
        public PlayerRepository(DataContext context) : base(context)
        {
        }
    }
}
