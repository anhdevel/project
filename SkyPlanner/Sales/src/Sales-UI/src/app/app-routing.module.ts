import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsRouteResolverService } from './accounts/services';
import { AccountsGuardService } from './accounts/services/accounts-guard.service';
import { ProductsRouteResolverService } from './products/services';

const routes: Routes = [
    {
        path: 'accounts',
        loadChildren: (): any =>
            import('./accounts/accounts.module').then((m) => m.AccountsModule),
        resolve: {
            accounts: AccountsRouteResolverService,
        },
    },
    {
        path: 'order',
        loadChildren: (): any =>
            import('./orders/orders.module').then((m) => m.OrdersModule),
        canActivate: [AccountsGuardService],
        resolve: {
            products: ProductsRouteResolverService,
        },
    },
    {
        path: '**',
        redirectTo: 'accounts',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
