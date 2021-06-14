using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sales.Domain.Models
{
    public class Order: Entity<long>
    {
        public Order()
        {
            CreateDate = DateTime.Now;
            CreateDate = DateTime.Now;
        }
        
        public DateTime CreateDate { get; set; }

      
        public DateTime LastUpdateDate { get; set; }

        public float Taxes { get; set; }

        public float SubTotal { get; set; }

        public float Total => SubTotal + Taxes;

        public int AccountId { get; set; }
        public Account Account { get; set; }

        public IEnumerable<OrderProduct> OrderProducts { get; set; }

    }
}
