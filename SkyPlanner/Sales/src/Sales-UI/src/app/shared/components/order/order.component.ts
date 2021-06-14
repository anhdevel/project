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
    ControlValueAccessor,
    FormArray,
    FormBuilder,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Order, Unsuscrible } from '@shared/core';

@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OrderComponent),
            multi: true,
        },
    ],
})
export class OrderComponent
    extends Unsuscrible
    implements ControlValueAccessor, OnInit, OnDestroy
{
    constructor(private fb: FormBuilder) {
        super();
    }
    ngOnDestroy(): void {
        this.destroy();
    }
    ngOnInit(): void {
        this.takeUntilPipe(this.orderForm.valueChanges).subscribe({
            next: (values) => console.log(values),
        });
    }
    @Input()
    set order(value: Order) {
        this.writeValue(value);
    }
    @Input()
    orderForm = this.fb.group({});

    get title(): string {
        const controlId = this.getControl(this.orderForm.controls, 'id');
        return controlId && controlId.value !== undefined && controlId.value > 0
            ? `Order No:${controlId.value}`
            : 'New Order';
    }
    get orderItems(): AbstractControl[] {
        return (this.orderForm.get('orderProducts') as FormArray).controls;
    }
    getValue(name: string): any {
        const control = this.getControl(this.orderForm.controls, name);
        return control.value;
    }

    fnChange = (_: any): void => {};

    fnTouch = (): void => {};

    writeValue(obj: any): void {
        // this.orderFormGrp = obj;
    }

    registerOnChange(fn: any): void {
        this.fnChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.fnTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {}

    @Input()
    expandByDefault = false;
    @Input()
    editable = false;
}
