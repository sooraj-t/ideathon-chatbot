import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  @Input('messages')
  messages: Message[];
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.messages, "second cmt")
  }



}
