using Microsoft.EntityFrameworkCore;
using ShoeMe.Catalog.API.Models;

namespace ShoeMe.Catalog.API.Data
{
    public class CatalogContext : DbContext
    {
        public DbSet<Item> Items { get; set; }

        public CatalogContext(DbContextOptions<CatalogContext> options) : base(options)
        {
            
        }
    }
}