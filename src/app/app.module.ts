import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';


import {EventStartComponent} from "./games/event-start/event-start.component";
import {IfnotDirective} from "./directiveCustom";

import {EventDetailComponent} from "./games/event-detail/event-detail.component";
import {EventEditComponent} from "./games/event-edit/event-edit.component";
import {EventService} from "./games/event.service";
import {EventListComponent} from "./games/event-list/event-list.component";
import {EventItemComponent} from "./games/event-list/event-item/event-item.component";
import {EventsComponent} from "./games/events.component";
import {LoginRegisterComponent} from "./LoginRegister/loginregister.component";
import {LoginComponent} from "./LoginRegister/Login/login.component";
import {RegisterComponent} from "./LoginRegister/Register/register.component";

import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {UserService} from './user/user.service';
import {UserFriendsListComponent} from './user/user-friends-list/user-friends-list.component';
import {UserItemComponent} from './user/user-friends-list/user-item/user-item.component';
import { UserSpecDetailComponent } from './user/user-spec-detail/user-spec-detail.component';
import { UserRecFriendsListComponent } from './user/user-rec-friends-list/user-rec-friends-list.component';
import { UserRecItemComponent } from './user/user-rec-friends-list/user-rec-item/user-rec-item.component';
import {UserComponent} from './user/user.component';
import {UserItemEventListComponent} from './guest/user-item/user-item.component';
import {UserLoginRegisterService} from "./LoginRegister/userloginregister.service";
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth-gaurd.service';
import {SessionStorageService} from './shared/sessionStorage.service';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,


    EventListComponent,
    EventDetailComponent,
    EventEditComponent,

    DropdownDirective,

    IfnotDirective,

    EventItemComponent,
    EventStartComponent,
    EventsComponent,
    LoginRegisterComponent,
    LoginComponent,
    RegisterComponent,
    UserItemEventListComponent,
    UserComponent,
    UserDetailComponent,
    UserFriendsListComponent,
    UserItemComponent,
    UserSpecDetailComponent,
    UserRecFriendsListComponent,
    UserRecItemComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [EventService, UserService, UserLoginRegisterService, SessionStorageService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
