namespace TennisLeague.DataAccess
{
    public class SeasonRepository : RepositoryBase<Data.Season, Data.DataContext>
    {
        public SeasonRepository(Data.DataContext context) : base (context)
        {
        }
    }
}
