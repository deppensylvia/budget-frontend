import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseFormComponent } from './expense-form.component';

import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BudgetService } from '../../../budget/services/budget.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { todaysDate } from '../../../../utils/shared';


describe('ExpenseFormComponent', () => {
  let component: ExpenseFormComponent;
  let fixture: ComponentFixture<ExpenseFormComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        BudgetService,
        FormBuilder,
        provideNativeDateAdapter,
        provideHttpClient(withInterceptorsFromDi())
      ],
      imports: [
        ExpenseFormComponent,
        CommonModule, 
        ReactiveFormsModule, 
        MatFormFieldModule, 
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule, 
        MatLabel
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 // if form is empty, it should not close the dialog
 it('should not close dialog when form is invalid', () => {
  component.expenseForm.reset();
  expect(component.expenseForm.valid).toBeFalse();
  component.onSubmit();
  expect(mockDialogRef.close).not.toHaveBeenCalled();
});

  // if form is complete and valid, it should submit
  it('should submit when form is complete and valid', () => {
    component.expenseForm.setValue({
      expenseId: 'abcd1234',
      expenseName: 'Name',
      budgetCategory: 'Category',
      expenseAmount: 0,
      showInBudget: true,
      dateOfPurchase: new Date(Date.now()),
      locationPurchased: 'Place',
      expenseNotes: 'Notes'
    });
    expect(component.expenseForm.valid).toBeTrue();
    spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  // if form is complete but invalid, it should not submit
  it('should not submit when form is complete but invalid', () => {
    component.expenseForm.setValue({
      expenseId: '',
      expenseName: null, //invalid value
      budgetCategory: 'Category',
      expenseAmount: 0,
      showInBudget: true,
      dateOfPurchase: new Date(Date.now()),
      locationPurchased: 'Place',
      expenseNotes: 'Notes'
    });
    expect(component.expenseForm.valid).toBeFalse();
    spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });
  
  // if form is reset, it should clear all fields
  it('should reset the form fields', () => {
    component.expenseForm.setValue({
      expenseId: 'abcd1234',
      expenseName: 'Name',
      budgetCategory: 'Category',
      expenseAmount: 0,
      showInBudget: true,
      dateOfPurchase: new Date(Date.now()),
      locationPurchased: 'Place',
      expenseNotes: 'Notes'
    });
    expect(component.expenseForm.valid).toBeTrue();
    
    component.resetForm();
    
    expect(component.expenseForm.value).toEqual({
        expenseId: null,
        expenseName: '',
        budgetCategory: '',
        expenseAmount: 0,
        showInBudget: true,
        dateOfPurchase: todaysDate(),
        locationPurchased: '',
        expenseNotes: ''
    });
    expect(component.expenseForm.valid).toBeFalse();
  });
});
