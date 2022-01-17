using System;
using System.Collections.Generic;
using System.Text;

namespace UDT.Model
{
    public class RefreshTokenRequest
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
