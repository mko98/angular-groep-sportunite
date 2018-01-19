export class EventUser {
  private id: string;
  private _name: string;
  private _events: [object];

  constructor(values: object = {}) {
    Object.assign(this, values);
  }

  public get _id() {
    return this.id;
  }

  public set _id(n: string) {
    this.id = n;
  }

  public get name() {
    return this._name;
  }

  public set name(n: string) {
    this._name = n;
  }

  public get events() {
    return this._events;
  }

  public set events(e: [object]) {
    this._events = e;
  }
}
