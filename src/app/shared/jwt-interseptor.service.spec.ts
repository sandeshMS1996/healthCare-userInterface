import { TestBed } from '@angular/core/testing';

import { JwtInterseptorService } from './jwt-interseptor.service';

describe('JwtInterseptorService', () => {
  let service: JwtInterseptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtInterseptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
