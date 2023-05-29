import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinvoiceDialogComponent } from './addinvoice-dialog.component';

describe('AddinvoiceDialogComponent', () => {
  let component: AddinvoiceDialogComponent;
  let fixture: ComponentFixture<AddinvoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddinvoiceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddinvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
