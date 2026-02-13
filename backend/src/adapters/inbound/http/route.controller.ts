const express = require("express");
const RouteRepository = require("../../outbound/postgres/RouteRepositoryPrisma");

const router = express.Router();
const repo = new RouteRepository();

router.get("/", async (req, res) => {
  try {
    const routes = await repo.findAll();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/comparison", async (req, res) => {
  try {
    const routes = await repo.findAll();

    const TARGET = 89.3368;

    const comparison = routes.map(r => {
      const percentDiff =
        ((r.ghgIntensity / TARGET) - 1) * 100;

      return {
        routeId: r.routeId,
        ghgIntensity: r.ghgIntensity,
        percentDiff: Number(percentDiff.toFixed(2)),
        compliant: r.ghgIntensity <= TARGET
      };
    });

    res.json(comparison);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:id/baseline", async (req, res) => {
  try {
    await repo.setBaseline(req.params.id);
    res.json({ message: "Baseline updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;
export {}; 
