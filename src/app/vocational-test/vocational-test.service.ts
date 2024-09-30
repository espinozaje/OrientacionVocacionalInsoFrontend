import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../authentication/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class VocationalTestService {
  private apiUrl = 'https://orientacionvocacionalinsoapi-production.up.railway.app/api/v1/vocational-test';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions`);
  }

  submitTest(test: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/submit`, test);
  }
}