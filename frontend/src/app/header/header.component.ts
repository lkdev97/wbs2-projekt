import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username: string = "";
  userPassword: string = "";
  isConfirmationPopupVisible: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  // Funktion zum Anzeigen der Bestätigung
  showConfirmationPopup() {
    this.isConfirmationPopupVisible = true;
  }

  // Funktion zum Ausloggen
  logout() {
    this.isConfirmationPopupVisible = false;
    this.http.get<any>(`http://localhost:3000/auth/logout`).subscribe(data => {
      if (data !== null && data !== undefined) {
        console.log(data);
      } else {
        console.log('Keine Daten erhalten oder ungültige Antwort.');
      }
    });
  }


  cancelLogout() {
    this.isConfirmationPopupVisible = false;
  }
}
