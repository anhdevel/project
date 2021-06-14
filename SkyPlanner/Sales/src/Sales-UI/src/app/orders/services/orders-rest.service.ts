import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdersCrudRestServiceInterface } from '@shared/core';

@Injectable()
export class OrdersRestService extends OrdersCrudRestServiceInterface {
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'order';
    }
}
