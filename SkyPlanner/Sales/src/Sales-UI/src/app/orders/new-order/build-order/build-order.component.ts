import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
    Component,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
    Account,
    AddOrder,
    AddOrderProduct,
    CreateOrder,
    Order,
    OrderProduct,
    Product,
    SnackBarService,
} from '@shared/core';
import { ProductReadFacadeInterface } from 'app/shared/core/state/product-read-facade-interface';
import { environment } from 'environments/environment';
import * as state from '../../../products/state';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { WaitDialogComponent } from '../wait-dialog/wait-dialog.component';
import * as accountState from '../../../accounts/state';
import {
    CrudFacadeInterface,
    LoadingErrorMessageSelector,
} from 'app/shared/core/state';
import { tap } from 'rxjs/operators';
@Component({
    selector: 'build-order',
    templateUrl: './build-order.component.html',
    styleUrls: ['./build-order.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BuildOrderComponent),
            multi: true,
        },
    ],
})
export class BuildOrderComponent
    extends CreateOrder
    implements OnInit, OnDestroy
{
    constructor(
        protected fb: FormBuilder,
        protected facadeProducts: ProductReadFacadeInterface<
            Product,
            state.fromReducer.ProductSelectorState
        >,
        private matDialog: MatDialog,
        private facadeAccounts: CrudFacadeInterface<
            Account,
            accountState.fromReducer.AccountSelectorState
        >,
        private router: Router,
        protected snackBarService: SnackBarService,
    ) {
        super(fb);
        this.order = {
            createDate: new Date(),
            lastUpdateDate: new Date(),
            orderProducts: [],
            subTotal: 0,
            taxes: 0,
            total: 0,
            id: -1,
        };
        this.orderForm = this.createOrder(this.order);
        this.addProduct$ = facadeProducts.selected$;
        this.loadingErrorMessageSelector$ =
            facadeAccounts.loadingErrorMessageSelector$.pipe(
                tap((load) => {
                    if (load.loading) {
                        this.openDialog();
                    } else {
                        if (!load.error) {
                            this.orderForm = this.createOrder(this.order);
                            if (this.matRef) {
                                this.facadeAccounts.getAll();
                                this.router.navigate(['order/success']);
                            }
                        } else {
                            this.snackBarService.show(load.message, 'x');
                        }
                        this.matRef?.close();
                    }
                }),
            );
    }
    @Input()
    account: Account | null = null;
    ngOnDestroy(): void {
        this.destroy();
    }
    ngOnInit(): void {
        this.takeUntilPipe(this.addProduct$).subscribe({
            next: (product) => {
                if (product) {
                    const orderItems = this.orderItems;
                    const idx = orderItems.findIndex(
                        (c) => c.value.orderProduct.product.id === product.id,
                    );
                    if (idx >= 0) {
                        const control = orderItems[idx];
                        if (
                            control.valid &&
                            control.value.orderProduct.quantity <=
                                control.value.orderProduct.product.count
                        ) {
                            control.patchValue({
                                orderProduct: {
                                    quantity:
                                        control.value.orderProduct.quantity + 1,
                                },
                            });
                            this.orderItems.splice(idx, 1, control);
                        }
                    } else {
                        const newItem: OrderProduct = {
                            product: product,
                            quantity: 1,
                            id: -1,
                        };
                        this.orderItems.push(this.createOrderProduct(newItem));
                    }
                    this.orderForm.patchValue({
                        orderProducts: this.orderItems,
                    });
                    this.quantityChange(this.fromArrayControls());
                }
            },
        });
    }
    order: Order;
    orderForm: FormGroup;
    addProduct$: Observable<Product>;
    loadingErrorMessageSelector$: Observable<LoadingErrorMessageSelector>;
    matRef: MatDialogRef<any, any> | undefined = undefined;

    fromArrayControls(): OrderProduct[] {
        return (this.orderForm.get('orderProducts') as FormArray)
            .getRawValue()
            .map((p) => p.orderProduct);
    }

    quantityChange(items: OrderProduct[]): void {
        const subTotal =
            items.length > 0
                ? items
                      .map((i) => {
                          return i.quantity * i.product.price;
                      })
                      .reduce((a, b) => a + b)
                : 0;
        const tax = subTotal * (environment.taxes / 100);
        const total = subTotal + tax;
        this.orderForm.patchValue(
            {
                taxes: tax,
                total: total,
                subTotal: subTotal,
            },
            { emitEvent: false },
        );
    }
    deleteItem(item: any): void {
        const orderItems = this.orderItems;
        const idx = orderItems.findIndex((c) => c.value.id === item.id);
        const controls = orderItems.splice(idx, 1);
        this.orderForm.patchValue({
            orderProducts: orderItems,
        });
        this.facadeProducts.removeProductFromOrder(
            item.orderProduct.product,
            item.orderProduct.quantity,
        );
    }
    get orderItems(): AbstractControl[] {
        return (this.orderForm.get('orderProducts') as FormArray).controls;
    }
    getValue(name: string): any {
        const control = this.getControl(this.orderForm.controls, name);
        return control.value;
    }
    hasError(name: string, error: string): boolean {
        const control = this.getControl(this.orderForm.controls, name);
        return control.hasError(error);
    }
    openDialog(): void {
        const config = {
            panelClass: 'wait-dialog',
            disableClose: false,
        };
        this.matRef = this.matDialog.open(WaitDialogComponent, config);
    }
    save(): void {
        if (this.account && !!this.account.id) {
            const addOrder: AddOrder = {
                accountId: this.account.id,
                taxes: this.orderForm.value.taxes,
                subTotal: this.orderForm.value.subTotal,
                orderProducts: this.fromArrayControls().map((o) => {
                    const po: AddOrderProduct = {
                        productId: o.product.id,
                        quantity: o.quantity,
                    };
                    return po;
                }),
            };
            this.facadeAccounts.add(addOrder);
        }
    }
}
