using AutoMapper;
using TennisLeague.Data;

namespace TennisLeague.API.Config
{
    public class TennisLeagueProfile : Profile
    {
        public TennisLeagueProfile()
        {
            CreateMap<Facility, Models.Facility>();
            CreateMap<Models.Facility, Facility>();

            CreateMap<Player, Models.Player>();
            CreateMap<Models.Player, Player>();
        }
    }
}
