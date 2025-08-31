import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IIncomeItem } from '../../../../models/income-item.model';
import { IncomeFormComponent } from '../income-form/income-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-income-list',
  imports: [ 
    CommonModule, 
    MatButtonModule, 
    MatIconModule 
  ],
  templateUrl: './income-list.component.html',
  styleUrl: './income-list.component.scss'
})
export class IncomeListComponent {
  @Input() incomeList$!: Observable<IIncomeItem[]>;
  @Output() incomeChange = new EventEmitter<IIncomeItem[]>();

  constructor(private dialog: MatDialog) {}
  
  openIncomesForm(income: IIncomeItem, index: number) {
    const dialogRef = this.dialog.open(IncomeFormComponent, {
      width: '600px',
      data: income
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Income updated.");
        this.editIncome(result, index);
      }
    });
  }

  deleteIncome(index: number) {
     if (window.confirm('Are you sure you want to delete this module? This action cannot be undone.')) {
        this.incomeList$.pipe(take(1)).subscribe(incomeList => {
          const updatedList = incomeList.filter((_, i) => i !== index);
          this.incomeChange.emit(updatedList);
        });
        console.log('Income item deleted.');
      } else {
        console.log('Income item deletion cancelled.');
      }
    
  }

  editIncome(updatedIncome: IIncomeItem, index: number) {
    this.incomeList$.pipe(take(1)).subscribe(incomeList => {
      const updatedList = incomeList.map((item, i) =>
        i === index ? updatedIncome : item
      );
      this.incomeChange.emit(updatedList);
    });
  }
}
