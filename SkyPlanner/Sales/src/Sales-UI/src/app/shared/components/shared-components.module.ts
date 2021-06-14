import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';

import { OrderItemComponent } from './order-item/order-item.component';
import { MaterialModule } from '@shared/material';
import { OrderComponent } from './order/order.component';
import { OrderListItemComponent } from './order-list-item/order-list-item.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
const routes: Routes = [];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        ExpansionPanelComponent,
        OrderItemComponent,
        OrderComponent,
        OrderListItemComponent,
        HeaderComponent,
    ],
    declarations: [
        ExpansionPanelComponent,
        OrderItemComponent,
        OrderComponent,
        OrderListItemComponent,
        HeaderComponent,
    ],
})
export class SharedComponentsModule {}
