import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product, SnackBarService } from '@shared/core';
import { ProductReadFacadeInterface } from 'app/shared/core/state/product-read-facade-interface';
import { combineLatest, Observable } from 'rxjs';
import { share, startWith, tap, map } from 'rxjs/operators';
import * as state from '../state';
@Component({
    selector: 'products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent {
    constructor(
        private facade: ProductReadFacadeInterface<
            Product,
            state.fromReducer.ProductSelectorState
        >,
        protected snackBarService: SnackBarService,
    ) {
        this._products$ = this.facade.data$;
        this._error$ = this.facade.error$.pipe(
            startWith(false),
            tap((error) => {
                if (error) this.snackBarService.show('Server Error', 'x');
            }),
        );
        this.filteredProducts$ = combineLatest(
            this.myControl.valueChanges.pipe(startWith('')),
            this._products$,
        ).pipe(
            map(([value, products]) =>
                products.filter((p) => {
                    return (
                        p &&
                        p.name &&
                        typeof value === 'string' &&
                        p.name
                            .toLowerCase()
                            .trim()
                            .includes(value.trim().toLowerCase())
                    );
                }),
            ),
        );
    }

    myControl = new FormControl();
    private _products$: Observable<Product[]>;
    filteredProducts$: Observable<Product[]> = new Observable();
    private _error$: Observable<boolean>;
    get products$(): Observable<Product[]> {
        return this._products$;
    }
    get error$(): Observable<boolean> {
        return this._error$;
    }

    addProduct(product: Product): void {
        this.facade.selectedChange(product);
    }
}
