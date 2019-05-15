using System.ComponentModel.DataAnnotations;

namespace ShoeMe.Identity.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        
        [Required]
        [StringLength(20,MinimumLength = 8, ErrorMessage = "Must specify password between 8-20 characters")]
        public string Password { get; set; }
    }
}