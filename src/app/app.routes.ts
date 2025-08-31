import { Routes } from '@angular/router';
import { ExpenseTrackerComponent } from './features/expenses/components/expense-tracker/expense-tracker.component';
import { WorkInProgressComponent } from './features/work-in-progress/work-in-progress.component';
import { IncomeTrackerComponent } from './features/income/components/income-tracker/income-tracker.component';

export const routes: Routes = [
  { path: '', component: ExpenseTrackerComponent },
  { path: 'expenses', component: ExpenseTrackerComponent },
  { path: 'dashboard', component: WorkInProgressComponent },
  { path: 'income', component: IncomeTrackerComponent },
  { path: 'schedule', component: WorkInProgressComponent },
  { path: 'budget', component: WorkInProgressComponent },
  { path: 'savings', component: WorkInProgressComponent },
  { path: 'recurring', component: WorkInProgressComponent },
];
