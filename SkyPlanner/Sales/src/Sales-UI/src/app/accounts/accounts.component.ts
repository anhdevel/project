import { startWith, tap } from 'rxjs/operators';
import { CreateOrder } from '../shared/core/controls/unsuscrible';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Account, SnackBarService } from '@shared/core';
import { CrudFacadeInterface } from 'app/shared/core/state';
import * as state from './state';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
    selector: 'accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AccountComponent extends CreateOrder implements OnInit {
    constructor(
        private facade: CrudFacadeInterface<
            Account,
            state.fromReducer.AccountSelectorState
        >,
        protected fb: FormBuilder,
        public router: Router,
        protected snackBarService: SnackBarService,
    ) {
        super(fb);
        this._accounts$ = this.facade.data$;
        this._account$ = this.facade.selected$;
        this._error$ = this.facade.error$.pipe(
            startWith(false),
            tap((error) => {
                this.error = error;
                if (error) this.snackBarService.show('Server Error', 'x');
            }),
        );
    }

    private _accounts$: Observable<Account[]>;
    private _account$: Observable<Account>;
    private _error$: Observable<boolean>;
    get accounts$(): Observable<Account[]> {
        return this._accounts$;
    }
    get error$(): Observable<boolean> {
        return this._error$;
    }
    error = false;
    formGroup = this.fb.group({
        orders: this.fb.array([]),
        selectAccount: [undefined, [Validators.required]],
    });
    hasError(name: string, error: string): boolean {
        const control = this.getControl(this.formGroup.controls, name);
        return control.hasError(error);
    }
    ngOnInit(): void {
        this.takeUntilPipe(this.formGroup.valueChanges).subscribe({
            next: (values) => {
                if (values.selectAccount) {
                    this.facade.selectedChange(values.selectAccount);
                }
                const account = values.selectAccount as Account;
                this.loadOrders(account);
            },
        });
        this.takeUntilPipe(this._account$).subscribe({
            next: (data) => {
                this.formGroup.patchValue(
                    {
                        selectAccount: data,
                    },
                    { emitEvent: false },
                );
                this.loadOrders(data);
            },
        });
    }

    get orders(): any[] {
        const control = this.formGroup.get('orders') as FormArray;
        return control.controls;
    }
    compareWith(o1: Account, o2: Account): boolean {
        if (!o1 && !o1) {
            return true;
        }
        if (!o1 || !o2) {
            return false;
        }
        return o1.id === o2.id;
    }
    loadOrders(account: Account): void {
        if (account) {
            const control = this.formGroup.get('orders') as FormArray;
            control.clear({ emitEvent: false });
            account.orders
                .sort((a, b) => {
                    if (!!a.id && !!b.id) {
                        return b.id - a.id;
                    }
                    return 1;
                })
                .forEach((o) => {
                    control.push(this.createOrder(o), { emitEvent: false });
                });
        }
    }
}
