import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditinvoiceDialogComponent } from './editinvoice-dialog.component';

describe('EditinvoiceDialogComponent', () => {
  let component: EditinvoiceDialogComponent;
  let fixture: ComponentFixture<EditinvoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditinvoiceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditinvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
