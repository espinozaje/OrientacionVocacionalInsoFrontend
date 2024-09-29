export interface Question {
  id: number;
  texto: string; 
  area: string;
  opciones: Option[];  
  selectedOption?: Option;
}

export interface Option {
  id: number;
  texto: string;
  score: number;
}

export interface Carrera {
  id: number;
  nombre: string;
  img: string;
  descripcion: string;
  precioMensualidad: string;
  ubicacion: {
    id: number;
    ciudad: string;
  };

  
}


export interface Ubicacion {
  id: number;
  ciudad: string;
  pais: string;
  region: string;
}

export interface User{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}