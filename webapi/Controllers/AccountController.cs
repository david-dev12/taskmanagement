using Microsoft.AspNetCore.Mvc;
using webapi.Services;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly JwtService _jwtService;
        public AccountController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public IActionResult Login(User model)
        {
            if(model.Username == "root" && model.Password == "123456" )
            {
                User user = model;
                var token = _jwtService.GenerateToken(user.Username);
                return Ok(new { token });
            }
            return Unauthorized();
        }
    }
}
