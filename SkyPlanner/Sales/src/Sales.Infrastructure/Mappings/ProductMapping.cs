using Microsoft.EntityFrameworkCore;
using Sales.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infrastructure.Migrations
{
   public  class ProductMapping : IEntityTypeConfiguration<Product>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Product> builder)
        {
            builder.HasIndex(c => c.Name).IsUnique();
        }
    }
}
