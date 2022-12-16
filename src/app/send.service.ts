import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class SendService {

  url:string="http://localhost:3000/tweetList/";
 
  constructor(private http: HttpClient) {
  }
 

  postMessage(message: Message): Observable<Message> {
    const headers = { 'content-type': 'application/json'};  
    const body=JSON.stringify(Message);
    return this.http.post<Message>(this.url, body, {'headers':headers});
  }
}
