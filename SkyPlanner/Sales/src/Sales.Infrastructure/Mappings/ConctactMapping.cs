using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Sales.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infrastructure.Mappings
{
    public class ConctactMapping : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.HasIndex(c => c.Name).IsUnique();
            builder.HasIndex(c => c.Email).IsUnique();
            builder.HasIndex(c => c.Phone).IsUnique();
        }
    }
}
