import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../shared.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.css']
})
export class StartseiteComponent implements OnInit{

  question: string =""
  isUserLoggedIn: boolean = false; // Hier wird der Anmeldestatus gespeichert

  constructor(private route: Router,public sharedService: SharedService, private http: HttpClient) {  }

  buttonClicked(){
    this.route.navigate(['/login'])
  }

  //TODO: duelstart, duelend, dueldat müssen auf die profilseite gepackt werden
  duelstart() {
    console.log("start");
    this.http.post<any>('http://localhost:3000/duel', {
      challengerId: "1",
      opponentId: "0"
    }).subscribe({
      next: (data) => {
        console.log(data);
        // Überprüfen Sie den Statuscode
        if (data.status === 201) {
          // Der Statuscode ist 201 (Created), navigieren Sie zur '/duel'-Route
        } else {
          console.error('Ungültiger Statuscode:', data.status);
        }
      },
      //TODO: Fixxen warum wir in den Error fall kommen egal bei welcher Anfrage (geht trotzdem an die Datenbank durch)
      //TODO: Wenn duell eigentlich nicht funktionieren sollte geht er dennoch auf die Duell seite.
      error: (error) => {
        this.route.navigate(['/duell']);
        console.error('HTTP-Fehler:', error);
      },
    });
  }
  duelData() {
    console.log("start");
    this.http.get<any>('http://localhost:3000/duel/question', {
    }).subscribe({
      next: (data) => {
        console.log(data);
        // Überprüfen Sie den Statuscode
        if (data.status === 201) {
          // Der Statuscode ist 201 (Created), navigieren Sie zur '/duel'-Route
        } else {
          console.error('Ungültiger Statuscode:', data.status);
        }
      },
      //TODO: Fixxen warum wir in den Error fall kommen egal bei welcher Anfrage (geht trotzdem an die Datenbank durch)
      error: (error) => {

        console.error('HTTP-Fehler:', error);
      },
    });
  }


  duelend(){
    console.log("ende")
    this.http.patch<any>('http://localhost:3000/duel/update',
      {duelId: "e267432a-7ed5-4c73-a2a3-22f9635ac0c9", questionId: "ques567", answer: "Paris"})
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
