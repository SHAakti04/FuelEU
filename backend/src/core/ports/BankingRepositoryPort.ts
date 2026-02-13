import { BankEntry } from "../domain/BankEntry";

export interface BankingRepositoryPort {
  find(shipId: string, year: number): Promise<BankEntry[]>;
  add(entry: BankEntry): Promise<void>;
  transfer(
    fromShipId: string,
    toShipId: string,
    year: number,
    amount: number
  ): Promise<void>;
}
