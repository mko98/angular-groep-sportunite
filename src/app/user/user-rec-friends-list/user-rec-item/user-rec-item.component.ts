import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../user.model';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-user-rec-item',
  templateUrl: './user-rec-item.component.html',
  styleUrls: ['./user-rec-item.component.css']
})
export class UserRecItemComponent implements OnInit {
  @Input() user: User;
  @Input() index: string;
  @Output() userSelected = new EventEmitter<void>();

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.index = this.user._id;
  }

  onSelected() {
    this.userSelected.emit();
  }
  onFriendAdded(){
    this.userService.addFriend(this.index);
  }
}
