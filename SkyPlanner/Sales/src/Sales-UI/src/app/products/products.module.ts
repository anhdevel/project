import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '@shared/components';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';

@NgModule({
    declarations: [ProductsComponent, ProductComponent],
    imports: [SharedComponentsModule],
    exports: [SharedComponentsModule, ProductsComponent, ProductComponent],
})
export class ProductsModule {}
