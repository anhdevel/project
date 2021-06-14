import { Inject, Injectable, Optional } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    FacadeSelectors,
    FacadeSelectorsToken,
    FACADE_SELECTORS,
    ReadFacadeInterface,
} from 'app/shared/core/state';
import * as fromReducer from './products.reducer';
import * as fromActions from './products.action';
import { Product } from '@shared/core';
import { ProductReadFacadeInterface } from 'app/shared/core/state/product-read-facade-interface';

@Injectable()
export class ProductFacade extends ProductReadFacadeInterface<
    Product,
    fromReducer.ProductSelectorState
> {
    constructor(
        protected store: Store<fromReducer.ProductSelectorState>,
        @Optional()
        @Inject(FACADE_SELECTORS)
        protected facadeSelectorsToken: FacadeSelectorsToken<
            Product,
            fromReducer.ProductSelectorState,
            any
        >[],
    ) {
        super(store, facadeSelectorsToken);
        this.name = 'products';
        this.buildSelectors();
    }

    public getAll(): void {
        this.store.dispatch(
            fromActions.loadProducts({
                payload: {},
            }),
        );
    }
    public selectedChange(selected: Product): void {
        this.store.dispatch(
            fromActions.addProduct({
                payload: {
                    selected: selected,
                },
            }),
        );
    }
    removeProductFromOrder(item: Product, quantity: number): void {
        this.store.dispatch(
            fromActions.removeProduct({
                payload: {
                    selected: item,
                    quantity: quantity,
                },
            }),
        );
    }
}
