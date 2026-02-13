import { BankingRepositoryPort } from "../ports/BankingRepositoryPort";
import { BankEntry } from "../domain/BankEntry";

export class BankingUseCase {
  constructor(private readonly bankingRepo: BankingRepositoryPort) {}

  async bank(
    shipId: string,
    year: number,
    amount: number
  ): Promise<void> {
    if (amount <= 0) {
      throw new Error("Only positive compliance balance can be banked");
    }

    const entry = new BankEntry(shipId, year, amount);
    await this.bankingRepo.add(entry);
  }

  async apply(
    shipId: string,
    year: number,
    amount: number
  ): Promise<void> {
    if (amount <= 0) {
      throw new Error("Applied amount must be positive");
    }

    // same ship only — regulation rule
    await this.bankingRepo.transfer(shipId, shipId, year, amount);
  }
}
