import { createAction, props } from '@ngrx/store';
import { Account } from '@shared/core';
import {
    ActionErrorPayload,
    ActionPayload,
    ActionSuccessfullyPayload,
    QueryActions,
    QueryAddActions,
    SingeActionSuccessfullyPayload,
} from 'app/shared/core/state';

export const loadAccounts = createAction(
    '[Account Selector] Load All Accounts',
    props<{
        payload: ActionPayload;
    }>(),
);
export const loadAccountsSuccess = createAction(
    '[Account Selector] Load All Accounts Successfully',
    props<{
        payload: ActionSuccessfullyPayload<Account>;
    }>(),
);
export const loadAccountsError = createAction(
    '[Account Selector] Load All Accounts Error',
    props<{
        payload: ActionErrorPayload;
    }>(),
);
export const selectedAccount = createAction(
    '[Account Selector] Select Account',
    props<{
        payload: {
            selected: Account;
        };
    }>(),
);
export const addOrder = createAction(
    '[Account Selector] Add New Order',
    props<{
        payload: SingeActionSuccessfullyPayload<any>;
    }>(),
);
export const addOrderSuccess = createAction(
    '[Account Selector] Add New Order Success',
    props<{
        payload: SingeActionSuccessfullyPayload<any>;
    }>(),
);
export const addOrderError = createAction(
    '[Account Selector]  Add New Order Error',
    props<{
        payload: ActionErrorPayload;
    }>(),
);
export const readAccountActions: QueryAddActions<Account> = {
    getAll: loadAccounts,
    getAllSuccessfully: loadAccountsSuccess,
    error: loadAccountsError,
    add: addOrder,
    addSuccessfully: addOrderSuccess,
};
