import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprojectDialogComponent } from './editproject-dialog.component';

describe('EditprojectDialogComponent', () => {
  let component: EditprojectDialogComponent;
  let fixture: ComponentFixture<EditprojectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditprojectDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditprojectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
