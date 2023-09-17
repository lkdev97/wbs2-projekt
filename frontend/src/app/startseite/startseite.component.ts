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

  /*
  duelData() {
    console.log("start");
    this.http.get<any>('http://localhost:3000/duel/question/eddc941b-4e2c-4d34-ae02-d134c9412941', {
    }).subscribe({
      next: (data) => {
        console.log(data + "bitte");
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


   */

  duelData(){
    this.question= "cffa9cdb-772a-4996-b947-9c4fba9893a2"
    this.http.get<any>(`http://localhost:3000/duel/get`).subscribe(data => {
      if (data.answeredQuestions.length ==2){
        console.log(data.answeredQuestions);
      }else {
        console.log("fuck ")
      }

    });
  }
  duelend(){
    console.log("ende")
    this.http.patch<any>('http://localhost:3000/duel/update',
      {duelId: "f2721d72-125d-44dd-b075-01b008e0b4d4", duelStatus: "FINISHED"})
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
