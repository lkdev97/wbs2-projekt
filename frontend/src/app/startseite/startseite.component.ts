import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.css']
})
export class StartseiteComponent implements OnInit{

  question: string =""
  isUserLoggedIn: boolean = false; // Hier wird der Anmeldestatus gespeichert

  constructor(private route: Router, private http: HttpClient) {  }

  //TODO: DUELDATA kann entfernt werden da eigentlich nichtmehr gebraucht. Gut zum Testen

  duelData(){
    this.question= "cffa9cdb-772a-4996-b947-9c4fba9893a2"
    this.http.get<any>(`http://localhost:3000/duel/get`).subscribe(data => {
      if (data.answeredQuestions.length ==2){
        console.log(data.answeredQuestions);
      }else {
        console.log("NICHTs")
      }

    });
  }

  //TODO: DUELENDE kann entfernt werden da eigentlich nichtmehr gebraucht. Gut zum Testen
  duelend(){
    console.log("ende")
    this.http.patch<any>('http://localhost:3000/duel/update',
      {duelId: "7f45b11d-e88a-4f4c-b696-74b1317f547c", duelStatus: "FINISHED"})
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
