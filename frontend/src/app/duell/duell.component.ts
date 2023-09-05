import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-duell',
  templateUrl: './duell.component.html',
  styleUrls: ['./duell.component.css']
})
export class DuellComponent implements OnInit {
  question: string ="";

  constructor(private http: HttpClient) {  }

  ngOnInit(): void {
    this.http.get<any>(`http://localhost:3000/duel/question`).subscribe(data => {
      if (data !== null && data !== undefined) {
        console.log(data);
        this.question = data.text;
      } else {
        this.question = "Es gibt einen Fehler";
        console.log('Keine Daten erhalten oder ungültige Antwort.');
      }
    });

    const answers = document.querySelectorAll('.answer');

    answers.forEach(answer => {
      answer.addEventListener('click', () => {
        answers.forEach(otherAnswer => {
          if (otherAnswer !== answer) {
            otherAnswer.classList.remove('clicked');
          }
        });
        answer.classList.toggle('clicked');
      });
    });
  }
}
