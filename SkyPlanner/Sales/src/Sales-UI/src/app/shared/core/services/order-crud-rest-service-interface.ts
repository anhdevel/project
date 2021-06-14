import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Order } from '..';
import { Entity } from '../models/entity';
import { CrudRestServiceInterface } from './crud-rest-service-interface';

Injectable();
export abstract class OrdersCrudRestServiceInterface extends CrudRestServiceInterface<Order> {
    constructor(protected http: HttpClient) {
        super(http);
    }
}
