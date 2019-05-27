using System.Collections.Generic;
using Newtonsoft.Json;
using ShoeMe.Catalog.API.Models;

namespace ShoeMe.Catalog.API.Data
{
    public class Seed
    {
        private readonly CatalogContext _context;

        public Seed(CatalogContext context)
        {
            _context = context;
        }

        public void SeedCatalog()
        {
            var itemsData = System.IO.File.ReadAllText("Data/ItemSeedData.json");
            var items = JsonConvert.DeserializeObject<List<Item>>(itemsData);
            foreach (var item in items)
            {
                _context.Items.Add(item);
            }
            _context.SaveChanges();
        }
    }
}