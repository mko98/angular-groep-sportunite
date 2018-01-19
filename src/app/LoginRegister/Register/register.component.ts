import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Userloginregister} from "../userloginregister.model";
import {UserLoginRegisterService} from "../userloginregister.service";

@Component({
  selector: 'app-login-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  id: string;
  registeruserForm: FormGroup;
  idChar: string;
  editMode = false;
  selectedGenre: string;
  users: Userloginregister;
  event: Event;

  constructor(private route: ActivatedRoute,
              private userLoginService: UserLoginRegisterService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.initForm();
        // this.gameService.getGame(this.id)
        //   .then(games => this.game = games);
      }
    );
  }

  onSubmit() {
    this.userLoginService.registerUser(this.registeruserForm.value);
  }

  // onCancel() {
  //   this.router.navigate(['../'], {relativeTo: this.route});
  // }

  private initForm() {
        // const GameCharacters = new FormArray([]);

    this.registeruserForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

}
