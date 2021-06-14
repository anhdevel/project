import { Account } from '@shared/core';
import {
    FacadeSelectors,
    FacadeSelectorsToken,
    SelectorKeys,
} from 'app/shared/core/state';
import * as fromReducer from './accounts.reducer';
import * as fromSelector from './accounts.selectors';
export { fromReducer };
export { fromSelector };
export * as fromActions from './accounts.action';
export * from './accounts.effect';
const selectors: FacadeSelectors<
    Account,
    fromReducer.AccountSelectorState,
    any
> = {};
selectors[SelectorKeys.error] = fromSelector.errorSelector;
selectors[SelectorKeys.loading] = fromSelector.loadingSelector;
selectors[SelectorKeys.data] = fromSelector.entitiesSelector;
selectors[SelectorKeys.select] = fromSelector.accountByIdSelector;
selectors[SelectorKeys.errorWithMessage] =
    fromSelector.loadingErrorMessageSelector;
export const selectorsToken: FacadeSelectorsToken<
    Account,
    fromReducer.AccountSelectorState,
    any
> = {
    name: 'account',
    selectors: selectors,
};
