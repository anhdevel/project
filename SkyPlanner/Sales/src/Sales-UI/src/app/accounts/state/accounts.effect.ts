import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    Account,
    CrudRestServiceInterface,
    OrdersCrudRestServiceInterface,
} from '@shared/core';
import { AddEffects } from 'app/shared/core/state';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { readAccountActions } from './accounts.action';
import * as fromActions from './accounts.action';

@Injectable()
export class AccountEffects extends AddEffects<Account> {
    constructor(
        protected actions$: Actions,
        protected restService: CrudRestServiceInterface<Account>,
        protected orderRestService: OrdersCrudRestServiceInterface,
    ) {
        super(actions$, restService, readAccountActions);
    }

    add$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.queryActions.add),
            exhaustMap((action) =>
                this.orderRestService.add(action.payload.data as any).pipe(
                    map((item) =>
                        this.queryActions.addSuccessfully({
                            payload: {
                                data: item as any,
                            },
                        }),
                    ),
                    catchError((error) =>
                        of(
                            fromActions.addOrderError({
                                payload: {
                                    error: 'Error while trying to save the order',
                                },
                            }),
                        ),
                    ),
                ),
            ),
        );
    });
}
