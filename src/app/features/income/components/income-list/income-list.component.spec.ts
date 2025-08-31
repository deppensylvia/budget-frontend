import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeListComponent } from './income-list.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('IncomeListComponent', () => {
  let component: IncomeListComponent;
  let fixture: ComponentFixture<IncomeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IncomeListComponent,
        CommonModule, 
        MatButtonModule, 
        MatIconModule 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
