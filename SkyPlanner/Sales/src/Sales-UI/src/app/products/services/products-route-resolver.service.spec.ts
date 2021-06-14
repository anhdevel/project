import { TestBed } from '@angular/core/testing';

import { ProductsRouteResolverService } from './products-route-resolver.service';

describe('ProductsRouteResolverService', () => {
    let service: ProductsRouteResolverService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProductsRouteResolverService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
