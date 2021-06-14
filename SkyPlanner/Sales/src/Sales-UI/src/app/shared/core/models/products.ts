import { NameableEntity } from './nameableEntity';

export interface Product extends NameableEntity {
    price: number;
    description: string;
    count: number;
    inStock: boolean;
}
