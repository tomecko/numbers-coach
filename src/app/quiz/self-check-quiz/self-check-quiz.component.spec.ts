import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfCheckQuizComponent } from './self-check-quiz.component';

xdescribe('SelfCheckQuizComponent', () => {
  let component: SelfCheckQuizComponent;
  let fixture: ComponentFixture<SelfCheckQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfCheckQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfCheckQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
