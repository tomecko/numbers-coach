import { Component, OnInit, NgZone } from '@angular/core';

import { ConfigService } from './../services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  constructor(
    public configService: ConfigService,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.updateVoices();
    this.watchVoices();
  }

  get config() {
    return this.configService.config;
  }

  get available() {
    return ConfigService.available;
  }

  updateVoices() {
    this.configService.updateVoices(speechSynthesis.getVoices());
  }

  watchVoices() {
    speechSynthesis.onvoiceschanged = () => {
      this.ngZone.run(() => {
        this.updateVoices();
      });
    };
  }

  formatVoiceRate(value: number): string {
    return {
      0.7: 'very slow',
      0.85: 'slow',
      1: 'normal',
      1.15: 'fast',
      1.3: 'very fast',
    }[value] || String(value);
  }

}
