import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.css']
})
export class StartseiteComponent implements OnInit{

  isUserLoggedIn: boolean = false; // Hier wird der Anmeldestatus gespeichert



  constructor(private route: Router, private http: HttpClient) {  }

  buttonClicked(){
    this.route.navigate(['/login'])
  }

  duelstart(){
    console.log("start")
    this.http.post<any>('http://localhost:3000/duel',
      {challengerId: "ae3a6a2c-4ca9-4539-bfd8-dad4babdffd3", opponentId: "4d08c859-4cb5-4b65-bbde-ebd1f1649780"})
      .subscribe(data =>{

      console.log(data)
    })

  }
  duelend(){
    console.log("ende")
    this.http.patch<any>('http://localhost:3000/duel/update',
      {duelId: "dafe1839-e5ac-4258-98fd-af420a24aeb5", questionId: "ques567", answer: "Paris"})
      .subscribe(data =>{

      console.log(data)
    })

  }


  ngOnInit() {
    this.http.get<any>(`http://localhost:3000/auth/user`).subscribe(data => {
      if (data !== null&& data != undefined) {
        console.log(data);
        this.isUserLoggedIn = true;
      } else {
        console.log('kein Nutzer Angemeldet.');
      }
    });
  }

}
