import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-duell',
  templateUrl: './duell.component.html',
  styleUrls: ['./duell.component.css']
})
export class DuellComponent implements OnInit {
  duelId: string = "";
  question: string = "";
  answer1: string = "";
  answer2: string = "";
  answer3: string = "";
  answer4: string = "";
  selectedAnswerId: number = 0
  id: number = 0
  count: number = 0

  wrong: string ="";

  selectedQuestion: { id: number; text: string; } = {id: 0, text: ''};
  currentUserId: string = "";
  private test: any;


  constructor(private http: HttpClient, private route: Router
  ) {

  }


  ngOnInit(): void {

    this.http.get<any>(`http://localhost:3000/auth/user`).subscribe(data => {
      this.currentUserId = data.id;
    });

    console.log(this.duelId + " id")

    this.http.get<any>(`http://localhost:3000/duel/get`).subscribe(data => {
      this.duelId = data.id;
      console.log(this.duelId + " Die DuellId")
      const body = {duelId: this.duelId}; // hier wird der Body befüllt
      /*
      const headers = new HttpHeaders({
        'Content-Tpe': 'application/json'
      });

       */
      this.http.post<any>('http://localhost:3000/duel/question', body)
        .subscribe(data => {
          if (data !== null && data !== undefined) {
            this.wrong = data.options[0].value
            console.log("Wrong" + this.wrong)
            console.log(this.duelId);
            this.question = data.text;

            this.selectedAnswerId = data.id;
            if (data !== null) {
              let num = getRandomNumber();

              if (num == 1) {
                console.log(data.id)

                this.answer1 = data.correctAnswer;
                this.answer2 = data.options[0]._value;
                this.answer3 = data.options[1].value;
                this.answer4 = data.options[2].value;
              } else {
                if (num == 2) {
                  console.log(data.id)

                  this.answer1 = data.options[0].value;
                  this.answer2 = data.correctAnswer;
                  this.answer3 = data.options[1]._value;
                  this.answer4 = data.options[2].value;
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

    });



  }


  answerButton(clickedButton: string) {
    console.log("answerButtonPressed");
    console.log(clickedButton);
    console.log(this.selectedAnswerId + " test");

    this.http.get<any>(`http://localhost:3000/duel/get`).subscribe(data => {

      this.duelId = data.id;
      const payload = {
        SubmitAnswerDto: {
          duelId: this.duelId,
          questionId: this.selectedAnswerId,
          answer: clickedButton
        },
        userId: this.currentUserId
      };

      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      const body = {duelId: this.duelId}; // Wert, den Sie als Abfrageparameter senden möchten

      this.http.patch<any>(`http://localhost:3000/duel/answer`, payload, {headers})
        .subscribe(data => {
          this.count = this.count + 1
          console.log(this.count + "Counter")




          if (this.count >= 10) {
            alert("Das spiel ist zuend")
            this.http.patch<any>('http://localhost:3000/duel/update',
              {duelId: this.duelId,duelStatus: "FINISHED" })
              .subscribe(data => {

                console.log(data)
                console.log("spiel beendet")
                this.route.navigate(['/profil']);

              })
            this.http.post<any>('http://localhost:3000/duel/score',{duelId: this.duelId}).subscribe(data=>{
             //TODO: Hier noch den Score einbinden

            })
          } else { //um die liste neu zu generieren
            this.http.post<any>('http://localhost:3000/duel/question', body)
              .subscribe(data => {
                if (data !== null && data !== undefined) {
                  this.wrong = data.options[0].value
                  console.log(this.duelId);
                  this.question = data.text;
                  this.selectedAnswerId = data.id;
                  if (data !== null) {
                    let num = getRandomNumber();

                    if (num == 1) {
                      console.log(data.id)

                      this.answer1 = data.correctAnswer;
                      this.answer2 = data.options[0].value;
                      this.answer3 = data.options[1].value;
                      this.answer4 = data.options[2].value;
                    } else {
                      if (num == 2) {
                        console.log(data.id)

                        this.answer1 = data.options[0].value;
                        this.answer2 = data.correctAnswer;
                        this.answer3 = data.options[1]._value;
                        this.answer4 = data.options[2].value;
                      } else {
                        if (num == 3) {
                          console.log(data.id)

                          this.answer1 = data.options[0];
                          this.answer2 = data.options[1];
                          this.answer3 = data.correctAnswer;
                          this.answer4 = data.options[2];
                        } else {
                          console.log(data.id)

                          this.answer1 = data.options[0];
                          this.answer2 = data.options[1];
                          this.answer3 = data.options[2];
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

        })


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




