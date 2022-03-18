using Microsoft.EntityFrameworkCore;

namespace TennisLeague.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Player> Players { get; set; }
        public DbSet<Facility> Facilities { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
    }
}