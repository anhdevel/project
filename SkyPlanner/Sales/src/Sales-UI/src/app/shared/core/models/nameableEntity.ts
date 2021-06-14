import { Entity } from './entity';

export interface NameableEntity extends Entity {
    name: string | undefined;
}
