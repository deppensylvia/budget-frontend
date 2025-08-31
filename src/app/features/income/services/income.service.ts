import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IIncomeItem } from '../../../models/income-item.model';
import { IncomeApiService } from '../../../routers/income-api.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeService implements OnInit {

  private incomeListSubject = new BehaviorSubject<IIncomeItem[]>([]);
  incomeList$: Observable<IIncomeItem[]> = this.incomeListSubject.asObservable();

  ngOnInit(): void {
    console.log("IncomeService initialized.");
    this.loadIncomes();
  }

  constructor(private api: IncomeApiService) { }

  loadIncomes() {
    this.api.getIncomes().subscribe(incomes => {
      this.incomeListSubject.next(incomes);
    });
  }

  updateIncomes(incomes: IIncomeItem[]) {
    this.incomeListSubject.next(incomes);
    console.log("Income list updated in service.");
  }
}
