using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TennisLeague.Web.Controllers
{
    public class FacilityController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        public FacilityController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var url = "https://localhost:7021/player";
            var response = await _httpClient.GetAsync(url);

            var responseBody = await response.Content.ReadAsStringAsync();

            return Ok(responseBody);
        }
    }
}
