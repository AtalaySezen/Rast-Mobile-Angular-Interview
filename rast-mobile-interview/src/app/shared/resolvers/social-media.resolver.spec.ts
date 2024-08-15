import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { socialMediaResolver } from './social-media.resolver';

describe('socialMediaResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => socialMediaResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
