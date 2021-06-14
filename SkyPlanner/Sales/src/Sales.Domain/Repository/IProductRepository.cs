using Sales.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Domain.Repository
{
    public interface IProductRepository : IRepository<Product, int>
    {
    }
}
