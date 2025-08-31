import { TestBed } from '@angular/core/testing';

import { ExpenseService } from './expense.service';
import { ExpensesApiService } from '../../../routers/expenses-api.service';
import { of } from 'rxjs';
import { IExpenseItem } from '../../../models/expense-item.model';

const mockExpensesApiService = {
  getExpenses: jasmine.createSpy('getExpenses').and.returnValue(of([])),
  addExpense: jasmine.createSpy('addExpense').and.returnValue(of({})),
  editExpense: jasmine.createSpy('editExpense').and.returnValue(of({})),
  deleteExpense: jasmine.createSpy('deleteExpense').and.returnValue(of({}))
};
const mockExpenseList: IExpenseItem[] = [{
      expenseId: '1',
      expenseName: 'Test Expense 1',
      budgetCategory: 'Test Category 1',
      expenseAmount: 100,
      showInBudget: true,
      dateOfPurchase: new Date(),
      locationPurchased: 'Test Location 1',
      expenseNotes: 'Test Notes 1',
    },
    {
      expenseId: '2',
      expenseName: 'Test Expense 2',
      budgetCategory: 'Test Category 2',
      expenseAmount: 200,
      showInBudget: true,
      dateOfPurchase: new Date(),
      locationPurchased: 'Test Location 2',
      expenseNotes: 'Test Notes 2',
    },
    {
      expenseId: '3',
      expenseName: 'Test Expense 3',
      budgetCategory: 'Test Category 3',
      expenseAmount: 300,
      showInBudget: false,
      dateOfPurchase: new Date(),
      locationPurchased: 'Test Location 3',
      expenseNotes: 'Test Notes 3',
    }
  ];

describe('ExpenseService', () => {
  let service: ExpenseService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpenseService, 
        { provide: ExpensesApiService, useValue: mockExpensesApiService }, 
      ],
    });
    service = TestBed.inject(ExpenseService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load expenses on initialization', () => {
    expect(mockExpensesApiService.getExpenses).toHaveBeenCalled();
    service.getExpenseList().subscribe(expenses => {
      expect(expenses).toEqual([]);
    });
  });
  it('should update expense list', () => {
    service.updateExpenses(mockExpenseList);
    service.getExpenseList().subscribe(expenses => {
      expect(expenses).toEqual(mockExpenseList);
    }); 
  });
  it('should save an expense', () => {
    const mockExpense = {
      expenseId: '4',
      expenseName: 'Test Expense 4',
      budgetCategory: 'Test Category 4',
      expenseAmount: 400,
      showInBudget: true,
      dateOfPurchase: new Date(),
      locationPurchased: 'Test Location 4',
      expenseNotes: 'Test Notes 4',
    };
    service.saveExpense(mockExpense);
    expect(mockExpensesApiService.addExpense).toHaveBeenCalledWith(mockExpense);
  });

  it('should delete an expense', () => {
    const mockExpenseId = '1';
    service.deleteExpense(mockExpenseId, mockExpenseList, 0);
    expect(mockExpensesApiService.deleteExpense).toHaveBeenCalledWith(mockExpenseId);
  });   
  it('should edit an expense', () => {
    const mockUpdatedExpense = {...mockExpenseList[0], ...{expenseName: 'Updated Expense', expenseAmount: 150 }};
    service.editedExpense(mockUpdatedExpense);
    expect(mockExpensesApiService.editExpense).toHaveBeenCalledWith(mockUpdatedExpense);
  } 
  );
  it('should reload expenses after editing', () => {
    const mockUpdatedExpense = {...mockExpenseList[0], ...{expenseName: 'Updated Expense', expenseAmount: 150 }};
    service.editedExpense(mockUpdatedExpense);
    expect(mockExpensesApiService.editExpense).toHaveBeenCalledWith(mockUpdatedExpense);
    service.getExpenseList().subscribe(expenses => {
      expect(expenses).toEqual([]); // Assuming the API returns an empty array for simplicity
    });
  });
});