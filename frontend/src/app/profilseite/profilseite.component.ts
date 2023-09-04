import {Component} from '@angular/core';

@Component({
  selector: 'app-profilseite',
  templateUrl: './profilseite.component.html',
  styleUrls: ['./profilseite.component.css']
})
export class ProfilseiteComponent {

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
    const index = this.friendsList.indexOf(friend);
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
