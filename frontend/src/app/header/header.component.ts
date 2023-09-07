import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isConfirmationPopupVisible: boolean = false;

  constructor(private router: Router, public sharedService: SharedService) {}


  // Funktion zum Anzeigen der Bestätigung
  showConfirmationPopup() {
    this.isConfirmationPopupVisible = true;
  }

  // Funktion zum Ausloggen
  logout() {
    this.isConfirmationPopupVisible = false;
    this.router.navigate(['/startseite']).then(
      () => {
        this.sharedService.isLoggedIn = false;
        console.log('Erfolgreich ausgeloggt');
      },
      (error) => {
        console.error('Fehler bei der Umleitung', error);
      }
    );
  }



  cancelLogout() {
    this.isConfirmationPopupVisible = false;
  }

}
