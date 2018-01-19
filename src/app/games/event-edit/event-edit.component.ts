import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {EventService} from '../event.service';
import {EventUser} from "../eventuser.model";

import { Event } from '../event.model';
import {Subscription} from 'rxjs/Subscription';
import {Sport} from "../../shared/sport.model";
import {SportHall} from "../../shared/sporthall.model";

@Component({
  selector: 'app-game-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  id: string;
  eventForm: FormGroup;
  idChar: string;
  editMode = false;
  users: EventUser;
  event: Event;
  sports: Sport[] = [];
  sportHalls: SportHall[] = [];

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private router: Router) {

    this.eventService.getSportHalls()
      .then(res => {
        this.sportHalls = res;
      })
    .then(() => {
      this.eventService.getSports()
        .then(res => {
          this.sports = res;
        })
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.idChar = params['charid'];
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
          this.eventService.getSports()
            .then(res => {
              console.log(res);
              this.sports = res;
            });
  }

  onSubmit() {
    console.log(this.eventForm.value);
    if (this.editMode) {
      this.eventService.updateEvent(this.id, this.eventForm.value);
    } else {
      this.eventService.addEvent(this.eventForm.value);
      this.eventService.getEvents()
        .then((events) => {
          this.eventService.eventChanged;
        });
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let editevent = new Event({name: '', price: ''});

    if (this.editMode) {
      this.eventService.getEvent(this.id)
        .then(event => {
          editevent = event;
          this.eventForm = new FormGroup({
            'name': new FormControl(editevent.name, Validators.required),
            'price': new FormControl(editevent.price, Validators.required),
            'sportHallId': new FormControl(editevent.sportHall, Validators.required),
            'sportId': new FormControl(editevent.sport, Validators.required),
            'availability': new FormControl(editevent.availability, Validators.required)
          });
        })
        .catch(error => console.log(error));
    }

    this.eventForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'price': new FormControl(0.0, Validators.required),
      'sportHallId': new FormControl('', Validators.required),
      'sportId': new FormControl('', Validators.required),
      'availability': new FormControl('', Validators.required)
    });
  }

}
