using Microsoft.AspNetCore.Mvc;
using ShoeMe.Identity.API.Data;

namespace ShoeMe.Identity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IdentityContext _context;
        public AuthController(IdentityContext context)
        {
            _context = context;
        }
    }
}