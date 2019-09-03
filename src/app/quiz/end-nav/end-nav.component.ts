import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-end-nav',
  templateUrl: './end-nav.component.html',
  styleUrls: ['./end-nav.component.sass']
})
export class EndNavComponent {

  @Output() restart = new EventEmitter();

}
