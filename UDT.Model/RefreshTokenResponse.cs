using System;
using System.Collections.Generic;
using System.Text;

namespace UDT.Model
{
    public class RefreshTokenResponse
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
