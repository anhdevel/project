using Microsoft.EntityFrameworkCore;
using Sales.Domain.Models;

namespace Sales.Infrastructure.Mappings
{
    public class OrderMapping : IEntityTypeConfiguration<Order>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Order> builder)
        {
            builder.Property(o => o.CreateDate)
                .HasDefaultValueSql("getdate()"); ;  
            builder.Property(o => o.LastUpdateDate)
                .HasDefaultValueSql("getdate()");

        }
    }
}
