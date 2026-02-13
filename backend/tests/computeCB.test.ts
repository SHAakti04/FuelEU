import { ComputeComplianceBalanceFromRoutes } from "../src/core/application/ComputeComplianceBalanceFromRoutes";
import { ShipCompliance } from "../src/core/domain/ShipCompliance";

describe("ComputeComplianceBalanceFromRoutes", () => {
  it("computes CB correctly from routes", async () => {
    const mockRouteRepo: any = {
      findByShipAndYear: jest.fn().mockResolvedValue([
        {
          ghgIntensity: 90,
          fuelConsumption: 1000
        }
      ])
    };

    const mockComplianceRepo: any = {
      save: jest.fn()
    };

    const useCase = new ComputeComplianceBalanceFromRoutes(
      mockRouteRepo,
      mockComplianceRepo
    );

    const result: ShipCompliance = await useCase.execute(
      "SHIP-001",
      2025
    );

    expect(result.shipId).toBe("SHIP-001");
    expect(result.year).toBe(2025);
    expect(result.cbGco2eq).toBeLessThan(0); // deficit expected
    expect(mockComplianceRepo.save).toHaveBeenCalled();
  });

  it("throws error if no routes found", async () => {
    const mockRouteRepo: any = {
      findByShipAndYear: jest.fn().mockResolvedValue([])
    };

    const mockComplianceRepo: any = {
      save: jest.fn()
    };

    const useCase = new ComputeComplianceBalanceFromRoutes(
      mockRouteRepo,
      mockComplianceRepo
    );

    await expect(
      useCase.execute("SHIP-001", 2025)
    ).rejects.toThrow("No routes found");
  });
});
