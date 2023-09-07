import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-duell',
  templateUrl: './duell.component.html',
  styleUrls: ['./duell.component.css']
})
export class DuellComponent implements OnInit {
  question: string = "";
  answer1: string = "";
  answer2: string = "";
  answer3: string = "";
  answer4: string = "";


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<any>(`http://localhost:3000/duel/question`).subscribe(data => {
      if (data !== null && data !== undefined) {
        console.log(data);
        this.question = data.text;
        if (data !== null) {
          let num = getRandomNumber();

          if (num == 1) {
            this.answer1 = data.correctAnswer;
          } else {
            if (num == 2) {
              this.answer2 = data.correctAnswer;
            } else {
              if (num == 3) {
                this.answer3 = data.correctAnswer;
              } else {
                this.answer4 = data.correctAnswer;
              }
            }
          }
        }
      } else {
        this.question = "Es gibt einen Fehler";
        console.log('Keine Daten erhalten oder ungültige Antwort.');
      }
    });



  }





  answerButton(){
    console.log("answerButtonPressed")
    this.http.patch<any>('http://localhost:3000/duel/answer',
      {duelId: "4f97d8ae-3f98-450b-b400-cdd7cd4c504b", questionId: "ques567", answer: "Paris"})
      .subscribe(data =>{

      })

  }
}


/**
 * getRandomNumber. This function generates a Number between 1 and 4 and includes both. It is used in the http test witch
 * get the correct Answer for a Question. It changes the Position of the correct Answer everytime a get Request is needed
 */
function getRandomNumber() {
  // Generiere eine zufällige Zahl zwischen 1 und 4
  const randomNumber = Math.floor(Math.random() * 4) + 1;
  return randomNumber;
}


