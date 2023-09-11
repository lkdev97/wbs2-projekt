import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profilseite',
  templateUrl: './profilseite.component.html',
  styleUrls: ['./profilseite.component.css']
})

export class ProfilseiteComponent implements OnInit {

  out: string = "";
  out2: string = "";



  // Testdaten Spielerliste
  playersList = [
    {name: 'Spieler 1', online: true},
    {name: 'Spieler 2', online: false},
    {name: 'Spieler 3', online: false},
    {name: 'Spieler 4', online: false},

  ];

  friendsList: any[] = [];

  constructor(private http: HttpClient) { }

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

    // Rufe die Freundesliste vom Server ab und aktualisiere die friendsList-Variable
    this.http.get<any>(`http://localhost:3000/friendship/list-friends/{userId}`).subscribe(data => {
      if (Array.isArray(data)) {
        // Prüfe, ob die Daten ein Array sind
        this.friendsList = data; // Aktualisiere die Freundesliste
      } else {
        console.log('Ungültige Antwort bei der Abfrage der Freundesliste.');
      }
    });
  }


  //Friend ID muss aus der Spielerliste ausgelesen werden
 friendId = "";
  addToFriendslist(friendId:string) {
    // Prüfen, ob der Spieler bereits in der Freundesliste ist
    if (!this.isPlayerInFriendsList(friendId)) {
      this.friendsList.push(friendId);
      this.http.post<any>(`http://localhost:3000/friendship/addFriend`, friendId).subscribe(data => {

      });
    }
  }

  // MUSS ÜBERARBEITET WERDEN!!!
  deleteFriend(friend: any) {
    // Den Index des Freundes in der Freundesliste finden
    const index: number = this.friendsList.indexOf(friend);
    // Prüfen, ob der Freund in der Liste ist
    if (index !== -1) {
      // Freund aus der Freundesliste entfernen
      this.friendsList.splice(index, 1);
    }
  }



  //MUSS ÜBERARBEITET WERDEN!!!
  private isPlayerInFriendsList(player: any): boolean {
    // Überprüfe, ob der Spieler in der friendsList enthalten ist
    return this.friendsList.some((friend) => friend.name === player.name);
  }



  startDuel(friend: any) {

  }
}
