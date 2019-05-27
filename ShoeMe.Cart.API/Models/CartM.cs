using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoeMe.Cart.API.Models
{
    [Table("Carts")]
    public class CartM
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int BuyerId { get; set; }
        public ICollection<CartItem> Items { get; set; }
        public CartM()
        {
            Items = new Collection<CartItem>();
        }
        public CartM(int id)
        {
            BuyerId = id;
            Items = new List<CartItem>();
        }
    }
}