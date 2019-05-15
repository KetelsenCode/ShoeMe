using System.Threading.Tasks;
using ShoeMe.Identity.API.Models;

namespace ShoeMe.Identity.API.Data
{
    public interface IAuthCommandRepository
    {
        Task<User> Register(User user, string password);
        Task<bool> UserExists(string username);

    }
}