import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private http: HttpClient, private route: Router) {
  }


  username: string = "";
  userPassword: string = "";
  out: string = "";
  error: string = "Es gibt einen Fehler mit der Eingabe. Achten Sie auf sonderzeichen und darauf das alle Felder ausgefült sind"


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

  /**
   * specialCharacterChecker. This function takes a single
   * argument s, which is expected to be a string.
   * The purpose of this function is to determine whether
   * the input string contains any special characters from a predefined set of special characters.
   * @param s
   * IM MOMENT NICHT IN BENUTZUNG
   */
  specialCharacterChecker(s: String): boolean {
    const sonderzeichen = "012345'_'6789!?/\\/&%$§";
    for (let i: number = 0; i < sonderzeichen.length; i++) {
      for (let a: number = 0; a < s.length; a++) {
        if (s.charAt(a) == sonderzeichen.charAt(i)) {
          return true
        }
      }
    }
    return false
  }


  //TODO: ELSE FÜR DIE FLASCHEN DATEN EINFÜGEN
  buttonClickedAccept() {
    if (!this.whitespace(this.username) && !this.whitespace(this.userPassword)) {
      this.http.post<any>('http://localhost:3000/auth/login',
        {username: this.username, password: this.userPassword}).subscribe({
        next: (data) => {
          this.username = data.username;
          console.log(data.username)
          console.log(data);
          // Überprüfen Sie den Statuscode
          if (data.status === 201) {
            // Der Statuscode ist 201 (Created), navigieren Sie zur '/duel'-Route
          } else {
            console.error('Ungültiger Statuscode:', data.status);
          }
        },
        //TODO: Fixxen warum wir in den Error fall kommen egal bei welcher Anfrage (geht trotzdem an die Datenbank durch)
        error: (error) => {
          this.route.navigate(['/startseite']);
          console.error('HTTP-Fehler:', error);
        },

      })

      this.http.get<any>(`http://localhost:3000/auth/user`).subscribe(data => {
        if (data !== null && data != undefined) {
          console.log(data);
          this.out = data.username + " " + data.id
        } else {
          console.log('Keine Daten erhalten oder ungültige Antwort.');
        }
      });
    } else {
      this.out = this.error;
      console.log(this.error)
    }
  }
}
