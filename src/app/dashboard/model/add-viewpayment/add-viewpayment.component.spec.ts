import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViewpaymentComponent } from './add-viewpayment.component';

describe('AddViewpaymentComponent', () => {
  let component: AddViewpaymentComponent;
  let fixture: ComponentFixture<AddViewpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddViewpaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddViewpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
