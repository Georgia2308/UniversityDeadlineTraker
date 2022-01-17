using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using UDT.Business.Interfaces;
using UDT.Model;
using UDT.Model.Entities;
using UDT.Model.Mappers;
using UDT.Repository;

namespace UDT.Business.Implementation
{
    public class AccountService : IAccountService
    {
        private readonly DataContext _context;
        private readonly IAuthorizationHelper _authorizationHelper;
        private readonly IHashingHelper _hashingHelper;

        public AccountService(
            DataContext context,
            IAuthorizationHelper authorizationHelper,
            IHashingHelper hashingHelper)
        {
            _context = context;
            _authorizationHelper = authorizationHelper;
            _hashingHelper = hashingHelper;
        }

        public async Task<AuthenticationResponse> AuthenticateAsync(string username, string password)
        {
            User loggingInUser = _context.Users
                .FirstOrDefault(x => x.Username == username && x.Password == _hashingHelper.HashPassword(password));
            var authenticationResponse = new AuthenticationResponse()
            {
                AccessToken = loggingInUser == null ? null : _authorizationHelper.GenerateAccessToken(loggingInUser),
                RefreshToken = _authorizationHelper.GenerateRefreshToken(),
                User = loggingInUser.toViewModel()
            };

            loggingInUser.RefreshToken = authenticationResponse.RefreshToken;
            loggingInUser.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);
            await _context.SaveChangesAsync();

            return authenticationResponse;
        }

        public async Task<RefreshTokenResponse> RefreshAsync(RefreshTokenRequest refreshTokenModel)
        {
            var userId = _authorizationHelper.GetSubFromExpiredToken(refreshTokenModel.AccessToken);
            
            if(userId == null)
            {
                return null;
            }

            var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == userId);
            if(user == null || user.RefreshToken != refreshTokenModel.RefreshToken)
            {
                return null;
            }

            var refreshTokenResponse = new RefreshTokenResponse
            {
                AccessToken = _authorizationHelper.GenerateAccessToken(user),
                RefreshToken = _authorizationHelper.GenerateRefreshToken()
            };

            user.RefreshToken = refreshTokenResponse.RefreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);
            await _context.SaveChangesAsync();

            return refreshTokenResponse;
        }

        public async Task<bool> RevokeRefreshToken(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.Id == userId);
            if(string.IsNullOrEmpty(user.RefreshToken))
            {
                return false;
            }

            user.RefreshToken = null;
            await _context.SaveChangesAsync();

            return true;
        }
    }
}