using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Sales.Domain.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Sales.Infrastructure.Context
{
    public class SalesDBContext : DbContext
    {
        public SalesDBContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderProduct> OrderProducts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var property in modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetProperties()
                    .Where(p => p.ClrType == typeof(string))))
                property.SetColumnType("varchar(150)");

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(SalesDBContext).Assembly);

            foreach (var relationship in modelBuilder.Model.GetEntityTypes()
                .SelectMany(e => e.GetForeignKeys())) relationship.DeleteBehavior = DeleteBehavior.ClientSetNull;

        }
        public void SeedData()
        {
            var assambly = typeof(SalesDBContext).Assembly;
            var files = assambly.GetManifestResourceNames();
            var prefix = $"{assambly.GetName().Name}.scripts.";
            files.Where(f => f.StartsWith(prefix) && f.EndsWith(".sql")).
                Select(f => new
                {
                    PhisicalFile = f,
                    LogicalFile = f.Replace(prefix, String.Empty)
                }).OrderBy(f => f.PhisicalFile).ToList()
                .ForEach(f=>
                {
                    string command = string.Empty;
                    using(var stream = assambly.GetManifestResourceStream(f.PhisicalFile))
                    {
                        using(var reader = new StreamReader(stream))
                        {
                            command = reader.ReadToEnd();
                        }
                    }
                    if (!string.IsNullOrWhiteSpace(command))
                    {
                        using(var transaction = BeginTransaction())
                        {
                            try
                            {
                                Database.ExecuteSqlRaw(command);
                                SaveChanges();
                                transaction.Commit();
                            }
                            catch
                            {
                                transaction.Rollback();
                                throw;
                               
                            }
                        }
                    }
                   

                });

        }
        private bool ExecuteScript(string name, List<String> files)
        {

            var path = files.FirstOrDefault(f => f.Contains("Accounts"));
            if (string.IsNullOrEmpty(path))
            {
                return ExecuteSqlRaw(path);
            }
            return false;
        }
        private bool ExecuteSqlRaw(string fileName)
        {
            using (var reader = new System.IO.StreamReader(System.IO.File.OpenRead(fileName)))
            {
                var script = reader.ReadToEnd();
                if (!string.IsNullOrEmpty(script))
                {
                    return Database.ExecuteSqlRaw(script) > 0;
                }
                return false;
            }


        }


        public IDbContextTransaction BeginTransaction()
        {
            return Database.BeginTransaction();
        }
    }
}
