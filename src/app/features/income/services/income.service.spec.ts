import { TestBed } from '@angular/core/testing';

import { IncomeService } from './income.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('IncomeService', () => {
  let service: IncomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IncomeService,
        provideHttpClient(withInterceptorsFromDi())    
      ],
    });
    service = TestBed.inject(IncomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
