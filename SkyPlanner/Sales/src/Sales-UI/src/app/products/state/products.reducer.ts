import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '@shared/core';
import { State, stateInit } from 'app/shared/core/state';
import * as fromActions from './products.action';

export const productSelectorFeatureKey = 'ProductSelectorState';
export interface ProductSelectorState extends State<Product> {}
export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});
export const initialState: ProductSelectorState = {
    ...stateInit(adapter),
};
export const productsSelectorsReducer = createReducer<ProductSelectorState>(
    initialState,
    on(fromActions.loadProducts, (state): ProductSelectorState => {
        return adapter.removeAll({
            ...state,
            error: false,
            selected: undefined,
        });
    }),
    on(
        fromActions.loadProductsSuccess,
        (state, { payload }): ProductSelectorState => {
            return adapter.setAll(payload.data, {
                ...state,
                error: false,
                loading: false,
            });
        },
    ),
    on(
        fromActions.loadProductsError,
        (state, { payload }): ProductSelectorState => {
            return {
                ...state,
                error: true,
                loading: false,
            };
        },
    ),
    on(fromActions.addProduct, (state, { payload }): ProductSelectorState => {
        return adapter.setOne(
            {
                ...payload.selected,
                count:
                    payload.selected.count > 1 ? payload.selected.count - 1 : 0,
                inStock: payload.selected.count - 1 > 0,
            },
            {
                ...state,
                selected: {
                    ...payload.selected,
                    count:
                        payload.selected.count > 1
                            ? payload.selected.count - 1
                            : 0,
                    inStock: payload.selected.count - 1 > 0,
                },
            },
        );
    }),
    on(
        fromActions.removeProduct,
        (state, { payload }): ProductSelectorState => {
            return adapter.setOne(
                {
                    ...payload.selected,
                    count: payload.selected.count + payload.quantity,
                    inStock: payload.selected.count + payload.quantity > 0,
                },
                {
                    ...state,
                    selected: undefined,
                },
            );
        },
    ),
);
export function reducer(
    state: ProductSelectorState | undefined,
    action: Action,
): ProductSelectorState {
    return productsSelectorsReducer(state, action);
}
const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllProducts = selectAll;
export const selectAllProductsDictionary = selectEntities;

export const errorSateSelector = (state: ProductSelectorState): boolean =>
    state.error;
export const loadingSateSelector = (state: ProductSelectorState): boolean =>
    state.loading;
export const addProductSateSelector = (state: ProductSelectorState): Product =>
    state.selected;
