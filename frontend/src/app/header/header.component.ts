import {Component, ChangeDetectorRef, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {SharedService} from "../shared.service";
import {HttpClient} from "@angular/common/http";
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isUserLoggedIn: boolean = false;
  //isConfirmationPopupVisible: boolean = false;

  constructor(
    private router: Router,
    public sharedService: SharedService,
    private changeDetectorRef: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<any>(`http://localhost:3000/auth/user`).subscribe(data => {
      if (data !== null&& data != undefined) {
        console.log(data);
        this.isUserLoggedIn = true;
      } else {
        console.log('kein Nutzer Angemeldet.');
      }
    });
  }

  // Funktion zum Anzeigen der Bestätigung
  showConfirmationPopup() {
    this.sharedService.isConfirmationPopupVisible = true;
  }

  // Funktion zum Ausloggen
  logout() {
    this.http.get(`http://localhost:3000/auth/logout`, { observe: 'response' }).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.sharedService.isConfirmationPopupVisible = false;
          this.router.navigate(['/startseite']).then(() => {
            this.sharedService.isLoggedIn = false;
            this.changeDetectorRef.detectChanges();
            console.log('Erfolgreich ausgeloggt');
            this.isUserLoggedIn = false;
          });
        } else {
          console.error('Ungültiger Statuscode', response.status);
        }
      },
      error: (error) => {
        console.error('Fehler beim Ausloggen', error);
      },
    });
  }


  cancelLogout() {
    this.sharedService.isConfirmationPopupVisible = false;
  }
  reloadPage() {
    window.location.reload(); // Die Seite neu laden
  }


}
