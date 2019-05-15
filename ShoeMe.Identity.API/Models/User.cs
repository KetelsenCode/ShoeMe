using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShoeMe.Identity.API.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public int PhoneNumber { get; set; }
        public string Mail { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastLogin { get; set; }
        public string StreetName { get; set; }
        public string StreetNr { get; set; }
        public int PostCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}