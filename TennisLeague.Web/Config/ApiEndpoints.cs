using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TennisLeague.Web.Config
{
    public class ApiEndpointSettings
    {
        public const string ApiEndpoints = "ApiEndpoints";
        public string TennisLeagueApiBaseUrl { get; set; } = string.Empty;
    }
}
