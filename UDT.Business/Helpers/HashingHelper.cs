using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using UDT.Business.Interfaces;
using UDT.Model;

namespace UDT.Business.Helpers
{
    public class HashingHelper : IHashingHelper
    {
		private readonly EncryptionSettings _encryptionSettings;

        public HashingHelper(IOptions<EncryptionSettings> encryptionSettings)
        {
            _encryptionSettings = encryptionSettings.Value;
        }

        public string HashPassword(string password)
		{
			return Convert.ToBase64String(KeyDerivation.Pbkdf2(
				password: password,
				salt: Encoding.ASCII.GetBytes(_encryptionSettings.Salt),
				prf: KeyDerivationPrf.HMACSHA1,
				iterationCount: 10000,
				numBytesRequested: 256 / 8));
		}
	}
}
