import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTrackerComponent } from './income-tracker.component';

import { provideHttpClient, withInterceptorsFromDi  } from '@angular/common/http';
import { IncomeListComponent } from '../income-list/income-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { IncomeService } from '../../services/income.service';

describe('IncomeTrackerComponent', () => {
  let component: IncomeTrackerComponent;
  let fixture: ComponentFixture<IncomeTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MatDialog,
        IncomeService,
        provideHttpClient(withInterceptorsFromDi()),
      ],
      imports: [
        IncomeTrackerComponent,
        IncomeListComponent,
        MatButtonModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
