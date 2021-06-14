import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudRestServiceInterface, Product } from '@shared/core';
import { ProductsCrudRestServiceInterface } from 'app/shared/core/services/products-crud-rest-service-interface';

@Injectable()
export class ProductsRestService extends ProductsCrudRestServiceInterface<Product> {
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'product';
    }
}
