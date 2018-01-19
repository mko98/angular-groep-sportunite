import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {User} from '../user.model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
          this.userService.getUser().then(res => {
            console.log("Hier volgt user-detail ngOnInit data");
            console.log('token: ' + localStorage.getItem('token'));
            console.log('userid: ' + localStorage.getItem('userid'));
            console.dir(res);
            this.user = res;
        }
      );
  }
}
