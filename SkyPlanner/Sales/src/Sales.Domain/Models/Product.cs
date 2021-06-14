using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sales.Domain.Models
{
    public class Product : Nameable<int>
    {
        [MinLength(0)]
        public float Price { get; set; }
        public string Description { get; set; }

        [MinLength(0)]
        public int Count { get; set; }

        public bool InStock => this.Count > 0;
 
        public IEnumerable<OrderProduct> OrderProducts { get; set; }
    }
}
