import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IExpenseItem } from '../../../models/expense-item.model';
import { ExpensesApiService } from '../../../routers/expenses-api.service';

@Injectable({
  providedIn: 'root'
})

export class ExpenseService {
  private readonly expenseListSubject = new BehaviorSubject<IExpenseItem[]>([]);
  expenseList$: Observable<IExpenseItem[]> = this.expenseListSubject.asObservable();
  private readonly api = inject(ExpensesApiService);

  constructor() {
    console.log("ExpenseService initialized.");
    this.loadExpenses();
  }

  getExpenseList(): Observable<IExpenseItem[]> {
    return this.expenseList$;
  }

  loadExpenses() {
    this.api.getExpenses().subscribe(expenses => {
      this.expenseListSubject.next(expenses);
    });
    console.log("Expenses loaded from API.");
  }

  updateExpenses(expenses: IExpenseItem[]) {
    this.expenseListSubject.next(expenses);
    console.log("Expense list updated in service.");
  }

  saveExpense(expense: IExpenseItem) {
    this.api.addExpense(expense).subscribe(() => {
      this.loadExpenses(); // Reload expenses after saving
    });
  }

  deleteExpense(expenseId: string, expenseList: IExpenseItem[], index: number) {
    this.api.deleteExpense(expenseId).subscribe({
      next: () => {
        const updatedList = expenseList.filter((_, i) => i !== index);
        console.log('Expense item deleted.');
        return updatedList;
      },
      error: err => {
        console.error('Failed to delete expense:', err);
      }
    });
  }

  editedExpense(updatedExpense: IExpenseItem) {
    this.api.editExpense(updatedExpense).subscribe({
      next: () => {
          this.loadExpenses(); 
          console.log('Expense list reloaded and updated after edit.');
      },
      error: err => {
      console.error('Failed to update expense:', err);
      }
    });
  }
}