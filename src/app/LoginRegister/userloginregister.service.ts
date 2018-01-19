import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {environment} from '../../environments/environment';
import {Http, Headers} from '@angular/http';
import {Userloginregister} from "./userloginregister.model";
import {SessionStorageService} from '../shared/sessionStorage.service';

@Injectable()
export class UserLoginRegisterService {
  eventChanged = new Subject<Event[]>();

  private headers = this.sessionStorageService.getheaders();
  private serverUrl = environment.nodeServerUrl + '/events/';
  private serverUserUrl = environment.nodeServerUrl + '/users/';

  private events: Event[];
  private users: Userloginregister[];
  private user: Userloginregister;

  constructor(private http: Http, private sessionStorageService: SessionStorageService) {

  }


  registerUser(userLoginRegister: Userloginregister) {
    console.log(userLoginRegister);
    return this.http.post(environment.nodeServerUrl + "/register", userLoginRegister, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log("a");
        this.users = response.json() as Userloginregister[];
        return response.json() as Userloginregister[];
      })
      .catch(error => {
        console.log(error);
        return error;
      });

  }

  loginUser(userLoginRegister: Userloginregister) {
    console.log(userLoginRegister._id);
    return this.http.post(environment.nodeServerUrl + '/authenticate', userLoginRegister, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.user = response.json() as Userloginregister;
        return response.json() as Userloginregister;
      })
      .catch(error => {
        return error;
      });

  }


  addUser(id: string, char: Userloginregister, event: Event) {
    console.log('addUser');

    return this.http.post(environment.nodeServerUrlChar, char, {headers: this.headers})
      .toPromise()
      .then(response => {

        return response.json() as Userloginregister;
      })
      .catch(error => {
        return error;
      });
  }

  updateUser(id: string, newChar: Userloginregister) {
    console.log('update');
    return this.http.put(this.serverUserUrl + id, newChar, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.eventChanged.next(this.events);
      });
  }

}
