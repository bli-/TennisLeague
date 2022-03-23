using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TennisLeague.Web.Config;

namespace TennisLeague.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlayerController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl;

        public PlayerController(IHttpClientFactory httpClientFactory, IOptions<ApiEndpointSettings> endpoints)
        {
            _httpClient = httpClientFactory.CreateClient();
            _baseUrl = endpoints.Value.TennisLeagueApiBaseUrl;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var url = $"{_baseUrl}/player";
            var response = await _httpClient.GetAsync(url); // Currently hitting GetAll for testing
            
            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int) response.StatusCode);
            }

            var responseBody = await response.Content.ReadAsStringAsync();
            return Ok(responseBody);
        }
    }
}
