import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IExpenseItem } from '../../../../models/expense-item.model';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { ExpenseListComponent } from '../expense-list/expense-list.component';
import { ExpenseService } from '../../services/expense.service';
import { firstValueFrom, Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-expense-tracker',
  providers: [ExpenseService],
  imports: [ 
    CommonModule, 
    ExpenseListComponent, 
    MatButtonModule,
  ],
  templateUrl: './expense-tracker.component.html',
  styleUrl: './expense-tracker.component.scss'
})
export class ExpenseTrackerComponent { 

  expenseYear: number = new Date().getFullYear(); 
  selectedExpense: IExpenseItem | null = null;
  expenseList$: Observable<IExpenseItem[]>;

  constructor(
    private readonly dialog: MatDialog, 
    private readonly expenseService: ExpenseService, 
  ) {
     this.expenseList$ = this.expenseService.getExpenseList();
    console.log(this.expenseList$);
  }
  
  openExpenseItemForm(expense?: IExpenseItem) {
    const dialogRef = this.dialog.open(ExpenseFormComponent, {
      width: '600px',
      data: expense // pass existing item for editing, or undefined for new
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onExpensesItemAdded(result);
      }
    });
  }

  onExpensesItemChange(expensesList: IExpenseItem[]) {
    this.expenseService.updateExpenses(expensesList);
  }
  
  private async onExpensesItemAdded(expense: IExpenseItem) {
    const currentList = await firstValueFrom(this.expenseService.expenseList$);
    this.expenseService.updateExpenses([...currentList, expense]);
  }
}
