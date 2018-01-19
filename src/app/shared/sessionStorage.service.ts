import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {environment} from '../../environments/environment';
import {Http, Headers, RequestOptions} from '@angular/http';
import {User} from './user.model';
import {UserService} from '../user/user.service';

@Injectable()
export class SessionStorageService {

  private serverUrl = environment.nodeServerUrlChar; // URL to web api

  constructor(private http: Http) {
    console.log("user service aangeroepen")
  }

  clearLocalStorage(){
    localStorage.clear();
  }

  setToken(id: string) {
    console.log('setToken()');
    // this.userService.getLoggedInUser(name).then(res => {
    //     console.log("token:" + res.json().token);
        localStorage.setItem('token', id);
      }
    // );

  getToken() {
    return localStorage.token;
  }

  setUserId(name: string) {
    this.getLoggedInUser(name).then(res => {
        localStorage.setItem('userid', res._id);
        console.log(localStorage.userid);
      }
    );
  }

  getUserId() {
    return localStorage.userid;
  }

  getheaders() {
    var headers;
    return headers = new Headers({'token': this.getToken()});
  }

  getLoggedInUser(name: string) {
    console.log('getloggednuser called');
    return this.http.get(this.serverUrl + 'name/' + name, {headers: this.getheaders()})
      .toPromise()
      .then(response => {
        return response.json() as User;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}
