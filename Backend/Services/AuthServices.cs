using System.Text;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System;
using Microsoft.IdentityModel.Tokens;
namespace WebApi.Services;

public interface IAuthServices
{
    bool Authenticate(string password);
    string? GenerateToken();
    bool?  ValidateToken(string token);

}
public class AuthServices : IAuthServices
{
    private readonly IConfiguration _configuration;

    public AuthServices(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public bool Authenticate(string password)
    {
        string appPassword = _configuration["Password"];

        // Compare the provided password with the one from appsettings.json
        return password == appPassword;
    }

    public string Secret()
    {
        string Secret = _configuration["Secret"];

        // Compare the provided password with the one from appsettings.json
        return Secret;
    }

// Add this using directive

    public string GenerateToken()
    {
       
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
            Secret()));
        Console.WriteLine(key);
      

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
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

public class User
{
    public string Username { get; set; }
    public string Password { get; set; }
}