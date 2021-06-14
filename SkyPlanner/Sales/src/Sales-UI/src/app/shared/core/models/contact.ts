import { NameableEntity } from './nameableEntity';

export interface Contact extends NameableEntity {
    email: string | undefined;
    phone: string | undefined;
    address: string | undefined;
}
