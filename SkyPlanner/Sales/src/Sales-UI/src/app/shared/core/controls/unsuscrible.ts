import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { Order } from '../models/order';
import { OrderProduct } from '../models/order-product';
export class Unsuscrible {
    private _unsubscribeAll = new Subject();

    takeUntilPipe<T>(observable: Observable<T>): Observable<T> {
        return observable.pipe(takeUntil(this._unsubscribeAll));
    }
    destroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    public getControl<
        T extends {
            [key: string]: AbstractControl;
        },
        K extends keyof T,
    >(value: T, key: K): AbstractControl {
        return value[key];
    }
}
export class CreateOrder extends Unsuscrible {
    constructor(protected fb: FormBuilder) {
        super();
    }

    createOrder(order: Order): FormGroup {
        return this.fb.group({
            id: [order.id],
            createDate: [order.createDate],
            lastUpdateDate: [order.lastUpdateDate],
            subTotal: [order.subTotal],
            taxes: [order.total],
            orderProducts: this.fb.array(
                order.orderProducts.map((op) => this.createOrderProduct(op)),
                [CreateOrder.minLength(1)],
            ),

            total: order.total,
        });
    }

    createOrderProduct(item: OrderProduct): FormGroup {
        const grp = this.fb.group({
            orderProduct: this.fb.group({
                id: [item.id],
                quantity: [
                    item.quantity,
                    [
                        Validators.max(item.quantity + item.product.count),
                        Validators.required,
                        Validators.min(1),
                    ],
                    ,
                ],
                product: [item.product],
                total: [item.quantity * item.product.price],
                name: [item.product.name],
            }),
        });

        return grp;
    }
    public static minLength(min: number): ValidatorFn | any {
        return (control: AbstractControl[]): any => {
            if (!(control instanceof FormArray)) return;
            return control.length < min ? { minLength: true } : null;
        };
    }
}
