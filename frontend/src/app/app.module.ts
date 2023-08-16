import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterLink, RouterModule, RouterOutlet, Routes} from "@angular/router";

const appRoutes: Routes = [
  {path: '', component: StartseiteComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    StartseiteComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterLink,
    RouterOutlet,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
