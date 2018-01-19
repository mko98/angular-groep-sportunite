import { Component, OnInit, Input } from '@angular/core';

import { Event } from '../../event.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../event.service';

@Component({
  selector: 'app-game-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {
  @Input() event: Event;
  @Input() sportEventId: string;
  subscription: Subscription;

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
  }
}
