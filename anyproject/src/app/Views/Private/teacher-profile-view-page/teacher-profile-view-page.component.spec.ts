import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProfileViewPageComponent } from './teacher-profile-view-page.component';

describe('TeacherProfileViewPageComponent', () => {
  let component: TeacherProfileViewPageComponent;
  let fixture: ComponentFixture<TeacherProfileViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherProfileViewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProfileViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
