import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor() { }

  getBudgetCategories(): string[] {
    return [
    "Bills",
    "Food",
    "Car",
    "Pet",
    "Home",
    "Body",
    "Other",
    "Multi"
    ];
  }
}
