using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TennisLeague.Web.Config;

namespace TennisLeague.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FacilityController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl;

        public FacilityController(IHttpClientFactory httpClientFactory, IOptions<ApiEndpointSettings> endpoints)
        {
            _httpClient = httpClientFactory.CreateClient();
            _baseUrl = endpoints.Value.TennisLeagueApiBaseUrl;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var url = $"{_baseUrl}/facility";
            var response = await _httpClient.GetAsync(url);

            var responseBody = await response.Content.ReadAsStringAsync();

            return Ok(responseBody);
        }
    }
}
