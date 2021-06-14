using Sales.Domain.Models;
using Sales.Domain.Repository;
using Sales.Domain.Services;
using Sales.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales.Services
{
    public class OrderService : Service<Order, long>, IOrderService
    {
        private readonly IProductService _productService;
        private readonly IAccountRepository _accountRepository;
        private readonly IOrderProductService _orderProductService;

        public OrderService(
            IOrderRepository repository,
            IProductService productService,
            IAccountRepository accountRepository
            , IOrderProductService orderProductService) : base(repository)
        {
            _productService = productService;
            _accountRepository = accountRepository;
            _orderProductService = orderProductService;
        }
        public override async Task<Order> Add(Order entity)
        {
            ITransaction transaction = this._repository as ITransaction;

            var newTransaction = transaction.BeginTransaction();

            var orderProducts = new List<OrderProduct>(entity.OrderProducts);
            entity.OrderProducts = new List<OrderProduct>();
            var newOrder = await base.Add(entity);
            orderProducts.ForEach(op =>
            {
                op.OrderId = newOrder.Id;
            });
            newOrder.OrderProducts = orderProducts;
            try
            {
                await UpdateProducts(newOrder);
            }
            catch (Exception ex)
            {
                newTransaction.Rollback();
                throw ex;
            }

            await this._repository.SaveChanges();
            newTransaction.Commit();


            return await this._repository.GetById(newOrder.Id);
        }

        public override async Task<Order> Update(Order entity)
        {
            var dbOrder = await GetById(entity.Id);
            await UpdateProducts(entity, dbOrder);
            return await base.Update(entity);
        }

        private async Task UpdateProducts(Order newOrder, Order dbOrder = null)
        {

            try
            {
                foreach (var op in newOrder.OrderProducts)
                {
                    try
                    {
                        int newQuantity = op.Quantity * -1;
                        if (dbOrder != null)
                        {
                            var productOrder = dbOrder.OrderProducts.ToList()
                                .FirstOrDefault(p => p.ProductId == op.ProductId);
                            if (productOrder != null)
                            {
                                newQuantity = productOrder.Quantity >= op.Quantity ?
                                (productOrder.Quantity - op.Quantity) :
                                (op.Quantity - productOrder.Quantity) * -1;
                            }
                        }
                        if (newQuantity < 0)
                        {
                            var hr = await _productService.CheckStock(op.ProductId, Math.Abs(newQuantity));
                            if (!hr.Item1)
                            {
                                throw new Exception($"The Quantity Must be Lest than {hr.Item2}");
                            }
                        }

                        await UpdateProduct(op.ProductId, newQuantity);
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        private async Task UpdateProduct(int productId, int newQuantity)
        {
            await _productService.UpdateProductCount(productId, newQuantity);
        }

    }

}
