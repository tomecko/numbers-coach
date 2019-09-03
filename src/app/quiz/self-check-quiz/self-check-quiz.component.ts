import { Component, HostListener } from '@angular/core';

import { BaseQuizComponent } from './../base-quiz/base-quiz.component';

@Component({
  selector: 'app-self-check-quiz',
  templateUrl: './self-check-quiz.component.html',
  styleUrls: ['./self-check-quiz.component.sass']
})
export class SelfCheckQuizComponent extends BaseQuizComponent {

  @HostListener('document:keydown.enter')
  @HostListener('document:keydown.n')
  onEnter() {
    if (this.challengesCompleted) {
      this.setupChallenges();
    } else {
      this.next();
    }
  }

}
