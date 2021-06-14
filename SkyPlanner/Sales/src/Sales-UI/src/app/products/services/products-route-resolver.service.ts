import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { ReadFacadeInterface } from 'app/shared/core/state';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import * as fromState from '../state';
import { Product } from '@shared/core';
import { ProductReadFacadeInterface } from 'app/shared/core/state/product-read-facade-interface';

@Injectable({
    providedIn: 'root',
})
export class ProductsRouteResolverService implements Resolve<any> {
    constructor(
        protected facade: ProductReadFacadeInterface<
            Product,
            fromState.fromReducer.ProductSelectorState
        >,
    ) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<any> | Promise<any> | any {
        return this.facade.data$.pipe(
            tap((data) => {
                this.facade.getAll();
            }),
            take(1),
        );
    }
}
