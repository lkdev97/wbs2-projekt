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
      {duelId: "1807157b-2311-4713-bd30-da00431a3c7f", duelStatus: "FINISHED"})
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
