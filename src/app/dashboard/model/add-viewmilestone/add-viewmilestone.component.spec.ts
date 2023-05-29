import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViewmilestoneComponent } from './add-viewmilestone.component';

describe('AddViewmilestoneComponent', () => {
  let component: AddViewmilestoneComponent;
  let fixture: ComponentFixture<AddViewmilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddViewmilestoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddViewmilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
