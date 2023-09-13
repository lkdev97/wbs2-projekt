import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";



@Component({
  selector: 'app-profilseite',
  templateUrl: './profilseite.component.html',
  styleUrls: ['./profilseite.component.css']
})

export class ProfilseiteComponent implements OnInit {

  out: string = "";
  out2: string = "";



  // Arrays für Daten
  playersList: any = [];

  friendsList: any[] = [];

  pendingFriendshipRequests: any = [];

  constructor(
      private changeDetectorRef: ChangeDetectorRef,
      private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>(`http://localhost:3000/auth/user`).subscribe(data => {
      if (data !== null && data !== undefined) {
        console.log(data);
        this.out = data.username;
        this.out2 = data.id;
      } else {
        console.log('Keine Daten erhalten oder ungültige Antwort.');
      }
    });

    // Freundesliste abrufen und aktualisieren
    this.http.get<any>(`http://localhost:3000/friendship/list-friends/{userId}`).subscribe(data => {
      if (Array.isArray(data)) {

        this.friendsList = data;
      } else {
        console.log('Ungültige Antwort bei der Abfrage der Freundesliste.');
      }
    });

    // Spielerliste abrufen und aktualisieren
    this.http.get<any>(`http://localhost:3000/users/all`).subscribe(data => {
      if (Array.isArray(data)) {

        this.playersList = data;
      } else {
        console.log('Ungültige Antwort bei der Abfrage der Spielerliste.');
      }
    });

    this.http.get<any>(`http://localhost:3000/friendship/requests`).subscribe(data => {
      if (Array.isArray(data)) {

        this.pendingFriendshipRequests = data;
        console.log(this.pendingFriendshipRequests);
      } else {
        console.log('Ungültige Antwort bei der Abfrage der offenen Requests.');
      }
    });



  }



  addToFriendslist(playerId: number) {
    // Erstellen Sie ein Observable, das die HTTP-Anfrage darstellt
    this.http.post(`http://localhost:3000/friendship/addFriend`, { friendId: playerId })
        .subscribe({
          next: (response: any) => {
            if (response.status === 201) {
              console.log('Einladung erfolgreich verschickt.');
              this.changeDetectorRef.detectChanges();

            } else {
              console.error('Ungültiger Statuscode:', response.status);
            }
          },
          error: (error: any) => {
            console.error('Fehler beim Verschicken des Requests.', error);
          }
        });
  }
  acceptFriendship(userId:number){
      this.http.patch('http://localhost:3000/friendship/update',{userId: userId, friendStatus: 'ACCEPTED'}).subscribe({
        next: (response: any) =>{
          if (response.status === 201){
            console.log("Freund erfolgreich hinzugefügt.")
            this.changeDetectorRef.detectChanges();
          } else {
           console.error('Ungültiger Statuscode:', response.status);
          }
        },
        error: (error:any)=>{
          console.error("Fehler beim Hinzufügen des Spielers zur Freundesliste.",error);
        }
      });
  }

  rejectFriendship(request:any){

  }





}
