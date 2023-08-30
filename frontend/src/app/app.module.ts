import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterLink, RouterModule, RouterOutlet, Routes} from "@angular/router";
import { DuellComponent } from './duell/duell.component';
import { AdminViewComponent } from './admin/admin-view.component';
import { UserComponent } from './user/user.component';
import { ProfilseiteComponent } from './profilseite/profilseite.component';

const appRoutes: Routes = [
  {path: '', component: StartseiteComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminViewComponent},
  {path: 'duell', component: DuellComponent },
  {path: 'user', component: UserComponent},
  {path: 'profil', component: ProfilseiteComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    StartseiteComponent,
    LoginComponent,
    RegisterComponent,
    DuellComponent,
    AdminViewComponent,
    UserComponent,
    ProfilseiteComponent
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
