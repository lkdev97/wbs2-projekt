import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

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
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log("Adminseite")


    this.http.get<any>('http://localhost:3000/admin/editor').subscribe({
      next: (data) => {
        if (data !== null && data !== undefined) {
          this.adminOutput = data.map((item: { text: any; }) => item.text); // Extrahiert die Fragen aus der Antwort
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
  }

  add(){
    console.log("addAnswer")
    this.http.post<any>('http://localhost:3000/admin/editor/create',
      {text: this.newQuestion, options: this.newQuestionFalseAnswer, correctAnswer: this.newQuestionCorrectAnswer}).subscribe(data =>{
    })

  }
}
