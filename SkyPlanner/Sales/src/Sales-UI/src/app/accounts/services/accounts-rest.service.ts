import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    Account,
    CrudRestServiceInterface
} from '@shared/core';

@Injectable()
export class AccountsRestService extends CrudRestServiceInterface<Account> {
    constructor(protected http: HttpClient) {
        super(http);
        this.baseUrl = 'account';
    }
}
