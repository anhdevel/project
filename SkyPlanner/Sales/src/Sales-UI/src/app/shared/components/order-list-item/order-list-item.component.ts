import {
    Component,
    Input,
    ViewEncapsulation,
    OnInit,
    Output,
    EventEmitter,
} from '@angular/core';
import {
    FormArray,
    FormBuilder,
} from '@angular/forms';
import { OrderProduct, Unsuscrible } from '@shared/core';

@Component({
    selector: 'order-list-item',
    templateUrl: './order-list-item.component.html',
    styleUrls: ['./order-list-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class OrderListItemComponent extends Unsuscrible implements OnInit {
    constructor(private fb: FormBuilder) {
        super();
    }
    ngOnInit(): void {
        this.orderForm.valueChanges.subscribe({
            next: (values: any) => {
                this.orderItemQuantityChange.emit(
                    values.orderProducts.map((i: any) => i.orderProduct),
                );
            },
        });
    }

    get items(): any[] {
        const control = this.orderForm.get('orderProducts') as FormArray;
        return control ? control.controls : [];
    }
    getValue(name: string): any {
        const control = this.getControl(this.orderForm.controls, name);
        return control.value;
    }
    @Input()
    canDelete = true;

    @Input()
    orderForm = this.fb.group({});

    delete(value: OrderProduct): void {
        this.deleteItem.emit(value);
    }
    @Output()
    orderItemQuantityChange: EventEmitter<OrderProduct[]> = new EventEmitter();
    @Output()
    deleteItem: EventEmitter<OrderProduct> = new EventEmitter();

    quantityChange(): void {
        this.orderItemQuantityChange.emit(
            this.items.map((i: any) => {
                return i.value.orderProduct;
            }),
        );
    }
}
