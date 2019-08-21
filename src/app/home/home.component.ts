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
    this.watchVoices();
  }

  get config() {
    return this.configService.config;
  }

  get available() {
    return ConfigService.available;
  }

  watchVoices() {
    speechSynthesis.onvoiceschanged = () => {
      this.ngZone.run(() => {
        this.configService.updateVoices(speechSynthesis.getVoices());
      });
    };
  }

  formatVoiceRate(value: number): string {
    return {
      0.75: 'slow',
      1: 'normal',
      1.25: 'fast',
    }[value] || String(value);
  }

}
