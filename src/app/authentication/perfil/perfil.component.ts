import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule], //importa modulos necesarios
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  user: any;  //se define la propiedad que almacenara la informacion del usuario
  errorMessage: string | null = null; //propiedad para almacenar mensajes de error

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {} //inyecta las dependecias necesarias

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id'); //obtiene el id del usuario de los parametros de la ruta
    if (userId) {
      this.loadUser(userId); //si se encuentra ID llama al metodo loadUser para cargar los datos del usuario
    }
  }

  loadUser(id: string): void {
    this.http.get<any>(`https://orientacionvocacionalinsoapi-production.up.railway.app/api/v1/auth/obtener/${id}`)  //realiza ls solicitud a la API y espera un objeto del tipo any
      .subscribe(  //maneja la respues de la solicitud si tiene exito asigna el usuario a la propiedad user sino si hay error lo registra en la consola
        user => this.user = user,
        error => console.error('Error al cargar usuario:', error)
      );
  }

  updateUser(): void {
    this.http.put(`https://orientacionvocacionalinsoapi-production.up.railway.app/api/v1/auth/update/${this.user.id}`, this.user, { responseType: 'text' })
      .subscribe(
        response => {
          console.log('Usuario actualizado:', response);
          this.router.navigate(['/pageprincipal']);
        },
        error => {
          console.error('Error al actualizar el usuario:', error);
          this.errorMessage = 'Error al actualizar el perfil.';
        }
      );
  }
}