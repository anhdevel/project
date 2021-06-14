import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Account } from '@shared/core';
import { CrudFacadeInterface } from 'app/shared/core/state';
import { Observable } from 'rxjs';
import * as fromState from '../state';

@Injectable({
    providedIn: 'root',
})
export class AccountsGuardService implements CanActivate {
    constructor(
        protected facade: CrudFacadeInterface<
            Account,
            fromState.fromReducer.AccountSelectorState
        >,
        private router: Router,
    ) {
        this.account$ = facade.selected$;
    }
    account$: Observable<Account>;
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ):
        | boolean
        | UrlTree
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree> {
        return this.account$.pipe(
            map((d) => d !== undefined),
            tap((d) => {
                if (!d) {
                    this.router.navigate(['accounts']);
                    console.log('AccountGuardService');
                }
            }),
        );
    }
}
