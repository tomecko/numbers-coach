import { Injectable } from '@angular/core';

import {
  LocalStorageKey,
  LocalStorageService,
} from './local-storage.service';

interface Config {
  range: number;
  voiceName: string | undefined;
  voiceRate: number;
}

interface Available {
  ranges: number[];
  voiceRates: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static STORAGE_KEY: LocalStorageKey = 'config';

  static available: Available = {
    ranges: [9, 99, 999, 9999, 99999],
    voiceRates: [0.8, 1, 1.2],
  };

  public voices: SpeechSynthesisVoice[] = [];

  private _config = {
    range: 99,
    voiceName: undefined,
    voiceRate: 1,
  };

  constructor(
    private localStorage: LocalStorageService,
  ) {
    const storedConfig = localStorage.get(ConfigService.STORAGE_KEY);
    if (storedConfig) {
      this._config = localStorage.get(ConfigService.STORAGE_KEY) as Config;
    }
  }

  get config() {
    return ({
      ...this._config,
      voice: this.voices.find(({ name }) => name === this._config.voiceName),
    });
  }

  update(partial: Partial<Config>) {
    this._config = { ...this._config, ...partial };
    this.perist();
  }

  updateVoices(voices: SpeechSynthesisVoice[]) {
    this.voices = voices;
    const defaultVoice = this.voices.find(({ default: isDefault }) => isDefault);
    if (!this.config.voice && !this.config.voiceName) {
      if (defaultVoice) {
        this._config.voiceName = defaultVoice.name;
      }
      if (this.voices.length > 0) {
        this._config.voiceName = this.voices[0].name;
      }
    }
    this.perist();
  }

  perist() {
    this.localStorage.persist(ConfigService.STORAGE_KEY, this.config);
  }

}
