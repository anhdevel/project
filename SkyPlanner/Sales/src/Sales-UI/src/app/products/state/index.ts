import {
    FacadeSelectors,
    FacadeSelectorsToken,
    SelectorKeys,
} from 'app/shared/core/state';
import * as fromReducer from './products.reducer';
import * as fromSelector from './products.selectors';
export { fromReducer };
export { fromSelector };
export * as fromActions from './products.action';
export * from './products.effect';
import { Product } from '@shared/core';
const productsSelectors: FacadeSelectors<
    Product,
    fromReducer.ProductSelectorState,
    any
> = {};
productsSelectors[SelectorKeys.error] = fromSelector.errorSelector;
productsSelectors[SelectorKeys.loading] = fromSelector.loadingSelector;
productsSelectors[SelectorKeys.data] = fromSelector.entitiesSelector;
productsSelectors[SelectorKeys.select] = fromSelector.addProductSelector;

export const selectorsToken: FacadeSelectorsToken<
    Product,
    fromReducer.ProductSelectorState,
    any
> = {
    name: 'products',
    selectors: productsSelectors,
};
