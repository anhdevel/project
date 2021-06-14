import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { Account } from '@shared/core';
import { CrudFacadeInterface } from 'app/shared/core/state';
import { Observable, of } from 'rxjs';
import { take, tap, catchError } from 'rxjs/operators';
import * as fromState from '../state';

@Injectable({
    providedIn: 'root',
})
export class AccountsRouteResolverService implements Resolve<any> {
    constructor(
        protected facade: CrudFacadeInterface<
            Account,
            fromState.fromReducer.AccountSelectorState
        >,
    ) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<any> | Promise<any> | any {
        return this.facade.data$.pipe(
            tap((data) => {
                if (data.length === 0) {
                    this.facade.getAll();
                }
            }),
            catchError(() => {
                return of([]);
            }),
            take(1),
        );
    }
}
