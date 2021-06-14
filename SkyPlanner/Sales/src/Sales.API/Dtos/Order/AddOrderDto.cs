using Sales.API.Dtos.Account;
using Sales.API.Dtos.ProductOrder;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sales.API.Dtos.Order
{
    public class AddOrderDto : EntityDto<long>
    {

        [Required(ErrorMessage = "The field {0} is required")]
        public float Taxes { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public float SubTotal { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public int AccountId { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public List<AddOrderProductDto> OrderProducts { get; set; }
    }
}
