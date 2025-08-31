import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { todaysDate } from '../../../../utils/shared';

import { IExpenseItem } from '../../../../models/expense-item.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BudgetService } from '../../../budget/services/budget.service';
import { ExpenseService } from '../../services/expense.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

interface IExpenseFormData {
  expenseId?: string | null; 
  expenseName: string;
  budgetCategory: string;
  expenseAmount: number;  
  showInBudget: boolean;
  dateOfPurchase: string | Date; 
  locationPurchased: string;
  expenseNotes?: string;
}

@Component({
  selector: 'app-expense-form',
  providers: [provideNativeDateAdapter()],
  imports: [ 
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule, 
  ],
  changeDetection: ChangeDetectionStrategy.OnPush, //needed for datepicker to work properly
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})

export class ExpenseFormComponent implements OnInit {

  budgetCategories: string[] = [];
  expenseForm!: FormGroup;

  ngOnInit(): void {
    this.budgetCategories = this.budgetService.getBudgetCategories(); 
  }

  private readonly formBuilder = new FormBuilder;    
  private readonly budgetService = new BudgetService;
  private readonly expenseService = new ExpenseService();
  private readonly dialogRef: MatDialogRef<ExpenseFormComponent>;
  constructor(
    budgetService: BudgetService,
    formBuilder: FormBuilder,
    dialogRef: MatDialogRef<ExpenseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IExpenseItem) { 
    this.dialogRef = dialogRef;
    this.budgetService = budgetService;
    this.formBuilder = formBuilder;
    this.setForm(data);
  }

  setForm(payload?: IExpenseFormData) {
    if(payload) {  
       this.expenseForm = this.formBuilder.group({
        expenseId: [payload.expenseId],
        expenseName: [payload.expenseName, Validators.required],
        budgetCategory: [payload.budgetCategory, Validators.required],
        expenseAmount: [payload.expenseAmount, Validators.required],
        showInBudget: [payload.showInBudget],
        dateOfPurchase: [payload.dateOfPurchase, Validators.required],
        locationPurchased: [payload.locationPurchased, Validators.required],
        expenseNotes: [payload.expenseNotes]
      });
    } else {
      this.expenseForm = this.formBuilder.group({
        expenseId: [crypto.randomUUID()],
        expenseName: ['', Validators.required],
        budgetCategory: ['', Validators.required],
        expenseAmount: [0, Validators.required],
        showInBudget: [true],
        dateOfPurchase: [todaysDate(), Validators.required],
        locationPurchased: ['', Validators.required],
        expenseNotes: ['']
      });
    }
  }

  resetForm() {
    this.expenseForm.reset({
        expenseId: null,
        expenseName: '',
        budgetCategory: '',
        expenseAmount: 0,
        showInBudget: true,
        dateOfPurchase: todaysDate(),
        locationPurchased: '',
        expenseNotes: ''
    });
    this.expenseForm.markAsPristine();
  }

  onSubmit() {
    if (!this.expenseForm.valid) {
    // Do not close dialog if form is invalid
    return;
    }

    // Pass form data back to the caller
    this.dialogRef.close(this.expenseForm.value as IExpenseFormData);

    // Call expense service to save the expense
    console.log("Saving expense:", this.expenseForm.value);
    this.expenseService.saveExpense(this.expenseForm.value as IExpenseItem);

    // Reset the form after submission
    this.resetForm();
  }

  onCancel() {
    this.resetForm();
    this.dialogRef.close();
    console.log("Expense entry cancelled.");
  }
}