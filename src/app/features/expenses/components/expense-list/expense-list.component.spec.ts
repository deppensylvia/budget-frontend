import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseListComponent } from './expense-list.component';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExpenseItemComponent } from '../expense-item/expense-item.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { IExpenseItem } from '../../../../models/expense-item.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ExpenseService } from '../../services/expense.service';
import { EventEmitter } from '@angular/core';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';

describe('ExpenseListComponent', () => {
  let component: ExpenseListComponent;
  let fixture: ComponentFixture<ExpenseListComponent>;

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

  const matDialogMock = {
    open: jasmine.createSpy('open').and.returnValue({
      afterClosed: () => of(mockExpenseList[0]) 
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ExpenseListComponent,
        CommonModule, 
        MatButtonModule, 
        MatIconModule, 
        ExpenseItemComponent, 
        MatDialogModule
      ],
      providers: [
        HttpClient, 
        HttpHandler, 
        { provide: MatDialog, useValue: matDialogMock},
        { provide: ExpenseService, useValue: jasmine.createSpyObj('ExpenseService', ['loadExpenses', 'deleteExpense', 'editedExpense']) }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseListComponent);
    component = fixture.componentInstance;
    component.expenseList$ = new Observable(observer => {
      observer.next(mockExpenseList);
    });
    component.expenseChange = new EventEmitter<IExpenseItem[]>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openExpenseForm', () => {
    it('should open the expense form dialog with the correct data', () => {
      const dialogRef = matDialogMock.open();
      component.openExpenseForm(mockExpenseList[0]);
      expect(matDialogMock.open).withContext('Check that dialog was opened').toHaveBeenCalled();
      expect(matDialogMock.open).withContext('Check that the form is called with ExpenseFormComponent').toHaveBeenCalledWith(ExpenseFormComponent, {
        width: '600px',
        data: mockExpenseList[0]
      });
      
      dialogRef.afterClosed().subscribe((result: IExpenseItem) => {
        expect(result).withContext('Check afterClosed methods returns an expense').toEqual(mockExpenseList[0]);
      });
    });
  });

  describe('deleteExpense', () => {
    it('should confirm and delete the expense item', () => {
      component.expenseList$ = new Observable(observer => {
        observer.next(mockExpenseList);
      }); 
      spyOn(window, 'confirm').and.returnValue(true);
      const mockExpenseService = (component as any).expenseService;
 
      component.deleteExpense(0);
      expect(mockExpenseService.deleteExpense).withContext('Check that deleted expense with id = 1 was called').toHaveBeenCalledWith('1', mockExpenseList, 0);
      expect(mockExpenseService.loadExpenses).withContext('Check load expenses was called').toHaveBeenCalled();
    });
    it('should not delete the expense item if confirmation is cancelled', () => {
      component.expenseList$ = new Observable(observer => {
        observer.next(mockExpenseList);
      });
      spyOn(window, 'confirm').and.returnValue(false);
      const mockExpenseService = (component as any).expenseService;
      component.deleteExpense(0);
      expect(mockExpenseService.deleteExpense).withContext('Check delete expense was not called').not.toHaveBeenCalled();
      expect(mockExpenseService.loadExpenses).withContext('Check load expenses was not called').not.toHaveBeenCalled();
    });
  });

  describe('editExpense', () => {
    it('should call editedExpense on the expense service with the updated expense', () => {
      const mockUpdatedExpense = { expenseId: '1', expenseName: 'Updated Expense', expenseAmount: 150, expenseNotes: 'Updated Notes' };
      const mockExpenseService = (component as any).expenseService; 
      mockExpenseService.editedExpense(mockUpdatedExpense);
      expect(mockExpenseService.editedExpense).withContext('Check edited expense was called').toHaveBeenCalledWith(mockUpdatedExpense);
    });
  });
});
