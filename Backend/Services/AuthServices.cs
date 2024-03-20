using System.Text;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System;
using Microsoft.IdentityModel.Tokens;
using WebApi.Repositories;
using WebApi.Entities;
namespace WebApi.Services;

public interface IAuthServices
{
    bool Authenticate(string password, string username);
    string? GenerateToken(User user);
    bool?  ValidateToken(string token);
    string? GetUsernameFromToken(string token);
}
public class AuthServices : IAuthServices
{
    private readonly IConfiguration _configuration;
    private readonly IPostRepository _postRepository;

    public AuthServices(IConfiguration configuration, IPostRepository postRepository)
    {
        _configuration = configuration;
        _postRepository = postRepository;
    }
  

    public bool Authenticate(string password, string username)
    {

        var user = _postRepository.GetByUsername(username).Result;
        var appPassword = user.Password;
        // Compare the provided password with the one from appsettings.json
        return password == appPassword;
    }

    public string Secret()
    {
        string Secret = _configuration["Secret"];

        // Compare the provided password with the one from appsettings.json
        return Secret;
    }
   // get username from jwt

public string GetUsernameFromToken(string token)
{
    var handler = new JwtSecurityTokenHandler();
    var jwtToken = handler.ReadJwtToken(token);
    var usernameClaim = jwtToken.Claims.First(claim => claim.Type == ClaimTypes.Name);
    return usernameClaim.Value;
}


// Add this using directive

    public string GenerateToken(User user)
    {
       
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
            Secret()));
        Console.WriteLine(key);
             List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username)
            };

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: creds);
              Console.WriteLine(token);

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }

     public bool? ValidateToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(Secret()!);

        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };

        try
        {
            var principal = tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
            return true;
        }
        catch
        {
            return false;
        }
    }

 
}

