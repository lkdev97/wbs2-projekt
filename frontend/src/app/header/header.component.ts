import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SharedService} from "../shared.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  //isConfirmationPopupVisible: boolean = false;

  constructor(private router: Router, public sharedService: SharedService,private http: HttpClient) {}


  // Funktion zum Anzeigen der Bestätigung
  showConfirmationPopup() {
    this.sharedService.isConfirmationPopupVisible = true;
  }

  // Funktion zum Ausloggen
  logout() {
    this.sharedService.isConfirmationPopupVisible = false;

    this.http.get(`http://localhost:3000/auth/logout`).subscribe({
      next: () => {
        this.router.navigate(['/startseite']).then(
          () => {
            this.sharedService.isLoggedIn = false;
            console.log('Erfolgreich ausgeloggt');
          },
          (error) => {
            console.error('Fehler bei der Umleitung', error);
          }
        );
      },
      error: (error) => {
        console.error('Fehler beim Ausloggen im Backend', error);
      },
    });
  }




  cancelLogout() {
    this.sharedService.isConfirmationPopupVisible = false;
  }

}
