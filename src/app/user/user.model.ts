export class User {

  private id: string;
  private _name: string;
  private _description: string;

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

  public get description(): string {
    return this._description;
  }

  public set description(n: string) {
    this._description = n;
  }

}
