import { NgModule } from '@angular/core';
import { NewOrderComponent } from './new-order/new-order.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from '@shared/components';
import { ProductsModule } from '../products/products.module';
import { BuildOrderComponent } from './new-order/build-order/build-order.component';
import { WaitDialogComponent } from './new-order/wait-dialog/wait-dialog.component';
import { OrderSuccessComponent } from './orden-success/order-success.component';
import { ProductsRouteResolverService } from 'app/products/services/products-route-resolver.service';

const routes: Routes = [
    {
        path: 'new',
        component: NewOrderComponent,
        pathMatch: 'full',
        resolve: {
            products: ProductsRouteResolverService,
        },
    },
    {
        path: 'success',
        component: OrderSuccessComponent,
        pathMatch: 'full',
        resolve: {
            products: ProductsRouteResolverService,
        },
    },

    {
        path: '**',
        redirectTo: 'new',
    },
];
@NgModule({
    declarations: [
        NewOrderComponent,
        BuildOrderComponent,
        WaitDialogComponent,
        OrderSuccessComponent,
    ],
    imports: [ProductsModule, RouterModule.forChild(routes)],
})
export class OrdersModule {}
