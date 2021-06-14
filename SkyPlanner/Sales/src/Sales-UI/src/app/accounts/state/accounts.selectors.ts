import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Account } from '@shared/core';
import * as fromReducer from './accounts.reducer';
export const accountFeatureSelector =
    createFeatureSelector<fromReducer.AccountSelectorState>(
        fromReducer.accountSelectorFeatureKey,
    );
export const entitiesSelector = createSelector(
    accountFeatureSelector,
    fromReducer.selectAllAccounts,
);
export const selectAccountsDictionarySelector = createSelector(
    accountFeatureSelector,
    fromReducer.selectAllAccountsDictionary,
);

export const loadingSelector = createSelector(
    accountFeatureSelector,
    fromReducer.loadingSateSelector,
);
export const errorSelector = createSelector(
    accountFeatureSelector,
    fromReducer.errorSateSelector,
);
export const accountSelected = createSelector(
    accountFeatureSelector,
    fromReducer.accountStateSelected,
);
export const errorMessageSelected = createSelector(
    accountFeatureSelector,
    fromReducer.errorMessageStateSelected,
);
export const loadingErrorMessageSelector = createSelector(
    errorSelector,
    errorMessageSelected,
    loadingSelector,
    (error, message, loading) => {
        return {
            error,
            message,
            loading,
        };
    },
);
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const accountByIdSelector = createSelector(
    accountSelected,
    selectAccountsDictionarySelector,
    (account: Account, data: Dictionary<Account>) => {
        return account ? data[account.id] : undefined;
    },
);
