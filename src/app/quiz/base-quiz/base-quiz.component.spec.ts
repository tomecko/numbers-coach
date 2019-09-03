import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseQuizComponent } from './base-quiz.component';

xdescribe('BaseQuizComponent', () => {
  let component: BaseQuizComponent;
  let fixture: ComponentFixture<BaseQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
