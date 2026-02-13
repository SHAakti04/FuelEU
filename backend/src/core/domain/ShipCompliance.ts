export class ShipCompliance {
  constructor(
    public readonly shipId: string,
    public readonly year: number,
    public cbGco2eq: number
  ) {}
}
