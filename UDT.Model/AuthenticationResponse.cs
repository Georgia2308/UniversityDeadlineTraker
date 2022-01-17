using UDT.Model.ViewModels;

namespace UDT.Model
{
    public class AuthenticationResponse
    {
        
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public UserViewModel User { get; set; }
    }
}