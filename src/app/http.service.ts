import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  testData: any[] = [];
  constructor(private http: HttpClient) { }
  
  getData() {
    return this.http.get('http://xapi.ngminds.com/getQuizData')
  }
}
