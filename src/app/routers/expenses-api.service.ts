import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { IExpenseItem } from '../models/expense-item.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<IExpenseItem[]> {
    return this.http.get<any[]>(`${this.apiUrl}/expenses/`).pipe(
      map((expenses: any[]) => expenses.map(expense => this.convertToExpenseItem(expense)))
    );
  }

  addExpense(expense: IExpenseItem) {
    const formattedExpense = this.convertToDatabaseFormat(expense);
    console.log("Adding expense:", formattedExpense);
    return this.http.post(`${this.apiUrl}/expenses/`, formattedExpense);
  } 

  editExpense(expense: IExpenseItem) {
    const formattedExpense = this.convertToDatabaseFormat(expense);
    console.log("Editing expense:", formattedExpense);
    return this.http.put(`${this.apiUrl}/expenses/${expense.expenseId}`, formattedExpense
    );
  }

  deleteExpense(expenseId: string) {
    console.log("Deleting expense with ID:", expenseId);
    return this.http.delete(`${this.apiUrl}/expenses/${expenseId}`);
  }

  convertToDatabaseFormat(expense: IExpenseItem): any {
    return {
      id: expense.expenseId,
      expense_name: expense.expenseName,
      category: expense.budgetCategory,
      cost: expense.expenseAmount,
      show_in_budget: expense.showInBudget,
      purchase_date: expense.dateOfPurchase,
      purchase_source: expense.locationPurchased,
      notes: expense.expenseNotes
    };
  }

  convertToExpenseItem(data: any): IExpenseItem {
    return {
      expenseId: data.id,
      expenseName: data.expense_name,
      budgetCategory: data.category,
      expenseAmount: data.cost,
      showInBudget: data.show_in_budget,
      dateOfPurchase: data.purchase_date,
      locationPurchased: data.purchase_source,
      expenseNotes: data.notes
    };
  }
}
