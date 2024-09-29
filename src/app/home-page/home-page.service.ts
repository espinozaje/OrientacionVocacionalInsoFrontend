import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ubicacion } from '../authentication/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  private apiUrl = 'http://localhost:8080/api/v1/carreras'; 

  constructor(private http: HttpClient) { }

  getCareersByLocation(locationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/porubicacion/${locationId}`);
  }

  obtenerUbicaciones(): Observable<Ubicacion[]> {
    return this.http.get<Ubicacion[]>(`${this.apiUrl}/mostrarubicaciones`);
  }
}
