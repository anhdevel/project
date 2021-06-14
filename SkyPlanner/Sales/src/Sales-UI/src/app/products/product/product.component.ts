import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { Product } from '@shared/core';

@Component({
    selector: 'product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProductComponent {
    constructor() {
        this._product = {
            count: 0,
            description: '',
            id: -1,
            inStock: false,
            name: '',
            price: 0,
        };
    }
    _product: Product;
    @Input()
    get product(): Product {
        return this._product;
    }
    set product(value: Product) {
        this._product = value;
    }

    @Output()
    add: EventEmitter<Product> = new EventEmitter<Product>();
    addProduct(event: MouseEvent): void {
        event.stopImmediatePropagation();
        event.stopPropagation();

        this.add.emit(this.product);
    }
}
