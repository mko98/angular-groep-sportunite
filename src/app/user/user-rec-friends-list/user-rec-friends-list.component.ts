import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../user.model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-rec-friends-list',
  templateUrl: './user-rec-friends-list.component.html',
  styleUrls: ['./user-rec-friends-list.component.css']
})
export class UserRecFriendsListComponent implements OnInit, OnDestroy {
  friendsOfFriends: User[];
  private subscription: Subscription;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userService.getFriendsOfFriends()
      .then(res => {
        this.friendsOfFriends = res;
      });
    this.subscription = this.userService.userChanged
      .subscribe(
        (users: User[]) => {
          this.userService.getFriendsOfFriends()
            .then(res => {
              this.friendsOfFriends = res;
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
