using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sales.Domain.Models;
using Sales.API.Dtos;
using Sales.API.Dtos.Account;
using Sales.API.Dtos.Product;
using Sales.API.Dtos.Order;
using Sales.API.Dtos.ProductOrder;

namespace Sales.API.Configuration
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<Account, AccountDto>().ReverseMap();
            CreateMap<Contact, ContactDto>().ReverseMap();
            CreateMap<Account, AddAccountOrderDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Product, AddProductToOrderDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<Order, AddOrderToProductOrderDto>().ReverseMap();
            CreateMap<Order, AddOrderDto>().ReverseMap();
            CreateMap<OrderProduct, OrderProductDto>().ReverseMap();
            CreateMap<OrderProduct, AddOrderProductDto>().ReverseMap();

        }
    }
}
