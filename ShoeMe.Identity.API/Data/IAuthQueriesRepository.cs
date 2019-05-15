using System.Threading.Tasks;
using ShoeMe.Identity.API.Models;

namespace ShoeMe.Identity.API.Data
{
    public interface IAuthQueriesRepository
    {
        Task<User> Login(string username, string password);
        Task<User> GetUser(int id);
    }
}