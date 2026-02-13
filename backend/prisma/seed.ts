const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.route.deleteMany();

  await prisma.route.createMany({
    data: [
      {
        routeId: "R001",
        shipId: "SHIP-001",          // ✅ added
        vesselType: "Container",
        fuelType: "LNG",
        year: 2025,
        ghgIntensity: 85.2,
        fuelConsumption: 1200,
        distance: 15000,
        totalEmissions: 3200,
        isBaseline: true
      },
      {
        routeId: "R002",
        shipId: "SHIP-001",          // same ship, multiple routes
        vesselType: "Container",
        fuelType: "VLSFO",
        year: 2025,
        ghgIntensity: 92.5,
        fuelConsumption: 1400,
        distance: 16000,
        totalEmissions: 3900
      },
      {
        routeId: "R003",
        shipId: "SHIP-002",
        vesselType: "Tanker",
        fuelType: "LNG",
        year: 2025,
        ghgIntensity: 88.1,
        fuelConsumption: 1100,
        distance: 13000,
        totalEmissions: 3000
      },
      {
        routeId: "R004",
        shipId: "SHIP-002",
        vesselType: "Bulk Carrier",
        fuelType: "HFO",
        year: 2025,
        ghgIntensity: 96.7,
        fuelConsumption: 1700,
        distance: 18000,
        totalEmissions: 4500
      },
      {
        routeId: "R005",
        shipId: "SHIP-003",
        vesselType: "Ro-Ro",
        fuelType: "MGO",
        year: 2025,
        ghgIntensity: 90.3,
        fuelConsumption: 1000,
        distance: 12000,
        totalEmissions: 2800
      }
    ]
  });

  console.log("✅ Seeded 5 routes with shipId (R001 baseline)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
