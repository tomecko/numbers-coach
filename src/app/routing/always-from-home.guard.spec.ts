import { TestBed, async, inject } from '@angular/core/testing';

import { AlwaysFromHomeGuard } from './always-from-home.guard';

xdescribe('AlwaysFromHomeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlwaysFromHomeGuard]
    });
  });

  it('should ...', inject([AlwaysFromHomeGuard], (guard: AlwaysFromHomeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
