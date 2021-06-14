using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sales.Domain.Models;
using Sales.API.Dtos.Product;
using Sales.Domain.Services;
using AutoMapper;

namespace Sales.API.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : MainController<Product,int, ProductDto>
    {
        public ProductController(IProductService productService, IMapper mapper) :base(productService, mapper)
        {
        }
        [HttpGet]
        public override async Task<IActionResult> GetAll()
        {
            return await base.GetAll();
        }

        [HttpGet("{id:int}")]
        public override async Task<IActionResult> GetById(int id)
        {
            return await base.GetById(id);
        }
    }
}
