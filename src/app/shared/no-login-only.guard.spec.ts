import { TestBed, async, inject } from '@angular/core/testing';

import { NoLoginOnlyGuard } from './no-login-only.guard';

describe('NoLoginOnlyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoLoginOnlyGuard]
    });
  });

  it('should ...', inject([NoLoginOnlyGuard], (guard: NoLoginOnlyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
