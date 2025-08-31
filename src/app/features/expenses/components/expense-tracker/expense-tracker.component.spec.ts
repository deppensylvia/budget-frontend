import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTrackerComponent } from './expense-tracker.component';
import { IExpenseItem } from '../../../../models/expense-item.model';

import { ExpenseListComponent } from '../expense-list/expense-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseService } from '../../services/expense.service';
import { provideHttpClient, withInterceptorsFromDi  } from '@angular/common/http';
import { of } from 'rxjs';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';

describe('ExpenseTrackerComponent', () => {
  let component: ExpenseTrackerComponent;
  let fixture: ComponentFixture<ExpenseTrackerComponent>;
  const mockExpenseList = [
    {
      expenseId: '1',
      expenseName: 'Test Expense 1',
      budgetCategory: 'Test Category 1',
      expenseAmount: 100,
      showInBudget: true,
      dateOfPurchase: new Date(),
      locationPurchased: 'Test Location 1',
      expenseNotes: 'Test Notes 1',
    }
  ];
  const matDialogMock = {
    open: jasmine.createSpy('open').and.returnValue({
      afterClosed: () => of(mockExpenseList[0]) 
    })
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: MatDialog, useValue: matDialogMock},
        { provide: ExpenseService, useValue: jasmine.createSpyObj('ExpenseService', ['getExpenseList', 'updateExpenses']) }
      ],
      imports: [
        ExpenseTrackerComponent,
        ExpenseListComponent, 
        MatButtonModule, 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openExpenseItemForm', () => {
    it('should open the expense form dialog with the correct data', () => {
      const expense = mockExpenseList[0];
      component.openExpenseItemForm(expense);
      expect(matDialogMock.open).withContext('Check that the form is called with ExpenseFormComponent').toHaveBeenCalledWith(ExpenseFormComponent, {
        width: '600px',
        data: expense
      });
    });
    it('should return the result when dialog is closed and result exists', () => {
      const expense = mockExpenseList[0];
      component.openExpenseItemForm(expense);
      const dialogRef = matDialogMock.open();
      dialogRef.afterClosed().subscribe((result: IExpenseItem) => {
        expect(result).toEqual(expense);
      });
    });
  });

  describe('openExpensesItemChange', () => {
    it('should call updateExpenses on the expense service with the updated expenses list', () => {
      const updatedExpensesList = [...mockExpenseList, {    
        expenseId: '2',
        expenseName: 'Test Expense 2',
        budgetCategory: 'Test Category 2',
        expenseAmount: 200,
        showInBudget: true,
        dateOfPurchase: new Date(),
        locationPurchased: 'Test Location 2',
        expenseNotes: 'Test Notes 2',
      }];
      const mockExpenseService = (component as any).expenseService;
      spyOn(mockExpenseService, 'updateExpenses').and.callThrough();
      component.onExpensesItemChange(updatedExpensesList);
      expect(mockExpenseService.updateExpenses).withContext('Check expenseService called with updated list').toHaveBeenCalledWith(updatedExpensesList);
    });
  });
});
