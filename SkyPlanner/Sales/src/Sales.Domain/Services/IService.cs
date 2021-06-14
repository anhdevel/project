using Sales.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Domain.Services
{
    public interface IService<T, TKey> : IDisposable where T : IIdentificable<TKey>
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(TKey id);
        Task<T> Add(T category);
        Task<T> Update(T category);
        Task<bool> Remove(T category);
    }
}
