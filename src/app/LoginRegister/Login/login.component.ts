import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Userloginregister} from "../userloginregister.model";
import {ActivatedRoute, Params, Router, RouterLink} from '@angular/router';
import {UserLoginRegisterService} from "../userloginregister.service";
import {UserService} from '../../user/user.service';
import {User} from '../../user/user.model';
import {SessionStorageService} from '../../shared/sessionStorage.service';

@Component({
  selector: 'app-login-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  id: string;
  loginUserForm: FormGroup;
  idChar: string;
  editMode = false;
  selectedGenre: string;
  users: Userloginregister;
  event: Event;
  testid: string;
  testid2: string;
  currentUser: User;


  constructor(private route: ActivatedRoute,
              private userLoginService: UserLoginRegisterService,
              private userService: UserService,
              private sessionStorageService: SessionStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.sessionStorageService.clearLocalStorage();
    this.route.params.subscribe((params: Params) => {
        this.initForm();
        // this.gameService.getGame(this.id)
        //   .then(games => this.game = games);
      }
    );
  }

  onSubmit() {
    this.userLoginService.loginUser(this.loginUserForm.value)
      .then((res) => {
        this.sessionStorageService.setToken(res.token);
        this.router.navigate(['/events'], {relativeTo: this.route});
      });
    this.sessionStorageService.setUserId(this.loginUserForm.value.name);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    // const GameCharacters = new FormArray([]);

    this.loginUserForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  private saveId(){

  }

}
