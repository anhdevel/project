import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedComponentsModule } from '@shared/components';
import { AccountsStateModule } from './accounts/accounts-state.module';
import { ProductsStateModule } from './products/products-state.module';
import { StateModule } from './state/state.module';
import { OrdersCrudRestServiceInterface } from '@shared/core';
import { OrdersRestService } from './orders/services/orders-rest.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StateModule,
        AppRoutingModule,
        SharedComponentsModule,
        AccountsStateModule,
        ProductsStateModule,
    ],
    providers: [
        {
            provide: OrdersCrudRestServiceInterface,
            useClass: OrdersRestService,
        },
    ],

    bootstrap: [AppComponent],
})
export class AppModule {}
