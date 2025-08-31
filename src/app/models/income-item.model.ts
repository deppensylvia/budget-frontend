export interface IIncomeItem {
    incomeId: string;
    incomeName: string;
    incomeAmount: number;
    incomeDate: Date;
    incomeSource: string;
    incomeNotes?: string;
}
