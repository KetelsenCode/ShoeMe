using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoeMe.Cart.API.Data;
using ShoeMe.Cart.API.Models;

namespace ShoeMe.Cart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartContext _context;
        public CartController(CartContext context)
        {
            _context = context;

        }

        [HttpGet("{id}")]
        public CartM getCart([FromRoute] int id)
        {
            var cart = _context.Carts.Where(c => c.BuyerId == id)
                    .Include(i => i.Items)
                    .FirstOrDefault();
            //If no cart yet
            if (cart == null)
            {
                var newCart = new CartM();
                newCart.BuyerId = id;
                _context.Carts.Add(newCart);
                _context.SaveChanges();
                return newCart;
            }

            return cart;
        }
        [HttpPost("addItem")]
        public int addToCart(CartItem item)
        {
            CartItem currentItem = _context.CartItems.Where(i => i.CartId == item.CartId && i.ProductName == item.ProductName).FirstOrDefault();
            if (currentItem != null)
            {
                currentItem.Quantity += 1;
                _context.SaveChanges();
                return currentItem.Quantity;
            }
            _context.CartItems.Add(item);
            _context.SaveChanges();
            return item.CartId;
        }
    }
}