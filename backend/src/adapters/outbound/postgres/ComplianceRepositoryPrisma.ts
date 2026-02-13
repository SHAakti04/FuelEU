// const prisma = require("../../../infrastructure/db/prisma");

// class ComplianceRepositoryPrisma {
//   async getCompliance(shipId, year) {
//     return prisma.shipCompliance.findUnique({
//       where: {
//         shipId_year: {
//           shipId,
//           year
//         }
//       }
//     });
//   }

//   async saveCompliance(compliance) {
//     return prisma.shipCompliance.upsert({
//       where: {
//         shipId_year: {
//           shipId: compliance.shipId,
//           year: compliance.year
//         }
//       },
//       update: {
//         cbGco2eq: compliance.cbGco2eq
//       },
//       create: {
//         shipId: compliance.shipId,
//         year: compliance.year,
//         cbGco2eq: compliance.cbGco2eq
//       }
//     });
//   }
// }

// module.exports = ComplianceRepositoryPrisma;
// export {}; 
const prisma = require("../../../infrastructure/db/prisma");

class ComplianceRepositoryPrisma {
  async find(shipId, year) {
    return prisma.shipCompliance.findUnique({
      where: {
        shipId_year: { shipId, year }
      }
    });
  }

  async save(compliance) {
    await prisma.shipCompliance.upsert({
      where: {
        shipId_year: {
          shipId: compliance.shipId,
          year: compliance.year
        }
      },
      update: {
        cbGco2eq: compliance.cbGco2eq
      },
      create: {
        shipId: compliance.shipId,
        year: compliance.year,
        cbGco2eq: compliance.cbGco2eq
      }
    });
  }
}

module.exports = ComplianceRepositoryPrisma;
export {};
