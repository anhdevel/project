using Sales.API.Dtos.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales.API.Dtos.ProductOrder
{
    public class OrderProductDto : EntityDto<long>
    { 
       public ProductDto Product { get; set; }
       public int Quantity { get; set; }
    }
}
