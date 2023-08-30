import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
