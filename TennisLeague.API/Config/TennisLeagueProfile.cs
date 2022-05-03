using AutoMapper;
using TennisLeague.Data;
using TennisLeague.DataAccess.Models;

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

            CreateMap<Season, Models.Season>();
            CreateMap<Models.Season, Season>();

            CreateMap<Session, Models.Session>();
            CreateMap<Models.Session, Session>()
                .ForSourceMember(source => source.AvailableFacilityIDs, opt => opt.DoNotValidate());

            CreateMap<SessionAttributes, Models.SessionAttributes>();
            CreateMap<Data.MatchType, Models.MatchType>();
            CreateMap<Rating, Models.Rating>();
        }
    }
}
