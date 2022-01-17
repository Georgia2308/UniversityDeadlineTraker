using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using UDT.Business.Interfaces;
using UDT.Model;
using UDT.Model.Entities;

namespace UDT.Business.Helpers
{
	public class AuthorizationHelper : IAuthorizationHelper
	{
		private readonly AuthorizationSettings _authorizationSettings;
		private readonly IUserService _userService;

		public AuthorizationHelper(
			IOptions<AuthorizationSettings> authorizationSettings,
			IUserService userService)
		{
			_authorizationSettings = authorizationSettings.Value;
			_userService = userService;
		}

		public string GenerateAccessToken(User user)
		{
			var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authorizationSettings.Secret));
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
				new Claim("username", user.Username),
				new Claim("firstName", user.FirstName),
				new Claim("lastName", user.LastName),
			};

			var token = new JwtSecurityToken(
				issuer: _authorizationSettings.Issuer,
				audience: _authorizationSettings.Audience,
				claims: claims,
				expires: DateTime.Now.AddMinutes(30),
				signingCredentials: credentials
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}

		public string GenerateRefreshToken()
		{
			var randomNumber = new byte[32];
			using (var rng = RandomNumberGenerator.Create())
			{
				rng.GetBytes(randomNumber);
				return Convert.ToBase64String(randomNumber);
			}
		}

		public bool IsAccessTokenValid(string token)
		{
			SecurityToken validatedToken;
			try
			{
				var tokenHandler = new JwtSecurityTokenHandler();
				var secretKey = Encoding.ASCII.GetBytes(_authorizationSettings.Secret);

				tokenHandler.ValidateToken(token, new TokenValidationParameters
				{
					ValidateLifetime = true,
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateIssuerSigningKey = true,

					ValidIssuer = _authorizationSettings.Issuer,
					ValidAudience = _authorizationSettings.Audience,
					IssuerSigningKey = new SymmetricSecurityKey(secretKey),
				}
				, out validatedToken);
			}
			catch
			{
				return false;
			}

			return true;
		}

		public async Task<bool> IsUsersRoleAuthorized(string token, string allowedRoles)
		{
			var userId = ExtractUserIdFromToken(token);
			var user = await _userService.GetByIDAsync(userId);

			return allowedRoles.Split(",").Any(role => role.Equals(user.Role.ToString()));
		}

		public int ExtractUserIdFromToken(string token)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var jwtToken = (JwtSecurityToken)tokenHandler.ReadToken(token);

			return int.Parse(jwtToken.Subject);
		}

		public int? GetSubFromExpiredToken(string token)
		{
			var secretKey = Encoding.ASCII.GetBytes(_authorizationSettings.Secret);

			var tokenValidationParameters = new TokenValidationParameters
			{
				ValidateLifetime = false,
				ValidateIssuer = true,
				ValidateAudience = true,
				ValidateIssuerSigningKey = true,

				ValidIssuer = _authorizationSettings.Issuer,
				ValidAudience = _authorizationSettings.Audience,
				IssuerSigningKey = new SymmetricSecurityKey(secretKey),
			};

			var tokenHandler = new JwtSecurityTokenHandler();
			SecurityToken securityToken;
			var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);

			var jwtToken = (JwtSecurityToken)tokenHandler.ReadToken(token);
			return int.Parse(jwtToken.Subject);
		}
	}
}
