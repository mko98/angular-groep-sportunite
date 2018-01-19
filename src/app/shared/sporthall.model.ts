export class SportHall {

  private _id: number;
  private _name: string;
  private _max: number;
  private _min: number;

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get max(): number {
    return this._max;
  }

  public get min(): number {
    return this._min;
  }
}
