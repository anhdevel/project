using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sales.Domain.Models
{
    public abstract class Nameable<TKey> : Entity<TKey>, INameable
    {
        [Required]
        [StringLength(150)]
      
        public string Name { get ; set; }
    }
}
