import { Inject, Injectable, Optional } from '@angular/core';
import { Store } from '@ngrx/store';
import { Entity } from '../models/entity';
import {
    FacadeSelectors,
    FacadeSelectorsToken,
    FACADE_SELECTORS,
} from './facade-token';
import { ReadFacadeInterface } from './read-facade-interface';
import { State } from './state';

@Injectable()
export abstract class ProductReadFacadeInterface<
    E extends Entity,
    S extends State<E>,
> extends ReadFacadeInterface<E, S> {
    constructor(
        protected store: Store<S>,
        @Optional()
        @Inject(FACADE_SELECTORS)
        protected facadeSelectorsToken: FacadeSelectorsToken<E, S, any>[],
    ) {
        super(store, facadeSelectorsToken);
    }
    removeProductFromOrder(item: E, quantity: number): void {}
}
