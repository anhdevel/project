using Sales.Domain.Models;
using Sales.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Sales.Domain.Services;

namespace Sales.Services
{
    public class AccountService : Service<Account, int>,IAccountService
    {
        public AccountService(IAccountRepository repository) : base(repository)
        {

        }
    }
}
