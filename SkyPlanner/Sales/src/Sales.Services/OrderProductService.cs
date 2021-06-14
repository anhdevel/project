using Sales.Domain.Models;
using Sales.Domain.Repository;
using Sales.Domain.Services;

namespace Sales.Services
{
    public class OrderProductService : Service<OrderProduct, long>, IOrderProductService
    {
        public OrderProductService(IOrderProductRepository repository) : base(repository)
        {

        }
    }
}
