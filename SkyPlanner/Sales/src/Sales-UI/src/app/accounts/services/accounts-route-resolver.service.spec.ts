import { TestBed } from '@angular/core/testing';

import { AccountsRouteResolverService } from './accounts-route-resolver.service';

describe('AccountsRouteResolverService', () => {
  let service: AccountsRouteResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsRouteResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
