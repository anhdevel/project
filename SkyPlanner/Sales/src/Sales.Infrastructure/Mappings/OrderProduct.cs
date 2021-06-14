using Microsoft.EntityFrameworkCore;
using Sales.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infrastructure.Mappings
{
    public class OrderProductMapping : IEntityTypeConfiguration<OrderProduct>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<OrderProduct> builder)
        {
            builder.HasAlternateKey(c => new { c.OrderId, c.ProductId }).HasName("IX_MultipleColumns");

        }
    }
}
