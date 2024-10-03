import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Asesor, User } from '../models/question.model';
import { response } from 'express';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://orientacionvocacionalinsoapi-production.up.railway.app/api/v1/auth'; 
  private tokenKey = 'authToken';
  private apiUrlAsesor = 'https://orientacionvocacionalinsoapi-production.up.railway.app/api/v1/asesores'; 
  constructor(private http: HttpClient, private router: Router) { }


  forgotPassword(email: string) {
    const body = new HttpParams().set('email', email);
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post(`${this.apiUrl}/forgot-password`, body.toString(), { headers })
        .pipe(
            map((response: any) => {
              
                return response;
            }),
            catchError((error: any) => {
               
                console.error('Error en forgotPassword:', error);
                return throwError(() => new Error(error.error?.error || 'Hubo un error al enviar el correo. Verifique el correo que sea válido'));
            })
        );
}

resetPassword(token: string, newPassword: string) {
  const body = new HttpParams()
      .set('token', token)
      .set('newPassword', newPassword);

  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  return this.http.post(`${this.apiUrl}/reset-password`, body.toString(), { headers })
      .pipe(map((response: any) => response));
}

obtenerPerfil() {
  const token = localStorage.getItem('token');
  console.log('Token:', token); // Obtiene el token
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}` // Añade el token en el header
  });

  return this.http.get<Asesor>(`${this.apiUrlAsesor}/perfil`, { headers });
}


login(email: string, password: string, callback: (token: string) => void): Observable<any> {
  // Construimos los parámetros de la URL manualmente
  const params = new HttpParams()
    .set('email', email)
    .set('password', password);
  
  return this.http.post<any>(`${this.apiUrl}/login`, null, { params }).pipe(
    tap(response => {
      if (response.token) {
        console.log(response.token);
        this.setToken(response.token);
        callback(response.token);
      }
    })
  );
}

private setToken(token:string):void{
  localStorage.setItem(this.tokenKey, token);
}

private getToken(): string | null{
  if(typeof window!== 'undefined'){
    return localStorage.getItem(this.tokenKey);
  }else{
    return null;
  }
}


isAuthenticated(): boolean{
  const token = this.getToken();
  if(!token){
    return false;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload.exp * 1000;
  return Date.now() < exp;
}

logout(): void{
  localStorage.removeItem(this.tokenKey);
  this.router.navigate(['/login']);
}

getUserInfo(): Observable<User> {
  const token = this.getToken();  // Obtiene el token del localStorage
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get<User>(`${this.apiUrl}/me`, { headers });
}


updateUserProfile(userData: any): Observable<User> {
  const token = this.getToken(); // Obtiene el token del localStorage
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.put<User>(`${this.apiUrl}/update`, userData, { headers });
}
}
