import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeFormComponent } from './income-form.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('IncomeFormComponent', () => {
  let component: IncomeFormComponent;
  let fixture: ComponentFixture<IncomeFormComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      imports: [
        IncomeFormComponent,
        CommonModule, 
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
