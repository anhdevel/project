import { tap } from 'rxjs/operators';
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '@shared/components/header/header.service';
import { Account } from '@shared/core';
import { CrudFacadeInterface } from 'app/shared/core/state';
import { Observable } from 'rxjs';
import * as accountState from '../../accounts/state';
@Component({
    selector: 'new-order',
    templateUrl: './new-order.component.html',
    styleUrls: ['./new-order.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class NewOrderComponent {
    constructor(
        private facade: CrudFacadeInterface<
            Account,
            accountState.fromReducer.AccountSelectorState
        >,
        public router: Router,
        private header: HeaderService,
    ) {
        this.account$ = this.facade.selected$.pipe(
            tap((account) => (this.header.subHeader = account?.name)),
        );
    }
    account$: Observable<Account> = new Observable();
}
