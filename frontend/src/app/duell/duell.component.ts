import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

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
  selectedAnswerId: number = 0
  id: number = 0
  selectedQuestion: { id: number; text: string; } = {id: 0, text: ''};
  duelId: string = "";
  private body: HttpParams | {
    [p: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  } | undefined;
  private headers: HttpHeaders | { [p: string]: string | string[]; } | undefined;
  constructor(private http: HttpClient) {

  }



  ngOnInit(): void {
    console.log(this.duelId + " id")

    this.http.get<any>(`http://localhost:3000/duel/get`).subscribe(data => {
      this.duelId = data.id;
      console.log(this.duelId + " Die DuellId")
      // Senden Sie die GET-Anfrage mit den Abfrageparametern
      const body = { duelId: this.duelId }
      console.log("body" +JSON.stringify(body) )
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    });



    this.http.get<any>('http://localhost:3000/duel/question',{params: this.body, headers: this.headers})
      .subscribe(data => {
        if (data !== null && data !== undefined) {
          console.log(data);
          this.question = data.text;
          this.selectedAnswerId = data.id;
          if (data !== null) {
            let num = getRandomNumber();

            if (num == 1) {
              console.log(data.id)

              this.answer1 = data.correctAnswer;
              this.answer2 = data.options;
              this.answer3 = data.options;
              this.answer4 = data.options;
            } else {
              if (num == 2) {
                console.log(data.id)

                this.answer1 = data.options;
                this.answer2 = data.correctAnswer;
                this.answer3 = data.options;
                this.answer4 = data.options;
              } else {
                if (num == 3) {
                  console.log(data.id)

                  this.answer1 = data.options;
                  this.answer2 = data.options;
                  this.answer3 = data.correctAnswer;
                  this.answer4 = data.options;
                } else {
                  console.log(data.id)

                  this.answer1 = data.options;
                  this.answer2 = data.options;
                  this.answer3 = data.options;
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

    /* Erstellen Sie den JSON-Payload
    const duelid =  { duelId: this.duelId };



    this.http.get<any>('http://localhost:3000/duel/question')
      .subscribe(data => {
      if (data !== null && data !== undefined) {
        console.log(data);
        this.question = data.text;
        this.selectedAnswerId = data.id;
        if (data !== null) {
          let num = getRandomNumber();

          if (num == 1) {
            console.log(data.id)

            this.answer1 = data.correctAnswer;
            this.answer2 = data.options;
            this.answer3 = data.options;
            this.answer4 = data.options;
          } else {
            if (num == 2) {
              console.log(data.id)

              this.answer1 = data.options;
              this.answer2 = data.correctAnswer;
              this.answer3 = data.options;
              this.answer4 = data.options;
            } else {
              if (num == 3) {
                console.log(data.id)

                this.answer1 = data.options;
                this.answer2 = data.options;
                this.answer3 = data.correctAnswer;
                this.answer4 = data.options;
              } else {
                console.log(data.id)

                this.answer1 = data.options;
                this.answer2 = data.options;
                this.answer3 = data.options;
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

     */


  }


  answerButton(clickedButton: string) {
    console.log("answerButtonPressed");
    console.log(clickedButton);
    console.log(this.selectedAnswerId + " test");

    this.http.patch<any>('http://localhost:3000/duel/answer', {
      duelId: "9403c352-4b27-4975-ba05-04ad3163c340",
      questionId: this.selectedAnswerId,
      answer: clickedButton
    }).subscribe(data => {
      this.reloadPage()
    });
  }

  reloadPage() {
    window.location.reload(); // Die Seite neu laden
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




