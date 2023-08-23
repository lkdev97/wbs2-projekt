import {Component} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor() {
  }


  userEmail: string = "";
  userPassword: string = "";
  out: string="";
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

  buttonClickedAccept() {
    console.error("buttonClickedAccept")
    if (!this.whitespace(this.userEmail) && !this.whitespace(this.userPassword)) {
      console.log("IF-ABFRAGE")
      this.out= "Wilkommen" +" "+ this.userEmail;
    }else{
      this.out= this.error;


    }


  }

}
