import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root', // Dies sorgt dafür, dass der Dienst im gesamten Projekt verfügbar ist.
})


export class SharedService {
  constructor(private router: Router) {}

  isLoggedIn: boolean = false;
  isConfirmationPopupVisible: boolean = false;




}
