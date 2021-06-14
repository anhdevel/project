import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Unsuscrible } from 'app/shared/core/controls/unsuscrible';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
    selector: 'order-item',
    templateUrl: './order-item.component.html',
    styleUrls: ['./order-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OrderItemComponent),
            multi: true,
        },
    ],
})
export class OrderItemComponent
    extends Unsuscrible
    implements OnInit, OnDestroy
{
    constructor(private fb: FormBuilder) {
        super();
        this.itemFormGroup = this.fb.group({});
    }
    @Input()
    itemFormGroup: FormGroup = new FormGroup({});
    @Input()
    orderForm: FormGroup = new FormGroup({});
    @Input()
    index = 0;
    private _enable = false;
    @Input()
    set enable(value: boolean | string) {
        this._enable = coerceBooleanProperty(value);
    }
    get enable(): boolean | string {
        return this._enable;
    }
    @Output()
    quantityChange: EventEmitter<void> = new EventEmitter();

    ngOnDestroy(): void {
        this.destroy();
    }

    ngOnInit(): void {
        this.takeUntilPipe(this.itemFormGroup.valueChanges).subscribe({
            next: (value) => {
                if (value.orderProduct) {
                    if (value.orderProduct.quantity < 1) {
                        this.itemFormGroup.patchValue({
                            orderProduct: {
                                quantity: 1,
                            },
                        });
                    } else {
                        this.itemFormGroup.patchValue(
                            {
                                orderProduct: {
                                    total:
                                        value.orderProduct.product.price *
                                        value.orderProduct.quantity,
                                },
                            },
                            { emitEvent: false },
                        );
                        this.quantityChange.emit();
                    }
                }
            },
        });
    }
    get totalValue(): any {
        const control = this.itemFormGroup.get('orderProduct');
        if (!control) {
            return 0;
        }
        return control.value.total;
    }
    max(name: string): string | undefined {
        const grpControl = this.getControl(
            this.itemFormGroup.controls,
            'orderProduct',
        );
        const control = grpControl.get(name);
        if (control && control.hasError('max')) {
            control?.markAllAsTouched();
            control?.markAsDirty();
            this.orderForm.setErrors(control.getError('max'));
            return `The Quantity must be lower than ${
                control.getError('max').max
            }`;
        }
        return undefined;
    }
    min(name: string): string | undefined {
        const control = this.getControl(this.itemFormGroup.controls, name);
        if (control && control.hasError('min') && control.touched) {
            return `The Quantity must be grater than 1`;
        }
        return undefined;
    }
    get orderItems(): AbstractControl[] {
        return (this.orderForm.get('orderProducts') as FormArray).controls;
    }
}
