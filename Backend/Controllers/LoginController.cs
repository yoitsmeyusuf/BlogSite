using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using WebApi.Entities;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
    private IAuthServices _AuthService;
    private IPostService _PostService;

    public AuthController(IAuthServices AuthService, IPostService PostService)
    {
        _PostService = PostService;
        _AuthService = AuthService;
    }
        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Check the password and validate it
            bool isValidPassword = _AuthService.Authenticate(request.Password, request.Username);

            if (isValidPassword)
            {
                User a = new User();
                a.Password = request.Password;
                a.Username = request.Username;
                // Password is valid, send a success response
                return Ok(_AuthService.GenerateToken(a));
            }
            else
            {
                // Password is invalid, send an error response
         
                return Unauthorized(new { message = "1Invalid password" });
            }
        }

        [HttpGet("whoami")]
        public async Task<IActionResult> whoami()
        {
            var token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            if (token == null)
            {
                return Ok();
            }
            User? a = await _PostService.GetByUsername(_AuthService.GetUsernameFromToken(token));
            if (a == null)
            {
                return Unauthorized();
            }
            return Ok(a);
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
                User a = new User();
               a.Username = _AuthService.GetUsernameFromToken(token);
                // Password is valid, send a success response
                return Ok(
                    new
                    {
                        message = "Password is valid",
                        token = _AuthService.GenerateToken(a),
                        

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
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
