import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Event } from '../event.model';
import {EventService} from '../event.service';
import {User} from "../../shared/user.model";
import {Subscription} from 'rxjs/Subscription';
import {UserService} from '../../user/user.service';
import {EventUser} from "../eventuser.model";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-game-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})

export class EventDetailComponent implements OnInit {
  event: Event = new Event({title: 'loading', imagePath: ''});
  user: { name: string};
  index: number;
  id: string;
  userId: string = localStorage.getItem('userid');
  private subscription: Subscription;
  users: EventUser[];
  status = false;

  constructor(private eventService: EventService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.eventService.getEvent(this.id).then(res => {
            this.event = res;
          });
          this.eventService.getUserListEvent(this.id).then(res => {
            this.users = res;
          });
          this.eventService.checkIdInEvent(this.id)
            .then((res) => {
              this.status = res;
            });
        }

      );
    this.subscription = this.eventService.sEventChanged
      .subscribe(
        (eventId: string) => {
          this.eventService.checkIdInEvent(eventId)
            .then((res) => {
              this.status = res;
            });
          this.eventService.getEvent(this.id).then(res => {
            this.event = res;
          });
          this.eventService.getUserListEvent(this.id).then(res => {
            this.users = res;
          });
        });
  }

  onEditEvent() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteEvent() {
    console.log('delete');
    this.eventService.deleteEvent(this.id);
  }

  onGameSelected(user: User) {
    this.user = user;
  }

  onJoinSubmit(): void{
    this.eventService.addUser(this.userId, this.id);
  }

  containsUser() {
    for(const index in this.users) {
      if (this.users[index]._id === this.userId) {
        return true;
      }
    }
    return false;
  }
}
