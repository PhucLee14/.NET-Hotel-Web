using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;


namespace HotelManagement.Utils.JWT
{
    public class JwtUtil
    {
        private readonly string _secretKey = "10b31figv97ce7c40cf4f81dff51dbeqa"; // 32
        private readonly string _issuer = "localhost";
        private readonly string _audience = "http://localhost:3000";


        public JwtUtil()
        {
        }

        public string GenerateToken(IEnumerable<Claim> claims, string expiredIn)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.Add(ParseTimeSpan(expiredIn)),
                SigningCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Audience = _audience,
                Issuer = _issuer,
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string GenerateToken(IEnumerable<Claim> claims, DateTime expired)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expired,
                SigningCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Audience = _audience,
                Issuer = _issuer,
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public List<Claim> ValidateToken(string token)
        {
        
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);

            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = _issuer,
                ValidateAudience = true,
                ValidAudience = _audience,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ClockSkew = TimeSpan.Zero,
            }, out var validatedToken);

            var jwtSecurityToken = validatedToken as JwtSecurityToken;
            return jwtSecurityToken.Claims.ToList();

        }

        public static TimeSpan ParseTimeSpan(string input)
        {
            // Kiểm tra và trích xuất giá trị số và đơn vị thời gian
            int value = int.Parse(input.Substring(0, input.Length - 1));
            char unit = input[input.Length - 1];

            // Dựa vào đơn vị thời gian, tạo TimeSpan tương ứng
            switch (unit)
            {
                case 'd':
                    return TimeSpan.FromDays(value);
                case 'h':
                    return TimeSpan.FromHours(value);
                case 'm':
                    return TimeSpan.FromMinutes(value);
                case 's':
                    return TimeSpan.FromSeconds(value);
                default:
                    throw new ArgumentException("Invalid time unit");
            }
        }
    }
}