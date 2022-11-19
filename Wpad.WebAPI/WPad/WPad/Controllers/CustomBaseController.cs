using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WPad.Business.DTOs;

namespace WPad.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomBaseController : ControllerBase
    {
        [NonAction]
        public IActionResult ActionResultInstance<T>(Response<T> response) where T : class
        {
            return new ObjectResult(response)
            {
                StatusCode = response.StatusCode
            };
        }
    }
}
