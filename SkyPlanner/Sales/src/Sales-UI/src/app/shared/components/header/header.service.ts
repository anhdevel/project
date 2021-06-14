import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HeaderService {
    private _subHeader: Subject<string> = new Subject<string>();
    private _subHeader$: Observable<string> = this._subHeader.asObservable();
    set subHeader(value: string | undefined) {
        this._subHeader.next(value);
    }
    get subHeader$(): Observable<string> {
        return this._subHeader;
    }
    constructor() {}
}
