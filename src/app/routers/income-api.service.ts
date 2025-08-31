import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { IIncomeItem } from '../models/income-item.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeApiService {

  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getIncomes(): Observable<IIncomeItem[]> {
    return this.http.get<any[]>(`${this.apiUrl}/incomes/`).pipe(
      map((incomes: any[]) => incomes.map(income => this.convertToIncomeItem(income)))
    );
  }

  addIncome(income: IIncomeItem) {
    const formattedIncome = this.convertToDatabaseFormat(income);
    return this.http.post(`${this.apiUrl}/incomes/`, formattedIncome);
  } 

  convertToDatabaseFormat(income: IIncomeItem): any {
    return {
      id: income.incomeId,
      income_name: income.incomeName,
      amount: income.incomeAmount,
      received_date: income.incomeDate,
      source: income.incomeSource,
      notes: income.incomeNotes
    };
  }

  convertToIncomeItem(data: any): IIncomeItem {
    return {
      incomeId: data.id,
      incomeName: data.income_name,
      incomeAmount: data.amount,
      incomeDate: data.received_date,
      incomeSource: data.source,
      incomeNotes: data.notes
    };
  }
}
