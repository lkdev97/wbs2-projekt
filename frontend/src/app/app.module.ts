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
import {FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';

import {SharedService} from "./shared.service";
import { AboutusComponent } from './aboutus/aboutus.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const socketIoConfig: SocketIoConfig = { url: 'http://localhost:3000', options: {} };



const appRoutes: Routes = [
  {path: 'startseite', component: StartseiteComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'adminseite', component: AdminViewComponent},
  {path: 'duell', component: DuellComponent },
  {path: 'user', component: UserComponent},
  {path: 'profil', component: ProfilseiteComponent},
  {path: 'aboutus', component: AboutusComponent}

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
    ProfilseiteComponent,
    HeaderComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    RouterLink,
    RouterOutlet,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(socketIoConfig),
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
