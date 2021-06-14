using System;
using System.Collections.Generic;
using System.Text;
using Sales.Domain.Repository;
using Sales.Domain.Models;
using System.Threading.Tasks;
using System.Linq.Expressions;
using Sales.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Sales.Infrastructure.Repository
{
    public abstract class Repository<T, TKey> : IRepository<T, TKey> where T : Entity<TKey>
    {
        protected readonly SalesDBContext Db;

        protected readonly DbSet<T> DbSet;

        protected Repository(SalesDBContext db)
        {
            Db = db;
            DbSet = db.Set<T>();
        }
        public virtual async Task<IEnumerable<T>> Search(Expression<Func<T, bool>> predicate)
        {
            return await DbSet.AsNoTracking().Where(predicate).ToListAsync();
        }
        public virtual async Task Add(T entity)
        {
            DbSet.Add(entity);
            await SaveChanges();
        }

        
        public virtual async Task<List<T>> GetAll()
        {
            return await DbSet.ToListAsync();
        }

        public virtual async Task<T> GetById(TKey id)
        {
            return await DbSet.FindAsync(id);
        }

        public virtual async Task Remove(T entity)
        {
            DbSet.Remove(entity);
            await SaveChanges();
        }

        public virtual async Task<int> SaveChanges()
        {
            return await Db.SaveChangesAsync();
        }

        public virtual async Task Update(T entity)
        {
            DbSet.Update(entity);
            await SaveChanges();
        }
        public virtual void Dispose()
        {
            Db?.Dispose();
        }

    }
}
