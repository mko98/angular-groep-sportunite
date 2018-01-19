import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {environment} from '../../environments/environment';
import {Http, Headers} from '@angular/http';
import {Event} from './event.model';
import {EventUser} from './eventuser.model';
import {Sport} from '../shared/sport.model';
import {SessionStorageService} from '../shared/sessionStorage.service';
import {SportHall} from '../shared/sporthall.model';

@Injectable()
export class EventService {
  eventChanged = new Subject<Event[]>();
  sEventChanged = new Subject<string>();

  private token = localStorage.getItem('token');
  private headers = new Headers({'Access-Control-Allow-Origin': '*',
    'token': this.token});  // private options = new RequestOptions({headers: this.headers})
  private eventServerUrl = 'https://nodejs-groep-sportunite.herokuapp.com/api/v1/events';
  private userListUrl = 'https://nodejs-groep-sportunite.herokuapp.com/api/v1/tests';
  private userServerUrl = 'https://nodejs-groep-sportunite.herokuapp.com//api/v1/users';
  private events: Event[];
  private event: Event;
  private users: EventUser[];
  private eventsUrl = environment.webApiServerUrlRel + '/sportevents';
  private sportsUrl = environment.webApiServerUrlRel + '/sports';
  private sporthallsUrl = environment.webApiServerUrlRel + '/sporthalls';
  mydata: any;

  public headerDict = new Headers({
    'token': this.token
  });

  public requestOptions = {
    headers: new Headers(this.headerDict),
  };

  constructor(private http: Http, private sessionStorageService: SessionStorageService) { }

  getEvents() {
    console.dir(this.headers);
    return this.http.get(this.eventsUrl, {headers: this.headerDict})
      .toPromise()
      .then(response => {
        this.events = response.json() as Event[];
        return response.json() as Event[];
      })
      .catch(error => {
        return error;
      });
  }

  getEvent(index: string) {
    if (index == null)
      return null;
    return this.http.get(this.eventsUrl + '/' + index, {headers: this.headers})
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  getSports(): Promise<Sport[]> {
    return this.http.get(this.sportsUrl, {headers: this.headers})
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  getSportHalls(): Promise<SportHall[]> {
    return this.http.get(this.sporthallsUrl, {headers: this.headers})
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

  getUserListEvent(index: string): Promise<EventUser[]> {
    return this.http.get(this.userListUrl + '/' + index, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.users = response.json() as EventUser[];
        return response.json() as EventUser[];
      })
      .catch(error => {
        return error;
      });
  }

  getUsers() {
    return this.http.get(environment.nodeServerUrlChar, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.users = response.json() as EventUser[];
        return response.json() as EventUser[];
      })
      .catch(error => {
        return error;
      });

  }

  getUser(index: string) {
    if (index == null)
      return null;
    return this.http.get(environment.nodeServerUrlChar + index, {headers: this.headers})
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  addUser(id: string, eventId: string) {
    return this.http.put(this.eventServerUrl + '/' + id + '/' + eventId, null,{ headers: this.headers})
      .toPromise()
      .then(response => {
        this.sEventChanged.next(eventId);
        return response.json() as EventUser[];
      })
      .catch(error  => {
        console.log(error);
        return error;
      });
  }

  deleteUser(id: string, eventId: string) {
    return this.http.delete(this.eventServerUrl + '/' + id + '/' + eventId, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.sEventChanged.next(eventId);
        return response.json() as EventUser;
      })
      .catch(error => {
        return error;
      });
  }

  addEvent(event: Event) {
    // const eventObject = {
    //   "name": event.name,
    //   "price": event.price,
    //   "SportId": this.event.sport.id,
    //   "SportHallId": this.event.sportHall.id,
    //   "Availability": event.availability
    // };
    console.log(event);
    return this.http.post(this.eventServerUrl, event, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.eventChanged.next(this.events);
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateEvent(index: string, newEvent: Event) {
    return this.http.put(this.eventsUrl + index, newEvent, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.eventChanged.next(this.events);
      });
  }

  deleteEvent(index: string) {
    return this.http.delete(this.eventsUrl + index, {headers: this.headers})
      .toPromise()
      .then(response => {
        this.eventChanged.next(this.events.slice());
      });
  }

  checkIdInEvent(eventId: string) {
    return this.http.get(this.eventServerUrl + '/check/' + this.sessionStorageService.getUserId() + '/' + eventId,
      {headers: this.sessionStorageService.getheaders()})
      .toPromise()
      .then(response => {
        return response.json().signedIn;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
