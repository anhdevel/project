import { TestBed } from '@angular/core/testing';

import { AccountsRestService } from './accounts-rest.service';

describe('AccountsReadRestService', () => {
    let service: AccountsRestService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AccountsRestService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
