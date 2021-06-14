import { createAction, props } from '@ngrx/store';
import { Account, Product } from '@shared/core';
import {
    ActionErrorPayload,
    ActionPayload,
    ActionSuccessfullyPayload,
    QueryActions,
} from 'app/shared/core/state';

export const loadProducts = createAction(
    '[Products ] Load All Products',
    props<{
        payload: ActionPayload;
    }>(),
);
export const loadProductsSuccess = createAction(
    '[Products] Load All Products Successfully',
    props<{
        payload: ActionSuccessfullyPayload<Product>;
    }>(),
);
export const loadProductsError = createAction(
    '[Products]  Load All Products Error',
    props<{
        payload: ActionErrorPayload;
    }>(),
);
export const addProduct = createAction(
    '[Products] Add Product to de Order',
    props<{
        payload: {
            selected: Product;
        };
    }>(),
);
export const removeProduct = createAction(
    '[Products] Remove Product to de Order',
    props<{
        payload: {
            selected: Product;
            quantity: number;
        };
    }>(),
);
export const productReadActions: Pick<
    QueryActions<Product>,
    'getAll' | 'getAllSuccessfully' | 'error'
> = {
    getAll: loadProducts,
    getAllSuccessfully: loadProductsSuccess,
    error: loadProductsError,
};
