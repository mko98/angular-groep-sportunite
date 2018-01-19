export class Sport {

   _id: number;
   _name: string;
   _description: string;

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }
}
