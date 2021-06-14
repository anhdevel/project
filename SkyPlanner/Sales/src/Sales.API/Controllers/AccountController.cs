using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Sales.API.Dtos.Account;
using Sales.Domain.Models;
using Sales.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales.API.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : MainController<Account,int, AccountDto>
    {

        public AccountController(IAccountService accountService, IMapper mapper):base(accountService, mapper)
        {
            
        }
        [HttpGet]
        public override async Task<IActionResult> GetAll()
        { 
            return  await base.GetAll();
        }

        [HttpGet("{id:int}")]
        public override async Task<IActionResult> GetById(int id)
        {
            return await base.GetById(id);
        }
    }
}
