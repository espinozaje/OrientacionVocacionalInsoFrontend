import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule, FormsModule, HttpClientModule, RouterLink],
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService,private http: HttpClient, private router: Router) {}



  login(): void {
    if (!this.email || !this.password) {
      console.error('Email y contraseña son requeridos');
      return;
    }
  
    this.authService.login(this.email, this.password, (token) => {
      console.log('Token recibido en el callback:', token);
    }).subscribe({
      next: () => this.router.navigate(['/pageprincipal']),
      error: (err) => {
        console.error('Login Failed', err);
        this.errorMessage = 'Error de autenticación. Por favor, revisa tus credenciales.';
      }
    });
  }
}