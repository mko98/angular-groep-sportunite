import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../shared/user.model";
import {EventService} from "../../games/event.service";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Event} from '../../games/event.model';
import {Subscription} from 'rxjs/Subscription';



@Component({
  selector: 'app-guest-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemEventListComponent implements OnInit {
  @Input() user: User;
  @Input() eventId: string;
  @Input() index: number;
  @Output() userSelected = new EventEmitter<void>();
  deleteDisabled: boolean = true;
  event: Event = new Event({title: 'loading', imagePath: ''});
  subscription: Subscription;
  id: string;
  private status;

  constructor( private route: ActivatedRoute,
               private eventService: EventService,
               private router: Router) { }

  ngOnInit() {
    if (this.user._id === localStorage.getItem('userid')){
      this.deleteDisabled = false;
    }
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.eventService.getEvent(this.id).then(res => {
            this.event = res;
          });
          this.status = this.eventService.checkIdInEvent(this.id)
            .then((res) => {
              this.status = res;
            });
        }
      );

    this.subscription = this.eventService.sEventChanged
      .subscribe(
        (eventId: string) => {
          this.eventService.getEvent(this.id).then(res => {
            this.event = res;
          });
        });
  }

  onSelected() {
    this.userSelected.emit();
  }

  onDeleteUser() {
    this.eventService.deleteUser(this.user._id, this.id);
  }
}
