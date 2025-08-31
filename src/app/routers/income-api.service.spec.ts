import { TestBed } from '@angular/core/testing';

import { IncomeApiService } from './income-api.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('IncomeApiService', () => {
  let service: IncomeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IncomeApiService,
        provideHttpClient(withInterceptorsFromDi())
      ],
    });
    service = TestBed.inject(IncomeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
