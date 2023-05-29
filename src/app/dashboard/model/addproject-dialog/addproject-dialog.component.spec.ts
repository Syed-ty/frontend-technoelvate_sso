import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprojectDialogComponent } from './addproject-dialog.component';

describe('AddprojectDialogComponent', () => {
  let component: AddprojectDialogComponent;
  let fixture: ComponentFixture<AddprojectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddprojectDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddprojectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
