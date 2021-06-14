import { Entity } from '../models/entity';
import { Inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, filter } from 'rxjs/operators';
import {
    QueryActions,
    QueryAddActions,
    QueryOneActions,
} from './action-payload';
import { CrudRestServiceInterface } from '../services';

export abstract class BaseEffects<E extends Entity> {
    constructor(
        protected actions$: Actions,
        protected restService: CrudRestServiceInterface<E>,
        protected queryActions: QueryActions<E>,
    ) {
        console.log('constructor');
    }
    protected data$: Observable<E[]> = new Observable<E[]>();

    findAll$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.queryActions.getAll),
            switchMap((action) => {
                return this.restService.getAll().pipe(
                    map((data) => {
                        return this.queryActions.getAllSuccessfully({
                            payload: {
                                data: data,
                            },
                        });
                    }),
                    catchError((error) =>
                        of(
                            this.queryActions.error({
                                payload: { error: error.message },
                            }),
                        ),
                    ),
                );
            }),
        );
    });
}
export abstract class OneEffects<E extends Entity> extends BaseEffects<E> {
    constructor(
        protected actions$: Actions,
        protected restService: CrudRestServiceInterface<E>,
        protected queryActions: QueryOneActions<E>,
    ) {
        super(actions$, restService, queryActions);
    }
    protected data$: Observable<E[]> = new Observable<E[]>();
    findById$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.queryActions.findOne),
            concatLatestFrom((action) => this.data$),
            switchMap(([action, data]) => {
                const item = data.filter((d) => d.id === action.payload.id);
                if (item && item.length === 0) {
                    return of(item[0]);
                }
                const id =
                    typeof action.payload.id === 'number'
                        ? action.payload.id
                        : -1;
                return this.restService.findById(id);
            }),
            map((item) => {
                return this.queryActions.findOneSuccessfully({
                    payload: {
                        data: item,
                    },
                });
            }),
            catchError((error) =>
                of(
                    this.queryActions.error({
                        payload: { error: error.message },
                    }),
                ),
            ),
        );
    });
}
export abstract class AddEffects<E extends Entity> extends BaseEffects<E> {
    constructor(
        protected actions$: Actions,
        protected restService: CrudRestServiceInterface<E>,
        protected queryActions: QueryAddActions<E>,
    ) {
        super(actions$, restService, queryActions);
    }

    add$ = createEffect(() =>
        this.actions$.pipe(
            ofType(this.queryActions.add),
            switchMap((action) =>
                this.restService.add(action.payload.data).pipe(
                    map((item) =>
                        this.queryActions.addSuccessfully({
                            payload: {
                                data: item,
                            },
                        }),
                    ),
                    catchError((error) =>
                        of(
                            this.queryActions.error({
                                payload: { error: error.message },
                            }),
                        ),
                    ),
                ),
            ),
        ),
    );
}
