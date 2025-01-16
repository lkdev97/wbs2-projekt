import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userPassword: string = "";
  out: string = "";
  username: string = "";
  error: string = "Es gibt einen Fehler mit der Eingabe. Achten Sie auf sonderzeichen und darauf das alle Felder ausgefült sind"


  constructor(private http: HttpClient, private route: Router) {
  }
  buttonClickedAccept() {
    console.error("buttonClickedAccept")
    if (!this.whitespace(this.username) && !this.whitespace(this.userPassword)) {
      this.http.post<any>('http://localhost:3000/auth/register',
        {username: this.username, password: this.userPassword}).subscribe(data => {
        this.username = data.username;
      })
    }

    this.http.post<any>('http://localhost:3000/auth/login',
      {username: this.username, password: this.userPassword}).subscribe({
      next: (data) => {
        this.username = data.username;
      },
      error: (error) => {
        this.route.navigate(['/startseite']);
        console.error('HTTP-Fehler:', error);
      },
    })
  }
  /**
   * whitespace. This function takes a single
   * argument any,which is expected to be a string.
   * The function then checks whether the provided
   * string consists only of whitespace characters (spaces, tabs, etc.)
   * @param any: string
   */
  whitespace(any: string): boolean {
    return any.trim().length === 0;
  }
}
