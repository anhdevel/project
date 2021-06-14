using Sales.API.Dtos.Order;
using Sales.API.Dtos.Product;

namespace Sales.API.Dtos.ProductOrder
{
    public class AddOrderProductDto : EntityDto<long>
    { 
       public int ProductId { get; set; }
       public int Quantity { get; set; }
    }
}
