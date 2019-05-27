using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoeMe.Cart.API.Models
{
    [Table("CartItems")]

    public class CartItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string PictureUrl { get; set; }
        [ForeignKey("CartId")]
        public CartM Cart { get; set; }
        public int CartId { get; set; }
    }
}