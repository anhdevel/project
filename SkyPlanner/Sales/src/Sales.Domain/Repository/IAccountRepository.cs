using Sales.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sales.Domain.Repository
{
    public interface IAccountRepository : IRepository<Account, int>
    {
        new Task<List<Account>> GetAll();
        new  Task<Account> GetById(int id);
    }
}
