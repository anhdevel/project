import { Inject, Injectable, Optional } from '@angular/core';
import { BasicFacade } from './basic-facade';
import { Observable } from 'rxjs';
import {
    FacadeSelectors,
    FacadeSelectorsToken,
    FACADE_SELECTORS,
} from './facade-token';
import { Store } from '@ngrx/store';
import { SelectorKeys } from './selector-crud-keys.enum';
import { Entity } from '../models';
import { State } from './state';

@Injectable()
export abstract class ReadFacadeInterface<
    E extends Entity,
    S extends State<E>,
> extends BasicFacade<S> {
    constructor(
        protected store: Store<S>,
        @Optional()
        @Inject(FACADE_SELECTORS)
        protected facadeSelectorsToken: FacadeSelectorsToken<E, S, any>[],
    ) {
        super(store);
    }
    data$: Observable<E[]> = new Observable();
    facadeObservables: FacadeObservables = {};
    loading$: Observable<boolean> = new Observable();
    error$: Observable<boolean> = new Observable();
    loadingErrorMessageSelector$: Observable<LoadingErrorMessageSelector> =
        new Observable();
    selected$: Observable<any> = new Observable();
    currentUrl$: Observable<string> = new Observable();
    name: string = 'name';
    facadeSelectors: FacadeSelectors<E, S, any> | undefined;
    protected buildSelectors(): void {
        this.facadeSelectors = this.getFacadeSelectors(this.name);
        if (this.facadeSelectors) {
            for (const prop in this.facadeSelectors) {
                this.facadeObservables[prop] = this.select(prop);
            }
        }
        if (SelectorKeys.data in this.facadeObservables) {
            this.data$ = this.select(SelectorKeys.data);
        }

        if (SelectorKeys.loading in this.facadeObservables) {
            this.loading$ = this.select(SelectorKeys.loading);
        }
        if (SelectorKeys.error in this.facadeObservables) {
            this.error$ = this.select(SelectorKeys.error);
        }
        if (SelectorKeys.errorWithMessage in this.facadeObservables) {
            this.loadingErrorMessageSelector$ = this.select(
                SelectorKeys.errorWithMessage,
            );
        }
        if (SelectorKeys.select in this.facadeObservables) {
            this.selected$ = this.select(SelectorKeys.select);
        }
        if (SelectorKeys.currentRoute in this.facadeObservables) {
            this.currentUrl$ = this.select(SelectorKeys.currentRoute);
        }
        if (SelectorKeys.currentRoute in this.facadeObservables) {
            this.currentUrl$ = this.select(SelectorKeys.currentRoute);
        }
    }
    public getAll(): void {}

    public findById(id: number): void {}

    public select(key: string): Observable<any> {
        return this.facadeSelectors !== undefined
            ? this.selector(this.facadeSelectors[key])
            : new Observable<any>();
    }

    public getFacadeSelectors(
        name: string,
    ): FacadeSelectors<E, S, any> | undefined {
        const token = this.facadeSelectorsToken.find((s) => s.name === name);
        return token?.selectors;
    }
    public selectedChange(select: E): void {}
}
export interface FacadeObservables {
    [key: string]: Observable<any>;
}
export type LoadingErrorMessageSelector = {
    error: Boolean;
    message: string;
    loading: boolean;
};
