import { Entity } from './entity';
import { Product } from './products';
export interface OrderProduct extends Entity {
    quantity: number;
    product: Product;
}
