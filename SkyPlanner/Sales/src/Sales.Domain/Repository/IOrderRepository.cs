using Sales.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Domain.Repository
{
    public interface IOrderRepository : IRepository<Order, long>
    {
        new Task<List<Order>> GetAll();
        new Task<Order> GetById(long id);
    }
}
