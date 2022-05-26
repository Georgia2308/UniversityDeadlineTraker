using System.Threading.Tasks;
using UDT.Model.Authentication;

namespace UDT.Business.Interfaces
{
    public interface IAccountService
    {
        Task<AuthenticationResponse> AuthenticateAsync(string username, string password);
        Task<RefreshTokenResponse> RefreshAsync(RefreshTokenRequest refreshTokenModel);
        Task<bool> RevokeRefreshToken(int userId);
    }
}
