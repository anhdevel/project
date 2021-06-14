using System;
using System.Collections.Generic;
using System.Text;

namespace Sales.Domain.Models
{
    public interface IIdentificable<out T>
    {
        T Id { get;}
       
    }
}
