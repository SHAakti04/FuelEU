const express = require("express");

const RouteRepository =
  require("../../outbound/postgres/RouteRepositoryPrisma");
const ComplianceRepository =
  require("../../outbound/postgres/ComplianceRepositoryPrisma");

const {
  ComputeComplianceBalanceFromRoutes
} = require("../../../core/application/ComputeComplianceBalanceFromRoutes");

const router = express.Router();

const routeRepo = new RouteRepository();
const complianceRepo = new ComplianceRepository();
const useCase =
  new ComputeComplianceBalanceFromRoutes(
    routeRepo,
    complianceRepo
  );

/**
 * GET /compliance/cb?shipId&year
 */
router.get("/cb", async (req, res) => {
  try {
    const { shipId, year } = req.query;

    if (!shipId || !year) {
      return res
        .status(400)
        .json({ error: "shipId and year required" });
    }

    const compliance = await useCase.execute(
      shipId,
      Number(year)
    );

    res.json(compliance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
export {};
