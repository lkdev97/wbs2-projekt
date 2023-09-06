import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-admin',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(`http://localhost:3000/admin/editor`).subscribe(data => {
      if (data !== null && data !== undefined) {
        for (let i = 0; i < data; i++) {
          // Hier kommt der Code, der in jeder Iteration ausgeführt werden soll.
          console.log(data[i]);
        }
        // Hier fügst du das Ergebnis-Objekt zu deinem Array hinzu
      } else {
        console.log('Keine Daten erhalten oder ungültige Antwort.');
      }
    });




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
  }
}
