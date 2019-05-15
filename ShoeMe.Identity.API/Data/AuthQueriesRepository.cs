using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShoeMe.Identity.API.Models;

namespace ShoeMe.Identity.API.Data
{
    public class AuthQueriesRepository : IAuthQueriesRepository
    {
        private readonly IdentityContext _context;
        public AuthQueriesRepository(IdentityContext context)
        {
            _context = context;
            

        }
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username.ToLower());
            //If there's no user with that username in the DB
            if (user == null)
            {
                return null;
            }

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }

                return true;
            }
        }
        

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            
            if (user == null)
            {
                return null;
            }

            return user;
        }
    }
}