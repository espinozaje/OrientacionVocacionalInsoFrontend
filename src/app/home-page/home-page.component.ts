import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomePageService } from './home-page.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Carrera, Ubicacion } from '../authentication/models/question.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ ReactiveFormsModule,FormsModule,CommonModule, HttpClientModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})      
export class HomePageComponent implements OnInit {
  ubicaciones: any[] = []; //declara como arreglo vacio que se almacenara la lista de ubicaciones recuperadas desde la api
  carreras: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUbicaciones();
  }

  loadUbicaciones(): void {
    this.http.get<any[]>('https://orientacionvocacionalinsoapi-production.up.railway.app/api/v1/carreras/mostrarubicaciones')
      .subscribe(ubicaciones => this.ubicaciones = ubicaciones);
  }

  onUbicacionChange(event: Event): void {
    const target = event.target as HTMLSelectElement; //castea el evento para obtener el objetivo como un elemento tipo HTMLSelectElemnt
    const ubicacionId = target.value; //obtiene el valor seleccionado en este cado el id de la ubi
    if (ubicacionId) { //si hay un id se realiza la solicitud
      this.http.get<any[]>(`https://orientacionvocacionalinsoapi-production.up.railway.app/api/v1/carreras/porubicacion/${ubicacionId}`)
        .subscribe(carreras => this.carreras = carreras);
    }
  }
}
