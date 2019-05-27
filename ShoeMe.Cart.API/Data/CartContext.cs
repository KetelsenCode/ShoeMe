using Microsoft.EntityFrameworkCore;
using ShoeMe.Cart.API.Models;

namespace ShoeMe.Cart.API.Data
{
      public class CartContext : DbContext
    {
        public DbSet<CartM> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }

        public CartContext(DbContextOptions<CartContext> options) : base(options)
        {
            
        }
    }
}