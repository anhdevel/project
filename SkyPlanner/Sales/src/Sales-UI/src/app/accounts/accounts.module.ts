import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentsModule } from '@shared/components';
import { AccountComponent } from './accounts.component';
import { AccountsRouteResolverService } from './services';

const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
    },
];

@NgModule({
    imports: [SharedComponentsModule, RouterModule.forChild(routes)],
    declarations: [AccountComponent],
    exports: [AccountComponent],
})
export class AccountsModule {}
