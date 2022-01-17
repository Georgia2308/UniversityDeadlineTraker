using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UDT.Model;

namespace UDT.Business.Interfaces
{
    public interface IAccountService
    {
        Task<AuthenticationResponse> AuthenticateAsync(string username, string password);
        Task<RefreshTokenResponse> RefreshAsync(RefreshTokenRequest refreshTokenModel);
        Task<bool> RevokeRefreshToken(int userId);
    }
}
