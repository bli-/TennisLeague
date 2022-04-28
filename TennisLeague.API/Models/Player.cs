namespace TennisLeague.API.Models
{
    public class Player
    {
        public int? ID { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Phone { get; set; } = null;
        public string? City { get; set; } = null;
    }
}
