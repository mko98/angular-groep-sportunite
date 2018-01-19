import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {environment} from '../../environments/environment';
import {Http, Headers, RequestOptions} from '@angular/http';
import {User} from './user.model';
import {SessionStorageService} from '../shared/sessionStorage.service';

@Injectable()
export class UserService {
  userChanged = new Subject<User[]>();

  private serverUrl = environment.nodeServerUrlChar; // URL to web api
  private users: User[];
  private event: Event;

  constructor(private http: Http, private sessionStorageService: SessionStorageService) {
    console.log("user service aangeroepen")
  }

  getUser() {
    console.log('tokenAndereManier: ' + localStorage.token);
    return this.http.get(this.serverUrl + this.sessionStorageService.getUserId(), { headers: this.sessionStorageService.getheaders()})
      .toPromise()
      .then(response => {
        return response.json() as User;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getSpecUser(uid: string) {
    return this.http.get(this.serverUrl + uid, {headers: this.sessionStorageService.getheaders()})
      .toPromise()
      .then(response => {
        return response.json() as User;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }



  getFriends() {
    return this.http.get(this.serverUrl + 'friends/' + this.sessionStorageService.getUserId(), {headers: this.sessionStorageService.getheaders()})
      .toPromise()
      .then(response => {
        this.users = response.json() as User[];
        return response.json() as User[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getFriendsOfFriends() {
    return this.http.get(this.serverUrl + 'friendsoffriends/' + this.sessionStorageService.getUserId(), {headers: this.sessionStorageService.getheaders()})
      .toPromise()
      .then(response => {
        this.users = response.json() as User[];
        return response.json() as User[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }



  addFriend(friendId: string) {
    console.log(localStorage.getItem('token'));
    return this.http.post(this.serverUrl + 'befriend/' + this.sessionStorageService.getUserId() + '/' + friendId, null, {headers: this.sessionStorageService.getheaders()})
      .toPromise()
      .then(response => {
        this.userChanged.next(this.users.slice());
        return response.json() as User[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  deleteFriend(friendId: string) {
    return this.http.delete(this.serverUrl + 'defriend/' + this.sessionStorageService.getUserId() + '/' + friendId, {headers: this.sessionStorageService.getheaders()})
      .toPromise()
      .then(response => {
        this.userChanged.next(this.users.slice());
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
