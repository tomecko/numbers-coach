import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Challenge } from '../base-quiz/base-quiz.component';

@Component({
  selector: 'app-main-action',
  templateUrl: './main-action.component.html',
  styleUrls: ['./main-action.component.sass']
})
export class MainActionComponent {

  @Input() challenge: Challenge;
  @Input() icon: string;
  @Input() text: string;
  @Output() clicked = new EventEmitter<boolean>();

}
