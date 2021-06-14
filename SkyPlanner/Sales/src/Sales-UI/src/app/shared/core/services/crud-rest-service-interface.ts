import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Entity } from '../models/entity';
import { ReadRestServiceInterface } from './read-rest-service-interface';

Injectable();
export abstract class CrudRestServiceInterface<
    T extends Entity,
> extends ReadRestServiceInterface<T> {
    constructor(protected http: HttpClient) {
        super(http);
    }
    public add(item?: T): Observable<T> {
        return this.http.post<T>(`${environment.apiUrl}/${this.baseUrl}`, item);
    }
}
