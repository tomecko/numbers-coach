
import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

import { BaseQuizComponent } from '../base-quiz/base-quiz.component';

@Component({
  selector: 'app-input-quiz',
  templateUrl: './input-quiz.component.html',
  styleUrls: ['./input-quiz.component.sass']
})
export class InputQuizComponent extends BaseQuizComponent {

  @ViewChild('answerInput', { static: false }) answerInput: ElementRef;

  answer: string;

  focusAnswerInput() {
    setTimeout(() => {
      if (this.answerInput) {
        this.answerInput.nativeElement.focus();
      }
    }, 0);
  }

  submit(event) {
    event.stopPropagation();
    if (this.currentChallenge.revealed) {
      this.next();
    } else {
      this.reveal();
    }
  }

  next() {
    this.currentChallenge.correct = String(this.answer) === this.currentChallenge.text;
    this.answer = undefined;
    super.next();
  }

  reveal() {
    this.currentChallenge.revealed = true;
  }

  @HostListener('document:keydown.enter')
  @HostListener('document:click')
  onEnter() {
    if (this.currentChallenge && this.currentChallenge.revealed) {
      this.next();
    } else if (this.challengesCompleted) {
      this.setupChallenges();
    }
  }

  onChallengeInit() {
    this.focusAnswerInput();
    this.play();
  }
}
