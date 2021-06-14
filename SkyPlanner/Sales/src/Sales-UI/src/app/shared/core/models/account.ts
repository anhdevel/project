import { Contact } from './contact';
import { NameableEntity } from './nameableEntity';
import { Order } from './order';

export interface Account extends NameableEntity {
    contacts: Contact[];
    orders: Order[];
}
