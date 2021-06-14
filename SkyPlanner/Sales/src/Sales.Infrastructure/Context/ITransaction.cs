using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Infrastructure.Context
{
    public interface ITransaction
    {
        IDbContextTransaction BeginTransaction();
    }
}
