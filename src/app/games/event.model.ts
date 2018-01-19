//
// Domain class
//

import {Platform} from '../shared/platform.model';
import {User} from '../shared/user.model';
import {Sport} from "../shared/sport.model";
import {SportHall} from "../shared/sporthall.model";
export class Event {

  private _id: string;
  private _name: string;
  private _price: number;
  private _sportHall: SportHall;
  private _sport: Sport;
  private _availability: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
  public get id(): string {
    return this._id;
  }

  public set id(n: string) {
    this._id = n;
  }

  public get name(): string {
    return this._name;
  }

  public set name(n: string) {
    this._name = n;
  }

  public get price(): number {
    return this._price;
  }

  public set price(g: number) {
    this._price = g;
  }

  public get sportHall(): SportHall {
    return this._sportHall;
  }

  public set sportHall(g: SportHall) {
    this._sportHall = g;
  }

  public get sport(): Sport {
    return this._sport;
  }

  public set sport(g: Sport) {
    this._sport = g;
  }

  public get availability(): string {
    return this._availability;
  }

  public set availability(g: string) {
    this._availability = g;
  }
}
