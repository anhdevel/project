using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sales.Domain.Models;
using Sales.Domain.Repository;
using Sales.Infrastructure.Context;

namespace Sales.Infrastructure.Repository
{
    public class ProductRepository : Repository<Product, int>, IProductRepository
    {
        public ProductRepository(SalesDBContext db) : base(db)
        {

        }
        public async override Task<List<Product>> GetAll()
        {
            return await Db.Products.AsNoTracking()
               .OrderBy(b => b.Name)
               .ToListAsync();
        }
        public async override Task<Product> GetById(int id)
        {
            return await Db.Products.AsNoTracking()
                .Where(b => b.Id == id)
                .FirstOrDefaultAsync();
        }
    }
}
