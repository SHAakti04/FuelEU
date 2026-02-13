// const TARGET_INTENSITY = 89.3368;
// const ENERGY_PER_TON = 41000;

// export class ComputeCBUseCase {
//   execute(actualGhgIntensity: number, fuelConsumptionTons: number): number {
//     if (fuelConsumptionTons <= 0) {
//       throw new Error("Fuel consumption must be greater than zero");
//     }

//     const cb =
//       (TARGET_INTENSITY - actualGhgIntensity) *
//       (fuelConsumptionTons * ENERGY_PER_TON);

//     return Number(cb.toFixed(2));
//   }
// }
import { RouteRepositoryPort } from "../ports/RouteRepositoryPort";
import { ComplianceRepositoryPort } from "../ports/ComplianceRepositoryPort";
import { ShipCompliance } from "../domain/ShipCompliance";

const TARGET_INTENSITY = 89.3368;
const ENERGY_PER_TON = 41_000;

export class ComputeComplianceBalanceFromRoutes {
  constructor(
    private readonly routeRepo: RouteRepositoryPort,
    private readonly complianceRepo: ComplianceRepositoryPort
  ) {}

  async execute(
    shipId: string,
    year: number
  ): Promise<ShipCompliance> {
    const routes = await this.routeRepo.findByShipAndYear(
      shipId,
      year
    );

    if (routes.length === 0) {
      throw new Error("No routes found for ship and year");
    }

    let totalCB = 0;

    for (const route of routes) {
      const energyInScope =
        route.fuelConsumption * ENERGY_PER_TON;

      const cb =
        (TARGET_INTENSITY - route.ghgIntensity) *
        energyInScope;

      totalCB += cb;
    }

    const compliance = new ShipCompliance(
      shipId,
      year,
      Number(totalCB.toFixed(2))
    );

    await this.complianceRepo.save(compliance);

    return compliance;
  }
}
