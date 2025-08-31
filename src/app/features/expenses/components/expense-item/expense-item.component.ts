import { Component, Input } from '@angular/core';
import { IExpenseItem } from '../../../../models/expense-item.model';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-expense-item',
  imports: [ 
    CommonModule, 
    MatExpansionModule, 
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './expense-item.component.html',
  styleUrl: './expense-item.component.scss'
})
export class ExpenseItemComponent {
   @Input() expense!: IExpenseItem; 
   showNotes = false;

   toggleNotes() {
     this.showNotes = !this.showNotes;
   }
}
