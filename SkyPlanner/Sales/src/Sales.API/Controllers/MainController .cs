using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Sales.API.Dtos;
using Sales.Domain.Models;
using Sales.Domain.Services;

namespace Sales.API.Controllers
{
    [ApiController]
    public abstract  class MainController<T,TKey,TDto> : ControllerBase where T : Entity<TKey> where TDto: EntityDto<TKey>
    {
        protected readonly IService<T, TKey> _service;
        protected readonly IMapper _mapper;
        public MainController(IService<T, TKey> service, IMapper mapper)
        {
            this._service = service;
            this._mapper = mapper;
        }
       
        public virtual async Task<IActionResult> GetAll()
        {
            var alls = await _service.GetAll();

            return Ok(_mapper.Map<IEnumerable<TDto>>(alls));
        }

        public virtual async Task<IActionResult> GetById(TKey id)
        {
            var entity = await _service.GetById(id);

            if (entity == null) return NotFound();

            return Ok(_mapper.Map<TDto>(entity));
        }
    }
}
