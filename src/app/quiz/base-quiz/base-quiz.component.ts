import { HostListener } from '@angular/core';

import { ConfigService } from './../../services/config.service';

export interface Challenge {
  correct?: boolean;
  revealed?: boolean;
  text: string;
}

export class BaseQuizComponent {
  static SIGNIFICANT_DIGITS = 4;

  challenges: Challenge[];
  currentChallengeIndex: number;
  challengesCompleted = false;

  constructor(
    protected configService: ConfigService,
  ) {
    this.setupChallenges();
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

  setupChallenges() {
    this.challenges = [...Array(this.configService.config.batch)]
      .map(_ => Math.floor(Math.random() * (this.configService.config.range + 1)))
      .map(number => {
        const length = number.toString().length;
        const significantDigitsToSimplify = length - BaseQuizComponent.SIGNIFICANT_DIGITS;
        if (significantDigitsToSimplify > 0) {
          const simplifyingFactor = Math.pow(10, significantDigitsToSimplify);
          return Math.round(number / simplifyingFactor) * simplifyingFactor;
        }
        return number;
      })
      .map(number => ({
        text: String(number),
      }));
    this.currentChallengeIndex = 0;
    this.challengesCompleted = false;
    this.onChallengeInit();
  }

  @HostListener('document:keydown.p')
  play() {
    speechSynthesis.cancel();
    const text = this.challenges[this.currentChallengeIndex].text;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.configService.config.voice;
    utterance.lang = this.configService.config.voice.lang;
    utterance.rate = this.configService.config.voiceRate;
    speechSynthesis.speak(utterance);
  }

  next() {
    this.currentChallengeIndex = this.currentChallengeIndex + 1;
    if (this.currentChallengeIndex >= this.configService.config.batch) {
      this.challengesCompleted = true;
    } else {
      this.onChallengeInit();
    }
  }

  onChallengeInit() {
  }

}
