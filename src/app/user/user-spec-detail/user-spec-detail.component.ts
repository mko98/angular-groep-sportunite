import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { User } from '../user.model';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-spec-detail',
  templateUrl: './user-spec-detail.component.html',
  styleUrls: ['./user-spec-detail.component.css']
})

export class UserSpecDetailComponent implements OnInit {
  user: User = new User();
  postUser: User = new User();
  postUserId: String;
  private id: string;
  @Output() private userSelected = new EventEmitter<void>();
  private subscription: Subscription;



  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.userService.getSpecUser(this.id).then(res => {
            console.log('log de user' + res.user);
            this.user = res;
            this.postUserId = res.user;
          });
        }
      );
  }

  onFriendAdded(){
    this.userService.addFriend(this.id);
  }
  onFriendDeleted(){
    this.userService.deleteFriend(this.id);
  }
}
