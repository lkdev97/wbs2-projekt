import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor() {}
  buttonClickedAccept(): void {
    console.log("buttonClickedAccept")
  }
  buttonClickedAbort(): void {
    console.log("buttonClickedAbort")
  }
}
