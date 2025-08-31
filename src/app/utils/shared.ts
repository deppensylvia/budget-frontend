import { formatDate } from '@angular/common';

export const formatDateToString = (myDate: Date) => formatDate(myDate, 'yyyy-MM-dd', 'en-US');

export const todaysDate = (): string => {
  const today = new Date();
  return formatDateToString(today);
}