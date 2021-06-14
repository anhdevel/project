using Microsoft.EntityFrameworkCore;
using Sales.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infrastructure.Mappings
{
    public class AccountMapping : IEntityTypeConfiguration<Account>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Account> builder)
        {
            builder.HasIndex(c => c.Name).IsUnique();
        }
    }
}
