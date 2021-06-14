import { EntityAdapter } from '@ngrx/entity';
import { EntityState } from '@ngrx/entity/src';
import { Entity } from './../models/entity';
export interface State<T extends Entity> extends EntityState<T> {
    loading: boolean;
    error: boolean;
    selected: any;
    errorMessage: string;
}
export function stateInit<T extends Entity>(
    adapter: EntityAdapter<T>,
): State<T> {
    return adapter.getInitialState({
        loading: false,
        error: false,
        selected: undefined,
        errorMessage: 'initial',
    });
}
