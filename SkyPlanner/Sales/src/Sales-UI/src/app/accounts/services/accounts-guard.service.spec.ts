import { TestBed } from '@angular/core/testing';

import { AccountsGuardService } from './accounts-guard.service';

describe('AccountGuardService', () => {
    let service: AccountsGuardService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AccountsGuardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
