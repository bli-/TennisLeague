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

            CreateMap<LeagueSeason, Models.LeagueSeason>();
            CreateMap<Models.LeagueSeason, LeagueSeason>()
                .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate.Date)); ;

            CreateMap<Session, Models.Session>()
                .ForMember(dest => dest.AvailableFacilityIDs, opt => opt.MapFrom(src => src.Facilities == null ? new int[0] : src.Facilities.Select(facility => facility.FacilityID)));
            CreateMap<Models.Session, Session>()
                .ForSourceMember(source => source.AvailableFacilityIDs, opt => opt.DoNotValidate())
                .ForMember(dest => dest.MatchStart, opt => opt.MapFrom(src => src.MatchStart.ToLocalTime()));

            CreateMap<SessionAttributes, Models.SessionAttributes>();
            CreateMap<Data.MatchType, Models.MatchType>();
            CreateMap<Rating, Models.Rating>();
        }
    }
}
