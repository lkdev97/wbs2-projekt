import {Component, ChangeDetectorRef} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../shared.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    public sharedService: SharedService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: Router
  ) {
  }

  username: string = "";
  userPassword: string = "";
  out: string = "";
  error: string = "Es gibt einen Fehler mit der Eingabe. Achten Sie auf sonderzeichen und darauf das alle Felder ausgefült sind"

  buttonClickedAccept() {
    if (!this.whitespace(this.username) && !this.whitespace(this.userPassword)) {
      this.http.post<any>('http://localhost:3000/auth/login',
        {username: this.username, password: this.userPassword}).subscribe({
        next: (data) => {
          //this.sharedService.isLoggedIn = true;
          this.showLogoutNProfileBtns();
          this.username = data.username;




        },
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

  showLogoutNProfileBtns() {
    this.sharedService.isLoggedIn = true;
    console.log(this.sharedService.isLoggedIn);
    this.changeDetectorRef.detectChanges();
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
