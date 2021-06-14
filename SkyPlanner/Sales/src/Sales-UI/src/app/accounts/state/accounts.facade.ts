import { Inject, Injectable, Optional } from '@angular/core';
import { Store } from '@ngrx/store';
import { Account, AddOrder } from '@shared/core';
import {
    CrudFacadeInterface,
    FacadeSelectors,
    FacadeSelectorsToken,
    FACADE_SELECTORS,
    ReadFacadeInterface,
} from 'app/shared/core/state';
import * as fromReducer from './accounts.reducer';
import * as fromActions from './accounts.action';

@Injectable()
export class AccountFacade extends CrudFacadeInterface<
    Account,
    fromReducer.AccountSelectorState
> {
    constructor(
        protected store: Store<fromReducer.AccountSelectorState>,
        @Optional()
        @Inject(FACADE_SELECTORS)
        protected facadeSelectorsToken: FacadeSelectorsToken<
            Account,
            fromReducer.AccountSelectorState,
            any
        >[],
    ) {
        super(store, facadeSelectorsToken);
        this.name = 'account';
        this.buildSelectors();
        console.log('AccountFacade');
    }

    public getAll(): void {
        this.store.dispatch(
            fromActions.loadAccounts({
                payload: {},
            }),
        );
    }
    public selectedChange(selected: Account): void {
        this.store.dispatch(
            fromActions.selectedAccount({
                payload: {
                    selected: selected,
                },
            }),
        );
    }
    public add(item?: AddOrder): void {
        this.store.dispatch(
            fromActions.addOrder({
                payload: {
                    data: item,
                },
            }),
        );
    }
}
