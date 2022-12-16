import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LuisaiService {

  private key: string = "KEY";
  private baseURL: string = "URL";
  
  constructor(private http: HttpClient) { 
  }

  /*public getResponse(query: string) {
    var queryURL = this.baseURL + query;

    return this.http
      .get(queryURL, {headers: this.getHeaders()});
  }

  private getHeaders() {
    let headers: HttpHeaders = new Headers();
    headers.append('Ocp-Apim-Subscription-Key', this.key);
    return headers;
  }
  */
}
