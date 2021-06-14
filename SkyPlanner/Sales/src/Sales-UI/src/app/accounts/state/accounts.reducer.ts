import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Account } from '@shared/core';
import { State, stateInit } from 'app/shared/core/state';
import * as fromActions from './accounts.action';

export const accountSelectorFeatureKey = 'AccountSelectorState';
export interface AccountSelectorState extends State<Account> {}
export const adapter: EntityAdapter<Account> = createEntityAdapter<Account>({});
export const initialState: AccountSelectorState = {
    ...stateInit(adapter),
};
export const accountSelectorsReducer = createReducer<AccountSelectorState>(
    initialState,
    on(fromActions.loadAccounts, (state): AccountSelectorState => {
        return adapter.removeAll({
            ...state,
            error: false,
        });
    }),
    on(
        fromActions.loadAccountsSuccess,
        (state, { payload }): AccountSelectorState => {
            return adapter.setAll(payload.data, {
                ...state,
                error: false,
                loading: false,
            });
        },
    ),
    on(
        fromActions.loadAccountsError,
        (state, { payload }): AccountSelectorState => {
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: payload.error,
            };
        },
    ),
    on(
        fromActions.selectedAccount,
        (state, { payload }): AccountSelectorState => {
            return {
                ...state,
                selected: { ...payload.selected },
            };
        },
    ),
    on(fromActions.addOrder, (state): AccountSelectorState => {
        return {
            ...state,
            loading: true,
            error: false,
        };
    }),
    on(fromActions.addOrderSuccess, (state): AccountSelectorState => {
        return {
            ...state,
            loading: false,
            error: false,
            errorMessage: 'nav',
        };
    }),
    on(
        fromActions.addOrderError,
        (state, { payload }): AccountSelectorState => {
            return {
                ...state,
                error: true,
                loading: false,
                errorMessage: payload.error,
            };
        },
    ),
);
export function reducer(
    state: AccountSelectorState | undefined,
    action: Action,
): AccountSelectorState {
    return accountSelectorsReducer(state, action);
}
const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllAccounts = selectAll;
export const selectAllAccountsDictionary = selectEntities;
export const errorSateSelector = (state: AccountSelectorState): boolean =>
    state.error;
export const loadingSateSelector = (state: AccountSelectorState): boolean =>
    state.loading;
export const accountStateSelected = (state: AccountSelectorState): Account =>
    state.selected;
export const errorMessageStateSelected = (
    state: AccountSelectorState,
): string => state.errorMessage;
