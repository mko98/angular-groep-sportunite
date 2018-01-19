import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../user.model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-friends-list',
  templateUrl: './user-friends-list.component.html',
  styleUrls: ['./user-friends-list.component.css']
})
export class UserFriendsListComponent implements OnInit, OnDestroy {
  friends: User[];
  private subscription: Subscription;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userService.getFriends()
      .then(res => {
        this.friends = res;
      });
    this.subscription = this.userService.userChanged
      .subscribe(
        (users: User[]) => {
          this.userService.getFriends()
            .then(res => {
              this.friends = res;
            });
          console.log('get friends aangeroepen.');
          console.dir(users);
        }
      );
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
