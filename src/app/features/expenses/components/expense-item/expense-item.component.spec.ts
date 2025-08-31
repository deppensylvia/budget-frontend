import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseItemComponent } from './expense-item.component';

import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { IExpenseItem } from '../../../../models/expense-item.model';

describe('ExpenseItemComponent', () => {
  let component: ExpenseItemComponent;
  let fixture: ComponentFixture<ExpenseItemComponent>;

  const mockExpense: IExpenseItem = {
      expenseId: '1',
      expenseName: 'Test Expense',
      budgetCategory: 'Test Category',
      expenseAmount: 100,
      showInBudget: true,
      dateOfPurchase: new Date(),
      locationPurchased: 'Test Location',
      expenseNotes: 'Test Notes',
  };

  const mockExpenseWithoutNotes: IExpenseItem = {
      expenseId: '2',
      expenseName: 'Test Expense Without Notes',
      budgetCategory: 'Test Category',
      expenseAmount: 200,
      showInBudget: false,
      dateOfPurchase: new Date(),
      locationPurchased: 'Test Location',
      expenseNotes: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ExpenseItemComponent, 
        CommonModule, 
        MatExpansionModule, 
        MatIconModule 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseItemComponent);
    component = fixture.componentInstance;
    component.expense = mockExpense;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });
  describe('initialization', () => {
    it('should create', () => {
      expect(component).withContext('Expense item initialized successfully').toBeTruthy();
    });
  });

  describe('expense properties', () => {
    it('should have expenseId', () => {
      expect(component.expense.expenseId).withContext('Check expense ID is defined').toBeDefined();
      expect(component.expense.expenseId).withContext('Check expense ID has correct value').toBe(mockExpense.expenseId);
    });
    it('should have expenseName', () => {
      expect(component.expense.expenseName).withContext('Check expense name is defined').toBeDefined();
      expect(component.expense.expenseName).withContext('Check expense name has correct value').toBe(mockExpense.expenseName);
    });
    it('should have budgetCategory', () => {
      expect(component.expense.budgetCategory).withContext('Check budget category is defined').toBeDefined();
      expect(component.expense.budgetCategory).withContext('Check budget category has right value').toBe(mockExpense.budgetCategory);
    });   
    it('should have expenseAmount', () => {
      expect(component.expense.expenseAmount).withContext('Check expense amount is defined').toBeDefined();
      expect(component.expense.expenseAmount).withContext('Check expense amount has right value').toBe(mockExpense.expenseAmount);
    });
    it('should have showInBudget', () => {
      expect(component.expense.showInBudget).withContext('Check show in budget item is defined').toBeDefined();
      expect(component.expense.showInBudget).withContext('Check show in budget  has right value').toBe(mockExpense.showInBudget);
    });
    it('should have dateOfPurchase', () => {
      expect(component.expense.dateOfPurchase).withContext('Check expense date of purchase is defined').toBeDefined();
      expect(component.expense.dateOfPurchase).withContext('Check expense date of purchase has right value').toEqual(mockExpense.dateOfPurchase);
    });
    it('should have locationPurchased', () => {
      expect(component.expense.locationPurchased).withContext('Check expense location purchased is defined').toBeDefined();
      expect(component.expense.locationPurchased).withContext('Check expense date of purchase has right value').toBe(mockExpense.locationPurchased);
    });
  });

  describe('display properties', () => {
    it('should display expense name', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.expense-name').textContent).withContext('Check expense name is in UI').toContain(mockExpense.expenseName);
    });
    it('should display expense amount', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.expense-amount').textContent).withContext('Check expense amount is in UI').toContain(mockExpense.expenseAmount.toString());
    });
    it('should display budget category', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.budget-category').textContent).withContext('Check budget category is in UI').toContain(mockExpense.budgetCategory);
    });
    it('should display date of purchase', () => {
      const compiled = fixture.nativeElement;
      let dateText = compiled.querySelector('.date-of-purchase').textContent;
      //convert date to string for comparison
      dateText = new Date(dateText).toDateString();
      //expect date to be in the format of 'MMM dd, yyyy'
      dateText = new Date(mockExpense.dateOfPurchase).toDateString();
      expect(dateText).withContext('Check expense date of purchase to be in UI').toContain(mockExpense.dateOfPurchase.toDateString());
    });
    it('should display location purchased', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.location-purchased').textContent).withContext('Check expense location of purchase to be in UI').toContain(mockExpense.locationPurchased);
    });
  });
    
  describe('display expense note logic', () => {
    describe('toggleNotes method', () => {
      it('should toggle showNotes property', () => {
        expect(component.showNotes).withContext('Check showNotes is false by default').toBeFalse();
        component.toggleNotes();
        expect(component.showNotes).withContext('Check showNotes is true after toggle').toBeTrue();
        component.toggleNotes();
        expect(component.showNotes).withContext('Check showNotes is false after second toggle').toBeFalse();
      });
    });
    
    describe('Default state of notes', () => {
      it('should not display notes by default', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.expense-notes')).withContext('Check notes not displayed on default').toBeNull();
      });
      it('should not display notes when showNotes is false', () => {
        component.showNotes = false;  
        fixture.detectChanges();
        const compiled: HTMLElement = fixture.debugElement.nativeElement;
        expect(component.showNotes).withContext('Check showNotes is false').toBeFalse();
        expect(compiled.querySelector('.expense-notes')).withContext('Check expense notes is null').toBeNull();
        expect(compiled.querySelector('.expense-notes')?.textContent).withContext('Check expense notes has no text').toBe(undefined);
      });
    });

    describe('Notes property has value', () => {
      it('should not display notes by default', () => {
        component.expense.expenseNotes = mockExpense.expenseNotes;
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.expense-notes')).withContext('Check notes not displayed on default').toBeNull();
      });
    });

    describe('Notes property does not have value', () => {
      it('should not display notes by default', () => {
        component.expense = mockExpenseWithoutNotes;
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.expense-notes')).withContext('Check expense notes is null by default').toBeNull();
      });
    });
  });
});
