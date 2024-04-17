using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text.Json.Serialization;
using WebServiceApp.Models;

namespace WebServiceApp.Controllers
{
    [Authorize()]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<DashboardController> _logger;

        public DashboardController(ILogger<DashboardController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("/api/supervisors")]
        public async Task<IEnumerable<Supervisor>> Get()
        {
            var url = "https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers";
            var supervisorList = new List<Supervisor>();
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync(url))
                {
                    var apiResponse = await response.Content.ReadAsStringAsync();
                    supervisorList = JsonConvert.DeserializeObject<List<Supervisor>>(apiResponse);
                }
            }

            //var pageSize = 10;
            //var pageNumber = 1;
            //var result = supervisorList.Skip((pageNumber - 1) * pageSize).Take(pageSize);
            var result = supervisorList.Where(x =>
            {
                if (x.Jurisdiction == null)
                    return true;
                decimal v = 0;
                return !decimal.TryParse(x.Jurisdiction, out v);
            })
            .OrderBy(x => x.Jurisdiction)
            .ThenBy(x => x.LastName)
            .ThenBy(x => x.FirstName);

            return result.ToArray();
        }

        [HttpPost]
        [Route("api/submit")]
        public IActionResult Submit([FromBody] SupervisorNotification model)
        {
            if (ModelState.IsValid)
            {
                var firstName = model.FirstName;
            }
            return Ok(new
            {
                status = "200"
            });
        }
    }
}
