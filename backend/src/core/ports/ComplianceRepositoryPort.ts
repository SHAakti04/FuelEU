// import { ShipCompliance } from "../domain/ShipCompliance";

// export interface ComplianceRepositoryPort {
//   getCompliance(shipId: string, year: number): Promise<ShipCompliance | null>;
//   saveCompliance(compliance: ShipCompliance): Promise<void>;
// }
import { ShipCompliance } from "../domain/ShipCompliance";

export interface ComplianceRepositoryPort {
  find(shipId: string, year: number): Promise<ShipCompliance | null>;
  save(compliance: ShipCompliance): Promise<void>;
}
