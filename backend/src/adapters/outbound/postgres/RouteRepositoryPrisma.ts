const prisma = require("../../../infrastructure/db/prisma");

class RouteRepositoryPrisma {
  async findAll() {
    return prisma.route.findMany({
      orderBy: { routeId: "asc" }
    });
  }

  async findBaseline(year) {
    return prisma.route.findFirst({
      where: {
        year,
        isBaseline: true
      }
    });
  }
 async findByShipAndYear(shipId, year) {
    return prisma.route.findMany({
      where: {
         shipId,
        year
      }
    });}
  async setBaseline(routeId) {
    // Clear previous baseline
    await prisma.route.updateMany({
      data: { isBaseline: false }
    });

    // Set new baseline
    await prisma.route.update({
      where: { routeId },
      data: { isBaseline: true }
    });
  }
}

module.exports = RouteRepositoryPrisma;
export {}; 