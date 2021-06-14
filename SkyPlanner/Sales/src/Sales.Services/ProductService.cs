using Sales.Domain.Models;
using Sales.Domain.Repository;
using Sales.Domain.Services;
using System;
using System.Threading.Tasks;

namespace Sales.Services
{
    public class ProductService : Service<Product, int>, IProductService
    {
        public ProductService(IProductRepository repository) : base(repository)
        {

        }

        public async Task<Tuple<bool, int>> CheckStock(int productId, int quantity)
        {
            var product = await GetById(productId);
            if (product == null)
            {
                return new Tuple<bool, int>(false, 0);
            }
            return new Tuple<bool, int>(product?.Count >= quantity, product.Count);
        }

        public async Task UpdateProductCount(int productId, int quantity)
        {
            var product = await GetById(productId);
            if (product != null)
            {
                product.Count += quantity;
                await Update(product);
            }
        }
    }
}
