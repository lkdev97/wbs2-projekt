import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root', // Dies sorgt dafür, dass der Dienst im gesamten Projekt verfügbar ist.
})


export class SharedService {
  constructor(private router: Router) {}

  isLoggedIn = false;
  isConfirmationPopupVisible: boolean = false;


  getToProfile(){
    if (!this.isConfirmationPopupVisible) {
      this.router.navigate(['/profil']).then(
        () => {
          console.log('auf der Profilseite angekommen');
        },
        (error) => {
          console.error('Fehler bei der Umleitung', error);
        }
      );
    }
  }

  getHome(){
    this.router.navigate(['/startseite']).then(
      () => {
        console.log('zuhause angekommen');
      },
      (error) => {
        console.error('Fehler bei der Umleitung', error);
      }
    );
  }








}
