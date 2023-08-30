import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-duell',
  templateUrl: './duell.component.html',
  styleUrls: ['./duell.component.css']
})
export class DuellComponent implements OnInit {
  ngOnInit(): void {
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
