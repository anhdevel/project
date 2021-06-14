import { Entity } from './entity';
import { OrderProduct } from './order-product';
export interface Order extends Entity {
    createDate: Date;
    lastUpdateDate: Date;
    taxes: number;
    subTotal: number;
    total: number;
    orderProducts: OrderProduct[];
}
export interface AddOrder {
    taxes: number;
    subTotal: number;
    accountId: number;
    orderProducts: AddOrderProduct[];
}
export interface AddOrderProduct {
    productId: number;
    quantity: number;
}
