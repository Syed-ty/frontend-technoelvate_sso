import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditViewmilestoneComponent } from './edit-viewmilestone.component';

describe('EditViewmilestoneComponent', () => {
  let component: EditViewmilestoneComponent;
  let fixture: ComponentFixture<EditViewmilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditViewmilestoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditViewmilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
