import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicContributePageComponent } from './topic-contribute-page.component';

describe('TopicContributePageComponent', () => {
  let component: TopicContributePageComponent;
  let fixture: ComponentFixture<TopicContributePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicContributePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicContributePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
