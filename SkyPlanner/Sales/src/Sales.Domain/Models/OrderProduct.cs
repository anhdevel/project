using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Domain.Models
{
    public class OrderProduct : Entity<long>
    {
        public long OrderId { get; set; }
        public Order Order { get; set; }
        public int ProductId { get; set; }

        public Product Product { get; set; }

        public int Quantity { get; set; }
    }
}
