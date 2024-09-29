import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Question, Option } from '../authentication/models/question.model';
import { CommonModule } from '@angular/common';
import { VocationalTestService } from './vocational-test.service';
import { response } from 'express';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-vocational-test',
  standalone:true,
  imports:[CommonModule, HttpClientModule, FormsModule, RouterLink],
  templateUrl: './vocational-test.component.html',
  styleUrls: ['./vocational-test.component.scss']
})


export class VocationalTestComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex: number=0;
  loading: boolean = true;
  testResult: string = '';

  constructor(private vocationalTestService: VocationalTestService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.vocationalTestService.getQuestions()//llama al servicio para obtener la lista de preguntas mediante una solicitud
    .subscribe((data: any[]) => { //define que la respuesta que se espera sea un arregglo
      this.questions = data.map(question => ({  //mapea cada pregunta en el arreglo recibido
        ...question, //copia todas las propiedades de la pregunta original
        options: question.opciones || []  //asegura que si la propidad opciones no existe se inicialice como arreglo vacio
      }));
    });
  }

  selectOption(option: Option):void{
    const currentQuestion = this.questions[this.currentQuestionIndex]; //obitene la pregunta actual utilizando indice
    currentQuestion.selectedOption = option; //asigna la opcion seleccionada

    if(this.currentQuestionIndex < this.questions.length - 1){ //comprueba si hay mas preguntas para mostrar
      this.currentQuestionIndex++; //si hay incrementa el indice
    } else {
      this.submitTest(); //sino envia la solicitud mediante el metodo
    }
  }


  submitTest(): void {
    const test = {
      questions: this.questions //crea un objeto test que incluye todas las preguntas con sus opciones seleccionadas
    };

    this.vocationalTestService.submitTest(test).subscribe(response =>{ //llama al metodo submittest del servicio para realizar la solicitud
      this.testResult = response.message; //alamcena el mensaje de resultado
      this.currentQuestionIndex = this.questions.length;  //establece el indice actual al final de la lista de preguntas
    });
  }


  getProgress(): number {
    return (this.currentQuestionIndex + 1) / this.questions.length * 100; //incremente el indice actual en 1 para reflejar que el usuario a completo la pregunta
  }                                                                       //divide el todal de preguntas para obtener evalor entre 0 y 1 y multiplica por 100 
                                                                          //para convertirlo en porcentaje

}
