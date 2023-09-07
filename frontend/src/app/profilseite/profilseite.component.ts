import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import { ActivatedRoute } from '@angular/router'; // Importiere ActivatedRoute, um die Route-Parameter zu extrahieren


@Component({
  selector: 'app-profilseite',
  templateUrl: './profilseite.component.html',
  styleUrls: ['./profilseite.component.css']
})

export class ProfilseiteComponent implements OnInit {

  out: string="";
  out2: string="";

  constructor(private http: HttpClient) {  }


  ngOnInit() {
    this.http.get<any>(`http://localhost:3000/auth/user`).subscribe(data => {
      if (data !== null && data !== undefined) {
        console.log(data);
        this.out = data.username + " " + data.id;
      } else {
        console.log('Keine Daten erhalten oder ungültige Antwort.');
      }
    });


    this.http.get<any>(`http://localhost:3000/auth/user`).subscribe(data => {
      if (data !== null && data !== undefined) {
        console.log(data);
        this.out2 = data.username + " " + data.id;
      } else {
        console.log('Keine Daten erhalten oder ungültige Antwort.');
      }
    });
  }


  // Testdaten
   playersList = [
    {name: 'Spieler 1', online: true},
    {name: 'Spieler 2', online: false},
    {name: 'Spieler 3', online: false},
    {name: 'Spieler 4', online: false},

  ];

   friendsList = [
    {name: 'Freund 1', online: true},
    {name: 'Freund 2', online: false},

  ];
  addToFriendslist(player: any) {
    // Prüfen, ob der Spieler bereits in der Freundesliste ist
    if (!this.isPlayerInFriendsList(player)) {
      // Spieler zur Freundesliste hinzufügen
      this.friendsList.push(player);
    }
  }


  deleteFriend(friend: any) {
    // Den Index des Freundes in der Freundesliste finden
    const index: number = this.friendsList.indexOf(friend);
    // Prüfen, ob der Freund in der Liste ist
    if (index !== -1) {
      // Freund aus der Freundesliste entfernen
      this.friendsList.splice(index, 1);
    }
  }

  private isPlayerInFriendsList(player: any): boolean {
    return this.friendsList.some((friend) => friend.name === player.name);
  }

  startDuel(friend: any) {

  }
}
