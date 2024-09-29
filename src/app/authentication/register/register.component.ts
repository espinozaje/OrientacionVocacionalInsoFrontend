import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, FormsModule],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorMessage: string | null = null;

  constructor(private http: HttpClient , private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { firstName, lastName, email, password } = form.value;
      const requestBody = {
        firstName,
        lastName,
        email,
        password
      };

      this.http.post('http://localhost:8080/api/v1/auth/register', requestBody)
      .subscribe(
        (response: any) => { 
          console.log('Registro exitoso:', response);
          this.errorMessage = null;
          setTimeout(() => {
            this.router.navigate(['/login']);
             }, 1000);
        },
        (error: HttpErrorResponse) => {
          console.error('Error de registro:', error);
          if (error.error) {
            this.errorMessage = error.error; 
          } else {
            this.errorMessage = 'Hubo un error al registrar el usuario.';
          }
        }
      );
    }
  }


      
}