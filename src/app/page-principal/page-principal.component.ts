import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../authentication/service/auth.service';
import { User } from '../authentication/models/question.model';

@Component({
  selector: 'app-page-principal',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule, RouterOutlet, RouterLinkActive, HttpClientModule],
  templateUrl: './page-principal.component.html',
  styleUrl: './page-principal.component.scss'
})
export class PagePrincipalComponent {
  @ViewChild('sideMenu', { static: false }) sideMenu!: ElementRef;
  @ViewChild('menuBtn', { static: false }) menuBtn!: ElementRef;
  @ViewChild('closeBtn', { static: false }) closeBtn!: ElementRef;
  @ViewChild('themeToggler', { static: false }) themeToggler!: ElementRef;
  ubicaciones: any[] = []; // Arreglo vacío para almacenar las ubicaciones desde la API
  carreras: any[] = []; // Arreglo para almacenar todas las carreras
  carreraSeleccionada1: any = null; // Variable para la primera carrera seleccionada
  carreraSeleccionada2: any = null; // Variable para la segunda carrera seleccionada
  user: User | null = null;
  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCarreras(); // Cargar todas las carreras al iniciar el componente
    this.loadUbicaciones();
    this.getinfo();
    this.ngAfterViewInit();
  }

  // Método para cargar todas las carreras
  loadCarreras(): void {
    this.http.get<any[]>('https://orientacionvocacionalinsoapi-production.up.railway.app/api/v1/carreras/mostrarcarreras')
      .subscribe(carreras => this.carreras = carreras);
  }

  loadUbicaciones(): void {
    this.http.get<any[]>('https://orientacionvocacionalinsoapi-production.up.railway.app/api/v1/carreras/mostrarubicaciones')
      .subscribe(ubicaciones => this.ubicaciones = ubicaciones);
  }

  // Método para manejar el cambio de selección de la primera carrera
  onCarrera1Change(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const carreraId = target.value;
    if (carreraId) {
      this.http.get<any>(`https://orientacionvocacionalinsoapi-production.up.railway.app/api/v1/carreras/carreraporID/${carreraId}`)
        .subscribe(carrera => this.carreraSeleccionada1 = carrera); // Asignar la primera carrera seleccionada
    }
  }

  // Método para manejar el cambio de selección de la segunda carrera
  onCarrera2Change(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const carreraId = target.value;
    if (carreraId) {
      this.http.get<any>(`https://orientacionvocacionalinsoapi-production.up.railway.app/api/v1/carreras/carreraporID/${carreraId}`)
        .subscribe(carrera => this.carreraSeleccionada2 = carrera); // Asignar la segunda carrera seleccionada
    }
  }

  logout():void{ 
    
    this.authService.logout();
  }


  getinfo():void{
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user = data;  // Asigna los detalles del usuario
      },
      error: (err) => {
        console.error('Error al obtener la información del usuario', err);
      }
    });
  }


  
  ngAfterViewInit() {
    this.menuBtn.nativeElement.addEventListener('click', () => {
      this.sideMenu.nativeElement.style.display = 'block';
    });

    this.closeBtn.nativeElement.addEventListener('click', () => {
      this.sideMenu.nativeElement.style.display = 'none';
    });

    this.themeToggler.nativeElement.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme-variables');

      this.themeToggler.nativeElement.querySelector('span:nth-child(1)').classList.toggle('active');
      this.themeToggler.nativeElement.querySelector('span:nth-child(2)').classList.toggle('active');
    });
  }
  }