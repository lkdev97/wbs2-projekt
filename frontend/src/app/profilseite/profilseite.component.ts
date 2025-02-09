import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-profilseite',
  templateUrl: './profilseite.component.html',
  styleUrls: ['./profilseite.component.css']
})

export class ProfilseiteComponent implements OnInit {
  //Variablen
  out: string = "";
  isUserLoggedIn: boolean = false;
  adminLoggedIn: boolean = false;

  out2: string = "";
  duelId: string = "";
  status: string = "";
  currentUserId: string = "";
  duelcheck = false
  selectedOpponentId: number | null = null;

  statisticsArray: {
    opponent: any;
    username: any; totalGamesAgainstOpponent: any; winsAgainstOpponent: any;
  }[] = [];


  // Arrays für Daten
  playersList: any = [];

  friendsList: any[] = [];

  pendingFriendshipRequests: any = [];


  duelOutput: { challenger: any; id: any; status: any } [] = [];


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private http: HttpClient,
    private route: Router,
    private socket: Socket
  ) {
  }

  ngOnInit() {
    // Die Nutzerdaten über die Route /auth/user abrufen und anzeige
    this.load();
    //gibt alle Pending Duel Request des aktuellen Users auf
    this.http.get<any>('http://localhost:3000/duel/requests').subscribe({
      next: (data) => {
        if (data !== null && data !== undefined) {
          this.duelOutput = data;
        } else {
          console.log('Keine Daten erhalten oder ungültige Antwort.');
        }
      },
      error: (error) => {
        console.error('HTTP-Fehler:', error);
      },
    });

    //Gibt das duel des aktuellen Users aus
    this.http.get<any>(`http://localhost:3000/duel/get`).subscribe(data => {
      this.duelcheck = true;
    });


    // Spielerliste abrufen und aktualisieren
    this.loadAllPlayers();
    this.loadPendingFriendshipRequests();


    //Sockets
    this.socket.on('friendRequestSent', (payload: { senderId: string, recipientId: string }) => {
      this.loadPendingFriendshipRequests();
    });

    this.socket.on('friendshipStatusUpdated', (payload: { userId: string, friendStatus: string }) => {
        this.load();
        this.loadPendingFriendshipRequests();
    });


    //Statistik des Spielers abrufen
    this.http.get<any>('http://localhost:3000/statistics').subscribe({
      next: (data) => {
        if (data !== null && data !== undefined) {
          console.log(data)
          this.statisticsArray = [data];
          console.log(this.statisticsArray)
        } else {
          console.log('Keine Daten erhalten oder ungültige Antwort.');
        }
      },
      error: (error) => {
        console.error('HTTP-Fehler:', error);
      },
    });

  }

  load() {
    this.http.get<any>(`http://localhost:3000/auth/user`).subscribe((data) => {
      if (data !== null && data !== undefined) {
        if (data.role == 'ADMIN') {
          this.route.navigate(['/adminseite']);
        }
        console.log(data);
        this.isUserLoggedIn = true;
        this.out = data.username;
        this.out2 = data.id;
        this.currentUserId = data.id;
        this.listFriends(this.currentUserId);
        const userId = data.id;

        // Freundesliste des angemeldeten Benutzers abrufen

        // Auf das 'statusChange'-Ereignis vom WebSocket-Server hören und die Freundesliste aktualisieren
        this.socket.on('statusChange', (statusChangeData: any) => {
          // Statusänderung empfangen, überprüfen, ob sie für die Freundesliste relevant ist
          if (this.friendsList.some((friend) => friend.id === statusChangeData.id)) {
            // Statusänderung betrifft einen Freund
            const updatedFriendsList = [...this.friendsList]; // Dupliziere die Freundesliste
            const friendIndex = updatedFriendsList.findIndex((friend) => friend.id === statusChangeData.id);
            updatedFriendsList[friendIndex].online = statusChangeData.online;
            this.friendsList = updatedFriendsList; // Aktualisiere die Freundesliste
          }
          this.loadAllPlayers();
        });
      } else {
        console.log('Keine Daten erhalten oder ungültige Antwort.');
      }
    });
  }

  loadAllPlayers() {
    this.http.get<any>(`http://localhost:3000/users/all`).subscribe(data => {
      if (Array.isArray(data)) {

        this.playersList = data;
        //console.log("empfangene Spielerliste: "+ data);
      } else {
        console.log('Ungültige Antwort bei der Abfrage der Spielerliste.');
      }
    });
  }

  listFriends(userId: string) {
    this.http
    .get<any>(`http://localhost:3000/friendship/list-friends/${userId}`)
    .subscribe((data) => {
      if (Array.isArray(data)) {
        this.friendsList = data;
      } else {
        console.log('Ungültige Antwort bei der Abfrage der Freundesliste.');
      }
    });
  }

  loadPendingFriendshipRequests() {
    this.http.get<any>(`http://localhost:3000/friendship/requests`).subscribe(data => {
      if (Array.isArray(data)) {
        this.pendingFriendshipRequests = data;
      } else {
        console.log('Ungültige Antwort bei der Abfrage der offenen Requests.');
      }
    });
  }


  addToFriendslist(playerId: number) {
    //console.log("ID bei Aufruf von addFriend:  " + playerId);
    this.http.post(`http://localhost:3000/friendship/addFriend`, {friendId: playerId})
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

  acceptFriendship(userId: number) {
    this.http.patch('http://localhost:3000/friendship/update', {userId: userId, friendStatus: 'ACCEPTED'}).subscribe({
      next: () => {
        //console.log("Freund erfolgreich hinzugefügt.")
        this.changeDetectorRef.detectChanges();


      },
      error: (error: any) => {
        console.error("Fehler beim Hinzufügen des Spielers zur Freundesliste.", error);
      }
    });
  }

  rejectOrBlockFriendship(userId: number) {

    this.http.patch('http://localhost:3000/friendship/update', {userId: userId, friendStatus: 'BLOCKED'}).subscribe({
      next: () => {

        this.changeDetectorRef.detectChanges();

      },
      error: (error: any) => {
        console.error("Fehler beim blockieren der Freundschaftsanfrage.", error);
      }
    });

  }


  duelstart(playerId: number) {
    this.selectedOpponentId = playerId
    console.log("duellstart mit " + this.currentUserId + " und " + playerId);
    this.http.post<any>('http://localhost:3000/duel', {
      challengerId: this.currentUserId,
      opponentId: this.selectedOpponentId,
    }).subscribe({});
  }


  duelAnnehmen(index: string) {
    console.log("Das Duell wurde Angenommen über die Route /duel/update")
    this.duelId = index;
    this.http.patch<any>('http://localhost:3000/duel/update',
      {duelId: this.duelId, duelStatus: "ONGOING"})
      .subscribe(data => {
        alert("Du hast die Duellanfrage angenommen. Dein gegner beginnt")
        localStorage.setItem('duellCounter', '-1'); // Setze den Wert im Local Storage auf -1 zurück
        this.reloadPage();
      });
  }

  reloadPage() {
    window.location.reload(); // Die Seite neu laden
  }



  protected readonly JSON = JSON;
}
