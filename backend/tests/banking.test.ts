import { BankingUseCase } from "../src/core/application/BankingUseCase";

describe("BankingUseCase", () => {
  it("allows banking of positive CB", async () => {
    const mockRepo: any = {
      add: jest.fn()
    };

    const useCase = new BankingUseCase(mockRepo);

    await useCase.bank("SHIP-001", 2025, 100);

    expect(mockRepo.add).toHaveBeenCalled();
  });

  it("rejects banking negative CB", async () => {
    const mockRepo: any = {
      add: jest.fn()
    };

    const useCase = new BankingUseCase(mockRepo);

    await expect(
      useCase.bank("SHIP-001", 2025, -10)
    ).rejects.toThrow("positive compliance balance");
  });

  it("rejects zero amount", async () => {
    const mockRepo: any = {
      add: jest.fn()
    };

    const useCase = new BankingUseCase(mockRepo);

    await expect(
      useCase.bank("SHIP-001", 2025, 0)
    ).rejects.toThrow();
  });
});
