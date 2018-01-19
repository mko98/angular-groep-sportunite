//
// Domain class
//

import {Platform} from '../shared/platform.model';
import {User} from '../shared/user.model';
export class Userloginregister {

  private id: string;
  private _name: string;
  private _password: string;



  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
  public get _id(): string {
    return this.id;
  }

  public set _id(n: string) {
    this.id = n;
  }

  public get name(): string {
    return this._name;
  }

  public set name(n: string) {
    this._name = n;
  }

  public get password(): string {
    return this._password;
  }

  public set password(p: string) {
    this._password = p;
  }

}
