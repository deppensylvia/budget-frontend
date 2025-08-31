export interface IExpenseItem {
    expenseId: string;
    expenseName: string;
    budgetCategory: string;
    expenseAmount: number;
    showInBudget: boolean;
    dateOfPurchase: Date;
    locationPurchased: string;
    expenseNotes?: string;
}

