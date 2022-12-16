import { Component } from '@angular/core';
import { Message } from './message';
import { MessageFormComponent } from './message-form/message-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
title = 'IdeathonFE';
messages: Message[];
}
