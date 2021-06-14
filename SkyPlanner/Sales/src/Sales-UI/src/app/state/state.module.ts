import {
    ModuleWithProviders,
    NgModule,
    Optional,
    SkipSelf,
} from '@angular/core';
import * as fromState from 'app/state';
import { AccountEffects } from '../accounts/state';
import { ProductsEffects } from '../products/state';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';

@NgModule({
    imports: [
        StoreModule.forRoot(
            {
                [fromState.fromAccounts.fromReducer.accountSelectorFeatureKey]:
                    fromState.fromAccounts.fromReducer.reducer,
                [fromState.fromProducts.fromReducer.productSelectorFeatureKey]:
                    fromState.fromProducts.fromReducer.reducer,
            },
            {
                runtimeChecks: {
                    strictStateImmutability: false,
                    strictActionImmutability: false,
                },
            },
        ),
        EffectsModule.forRoot([AccountEffects, ProductsEffects]),
        StoreDevtoolsModule.instrument({
            name: 'Sales',
            maxAge: 25,
            logOnly: !environment.production,
        }),
    ],
})
export class StateModule {
    static forRoot(): ModuleWithProviders<StateModule> {
        return {
            ngModule: StateModule,
        };
    }

    constructor(
        @Optional()
        @SkipSelf()
        parentModule: StateModule,
    ) {
        if (parentModule) {
            throw new Error(
                `${parentModule} has already been loaded. Import StateModule in the AppModule only.`,
            );
        }
    }
}
