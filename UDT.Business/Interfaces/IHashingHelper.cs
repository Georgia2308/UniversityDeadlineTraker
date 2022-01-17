using System;
using System.Collections.Generic;
using System.Text;

namespace UDT.Business.Interfaces
{
    public interface IHashingHelper
    {
        string HashPassword(string password);
    }
}
