using Sales.Domain.Models;

namespace Sales.Domain.Repository
{
    public interface IOrderProductRepository : IRepository<OrderProduct, long>
    {
    }
}
