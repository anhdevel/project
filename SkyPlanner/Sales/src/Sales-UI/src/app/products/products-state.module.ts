import { NgModule } from '@angular/core';
import { ProductsRestService } from './services';
import { FACADE_SELECTORS, READ_ACTIONS } from 'app/shared/core/state';
import { ProductFacade } from './state/products.facade';
import * as fromActions from './state/products.action';
import { selectorsToken } from './state/index';
import { ProductReadFacadeInterface } from 'app/shared/core/state/product-read-facade-interface';
import { ProductsCrudRestServiceInterface } from 'app/shared/core/services/products-crud-rest-service-interface';
@NgModule({
    providers: [
        {
            provide: ProductsCrudRestServiceInterface,
            useClass: ProductsRestService,
        },
        { provide: FACADE_SELECTORS, useValue: selectorsToken, multi: true },
        { provide: ProductReadFacadeInterface, useClass: ProductFacade },
    ],
})
export class ProductsStateModule {}
