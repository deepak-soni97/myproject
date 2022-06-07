import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsCardComponent } from './topics-card.component';

describe('TopicsCardComponent', () => {
  let component: TopicsCardComponent;
  let fixture: ComponentFixture<TopicsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
