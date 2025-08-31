import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IIncomeItem } from '../../../../models/income-item.model';
import { MatDialog } from '@angular/material/dialog';
import { IncomeFormComponent } from '../income-form/income-form.component';
import { IncomeListComponent } from '../income-list/income-list.component';
import { IncomeService } from '../../services/income.service';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-income-tracker',
  imports: [ 
    CommonModule, 
    IncomeListComponent, 
    MatButtonModule 
  ],
  templateUrl: './income-tracker.component.html',
  styleUrl: './income-tracker.component.scss'
})
export class IncomeTrackerComponent {
  incomeYear: number = new Date().getFullYear(); 
  selectedIncome: IIncomeItem | null = null;
  incomeList$: any;

  constructor(private dialog: MatDialog, private incomeService: IncomeService) {
    this.incomeList$ = this.incomeService.incomeList$;
  }

  openIncomeItemForm(income?: IIncomeItem) {
    const dialogRef = this.dialog.open(IncomeFormComponent, {
      width: '600px',
      data: income 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onIncomeItemAdded(result);
      }
    });
  }

  onIncomeItemChange(incomeList: IIncomeItem[]) {
    this.incomeService.updateIncomes(incomeList);
  }
  
  private async onIncomeItemAdded(income: IIncomeItem) {
    const currentList = await firstValueFrom(this.incomeService.incomeList$);
    this.incomeService.updateIncomes([...currentList, income]);
  }
}
