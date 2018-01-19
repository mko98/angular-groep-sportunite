import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { User } from '../../user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
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
}
