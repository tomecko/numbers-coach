import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

import { ConfigService } from './../services/config.service';

interface Challenge {
  correct?: boolean;
  revealed?: boolean;
  text: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.sass']
})
export class QuizComponent implements AfterViewInit {
  static CHALLENGES_COUNT = 5;

  @ViewChild('answerInput', { static: false }) answerInput: ElementRef;

  challenges: Challenge[];
  currentChallengeIndex: number;
  challengesCompleted = false;
  appIsStable: boolean;

  answer: string;

  constructor(
    private configService: ConfigService,
  ) {
    this.setupChallenges();
  }

  ngAfterViewInit() {
    this.play();
  }

  get challengesInfo() {
    return ({
      all: this.challenges.length,
      correct: this.challenges.filter(({ correct }) => correct).length,
    });
  }

  get currentChallenge() {
    return this.challenges[this.currentChallengeIndex];
  }

  play() {
    const text = this.challenges[this.currentChallengeIndex].text;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.configService.config.voice;
    utterance.rate = this.configService.config.voiceRate;
    speechSynthesis.speak(utterance);
    this.focusAnswerInput();
  }

  setupChallenges() {
    this.challenges = [...Array(QuizComponent.CHALLENGES_COUNT)]
      .map(_ => ({
        text: String(Math.floor(Math.random() * (this.configService.config.range + 1))),
      }));
    this.currentChallengeIndex = 0;
    this.challengesCompleted = false;
    this.focusAnswerInput();
  }

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
      this.move();
    } else {
      this.reveal();
    }
  }

  move() {
    this.currentChallenge.correct = String(this.answer) === this.currentChallenge.text;
    this.currentChallengeIndex = this.currentChallengeIndex + 1;
    this.answer = undefined;
    if (this.currentChallengeIndex >= QuizComponent.CHALLENGES_COUNT) {
      this.challengesCompleted = true;
    } else {
      this.play();
    }
  }

  reveal() {
    this.currentChallenge.revealed = true;
  }

  @HostListener('document:keydown.enter')
  onEnter() {
    if (this.currentChallenge && this.currentChallenge.revealed) {
      this.move();
    } else if (this.challengesCompleted) {
      this.restart();
    }
  }

  restart() {
    this.setupChallenges();
    this.play();
  }
}
