using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Domain.Models
{
    public class Account : Nameable<int>

    {
        public Account()
        {
            Contacts = new HashSet<Contact>();
            Orders = new List<Order>();
        }
        public IEnumerable<Contact> Contacts { get; set; }
        public IEnumerable<Order> Orders { get; set; }
    }
}
