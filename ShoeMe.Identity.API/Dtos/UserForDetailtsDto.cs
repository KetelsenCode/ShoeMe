using System;

namespace ShoeMe.Identity.API.Dtos
{
    public class UserForDetailtsDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int PhoneNumber { get; set; }
        public string Mail { get; set; }
        public string StreetName { get; set; }
        public string StreetNr { get; set; }
        public int PostCode { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
    }
}