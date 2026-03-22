import { TestBed } from '@angular/core/testing';

import { wishlistService } from './wishlist.service';

describe('wishlistService', () => {
  let service: wishlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(wishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
