import { NgModule } from '@angular/core';
import { CrudRestServiceInterface } from '@shared/core';
import { AccountsRestService } from './services';
import { CrudFacadeInterface, FACADE_SELECTORS } from 'app/shared/core/state';
import { AccountFacade } from './state/accounts.facade';
import { selectorsToken } from './state/index';
@NgModule({
    providers: [
        {
            provide: CrudRestServiceInterface,
            useClass: AccountsRestService,
        },
        { provide: FACADE_SELECTORS, useValue: selectorsToken, multi: true },
        { provide: CrudFacadeInterface, useClass: AccountFacade },
    ],
})
export class AccountsStateModule {}
