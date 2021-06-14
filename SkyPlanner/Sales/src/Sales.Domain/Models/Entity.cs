using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Sales.Domain.Models
{
    public abstract class Entity<TKey> : IIdentificable<TKey>
    {
        [DatabaseGenerated(databaseGeneratedOption: DatabaseGeneratedOption.Identity)]
        [Key]
        public TKey Id { get; set; }

        public override bool Equals(object obj)
        {
            return obj is Entity<TKey> entity && entity.Id.Equals(Id);
        }
        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }
}
