using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ShoeMe.Identity.API.Dtos;
using ShoeMe.Identity.API.Models;

namespace ShoeMe.Identity.API.Data
{
    public class AuthCommandRepository : IAuthCommandRepository
    {
        private readonly IdentityContext _context;
        private readonly IMapper _mapper;
        public AuthCommandRepository(IdentityContext context, IMapper mapper)
        {
            _mapper = mapper;
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

        public async Task<UserForDetailtsDto> UpdateUser(UserForDetailtsDto user)
        {
            var existingUser = await _context.Users.Where(u => u.Id == user.Id).FirstOrDefaultAsync();            if (existingUser != null)
            {
                existingUser.DateOfBirth = user.DateOfBirth;
                existingUser.Mail = user.Mail;
                existingUser.PhoneNumber = user.PhoneNumber;
                existingUser.PostCode = user.PostCode;
                existingUser.StreetName = user.StreetName;
                existingUser.StreetNr = user.StreetNr;
                existingUser.City = user.City;
                existingUser.Country = user.Country;
            }
            
            _context.SaveChanges();
            var userDto = _mapper.Map<UserForDetailtsDto>(existingUser);

            return userDto;
        }

    }
}