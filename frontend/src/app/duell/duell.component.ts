import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-duell',
  templateUrl: './duell.component.html',
  styleUrls: ['./duell.component.css']
})
export class DuellComponent implements OnInit {
  currentUserId: string = "";
  challengerId: string = "";
  oponnentId: string = "";
  challenger = false;
  oponnent = false;
  oponnentQuestion: string = ""
  finished = false;
  inputFieldsDisabled = false;

  countQuestion: number = -2;

  duelId: string = "";
  question: string = "";
  answer1: string = "";
  answer2: string = "";
  answer3: string = "";
  answer4: string = "";
  results: string = "";

  DisplayChallenger: string = ""
  DisplayOpponent: string = ""
  resultsOpponent: string = "";
  selectedAnswerId: number = 0;
  id: number = 0;
  count: number = 0;



  constructor(private http: HttpClient, private route: Router
  ) {

  }


  ngOnInit(): void {

    console.log(this.count)
    //storedCount wird verwendet damit der Opponent auch nach dem neuladen der Seite die gleiche Frage bekommt
    const storedCount = localStorage.getItem('duellCounter');

    if (storedCount !== null) {
      this.countQuestion = parseInt(storedCount, 10); // Wenn gespeichert, wiederherstellen
    }

//Muss so ausgeführt werden damit userChecker als letztes ausgeführt wird
    this.http.get<any>(`http://localhost:3000/auth/user`).subscribe(data => {
      this.currentUserId = data.id;
      console.log("currentUserId ist: " + this.currentUserId);

      this.http.get<any>(`http://localhost:3000/duel/get`).subscribe(data => {
        this.challengerId = data.challenger.id;
        this.DisplayChallenger = data.challenger.username
        console.log("ChallengerId ist: " + this.challengerId);

        this.oponnentId = data.opponent.id
        this.DisplayOpponent = data.opponent.username
        console.log("OppenentId ist: " + this.oponnentId);

        this.userChecker();
      });
    });


  }

  userChecker() {
    if (this.currentUserId == this.challengerId) {
      this.getDuel();
    } else {
      localStorage.setItem('duellCounter', this.countQuestion.toString())
      this.countQuestion++
      console.log(this.countQuestion + "counter ")
      this.oponnent = true
      this.http.get<any>(`http://localhost:3000/duel/get`).subscribe(data => {
        if (data.answeredQuestions.length == 1 || data.answeredQuestions.length == 0) {
          alert("Bitte warte bis dein Gegner seine Frage beantwortet hat")
          this.reloadPageInterval(15)
        }else if(this.countQuestion <= 9 && data.answeredQuestions.length == this.countQuestion + 1){
          this.inputFieldsDisabled = true;
          this.reloadPageInterval(15)
        }else{
          this.inputFieldsDisabled = false;
          console.log(data.answeredQuestions + "AnswerdQuestions")
          this.http.get<any>(`http://localhost:3000/duel/get`).subscribe(data => {
            console.log(data.answeredQuestions[this.countQuestion]);
            this.oponnentQuestion = data.answeredQuestions[this.countQuestion];
            console.log("AnswerdQuestions Frage: ")
            console.log(this.oponnentQuestion)


            this.http.get<any>(`http://localhost:3000/question/${this.oponnentQuestion}`).subscribe(data => {
              console.log("Die Daten der Frage: ");
              console.log(data);
              this.selectedAnswerId = data.id;

              if (data !== null && data !== undefined) {

                this.question = data.text;
                this.answer1 = data.options[0]
                this.answer2 = data.options[1];
                this.answer3 = data.options[2];
                this.answer4 = data.options[3];
              }
            });
          });
        }
      });
    }
  }

  getDuel(): void {
    this.http.get<any>(`http://localhost:3000/duel/get`).subscribe(data => {
      this.duelId = data.id;
      console.log(this.duelId + " Die DuellId");
      this.loadQuestionForDuel(this.duelId);
    });
  }

  // Funktion, um eine Frage für ein Duell zu laden
  loadQuestionForDuel(duelId: string): void {
    const body = {duelId: duelId};
    this.http.post<any>('http://localhost:3000/duel/question', body)
      .subscribe(data => {
        if (data !== null && data !== undefined) {
          console.log(this.duelId);
          this.question = data.text;
          this.selectedAnswerId = data.id;
          if (data !== null) {
            let num = getRandomNumber();

            if (num == 1) {
              console.log(data.id)
              this.answer1 = data.options[0];
              this.answer2 = data.options[1];
              this.answer3 = data.options[2];
              this.answer4 = data.options[3];
            } else if (num == 2) {
              console.log(data.id)
              this.answer1 = data.options[0];
              this.answer2 = data.options[1];
              this.answer3 = data.options[2];
              this.answer4 = data.options[3];
            } else if (num == 3) {
              console.log(data.id)
              this.answer1 = data.options[0];
              this.answer2 = data.options[1];
              this.answer3 = data.options[2];
              this.answer4 = data.options[3];
            } else {
              console.log(data.id)
              this.answer1 = data.options[0];
              this.answer2 = data.options[1];
              this.answer3 = data.options[2];
              this.answer4 = data.options[3];
            }
          }
        } else {
          this.question = "Es gibt einen Fehler";
          console.log('Keine Daten erhalten oder ungültige Antwort.');
        }
      });
  }


  answerButton(clickedButton: string) {
    this.userChecker();

    if (this.currentUserId == this.challengerId) {
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
            this.count++
            console.log("COUNTER FÜR DIE ANTWORTEN" + this.count)
            if (this.count >= 10) {
              alert("Das spiel ist zuend")
            }
            this.http.post<any>('http://localhost:3000/duel/score', {duelId: this.duelId}).subscribe(data => {
              this.finished = true
              console.log(data)
              this.results = data.challengerScore
              this.resultsOpponent = data.opponentScore

            })



          })

          this.http.post<any>('http://localhost:3000/duel/score', body)
          .subscribe(data => {
            console.log("Dateen " + data);
          })


      });

    } else {
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
            console.log("counter vorher" + this.count);

            // Zuerst den aktuellen Wert von 'count' aus localStorage abrufen
            const storedCount = localStorage.getItem('count');

            if (storedCount !== null) {
              // Wenn ein Wert in localStorage gefunden wird, diesen Wert verwenden
              this.count = parseInt(storedCount, 10);
            } else {
              // Wenn kein Wert in localStorage vorhanden ist, auf 1 setzen
              this.count = 0;
            }

            // Jetzt, nachdem der Wert wiederhergestellt wurde, um eins erhöhen
            this.count++;

            // Dann den aktualisierten Wert in localStorage speichern
            localStorage.setItem('count', this.count.toString());

            console.log(this.count + "Counter");
            console.log(storedCount + "StoredCounter");

            if (this.count >= 10) {
              alert("Das Spiel ist zu Ende")
              this.http.patch<any>('http://localhost:3000/duel/update',
                {duelId: this.duelId, duelStatus: "FINISHED"})
                .subscribe(data => {
                  localStorage.clear();

                  // Weitere Verarbeitung nach dem Spielende
                });

            } this.http.post<any>('http://localhost:3000/duel/score', {duelId: this.duelId}).subscribe(data => {
              this.finished = true
              console.log(data)
              this.results = data.challengerScore
              this.resultsOpponent = data.opponentScore

            })

          })


      });

    }




  }

  reloadPageInterval(intervalInSeconds: number): void {
    setInterval(() => {
      window.location.reload();
    }, intervalInSeconds * 1000); // Das Intervall wird in Millisekunden angegeben, daher * 1000
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




