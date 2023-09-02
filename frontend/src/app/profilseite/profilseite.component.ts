import { Component } from '@angular/core';

@Component({
  selector: 'app-profilseite',
  templateUrl: './profilseite.component.html',
  styleUrls: ['./profilseite.component.css']
})
export class ProfilseiteComponent {
  // Testdaten
  playersList = [
    { name: 'Spieler 1', online: true },
    { name: 'Spieler 2', online: false },
    { name: 'Spieler 3', online: false },
    { name: 'Spieler 4', online: false },

  ];

  friendsList = [
    { name: 'Freund 1', online: true },
    { name: 'Freund 2', online: false },

  ];


  addToFriendslist(player: any) {

  }


  deleteFriend(friend: any) {

  }


  startDuell(friend: any) {

  }
}
