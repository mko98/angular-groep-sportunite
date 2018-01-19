import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import {EventsComponent} from "./games/events.component";
import {EventStartComponent} from "./games/event-start/event-start.component";
import {EventEditComponent} from "./games/event-edit/event-edit.component";
import {EventDetailComponent} from "./games/event-detail/event-detail.component";
import {LoginRegisterComponent} from "./LoginRegister/loginregister.component";
import {LoginComponent} from "./LoginRegister/Login/login.component";
import {RegisterComponent} from "./LoginRegister/Register/register.component";
import {UserComponent} from './user/user.component';
import {UserSpecDetailComponent} from './user/user-spec-detail/user-spec-detail.component';
import {UserDetailComponent} from './user/user-detail/user-detail.component';
import {AuthGuard} from './auth/auth-gaurd.service';

const appRoutes: Routes = [

  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'login', component: LoginRegisterComponent, children: [
    { path: '', component: LoginRegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
  ] },
  { path: 'users', component: UserComponent, canActivate: [AuthGuard], children: [
      { path: '', component: UserDetailComponent  },
      { path: ':id', component: UserSpecDetailComponent }
    ] },
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard], children: [
    { path: '', component: EventStartComponent },
    { path: 'new', component: EventEditComponent },
    { path: ':id', component: EventDetailComponent },
    { path: ':id/edit', component: EventEditComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
