using Sales.API.Dtos.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales.API.Dtos.Account
{
    public class AccountDto: NameableDto<int>
    {
        public AccountDto()
        {
            Contacts = new List<ContactDto>();
            Orders = new List<OrderDto>();
        }
        public List<ContactDto> Contacts { get; set; }

        public List<OrderDto> Orders { get; set; }
    }
}
