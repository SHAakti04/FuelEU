const prisma = require("../../../infrastructure/db/prisma");

class BankingRepositoryPrisma {
  async find(shipId, year) {
    return prisma.bankEntry.findMany({
      where: { shipId, year },
      orderBy: { id: "asc" }
    });
  }

  async add(entry) {
    return prisma.bankEntry.create({
      data: {
        shipId: entry.shipId,
        year: entry.year,
        amountGco2eq: entry.amountGco2eq
      }
    });
  }

  async transfer(fromShipId, toShipId, year, amount) {
    if (fromShipId !== toShipId) {
      throw new Error("Cross-ship transfer is not allowed by regulation");
    }

    return prisma.bankEntry.create({
      data: {
        shipId: toShipId,
        year,
        amountGco2eq: amount
      }
    });
  }
}

module.exports = BankingRepositoryPrisma;
export {}; 