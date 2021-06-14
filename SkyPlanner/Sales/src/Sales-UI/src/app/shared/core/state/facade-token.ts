import { InjectionToken } from '@angular/core';
import { MemoizedSelector } from '@ngrx/store';
import { Entity } from './../models/entity';
import { State } from './state';

export const FACADE_SELECTORS = new InjectionToken<any>('FacadeSelectors');

export interface FacadeSelectors<E extends Entity, S extends State<E>, O> {
    [key: string]: MemoizedSelector<S, O>;
}
export interface FacadeSelectorsToken<E extends Entity, S extends State<E>, O> {
    selectors: FacadeSelectors<E, S, O>;
    name: string;
}
