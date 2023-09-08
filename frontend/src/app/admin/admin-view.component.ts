import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  newQuestion: string = "";
  newQuestionCorrectAnswer: string = "";
  newQuestionFalseAnswer: string = "";


  data: string = "";
  adminOutput: string[] = [];
  buttonPressed = false;
  updateButtonPressed= false;

  QuestionId: string = "";
  QuestionUpdate: string = "";
  QuestionCorrectAnswerUpdate: string = "";
  QuestionFalseAnswersUpdate: string = "";
  constructor(private http: HttpClient, private  route: Router) { }

  ngOnInit(): void {
    console.log("Adminseite")


    this.http.get<any>('http://localhost:3000/admin/editor').subscribe({
      next: (data) => {
        if (data !== null && data !== undefined) {
          this.adminOutput = data.map((item: {  text: any; id: any}) =>  "ID: "+ item.id +" "+ "Frage: "+ item.text); // Extrahiert die Fragen aus der Antwort
        } else {
          console.log('Keine Daten erhalten oder ungültige Antwort.');
        }
      },
      error: (error) => {
        console.error('HTTP-Fehler:', error);
      },
    });



/*

const availableQuestionsList = document.getElementById('availableQuestions');
    const selectedQuestionsList = document.getElementById('selectedQuestions');

    availableQuestionsList?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'LI') {
        target.classList.toggle('selected');
        if (target.classList.contains('selected')) {
          selectedQuestionsList?.appendChild(target);
        } else {
          availableQuestionsList.appendChild(target);
        }
      }
    });

    selectedQuestionsList?.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'LI') {
        target.classList.toggle('selected');
        if (target.classList.contains('selected')) {
          availableQuestionsList?.appendChild(target);
        } else {
          selectedQuestionsList.appendChild(target);
        }
      }
    });

 */
  }

  addAnswer(){
    this.buttonPressed = true
    this.updateButtonPressed = false;

  }

  add(){
    console.log("addAnswer")
    this.http.post<any>('http://localhost:3000/admin/editor/create',
      {text: this.newQuestion, options: this.newQuestionFalseAnswer, correctAnswer: this.newQuestionCorrectAnswer}).subscribe(data =>{
    })
  }

  updateQuestion(){
    console.log("updateQuestion")
    this.updateButtonPressed = true;

    this.buttonPressed = false;




  }
  updateButton(){
    console.log("updateQuestion")

    this.http.patch<any>('http://localhost:3000/admin/update/' + this.QuestionId,
      {text: this.QuestionUpdate, options: this.QuestionFalseAnswersUpdate, correctAnswer: this.QuestionCorrectAnswerUpdate}).subscribe(data =>{
      })

  }
}
