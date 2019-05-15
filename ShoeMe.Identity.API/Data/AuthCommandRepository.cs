using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShoeMe.Identity.API.Models;

namespace ShoeMe.Identity.API.Data
{
    public class AuthCommandRepository : IAuthCommandRepository
    {
        private readonly IdentityContext _context;
        public AuthCommandRepository(IdentityContext context)
        {
            _context = context;
            

        }
        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            //Using dispose
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                //Password as bytearray
                var encodedPass = System.Text.Encoding.UTF8.GetBytes(password);

                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(encodedPass);
            }
        }

                public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(u => u.Username == username))
                return true;

            return false;
        }
    }
}