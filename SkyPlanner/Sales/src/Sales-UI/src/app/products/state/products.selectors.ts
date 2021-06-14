import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './products.reducer';
export const accountFeatureSelector =
    createFeatureSelector<fromReducer.ProductSelectorState>(
        fromReducer.productSelectorFeatureKey,
    );
export const entitiesSelector = createSelector(
    accountFeatureSelector,
    fromReducer.selectAllProducts,
);
export const entitiesDictionarySelector = createSelector(
    accountFeatureSelector,
    fromReducer.selectAllProducts,
);

export const loadingSelector = createSelector(
    accountFeatureSelector,
    fromReducer.loadingSateSelector,
);
export const errorSelector = createSelector(
    accountFeatureSelector,
    fromReducer.errorSateSelector,
);
export const addProductSelector = createSelector(
    accountFeatureSelector,
    fromReducer.addProductSateSelector,
);
export const productByIdSelector = createSelector(
    addProductSelector,
    entitiesDictionarySelector,
    (account, data) => {
        return account ? data[account.id] : undefined;
    },
);
