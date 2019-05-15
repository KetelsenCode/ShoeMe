using System.Threading.Tasks;
using ShoeMe.Identity.API.Models;

namespace ShoeMe.Identity.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}