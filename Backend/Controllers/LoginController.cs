using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
    private IAuthServices _AuthService;

    public AuthController(IAuthServices AuthService)
    {
        _AuthService = AuthService;
    }
        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Check the password and validate it
            bool isValidPassword = _AuthService.Authenticate(request.Password);

            if (isValidPassword)
            {
                // Password is valid, send a success response
                return Ok(_AuthService.GenerateToken());
            }
            else
            {
                // Password is invalid, send an error response
         
                return Unauthorized(new { message = "1Invalid password" });
            }
        }

         [HttpGet]
        public IActionResult Check()
        {
            //get bareer token
            // get the token from the header
            var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            // Check the password and validate it
            bool? isValidPassword = _AuthService.ValidateToken(token);

            if (isValidPassword==true)
            {
                // Password is valid, send a success response
                return Ok(
                    new
                    {
                        message = "Password is valid",
                        token = _AuthService.GenerateToken(),
                        

                    }
                );
            }
            else
            {
                // Password is invalid, send an error response
         
                return Unauthorized(new { message = "2Invalid password" });
            }
        }
        

    
    }
    //Make an jwt token


    public class LoginRequest
    {
        public string Password { get; set; }
    }
}
