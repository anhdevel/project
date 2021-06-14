import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Entity } from '../models/entity';
import { CrudRestServiceInterface } from './crud-rest-service-interface';

Injectable();
export abstract class ProductsCrudRestServiceInterface<
    T extends Entity,
> extends CrudRestServiceInterface<T> {
    constructor(protected http: HttpClient) {
        super(http);
    }
    public add(item?: T): Observable<T> {
        return this.http.post<T>(`${environment.apiUrl}/${this.baseUrl}`, item);
    }
}
