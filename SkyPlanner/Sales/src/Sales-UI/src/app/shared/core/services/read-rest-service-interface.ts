import { Entity } from './../models/entity';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

Injectable();
export abstract class ReadRestServiceInterface<T extends Entity> {
    baseUrl: string = '';

    constructor(protected http: HttpClient) {}

    public getAll(): Observable<T[]> {
        return this.http.get<T[]>(`${environment.apiUrl}/${this.baseUrl}`);
    }

    public findAll(filters?: any): Observable<T[]> {
        return this.http.post<T[]>(
            `${environment.apiUrl}/${this.baseUrl}`,
            filters,
        );
    }

    public findById(id: number): Observable<T> {
        return this.http.get<T>(`${environment.apiUrl}/${this.baseUrl}/${id}`);
    }
}
