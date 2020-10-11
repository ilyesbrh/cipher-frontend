import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimelineComponent } from './add-timeline.component';

describe('AddTimelineComponent', () => {
  let component: AddTimelineComponent;
  let fixture: ComponentFixture<AddTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
