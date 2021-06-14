using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales.API.Dtos.Product
{
    public class ProductDto:NameableDto<int>
    {
        public float Price { get; set; }
        public string Description { get; set; }

        public int Count { get; set; }

        public bool InStock => this.Count > 0;
    }
}
