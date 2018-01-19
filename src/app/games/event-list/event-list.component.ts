import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {EventService} from "../event.service";
import { Event } from '../event.model';
import {User} from '../../user/user.model';


@Component({
  selector: 'app-game-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {
  events: Event[];
  subscription: Subscription;

  constructor(private eventService: EventService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.eventService.getEvents()
      .then(res => {
        this.events = res;
      });
    this.subscription = this.eventService.eventChanged
      .subscribe(
        (events: Event[]) => {
          this.eventService.getEvents()
            .then(res => {
              this.events = res;
            });
        }
      );
  }

  onNewEvent() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  // onGenre() {
  //   this.router.navigate(['/genre/' + this.game.genre], {relativeTo: this.route});
  //   // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
