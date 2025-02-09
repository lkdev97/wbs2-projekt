import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  isUserLoggedIn: boolean = false;

  newQuestion: string = "";
  newQuestionCorrectAnswer: string = "";
  newQuestionFalseAnswer1: string = "";
  newQuestionFalseAnswer2: string = "";
  newQuestionFalseAnswer3: string = "";
  newQuestionFalseAnswer4: string = "";

  editQuestionFalseAnswer1: string = "";
  editQuestionFalseAnswer2: string = "";
  editQuestionFalseAnswer3: string = "";
  editQuestionFalseAnswer4: string = "";

  newWrongQuestions: any [] = [];


  data: string = "";
  adminOutput: { id: any; text: any }[] = [];
  buttonPressed = false;
  updateButtonPressed = false;

  QuestionId: string = "";
  QuestionUpdate: string = "";
  QuestionCorrectAnswerUpdate: string = "";
  QuestionFalseAnswersUpdate: string = "";

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/admin/editor').subscribe({
      next: (data) => {
        if (data !== null && data !== undefined) {
          this.isUserLoggedIn = true;
          this.adminOutput = data;
        } else {
          console.log('Keine Daten erhalten oder ungültige Antwort.');
        }
      },
      error: (error) => {
        console.error('HTTP-Fehler:', error);
      },
    });
  }
  addAnswer() {
    this.buttonPressed = true
    this.updateButtonPressed = false;
  }

  add() {
    this.newWrongQuestions.push(this.newQuestionFalseAnswer1)
    this.newWrongQuestions.push(this.newQuestionFalseAnswer2);
    this.newWrongQuestions.push(this.newQuestionFalseAnswer3);
    this.newWrongQuestions.push(this.newQuestionFalseAnswer4);
    this.http.post<any>('http://localhost:3000/admin/editor/create',
      {
        text: this.newQuestion,
        options: this.newWrongQuestions,
        correctAnswer: this.newQuestionCorrectAnswer
      }).subscribe(data => {
      alert("Die neue Frage wurde hinzugefügt")
      this.reloadPage();
    })
  }

  updateQuestion(index: number) {
    console.log("updateQuestion")
    this.updateButtonPressed = true;
    this.buttonPressed = false;
    if (this.adminOutput[index] !== undefined) {
      const selectedQuestion = this.adminOutput[index];
      console.log('Ausgewählte Frage:', selectedQuestion.id);
      this.QuestionId = ` ${selectedQuestion.id}`;
    }
  }


  updateButton() {
    const cleanedQuestionId = this.QuestionId.trim();
    this.http.patch<any>('http://localhost:3000/admin/update/' + cleanedQuestionId,
      {
        text: this.QuestionUpdate,
        options: this.QuestionFalseAnswersUpdate,
        correctAnswer: this.QuestionCorrectAnswerUpdate
      }).subscribe(data => {
      alert("Die Frage wurde bearbeitet")

      this.reloadPage();
    })
  }

  DeleteButton() {
    const cleanedQuestionId = this.QuestionId.trim();
    this.http.delete<any>('http://localhost:3000/admin/editor/delete/' + cleanedQuestionId,
    ).subscribe(data => {
      alert("Die" + " " + this.QuestionId + " " + "wurde gelöscht")
      this.reloadPage();
    })
  }

  reloadPage() {
    window.location.reload(); // Die Seite neu laden
  }

}
