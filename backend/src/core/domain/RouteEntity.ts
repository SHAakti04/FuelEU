export class RouteEntity {
  constructor(
    public readonly routeId: string,
    public readonly vesselType: string,
    public readonly fuelType: string,
    public readonly year: number,
    public readonly ghgIntensity: number, // gCO2e/MJ
    public readonly fuelConsumption: number, // tonnes
    public readonly distance: number, // km
    public readonly totalEmissions: number, // tonnes
    public isBaseline: boolean = false
  ) {
    if (ghgIntensity < 0) throw new Error("GHG intensity cannot be negative");
    if (fuelConsumption <= 0) throw new Error("Fuel consumption must be > 0");
  }
}
