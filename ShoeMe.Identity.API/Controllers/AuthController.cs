using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ShoeMe.Identity.API.Data;
using ShoeMe.Identity.API.Dtos;
using ShoeMe.Identity.API.Models;

namespace ShoeMe.Identity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;

        private readonly IAuthRepository _rep;
        public AuthController(IAuthRepository rep, IConfiguration config)
        {
            _config = config;
            _rep = rep;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto user)
        {
            user.Username = user.Username.ToLower();


            if (await _rep.UserExists(user.Username))
                return BadRequest("Username already exists");

            var userToCreate = new User
            {
                Username = user.Username
            };
            var createdUser = await _rep.Register(userToCreate, user.Password);

            return Ok(createdUser);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto user)
        {
            var userFromRepo = await _rep.Login(user.Username, user.Password);
            //IF no user found in db
            if (userFromRepo == null)
                //Return unauth so if user have wrong login creds, we're not specifying if it's password or username
                return Unauthorized();

            //Token creation
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            // Hashed token Key
            // The token is unique and very secret - if you have the token you are able to create tokens that are verifyable for our backend
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            // Signing credentials 
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            
            // Security Token DEscripter
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                // our claims
                Subject = new ClaimsIdentity(claims),
                // Expiry date - 1 day from create
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            // Token handler
            var tokenHandler = new JwtSecurityTokenHandler();

            // Actual token
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // Return actual token
            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        }

    }

}