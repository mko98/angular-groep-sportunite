// other imports...
import { tokenNotExpired } from 'angular2-jwt';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  // ...

  /**
   * Helper function to check if user is logged in.
   * User is logged in if stored token is not expired.
   */
  loggedIn() {
    return tokenNotExpired('token');
  }
}
