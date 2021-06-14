using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Sales.Domain.Models;
using Sales.Domain.Repository;
using Sales.Infrastructure.Context;

namespace Sales.Infrastructure.Repository
{
    public class OrderRepository : Repository<Order, long>, IOrderRepository, ITransaction
    {
        public OrderRepository(SalesDBContext db) : base(db)
        {

        }

        public IDbContextTransaction BeginTransaction()
        {
           return  this.Db.Database.BeginTransaction();
        }

        public async override Task<List<Order>> GetAll()
        {
            return await Db.Orders.AsNoTracking()
                .Include(o => o.Account)
                .Include(o => o.OrderProducts).ThenInclude(c => c.Product)
                .OrderBy(o => o.Account.Name)
                .ThenBy(o => o.Id)
                .ToListAsync();
        }
        public async override Task<Order> GetById(long id)
        {
            return await Db.Orders.AsNoTracking()
                .Include(o => o.Account)
                .Include(o => o.OrderProducts).ThenInclude(c => c.Product)
                .OrderBy(o => o.Account.Name)
                .ThenBy(o => o.Id)
                .Where(b => b.Id == id)
                .FirstOrDefaultAsync();
        }
    }
}
