export class BankEntry {
  constructor(
    public readonly shipId: string,
    public readonly year: number,
    public readonly amountGco2eq: number
  ) {
    if (amountGco2eq <= 0) {
      throw new Error("Banked amount must be positive");
    }
  }
}
