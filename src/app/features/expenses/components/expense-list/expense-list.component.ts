import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IExpenseItem } from '../../../../models/expense-item.model';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExpenseItemComponent } from '../expense-item/expense-item.component';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  imports: [ 
    CommonModule, 
    MatButtonModule, 
    MatIconModule, 
    ExpenseItemComponent
  ],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent {
  @Input() expenseList$!: Observable<IExpenseItem[]>;
  @Output() expenseChange = new EventEmitter<IExpenseItem[]>();

  constructor(
    private readonly dialog: MatDialog,
    private readonly expenseService: ExpenseService
  ) {}
  
  openExpenseForm(expense: IExpenseItem) {
    const dialogRef = this.dialog.open(ExpenseFormComponent, {
      width: '600px',
      data: expense
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editExpense(result);
      }
    });
  }

  deleteExpense(index: number) {
    if (window.confirm('Are you sure you want to delete this expense item? This action cannot be undone.')) {
      this.expenseList$.pipe(take(1)).subscribe(expenseList => {
        const expenseToDelete = expenseList[index];
        this.expenseService.deleteExpense(expenseToDelete.expenseId, expenseList, index);
        this.expenseService.loadExpenses();
      });
      console.log('Expense item deleted.');
      } else {
        console.log('Expense item deletion cancelled.');
      }
    
  }

  editExpense(updatedExpense: IExpenseItem) {
    this.expenseService.editedExpense(updatedExpense);
  }
}