import { Inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Product } from '@shared/core';
import { ProductsCrudRestServiceInterface } from 'app/shared/core/services/products-crud-rest-service-interface';
import { BaseEffects } from 'app/shared/core/state';
import { productReadActions } from './products.action';
@Injectable()
export class ProductsEffects extends BaseEffects<Product> {
    constructor(
        protected actions$: Actions,
        protected restService: ProductsCrudRestServiceInterface<Product>,
    ) {
        super(actions$, restService, productReadActions);
    }
}
