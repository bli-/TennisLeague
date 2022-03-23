using AutoMapper;
using TennisLeague.Data;

namespace TennisLeague.API.Config
{
    public class TennisLeagueProfile : Profile
    {
        public TennisLeagueProfile()
        {
            CreateMap<Facility, Models.Facility>()
                .ForMember(dest => dest.Zip, opt => opt.MapFrom(src => src.Zip5));
            CreateMap<Models.Facility, Facility>()
                .ForMember(dest => dest.Zip5, opt => opt.MapFrom(src => src.Zip));

            CreateMap<Player, Models.Player>();
            CreateMap<Models.Player, Player>();
        }
    }
}
