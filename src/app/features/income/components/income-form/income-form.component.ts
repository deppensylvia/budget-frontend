import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { IIncomeItem } from '../../../../models/income-item.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDateToString } from '../../../../utils/shared';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';

interface IIncomeFormData {
    incomeId?: string | null;
    incomeName: string;
    incomeAmount: number;
    incomeDate: string | Date;
    incomeSource: string;
    incomeNotes?: string;
}

@Component({
  selector: 'app-income-form',
  providers: [provideNativeDateAdapter()],
  imports: [ 
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule, 
    MatLabel
  ],
  changeDetection: ChangeDetectionStrategy.OnPush, //needed for datepicker to work properly
  templateUrl: './income-form.component.html',
  styleUrl: './income-form.component.scss'
})
export class IncomeFormComponent {

  incomeForm! : FormGroup;

  private formBuilder = new FormBuilder;
  private dialogRef: MatDialogRef<IncomeFormComponent>;
  constructor(
    formBuilder: FormBuilder,
    dialogRef: MatDialogRef<IncomeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IIncomeItem) { 
    this.dialogRef = dialogRef;
    this.formBuilder = formBuilder;
    this.setForm(data);
  }

  setForm(payload?: any) {
    if(payload) {  
       this.incomeForm = this.formBuilder.group({
        incomeName: [payload.incomeName, Validators.required],
        incomeAmount: [payload.incomeAmount, Validators.required],
        incomeDate: [payload.incomeDate, Validators.required],
        incomeSource: [payload.incomeSource, Validators.required],
        incomeNotes: [payload.incomeNotes]
      });
    } else {
      this.incomeForm = this.formBuilder.group({
        incomeName: ['', Validators.required],
        incomeAmount: [0, Validators.required],
        incomeDate: [new Date(Date.now()), Validators.required],
        incomeSource: ['', Validators.required],
        incomeNotes: ['']
      });
    }
  }
 
  resetForm() {
    this.incomeForm.reset({
      incomeId: null,
      incomeName: "",
      incomeAmount: 0,
      incomeDate: formatDateToString(new Date(Date.now())),
      incomeSource: "",
      incomeNotes: ""
    });
    this.incomeForm.markAsPristine();
  }

    onSubmit() {
      if (!this.incomeForm.valid) {
      // Do not close dialog if form is invalid
      return;
      }
      
      // Pass form data back to the caller
      this.dialogRef.close(this.incomeForm.value as IIncomeFormData);
  
      // Reset the form after submission
      this.resetForm();
    }
    
    onCancel() {
      this.resetForm();
      this.dialogRef.close();
      console.log("Income entry cancelled.");
    }
}
