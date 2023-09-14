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
      challengerId: "6a9e50ef-7d87-416d-a545-93d0e8eb144e",
      opponentId: "749e3b00-b5a0-44e3-b627-fdcbfa6c4132"
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
      {duelId: "0fad2aae-67db-4da3-b667-e8c6d3f3492b", questionId: "ques567", answer: "Paris"})
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
