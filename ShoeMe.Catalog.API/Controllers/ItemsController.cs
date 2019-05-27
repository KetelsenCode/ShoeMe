using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoeMe.Catalog.API.Data;
using ShoeMe.Catalog.API.Models;

namespace ShoeMe.Catalog.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly CatalogContext _context;
        public ItemsController(CatalogContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Item>> GetItems() 
        {
            return await _context.Items.ToListAsync();
        }
    }
}