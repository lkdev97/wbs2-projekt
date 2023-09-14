import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";






@Component({
  selector: 'app-profilseite',
  templateUrl: './profilseite.component.html',
  styleUrls: ['./profilseite.component.css']
})

export class ProfilseiteComponent implements OnInit {

  out: string = "";
  out2: string = "";

  currentUserId: string = "";
  selectedOpponentId: number | null = null; // Initialisieren Sie die ausgewählte ID mit null





  // Arrays für Daten
  playersList: any = [];

  friendsList: any[] = [];

  pendingFriendshipRequests: any = [];

  statistics: any = [];






  constructor(
      private changeDetectorRef: ChangeDetectorRef,
      private http: HttpClient,
      private route: Router
  ) { }

  ngOnInit() {
      //Username und ID abrufen und anzeigen
      this.http.get<any>(`http://localhost:3000/auth/user`).subscribe(data => {
        if (data !== null && data !== undefined) {
          this.out = data.username;
          this.out2 = data.id;
          this.currentUserId = data.id;



          const userId = data.id;
          //console.log("userId vor dem Renderig der Freundesliste: "+userId);

            //Freundesliste des angemeldeten Users abrufen
            this.http.get<any>(`http://localhost:3000/friendship/list-friends/${userId}`).subscribe(data => {
              if (Array.isArray(data)) {

                this.friendsList = data;
                //console.log(this.friendsList);
                //console.log("empfangene Freundesliste: " + data);
              } else {
                console.log('Ungültige Antwort bei der Abfrage der Freundesliste.');
              }
            });

        } else {
          console.log('Keine Daten erhalten oder ungültige Antwort.');
        }
      });






    // Spielerliste abrufen und aktualisieren
    this.http.get<any>(`http://localhost:3000/users/all`).subscribe(data => {
      if (Array.isArray(data)) {

        this.playersList = data;
        //console.log("empfangene Spielerliste: "+ data);
      } else {
        console.log('Ungültige Antwort bei der Abfrage der Spielerliste.');
      }
    });
    // Offene Freundschaftsanfragen abrufen
    this.http.get<any>(`http://localhost:3000/friendship/requests`).subscribe(data => {
      if (Array.isArray(data)) {

        this.pendingFriendshipRequests = data;
        //console.log("offene Freundschaftsanfragen:  "+  this.pendingFriendshipRequests);
      } else {
        console.log('Ungültige Antwort bei der Abfrage der offenen Requests.');
      }
    });


    //Statistik des Spielers abrufen
    this.http.get<any>(`http://localhost:3000/statistics`).subscribe(data => {
      if (Array.isArray(data)) {

        this.statistics = data;
        //console.log(this.statistics);
        //console.log("empfangene Statistik: " + data);
      } else {
        console.log('Ungültige Antwort bei der Abfrage der Statistik.');
      }
    });

  }



  addToFriendslist(playerId: number) {
    //console.log("ID bei Aufruf von addFriend:  " + playerId);
    this.http.post(`http://localhost:3000/friendship/addFriend`, { friendId: playerId })
        .subscribe({
          next: (response: any) => {

              //console.log('Einladung erfolgreich verschickt.');
              this.changeDetectorRef.detectChanges();

          },
          error: (error: any) => {
            console.error('Fehler beim Verschicken des Requests.', error);
          }
        });
  }
  acceptFriendship(userId:number){
      this.http.patch('http://localhost:3000/friendship/update',{userId: userId, friendStatus: 'ACCEPTED'}).subscribe({
        next: () =>{

            //console.log("Freund erfolgreich hinzugefügt.")
            this.changeDetectorRef.detectChanges();




        },
        error: (error:any)=>{
          console.error("Fehler beim Hinzufügen des Spielers zur Freundesliste.",error);
        }
      });
  }

  rejectOrBlockFriendship(userId:number){
    this.http.patch('http://localhost:3000/friendship/update',{userId: userId, friendStatus: 'BLOCKED'}).subscribe({
      next: () =>{

        this.changeDetectorRef.detectChanges();

      },
      error: (error:any)=>{
        console.error("Fehler beim blockieren der Freundschaftsanfrage.",error);
      }
    });
  }





  duelstart(playerId: number) {
    this.selectedOpponentId = playerId
    console.log("duellstart mit " + this.currentUserId + " und " + playerId);
    this.http.post<any>('http://localhost:3000/duel', {
      challengerId: this.currentUserId,
      opponentId: this.selectedOpponentId
    }).subscribe({
      next: (data) => {
        console.log(data);
        // Überprüfen Sie den Statuscode
        if (data.status === 201) {

          // Der Statuscode ist 201 (Created), navigieren Sie zur '/duel'-Route
        } else {
          this.route.navigate(['/duell']);

          console.error('Ungültiger Statuscode:', data.status);
        }
      },
      //TODO: Fixxen warum wir in den Error fall kommen egal bei welcher Anfrage (geht trotzdem an die Datenbank durch)
      //TODO: Wenn duell eigentlich nicht funktionieren sollte geht er dennoch auf die Duell seite.
      error: (error) => {
        console.error('HTTP-Fehler:', error);
      },
    });
  }




}
