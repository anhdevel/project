using Sales.Domain.Models;
using Sales.Domain.Repository;
using Sales.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Services
{
    public abstract class Service<T, TKey> : IService<T, TKey> where T : IIdentificable<TKey>
    {
        protected readonly IRepository<T, TKey> _repository;
        public Service(IRepository<T, TKey> repository)
        {
            this._repository = repository;
        }
        public virtual async Task<T> Add(T entity)
        {
             await _repository.Add(entity);
            return entity;
        }

        public virtual async  Task<IEnumerable<T>> GetAll()
        {
            return await _repository.GetAll();
        }

        public virtual async Task<T> GetById(TKey id)
        {
            return await _repository.GetById(id);
        }

        public virtual async Task<bool> Remove(T entity)
        {
            await _repository.Remove(entity);

            return true;
        }

        public virtual async Task<T> Update(T entity)
        {
            if (!_repository.Search(c => c.Id.Equals(entity.Id)).Result.Any())
                return default(T);

            await _repository.Update(entity);
            return entity;
        }

        public virtual void Dispose()
        {
            _repository?.Dispose();
        }
    }
}
