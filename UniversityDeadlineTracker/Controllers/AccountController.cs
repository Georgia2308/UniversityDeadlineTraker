using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using UDT.Business.Interfaces;
using UDT.Model.Entities;
using UDT.Model.ViewModels;
using UDT.Model.Mappers;
using System.Linq;
using UDT.Model;
using UniversityDeadlineTracker.Filters;

namespace UniversityDeadlineTracker.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {

        private IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost]
        [Route("login")]
        [Produces("application/json")]
        public async Task<IActionResult> LoginAsync([FromBody] AuthenticationRequest loginModel)
        {
            IActionResult response = Unauthorized();
            var data = await _accountService.AuthenticateAsync(loginModel.Username, loginModel.Password);
            if (data.AccessToken != null && data.User != null)
                response = Ok(data);

            return response;
        }

        [HttpPut]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshTokenAsync(RefreshTokenRequest refreshTokenModel)
        {
            if(refreshTokenModel == null || 
                string.IsNullOrEmpty(refreshTokenModel.AccessToken) ||
                string.IsNullOrEmpty(refreshTokenModel.RefreshToken))
            {
                return Unauthorized();
            }

            var response = await _accountService.RefreshAsync(refreshTokenModel);

            if(response == null ||
                string.IsNullOrEmpty(response.AccessToken) ||
                string.IsNullOrEmpty(response.RefreshToken))
            {
                return Unauthorized();
            }

            return Ok(response);
        }

        [HttpPost]
        [Route("logout")]
        [Produces("application/json")]
        [AuthorizationFilter]
        public async Task<IActionResult> LogoutAsync()
        {
            var userId = (int)HttpContext.Items["UserId"];

            IActionResult response = Unauthorized();
            
            return Ok(
                await _accountService.RevokeRefreshToken(userId)
            );
        }
    }
}