using Sales.Domain.Models;
using System;
using System.Threading.Tasks;

namespace Sales.Domain.Services
{
    public interface IProductService : IService<Product, int>
    {
        public Task UpdateProductCount(int productId, int quantity);
        public Task<Tuple<bool,int>> CheckStock(int productId, int quantity);


        
    }
   
}
