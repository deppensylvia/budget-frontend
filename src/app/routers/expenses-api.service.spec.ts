import { TestBed } from '@angular/core/testing';

import { ExpensesApiService } from './expenses-api.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


describe('ExpensesApiService', () => {
  let service: ExpensesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpensesApiService,
        provideHttpClient(withInterceptorsFromDi())    
      ],
    });
    service = TestBed.inject(ExpensesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
