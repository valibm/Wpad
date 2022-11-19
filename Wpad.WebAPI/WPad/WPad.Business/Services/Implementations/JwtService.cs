using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using WPad.Business.Services.Interfaces;
using WPad.Core.Entities;

namespace WPad.Business.Services.Implementations
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _config;
        public JwtService(IConfiguration config)
        {
            _config = config;
        }

        public string GetToken(AppUser user, IList<string> roles)
        {
            string issuer = _config.GetSection("Jwt:issuer").Value;
            string audience = _config.GetSection("Jwt:audience").Value;
            string secretKey = _config.GetSection("Jwt:securityKey").Value;

            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("FirstName", user.Firstname),
                new Claim("LastName", user.Lastname)
            };

            claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

            SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(secretKey));
            SigningCredentials credentials = new(securityKey, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken securityToken = new(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMonths(2),
                signingCredentials: credentials
            );

            var token = new JwtSecurityTokenHandler().WriteToken(securityToken);

            return token;
        }
    }
}
