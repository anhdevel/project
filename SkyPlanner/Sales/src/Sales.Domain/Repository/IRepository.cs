using Sales.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Domain.Repository
{
   public interface IRepository<T, TKey>: IDisposable  where  T :IIdentificable<TKey>
    {
        Task Add(T entity);
        Task<List<T>> GetAll();
        Task<T> GetById(TKey id);
        Task Update(T entity);
        Task Remove(T entity);
        Task<int> SaveChanges();
        Task<IEnumerable<T>> Search(Expression<Func<T, bool>> predicate);
        
    }
}
