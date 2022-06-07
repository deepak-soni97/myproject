import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTopicPageComponent } from './search-topic-page.component';

describe('SearchTopicPageComponent', () => {
  let component: SearchTopicPageComponent;
  let fixture: ComponentFixture<SearchTopicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTopicPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTopicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
