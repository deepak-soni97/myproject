import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProfileEditPageComponent } from './teacher-profile-edit-page.component';

describe('TeacherProfileEditPageComponent', () => {
  let component: TeacherProfileEditPageComponent;
  let fixture: ComponentFixture<TeacherProfileEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherProfileEditPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProfileEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
