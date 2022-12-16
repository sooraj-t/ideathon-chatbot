import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {

  @Input() message: Message;
  @Input() index: number;
  
  constructor() { }

  ngOnInit(): void {
    this.message  
    console.log(this.index , "child componenet 12")
  }

  getUserClass() {
    if (this.message.user === 'Bot') {
      return {
        'botUser': true
      };
    } else {
      return {
        'userUser': true
      };
    }
  }
getImg(index){
  if (index % 2 == 0) {
    return "https://www.w3schools.com/howto/img_avatar2.png"
  }
  else {
    return "assets/bot.png"
  }
}

getEnable(index){
  if (index % 2 == 0) {
    return true
  }
  else {
    return false
  }
}
}
