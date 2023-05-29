import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViewresourceComponent } from './add-viewresource.component';

describe('AddViewresourceComponent', () => {
  let component: AddViewresourceComponent;
  let fixture: ComponentFixture<AddViewresourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddViewresourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddViewresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
