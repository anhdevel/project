using Sales.Domain.Models;
using Sales.Domain.Repository;
using Sales.Infrastructure.Context;

namespace Sales.Infrastructure.Repository
{
    public class OrderProductRepository : Repository<OrderProduct, long>, IOrderProductRepository
    {
        public OrderProductRepository(SalesDBContext db) : base(db)
        {

        }
    }
}
