using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TennisLeague.API.Models
{
    public class Facility
    {
        public string Name { get; set; }
        public string AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; } = null;
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public int MaxPlayers { get; set; }
        public decimal? Fee { get; set; } = null;
    }
}
