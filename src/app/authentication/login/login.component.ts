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
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: NgForm) { //NgForm representa el formulario reactivo de angular
    if (form.valid) {  //verifica si el formulario es valido
      const { email, password } = form.value;  //desestructura los valores del formulario, extrayendo email y password del objeto form.value
      
     
      const params = new HttpParams()
        .set('email', email)
        .set('password', password);  //crea parametros para se usaran para enviar en la solicitud
  
     
      this.http.post('https://orientacionvocacionalinsoapi-production.up.railway.app/api/v1/auth/login', null, {  //realiza la solicitud, null es que no se envia el cuerpo de la solicitud ya que se envian como parametros
          params, 
          responseType: 'text'
        })
        .subscribe(
          response => {
            console.log('Login exitoso:', response);
            this.errorMessage = null;
            setTimeout(() => {
               this.router.navigate(['/pageprincipal']); //permita navegar a la ruta establecida
                }, 1000);
          },
          error => {
            console.error('Error de login:', error);
            this.errorMessage = 'Credenciales incorrectas.'; //establece un mensaje de erroe que se muestra en la interfaz
          }
        );
    }
  }
}