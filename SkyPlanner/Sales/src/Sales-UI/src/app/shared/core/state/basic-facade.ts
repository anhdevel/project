import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export abstract class BasicFacade<T> {
    constructor(protected store: Store<T>) {}
    selector<K>(mapFn: (state: T) => K): Observable<K> {
        return this.store.select(mapFn);
    }
    protected dispatch(action: Action): void {
        this.store.dispatch(action);
    }
}
