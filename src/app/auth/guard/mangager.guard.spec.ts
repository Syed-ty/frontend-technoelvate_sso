import { TestBed } from '@angular/core/testing';

import { MangagerGuard } from './mangager.guard';

describe('MangagerGuard', () => {
  let guard: MangagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MangagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
