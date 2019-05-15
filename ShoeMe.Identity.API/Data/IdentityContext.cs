using Microsoft.EntityFrameworkCore;
using ShoeMe.Identity.API.Models;

namespace ShoeMe.Identity.API.Data
{
    public class IdentityContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
        {
            
        }
    }
}