using Sales.API.Dtos.ProductOrder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales.API.Dtos.Order
{
    public class OrderDto:EntityDto<long>
    {
        public DateTime CreateDate { get; set; }
        public DateTime LastUpdateDate { get; set; }

        public float Taxes { get; set; }

        public float SubTotal { get; set; }

        public float Total => SubTotal + Taxes;

        public List<OrderProductDto> OrderProducts { get; set; }
    }
}
