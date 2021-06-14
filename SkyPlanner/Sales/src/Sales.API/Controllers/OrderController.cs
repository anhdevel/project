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
using Sales.API.Dtos.Order;
using Sales.Services;

namespace Sales.API.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : MainController<Order, long, OrderDto>
    {
        public OrderController(IOrderService service, IMapper mapper) :base(service, mapper)
        {
        }
        [HttpGet]
        public override async Task<IActionResult> GetAll()
        {
            return await base.GetAll();
        }

        [HttpGet("{id:int}")]
        public override async Task<IActionResult> GetById(long id)
        {
            return await base.GetById(id);
        }
        [HttpPost]
        public  async Task<IActionResult> Add(AddOrderDto newOrder)
        {
            if (!ModelState.IsValid) return BadRequest();
            var order = _mapper.Map<Order>(newOrder);
            if (order == null)
            {
                return BadRequest();
            }
            try
            {
                var orderResult = await _service.Add(order);
                if(orderResult== null)
                {
                    return BadRequest();
                }
                return Ok(_mapper.Map<OrderDto>(orderResult));
            }
            catch(Exception  ex)
            {
                ModelState.AddModelError("Quantity", ex.Message);
                return BadRequest(ModelState);
            }
           
        }
    }
}
