using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Sales.Domain.Models;
using Sales.Domain.Repository;
using Sales.Infrastructure.Context;

namespace Sales.Infrastructure.Repository
{
    public class AccountRepository : Repository<Account, int>, IAccountRepository
    {
        public AccountRepository(SalesDBContext db) : base(db)
        {

        }
        public async override Task<List<Account>> GetAll()
        {
            return await Db.Accounts.AsNoTracking()
                .Include(a => a.Contacts)
                .Include(a=>a.Orders)
                .ThenInclude(o=>o.OrderProducts)
                .ThenInclude(op=>op.Product)
               .OrderBy(b => b.Name)
               .ToListAsync();
        }
        public async override Task<Account> GetById(int id)
        {
            return await Db.Accounts.AsNoTracking()
                .Include(a => a.Contacts)
                .Include(a => a.Orders)
                .Where(b => b.Id == id)
                .FirstOrDefaultAsync();
        }
    }
}
