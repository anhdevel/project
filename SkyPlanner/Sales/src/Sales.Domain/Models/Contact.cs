using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sales.Domain.Models
{
    public class Contact : Nameable<int>
    {
        [Required]
        [EmailAddress]
        [MaxLength(150)]
        public string Email { get; set; }
        [Required]
        [MaxLength(50)]
        public string Phone { get; set; }
        public string Address { get; set; }

        public int AccountId { get; set; }

        public Account Account { get; set; }
    }
}
