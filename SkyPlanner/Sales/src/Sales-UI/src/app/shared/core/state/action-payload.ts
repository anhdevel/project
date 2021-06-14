import { InjectionToken } from '@angular/core';
import { ActionCreator, NotAllowedCheck } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Entity } from './../models/entity';
export interface ActionPayload {}
export interface ActionFindOnePayload extends ActionPayload {
    id: number;
}

export interface ActionSuccessfullyPayload<E extends Entity>
    extends ActionPayload {
    data: E[];
}
export interface ActionErrorPayload extends ActionPayload {
    error: string;
}
export interface SingeActionSuccessfullyPayload<E extends Entity>
    extends ActionPayload {
    data: E;
}
export declare type CustomAction<P extends ActionPayload> = ActionCreator<
    string,
    (
        props: Payload<P> & NotAllowedCheck<Payload<P>>,
    ) => Payload<P> & TypedAction<string>
>;
export declare type Payload<P extends ActionPayload> = {
    payload: P;
};
export interface QueryActions<E extends Entity> {
    getAll: CustomAction<ActionPayload>;
    getAllSuccessfully: CustomAction<ActionSuccessfullyPayload<E>>;
    error: CustomAction<ActionErrorPayload>;
}
export interface QueryOneActions<E extends Entity> extends QueryActions<E> {
    findOne: CustomAction<ActionFindOnePayload>;
    findOneSuccessfully: CustomAction<SingeActionSuccessfullyPayload<E>>;
}
export interface QueryAddActions<E extends Entity> extends QueryActions<E> {
    add: CustomAction<SingeActionSuccessfullyPayload<E>>;
    addSuccessfully: CustomAction<SingeActionSuccessfullyPayload<E>>;
}

export const READ_ACTIONS = new InjectionToken<any>('CustomsActions');
