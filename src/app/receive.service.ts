import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from './message';
import fetch from 'node-fetch';
import { Observable,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReceiveService {

  constructor(private http: HttpClient) { }
 baseUrl: string = "http://localhost:3000/";
  
  getMessage():Observable<Message>{

   /*try{
      const response = fetch('http://localhost:3000/response', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      console.log(response.json())
    }
    catch(error){
      console.error(error);
    } */

    return this.http.get<Message>(this.baseUrl +  "response");
  }

  QandA(): Observable<any>{
    return this.http.get<Message>("http://localhost:5000/" +  "getAllData");

  }
}
